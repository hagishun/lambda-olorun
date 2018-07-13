---
title: "Private Chain Support"
index: 5
category: "guides"
type: "content"
source: "https://github.com/uport-project/lambda-olorun/blob/master/README.md"
---

# lambda-olorun

_[Olorun](https://en.wikipedia.org/wiki/Olorun) (Yoruba: Ọlọrun or Ọlọhun), literally the ruler of (or in) the Heavens, is the name given to one of the three manifestations of the Supreme God in the Yoruba pantheon. Olorun is the owner of the heavens and, in this manifestation, is associated with the Sun._

[![CircleCI](https://circleci.com/gh/uport-project/lambda-olorun.svg?style=svg)](https://circleci.com/gh/uport-project/lambda-olorun)

[![codecov](https://codecov.io/gh/uport-project/lambda-olorun/branch/master/graph/badge.svg)](https://codecov.io/gh/uport-project/lambda-olorun)

_**WARNING**: This microservice is in an experimental alpha stage and is not thoroughly tested. Also we are doing some heavy changes. Use at your own risk. Pull requests are welcome!_


lambda-olorun consists of a private chain onobarding service for the uPort platform. The purpose of the service is to allow uPort users to create an identity on a private chain. The identity contracts needs to be deployed on the private network and the service configured to use it.

The onboarding process for a uPort user using olorun is the following:
1. Olorun create selective disclosure, requesting the `deviceKey` of the user
2. The selective disclosure request is sent to the user (normally a QR code is presented to the user)
3. uPort user approves the disclosure of his `deviceKey` and it is sent to Olorun
4. Olorun creates am identity for the user on private network and returns the identity and the network parameters to the uPort user.

## Setting a new private chain

There are two ways to use Olorun. First one is to configure uPort-hosted service with a new private chain. The second one is to run your own instance of Olorun with your private network configured.

For either way, the uPort identity contracts needs to be deployed on the private network.

### Deploy uPort Identity Contracts

We are working on way for Olorun to deploy the contracts in case they are not deployed on the private network (see issue [#4](https://github.com/uport-project/lambda-olorun/issues/4)). Meanwhile to deploy the contracts you need to do the followin:

1. Clone the [uport-identity](https://github.com/uport-project/uport-identity) repo.
2. Edit the `truffle.js` file to add your private chain rpc endpoint
3. Run `npm install` to install truffle and other project dependencies.
4. Run `npm run _deploy <network name>` to deploy the contracts on your private network
5. Check that the contracts are deployed in your private chain on the corresponding address. Write down the address of the contracts, you will need it later.

### Configure Olorun hosted service for a new private chain

The uPort team runs an instance of the Olorun service at `api.uport.me/olorun` (a test one at `api.uport.space/olorun`), you can configure this service for your own private chain. To add your private chain you need the following information:

- JSON-RPC public endpoint for your private chain. Something like `http://private.chain:8545/`
- NetworkId of your private chain. You can get it with: `curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' http://private.chain:8545/`
- Deploy address of the following contracts: `IdentityManager`, `MetaIdentityManager` and `TxRelay`

To configure the service you need to create a Pull Request with the following files changed

- `src/lib/networks.js` : with a new network name, netowork id and JSON-RPC endpoint
- `src/lib/private-uport-contracts.js`: wiht the network name and contract addresses.

After your PR is reviewed the uPort users can onboard to your private chain using the hosted service.

### Run your own Olorun
To run your own version, you need to have the [Serverless Framework](https://serverless.com/) installed.
Then you need to configure your olorun with your network parameters (see above section). Finally to deploy your olorun you can do it with

```
sls deploy
```

## Contributing

The build leverages the serverless framework provided by AWS Lambda. AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running.)
