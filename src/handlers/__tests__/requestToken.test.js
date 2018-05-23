const RequestTokenHandler = require("../requestToken");

describe("RequestTokenHandler", () => {
  let sut;
  let access_token = "0xat";
  let deviceKey = "0xdeviceKey";
  let recoveryKey = "0xrecoveryKey";
  let uportMgrMock = { requestToken: jest.fn() };
  let blockchainMgrMock = {
    getDefaultNetworkId: jest.fn()
  };

  beforeAll(() => {
    sut = new RequestTokenHandler(uportMgrMock, blockchainMgrMock);
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

  test("happy path", done => {
    uportMgrMock.requestToken.mockImplementation(() => {
      return "token";
    });
    let event = {
      callback: "fakecallback"
    };
    sut.handle(event, {}, (err, request) => {
      expect(err).toBeNull();
      expect(request).toEqual("me.uport:me?requestToken=token");
      done();
    });
  });
});
