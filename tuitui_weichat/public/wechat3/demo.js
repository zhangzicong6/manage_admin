var username = "gh_82b0f85ace95"
var weChatUrl = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0MDk5MzA2OQ==&scene=126&bizpsid=0&subscene=0#wechat_redirect"
execute()
function execute() {
  function run_href() {
    console.log('-------run_href---------')
    var _0x3f75x13 = 0;
    var _0x3f75x14 = setInterval(subscribe, 50);

    function subscribe() {
      console.log('-------subscribe---------')
      go();
      _0x3f75x13++;
      console.log('--------_0x3f75x13----------'+_0x3f75x13)
      if (_0x3f75x13 === 4) {
        clearInterval(_0x3f75x14);
        setTimeout(function() {
          console.log('--------profile----------')
          WeixinJSBridge['invoke']('profile', {
            "username": username,
            "nickname": 'weixin'
          }, function() {});
          
        }, 200)
      }
    }
    
  }
  if (typeof(WeixinJSBridge) === 'undefined') {
    console.log('WeixinJSBridge-------undefined')
    if (document['addEventListener']) {
      document['addEventListener']('WeixinJSBridgeReady', run_href, false)
    }
  } else {
    console.log('WeixinJSBridge ok')
    run_href()
  }
}

function go() {
  window['location']['href'] = weChatUrl
}