import pack from "../../package";
const Unit = require("ethjs-unit");

class CheckBalancesHandler {
  constructor(ethereumMgr, blockchainMgr, slackMgr) {
    this.ethereumMgr = ethereumMgr;
    this.blockchainMgr = blockchainMgr;
    this.slackMgr = slackMgr;
  }

  async handle(event, context, cb) {
    console.log(event);
    console.log(context);

    const sp = context.functionName.slice(pack.name.length + 1).split("-");
    let stage = sp[0];
    console.log("stage:" + stage);

    let addr = this.ethereumMgr.getAddress();
    console.log("checking addr:" + addr);

    const supportedNetworkIds = this.blockchainMgr.getSupportedNetworkIds();

    for (let i = 0; i < supportedNetworkIds.length; i++) {
      const networkId = supportedNetworkIds[i];
      let balanceWei = await this.ethereumMgr.getBalance(addr, networkId);
      let threshold = this.blockchainMgr.getThreshold(networkId, stage);
      let rpcUrl = this.blockchainMgr.getRpcUrl(networkId);

      console.log(
        "[" +
          networkId +
          "] balance: " +
          balanceWei +
          " threshold: " +
          threshold
      );

      if (balanceWei < threshold) {
        console.log("HEY!!!");

        let thresholdEth = Unit.fromWei(threshold, "ether");
        let balanceEth = Unit.fromWei(balanceWei, "ether");
        let text =
          "Balance for *" +
          pack.name +
          "-" +
          stage +
          "* on " +
          rpcUrl +
          " below threshold!";

        let slackMsg = {
          username: "Balance Checker",
          icon_emoji: ":robot_face:",
          attachments: [
            {
              fallback: text,
              pretext: "<!here|here>: " + text,
              color: "danger",
              fields: [
                {
                  title: "Threshold (Wei)",
                  value: threshold.toString(),
                  short: true
                },
                { title: "Threshold (Eth)", value: thresholdEth, short: true },
                { title: "Balance (Wei)", value: balanceWei, short: true },
                { title: "Balance (Eth)", value: balanceEth, short: true }
              ],
              footer: "Send some :heart: to " + addr
            }
          ]
        };
        //console.log(JSON.stringify(slackMsg))
        this.slackMgr.sendMessage(slackMsg);
      }
    }

    cb(null);
  }
}
module.exports = CheckBalancesHandler;
