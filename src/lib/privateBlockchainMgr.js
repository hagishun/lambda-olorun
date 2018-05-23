import privateBlockchains from "./private-blockchains";

const DEFAULT_GAS_PRICE = 20000000000; // 20 Gwei

class privateBlockchainMgr {
  constructor() {}

  getSupportedNetworkIds() {
    let networkIds = [];
    for (const networkId in privateBlockchains) {
      if (networkId != "default") networkIds.push(networkId);
    }
    return networkIds;
  }

  getDefaultNetworkId() {
    return privateBlockchains.default;
  }

  getRpcUrl(networkId) {
    return privateBlockchains[networkId].rpcUrl;
  }

  getThreshold(networkId, stage) {
    return privateBlockchains[networkId].threshold[stage];
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

  getTxRelayAddress(networkId) {
    return privateBlockchains[networkId].uPort.TxRelay;
  }
}
module.exports = privateBlockchainMgr;
