const UPortClient = require("uport-client").UPortClient;
const deploy = require("uport-client").deploy;
const private_blockchains = require("./private-blockchains");

for (let network in private_blockchains) {
  if ({}.hasOwnProperty.call(private_blockchains, network)) {
    const uportClient = new UPortClient(network);
    uportClient.initKeys();

    console.log(private_blockchains[network]["rpcUrl"]);

    if (network && network.rpcUrl) {
      deploy(private_blockchains[network]["rpcUrl"]).then(contracts => {
        console.log("contracts deployed!");
        console.log(contracts);
      });
    }
  }
}
