---
title: "Private Chain Support"
index: 0
category: "guides"
type: "content"
---

# lambda-olorun
[![codecov](https://codecov.io/gh/uport-project/lambda-olorun/branch/master/graph/badge.svg)](https://codecov.io/gh/uport-project/lambda-olorun)

Olorun is a microservice to create uPort identities on private networks.

To add a private network identity for an existing uPort user:
1. create selective disclosure on provisioning server
2. send QR with selective disclosure request to the user
3. user signs & sends back to Olorun
4. Olorun creates a profile & identity for the user on private network of choice.

You will need to deploy the [uPort identity contracts](https://github.com/uport-project/uport-identity) on your network, either manually or using our [command line interface](https://github.com/uport-project/uport-cli-client).

WARNING: This microservice is in an experimental alpha stage and is not thoroughly tested. Use at your own risk. Pull requests are welcome!
