const UPortClient = require("uport-client").UPortClient;
const deploy = require("uport-client").deploy;
const chains = require("./private-blockchains");
const fs = require("fs");
const Promise = require("bluebird");

let jsonContent = {};

Promise.all(Object.values(chains).map(net => deployContracts(net)))
  .then(values => {
    for (let i = 0; i < values.length; i++) {
      jsonContent[Object.keys(chains)[i]] = values[i];
    }
    return jsonContent;
  })
  .then(content => {
    writeFile(content);
  });

function deployContracts(network) {
  const uportClient = new UPortClient(network);
  uportClient.initKeys();

  network["uPort"] = {};
  return deploy(network.rpcUrl)
    .then(contracts => {
      console.log("uPort contracts deployed!");
      Object.keys(contracts).forEach(key => {
        network["uPort"][key] = contracts[key];
      });
      return network;
    })
    .catch(err => {
      console.log("error deploying contracts", err);
    });
}

function writeFile(content) {
  fs.writeFile(
    "./src/lib/private-blockchains.js",
    "module.exports = " + JSON.stringify(content),
    "utf8",
    function(err) {
      if (err) {
        console.log("Error updating private blockchains file", err);
        return console.log(err);
      }
      console.log("Private blockchains file updated");
    }
  );
}
