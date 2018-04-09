import privateBlockchains from "./private-blockchains";

const DEFAULT_GAS_PRICE = 20000000000; // 20 Gwei

class privateBlockchainMgr {
  constructor() {}

  getSupportedNetworkIds() {
    console.log("private blockchains", privateBlockchains);
    let networkIds = [];
    for (const networkId in privateBlockchains) {
      console.log("networkId", networkId);
      networkIds.push(networkId);
    }
    return networkIds;
  }

  getDefaultNetworkId() {
    privateBlockchains.default;
  }

  getRpcUrl(networkId) {
    privateBlockchains[networkId].rpcUrl;
  }

  getDefaultGasPrice(networkId) {
    if (!privateBlockchains[networkId].defaultGasPrice) {
      return DEFAULT_GAS_PRICE;
    } else {
      return privateBlockchains[networkId].defaultGasPrice;
    }
  }

  getIdentityManagerAddress(networkId, managerType) {
    return privateBlockchains[networkId].uPort[managerType];
  }
}
module.exports = privateBlockchainMgr;
