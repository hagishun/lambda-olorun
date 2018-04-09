const UPortMgr = require("../uPortMgr");

describe("UPortmgr", () => {
  let sut;

  beforeAll(() => {
    sut = new UPortMgr();
  });

  test("empty constructor", () => {
    expect(sut).not.toBeUndefined();
  });

  test("is isSecretsSet", () => {
    let secretSet = sut.isSecretsSet();
    expect(secretSet).toEqual(false);
  });

  test("setSecrets", () => {
    expect(sut.isSecretsSet()).toEqual(false);
    sut.setSecrets({
      SIGNER_KEY: "anykey",
      APP_MNID: "fakemnid",
      APP_NAME: "anyname",
      CALLBACK_URL: "http://uport.test"
    });
    expect(sut.isSecretsSet()).toEqual(true);
    expect(sut.address).not.toBeUndefined();
    expect(sut.credentials).not.toBeUndefined();
    expect(sut.signer).not.toBeUndefined();
  });

  test("requestToken() no networkId", () => {
    sut
      .requestToken()
      .then(resp => {
        fail("shouldn't return");
        done();
      })
      .catch(err => {
        expect(err).toEqual("no networkId");
        done();
      });
  });

  test("requestToken() happy path", () => {
    sut.requestToken().then(resp => {
      expect(resp).not.toBeNull();
      done();
    });
  });

  test("receiveAccessToken() no credentials", () => {
    sut.requestToken().then(resp => {
      expect(resp).not.toBeNull();
      done();
    });
  });
});
