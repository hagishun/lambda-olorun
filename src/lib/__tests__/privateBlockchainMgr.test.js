jest.mock(
  "../private-blockchains.js",
  () => ({
    "0x99": {
      rpcUrl: "http://0.0.0.0:8545/",
      defaultGasPrice: 30000000000, // 30 Gwei
      uPort: {
        IdentityManager: "0xidmgr",
        MetaIdentityManager: "0xmeta",
        TxRelay: "0xtxrelay"
      },
      threshold: {
        master: 50,
        develop: 50
      }
    },
    default: "0x99"
  }),
  { virtual: true }
);

const PrivateBlockchainMgr = require("../privateBlockchainMgr");

describe("PrivateBlockchainMgr", () => {
  let sut;
  let netId = "0x99";

  beforeAll(() => {
    sut = new PrivateBlockchainMgr();
  });

  test("empty constructor", () => {
    expect(sut).not.toBeUndefined();
  });

  test("getSupportedNetworkIds", done => {
    expect(sut.getSupportedNetworkIds()).toEqual([netId]);
    done();
  });
  test("getDefaultNetworkId", done => {
    expect(sut.getDefaultNetworkId()).toEqual(netId);
    done();
  });

  test("getRpcUrl", done => {
    expect(sut.getRpcUrl(netId)).toEqual("http://0.0.0.0:8545/");
    done();
  });

  test("getSupportedNetworkIds()", done => {
    expect(sut.getSupportedNetworkIds()).toEqual([netId]);
    done();
  });

  test("getThreshold()", done => {
    expect(sut.getThreshold(netId, "develop")).toEqual(50);
    done();
  });

  test("getDefaultGasPrice()", done => {
    expect(sut.getDefaultGasPrice(netId)).toEqual(30000000000);
    done();
  });

  test("getIdentityManagerAddress()", done => {
    expect(sut.getIdentityManagerAddress(netId, "MetaIdentityManager")).toEqual(
      "0xmeta"
    );
    done();
  });

  test("getTxRelayAddress()", done => {
    expect(sut.getTxRelayAddress(netId)).toEqual("0xtxrelay");
    done();
  });
});
