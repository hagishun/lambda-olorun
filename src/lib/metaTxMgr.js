import { TxRelay } from "uport-identity";
import Contract from "truffle-contract";
import { signers } from "eth-signer";

let txRelayArtifact = TxRelay.v2;
const TxRelaySigner = signers.TxRelaySigner;

class MetaTxMgr {
  constructor(ethereumMgr, blockchainMgr) {
    this.txRelayers = {};
    this.ethereumMgr = ethereumMgr;
    this.blockchainMgr = blockchainMgr;
  }

  async initTxRelayer(networkId) {
    if (!networkId) throw "no networkId";
    if (!this.txRelayers[networkId]) {
      let abi = txRelayArtifact.abi;

      let txRelayAddr = blockchainMgr.getTxRelayAddress(networkId, managerType);
      let txRelayContract = this.ethereumMgr.getContract(abi, networkId);
      this.txRelayers[networkId] = txRelayContract.at(txRelayAddr);
    }
  }

  async getRelayerAddress(networkId) {
    await this.initTxRelayer(networkId);
    return this.txRelayers[networkId].address;
  }

  async getRelayNonce(address, networkId) {
    if (!address) throw "no address";
    await this.initTxRelayer(networkId);
    let nonce = await this.txRelayers[networkId].getNonce(address);
    console.log("network nonce: " + nonce);
    console.log(typeof nonce);
    return nonce.toString(16);
  }

  async isMetaSignatureValid({ metaSignedTx, networkId, metaNonce }) {
    if (!metaSignedTx) throw "no metaSignedTx";
    if (!networkId) throw "no networkId";
    const decodedTx = TxRelaySigner.decodeMetaTx(metaSignedTx);
    const relayerAddress = await this.getRelayerAddress(networkId);
    let nonce = await this.getRelayNonce(decodedTx.claimedAddress, networkId);
    if (metaNonce !== undefined && metaNonce > nonce) {
      nonce = metaNonce.toString();
    }
    console.log("chosen nonce: " + nonce);
    const validMetaSig = TxRelaySigner.isMetaSignatureValid(
      relayerAddress,
      decodedTx,
      nonce
    );
    return validMetaSig;
  }

  async decodeMetaTx(metaSignedTx) {
    if (!metaSignedTx) throw "no metaSignedTx";
    return TxRelaySigner.decodeMetaTx(metaSignedTx);
  }
}
module.exports = MetaTxMgr;
