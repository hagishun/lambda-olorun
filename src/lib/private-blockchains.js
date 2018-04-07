module.exports = {
    "0x3039": {
        rpcUrl: 'http://104.214.116.254:8545/',
        defaultGasPrice: 20000000000, // 20 Gwei
        uPort: {
            IdentityManager: '0xb8a00506e12d39522cd1787389ae8f83db536e46',
            MetaIdentityManager: '0xd7dc3926bc6089a5be4815215ceaa6e707591023',
            TxRelay: '0x6a841ba0ea1a88cfbc085220fc6b65973afca431'
        },
        threshold: {
            master: 50,
            develop: 50
        } 
    },
    "0x1552DED547":{
        rpcUrl: 'http://35.176.19.89:22000',
        defaultGasPrice: 20000000000, // 20 Gwei
        uPort: {
            IdentityManager: '0x47d224f31f693c1efd717dc86f3e6ca5af532e9b',
            MetaIdentityManager: '0xa8c8337c3deba6d8f96a3efd1ccd00250a34b14e',
            TxRelay: '0xe8294a32046afc953132c04075c6e784308f54a2'
        },
        threshold: {
            master: 0,
            develop: 0
        } 
    },
    default: "0x3039"
}
  