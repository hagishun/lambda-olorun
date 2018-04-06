
class RequestTokenHandler {
    constructor (uPortMgr,blockchainMgr) {
      this.uPortMgr = uPortMgr
      this.blockchainMgr = blockchainMgr
    }
  
    async handle(event,context, cb) {

      let body;

      if (event && !event.body){
          body = event
      } else if (event && event.body) {
          try {
          body = JSON.parse(event.body)
          } catch (e) {
          cb({ code: 400, message: 'no json body'})
          return;
          }
      } else {
          cb({code: 400, message: 'no json body'})
          return;
      }

      let networkId;
      if (!body.networkId) {
        networkId = this.blockchainMgr.getDefaultNetworkId();
      }else{
        networkId = body.networkId;
      }

      let callerCallback;
      if (body.callback) {
        callerCallback = body.callback;
      }
      const callbackParams='?callback='+callerCallback;

      try{
        let requestToken= await this.uPortMgr.requestToken(networkId,calbackParams);
        let request='me.uport:me?requestToken='+requestToken
        cb(null,request)
      } catch (error){
        console.log("Error on this.uPortMgr.requestToken")
        console.log(error)
        cb({code: 500, message: error.message})
        return;
      } 
    }
  
  }
  
  module.exports = RequestTokenHandler
  