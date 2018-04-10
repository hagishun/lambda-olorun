const CreateIdentityHandler = require("../createIdentity");

describe("CreateIdentityHandler", () => {
  let sut;
  let access_token = "0xat";
  let deviceKey = "0xdeviceKey";
  let recoveryKey = "0xrecoveryKey";
  let uportMgrMock = {
    receiveAccessToken: jest.fn(),
    signJWT: jest.fn(),
    push: jest.fn()
  };
  let identityManagerMgrMock = {
    getIdentityCreation: jest.fn(),
    createIdentity: jest.fn(),
    getIdentityFromTxHash: jest.fn()
  };
  let blockchainMgrMock = {
    getDefaultNetworkId: jest.fn()
  };

  beforeAll(() => {
    sut = new CreateIdentityHandler(
      uportMgrMock,
      blockchainMgrMock,
      identityManagerMgrMock
    );
  });

  test("empty constructor", () => {
    expect(sut).not.toBeUndefined();
  });

  test("handle null body", done => {
    sut.handle(undefined, null, (err, res) => {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(400);
      expect(err.message).toEqual("no json body");
      done();
    });
  });

  test("handle empty deviceKey", done => {
    let event = {
      access_token: null,
      recoveryKey: recoveryKey,
      blockchain: "blockchain",
      managerType: "anyType"
    };
    sut.handle(event, {}, (err, res) => {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(400);
      expect(err.message).toEqual("access_token parameter missing");
      done();
    });
  });

  test("happy path", done => {
    uportMgrMock.receiveAccessToken.mockImplementation(() => {
      return { deviceKey: deviceKey };
    });
    identityManagerMgrMock.createIdentity.mockImplementation(() => {
      return {
        managerAddress: "0xD4bF80cE7be51Dc6861cb260cEd74aB98f520700",
        txHash: "0x99e8ba41Ebaa930ea8cd992C8eD497D5e4207bdC"
      };
    });
    identityManagerMgrMock.getIdentityFromTxHash.mockImplementation(() => {
      return "0x12345";
    });
    blockchainMgrMock.getDefaultNetworkId.mockImplementation(() => {
      return "0x63";
    });

    let event = {
      access_token: deviceKey,
      blockchain: null,
      managerType: "anyType"
    };
    sut.handle(event, {}, (err, res) => {
      expect(err).toBeNull();
      done();
    });
  });
});
