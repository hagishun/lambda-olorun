import { Credentials, SimpleSigner } from "uport";
import { createJWT } from "uport/lib/JWT";

class UPortMgr {
  constructor() {
    this.signer = null;
    this.address = null;
    this.credentials = null;
    this.callbackUrl = null;
  }

  isSecretsSet() {
    return (
      this.signer !== null ||
      this.credentials !== null ||
      this.callbackUrl !== null
    );
  }

  setSecrets(secrets) {
    this.signer = SimpleSigner(secrets.SIGNER_KEY);
    this.address = secrets.APP_MNID;
    this.credentials = new Credentials({
      appName: secrets.APP_NAME,
      address: this.address,
      signer: this.signer
    });
    this.callbackUrl = secrets.CALLBACK_URL;
  }

  async requestToken(networkId, callbackParams) {
    if (!networkId) throw "no networkId";
    let requestOpts = {
      notifications: true,
      callbackUrl: this.callbackUrl + "/" + networkId + callbackParams,
      accountType: "devicekey",
      network_id: networkId
    };
    return this.credentials.createRequest(requestOpts);
  }

  async receiveAccessToken(accessToken) {
    if (!this.credentials) throw "no credentials set";
    return this.credentials.receive(accessToken);
  }

  async signJWT(payload) {
    return createJWT({ address: this.address, signer: this.signer }, payload);
  }

  async push(pushToken, pubEncKey, url) {
    return this.credentials.push(pushToken, pubEncKey, { url });
  }
}
module.exports = UPortMgr;
