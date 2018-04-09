jest.mock(
  "../private-blockchains.js",
  () => ({
    99: {
      rpcUrl: "http://0.0.0.0:8545/",
      defaultGasPrice: 20000000000, // 20 Gwei
      uPort: {
        IdentityManager: "0xidmgr",
        MetaIdentityManager: "0xmeta",
        TxRelay: "0xtxtrelay"
      }
    },
    default: 99
  }),
  { virtual: true }
);

const PrivateBlockchainMgr = require("../privateBlockchainMgr");

describe("PrivateBlockchainMgr", () => {
  let sut;

  beforeAll(() => {
    sut = new PrivateBlockchainMgr();
  });

  test("empty constructor", () => {
    expect(sut).not.toBeUndefined();
  });

  test("getSupportedNetworkIds()", () => {
    expect(sut.getSupportedNetworkIds()).toEqual(["99", "default"]);
  });
});
