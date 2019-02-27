var username = "gh_82b0f85ace95"
var weChatUrl = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0MDk5MzA2OQ==&scene=126&bizpsid=0&subscene=0#wechat_redirect"
//execute()
function execute() {
  window['location']['href'] = weChatUrl
  setTimeout(function() {
      console.log('--------profile----------')
      WeixinJSBridge['invoke']('profile', {
        "username": username,
        "nickname": 'weixin'
      }, function() {});   
    }, 300)
}

function go() {
  execute()
  return
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if(isiOS){
    execute()
  }else{
    window['location']['href'] = weChatUrl
  }
}

/*window.addEventListener('pagehide', function() {
      WeixinJSBridge['invoke']('profile', {
            "username": username,
            "nickname": 'weixin'
      }, function() {});
})*/

if (typeof(WeixinJSBridge) === 'undefined') {
    console.log('WeixinJSBridge-------undefined')
    if (document['addEventListener']) {
      document['addEventListener']('WeixinJSBridgeReady', go, false)
    }
  } else {
    console.log('WeixinJSBridge ok')
    go()
  }
