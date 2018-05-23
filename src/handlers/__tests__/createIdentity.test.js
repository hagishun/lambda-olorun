const CreateIdentityHandler = require("../createIdentity");

describe("CreateIdentityHandler", () => {
  let sut;
  let access_token = "0xat";
  let deviceKey = "0x8f7a1e41018fbb94caa18281e4d6acfc77521672";
  let txHash =
    "0x6e2fce45a5b97d9c7902f869851824013f6cf00a7c14a30b8158945844d24f21";
  let managerAddress = "0x95f35f87608c3a871838f11cbefa8bd76fdf5686";
  let managerType = "IdentityManager";
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
        managerAddress: managerAddress,
        txHash: txHash
      };
    });
    identityManagerMgrMock.getIdentityFromTxHash.mockImplementation(() => {
      return txHash;
    });
    blockchainMgrMock.getDefaultNetworkId.mockImplementation(() => {
      return "0x99";
    });

    let event = {
      access_token: deviceKey,
      blockchain: null,
      managerType: managerType
    };
    sut.handle(event, {}, (err, res) => {
      expect(err).toBeNull();
      done();
    });
  });
});
