const UPortClient = require("uport-client").UPortClient;
const deploy = require("uport-client").deploy;
const chains = require("./private-blockchains");
const fs = require("fs");

let jsonContent = {};
for (let network in chains) {
  if ({}.hasOwnProperty.call(chains, network)) {
    const uportClient = new UPortClient(network);
    uportClient.initKeys();

    if (chains[network] && chains[network]["rpcUrl"]) {
      deploy(chains[network]["rpcUrl"])
        .then(contracts => {
          chains[network]["uPort"]["IdentityManager"] =
            contracts.IdentityManager;
          chains[network]["uPort"]["MetaIdentityManager"] =
            contracts.MetaIdentityManager;
          chains[network]["uPort"]["TxRelay"] = contracts.TxRelay;
          console.log("contracts deployed!");
        })
        .catch(err => {
          console.log("error deploying contracts", err);
        });
      jsonContent[network] = chains[network];
    }
  }
}

fs.writeFile(
  "./src/lib/private-blockchains.js",
  "module.exports = " + JSON.stringify(jsonContent),
  "utf8",
  function(err) {
    if (err) {
      console.log("Error updating private blockchains file", err);
      return console.log(err);
    }
    console.log("Private blockchains file updated");
  }
);
