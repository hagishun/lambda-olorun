module.exports = {
    0x3039: {
        rpcUrl: 'http://104.214.116.254:8545/',
        defaultGasPrice: 20000000000, // 20 Gwei
        uPort: {
            IdentityManager: '0xb8a00506e12d39522cd1787389ae8f83db536e46',
            MetaIdentityManager: '0xd7dc3926bc6089a5be4815215ceaa6e707591023',
            TxRelay: '0x6a841ba0ea1a88cfbc085220fc6b65973afca431'
        } 
    },
    0x1552DED547:{
        rpcUrl: 'http://35.176.19.89:22000',
        defaultGasPrice: 20000000000, // 20 Gwei
        uPort: {
            IdentityManager: '0x0',
            MetaIdentityManager: '0x0',
            TxRelay: '0x0'
        }
    },
    default: '0x3039'
}
  