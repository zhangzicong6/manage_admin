(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39b22d8d"],{"0740":function(t,e,a){},"2f21":function(t,e,a){"use strict";var n=a("79e5");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,a){"use strict";var n=a("5ca1"),s=a("d8e8"),i=a("4bf8"),o=a("79e5"),r=[].sort,l=[1,2,3];n(n.P+n.F*(o(function(){l.sort(void 0)})||!o(function(){l.sort(null)})||!a("2f21")(r)),"Array",{sort:function(t){return void 0===t?r.call(i(this)):r.call(i(this),s(t))}})},"5bc5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"show-message"},["消息管理"===t.$route.name?a("div",[a("Button",{staticClass:"create",attrs:{type:"success",size:"large",to:"/manage/msg_view/guanli/create"}},[t._v("添加客服消息")]),a("RadioGroup",{attrs:{type:"button"},on:{"on-change":t.showMessage},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}},[a("Radio",{attrs:{label:"默认"}}),a("Radio",{attrs:{label:"定时时间"}})],1),a("Button",{staticStyle:{float:"right"},attrs:{type:"warning",size:"large"},on:{click:function(e){t.modal=!0}}},[t._v("按时间段删除")]),a("Table",{staticClass:"message-table",attrs:{columns:t.messageHeader,data:t.messageData}}),a("Page",{staticStyle:{"margin-top":"30px"},attrs:{"show-total":"",total:t.dataList.length,"page-size":10},on:{"on-change":t.changePage}}),t.modal?a("div",{staticClass:"modal"},[a("h3",[t._v("请选择删除时间段")]),a("br"),a("DatePicker",{staticStyle:{width:"200px","margin-bottom":"20px"},attrs:{type:"datetime",placeholder:"选择开始时间"},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}}),a("Button",{staticClass:"btn",attrs:{type:"warning"},on:{click:t.modalClose}},[t._v("取消")]),a("Button",{staticClass:"btn",attrs:{type:"success"},on:{click:t.modalSubmit}},[t._v("确定")])],1):t._e()],1):t._e(),a("router-view")],1)},s=[],i=(a("7f7f"),a("55dd"),{data:function(){var t=this;return{sort:"默认",modal:!1,startTime:"",endTime:"",dataList:[],messageData:[],messageHeader:[{key:"type",title:"类型",align:"center",render:function(t,e){var a=(1==e.row.type?"文本":0==e.row.type?"图文":"图片")+(e.row.contents.length>1?"(多)":"");return t("span",{props:{}},a)}},{key:"task",title:"是否延时",align:"center",render:function(t,e){var a=1==e.row.task?"是":"否";return t("span",{props:{}},a)}},{key:"delay",title:"延时时间(分钟)",align:"center",render:function(t,e){var a=1==e.row.task?e.row.delay:"——";return t("span",{props:{}},a)}},{key:"is_timing",title:"是否定时(分钟)",align:"center",render:function(t,e){var a=1==e.row.is_timing?"是":"否";return t("span",{props:{}},a)}},{key:"timing_time",title:"定时时间",align:"center",width:100,render:function(t,e){var a=1==e.row.is_timing?e.row.time:"——";return t("span",{props:{}},a)}},{key:"sex",title:"性别",align:"center",width:100,render:function(t,e){var a="0"==e.row.sex?"未知":"1"==e.row.sex?"男":"2"==e.row.sex?"女":"全部";return t("span",{props:{}},a)}},{key:"title",title:"标题",align:"center",tooltip:!0,render:function(t,e){var a=0!==e.row.contents.length?e.row.contents[0].title:"——";return t("Tooltip",{props:{placement:"top-start",content:a,maxWidth:200}},[t("span",{style:{diaplay:"inline-block",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",wordBreak:"break-all"}},a)])}},{key:"description",title:"详细信息",align:"center",tooltip:!0,width:90,render:function(t,e){var a=0!==e.row.contents.length?e.row.contents[0].description:"——";return t("Tooltip",{props:{placement:"top-start",content:a,maxWidth:200}},[t("span",{style:{diaplay:"inline-block",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",wordBreak:"break-all"}},a)])}},{key:"url",title:"链接",align:"center",tooltip:!0,render:function(t,e){var a=0!==e.row.contents.length?e.row.contents[0].url:"——";return t("Tooltip",{props:{placement:"top-start",content:a,maxWidth:200}},[t("span",{style:{diaplay:"inline-block",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",wordBreak:"break-all"}},a)])}},{key:"img",title:"图片",width:160,align:"center",render:function(t,e){return t("img",{attrs:{src:e.row.img,style:"width: 100%; padding: 10px;"}})}},{title:"Action",align:"center",width:250,render:function(e,a){var n=t;return e("div",[e("Button",{style:{marginRight:"10px",display:2==a.row.type?"none":"inline-block"},props:{type:"warning",size:"small"},on:{click:function(){n.copyMessage(a.row)}}},"复制"),e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){n.$router.push({name:"修改客服消息",params:a.row})}}},"修改"),e("Button",{style:{marginRight:"10px",display:a.row.task||a.row.is_timing?"none":"inline-block"},props:{type:"success",size:"small"},on:{click:function(){n.sendMessage(a.row)}}},"发送消息"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){n.deleteMessage(a.row)}}},"删除")])}}]}},mounted:function(){this.showMessage()},methods:{copyMessage:function(t){var e=this;this.$axios.post("/message/create",{contents:t.contents,type:t.type,task:t.task,is_timing:t.is_timing,delay:t.delay,timing_time:t.timing_time,codes:t.codes,img:t.img,tagId:t.tagId,sex:t.sex}).then(function(t){if(t.data.success){var a=t.data.data;a.time=e.formatDate(a.timing_time),e.messageData.unshift(a),e.$Message.info(t.data.success)}else e.$Message.info(t.data.err)})},showMessage:function(){var t=this;"默认"===this.sort?this.$axios("/message",{params:{sort:"_id"}}).then(function(e){0!=e.data.messages.length&&(t.dataList=e.data.messages,t.messageData=t.dataList.slice(0,10))}):"定时时间"===this.sort&&this.$axios("/message",{params:{sort:"timing_time"}}).then(function(e){0!=e.data.messages.length&&(t.dataList=e.data.messages,t.messageData=t.dataList.slice(0,10))})},sendMessage:function(t){var e=this;this.$Modal.confirm({title:"提示:",content:"确认发送这条消息吗？",onOk:function(){e.$axios.get("/message/send",{params:{id:t._id,take_over:!0,tagId:t.tagId}}).then(function(t){e.$Message.info(t.data.success)})}})},deleteMessage:function(t){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){e.$axios.get("/message/delete",{params:{id:t._id}}).then(function(t){0==t.data.data?(e.$Message.info("已删除最后一条数据"),e.messageData=[]):(e.$Message.info(t.data.success),e.showMessage())})}})},changePage:function(t){var e=10*(t-1),a=10*t;this.messageData=this.dataList.slice(e,a),this.goTop()},goTop:function(){var t=this;t.timer=setInterval(function(){var e=document.documentElement.scrollTop||document.body.scrollTop,a=Math.floor(-e);document.documentElement.scrollTop=document.body.scrollTop=e+a,t.isTop=!0,0===e&&clearInterval(t.timer)},30)},formatDate:function(t){var e=new Date(t),a=e.getFullYear(),n=e.getMonth()+1,s=e.getDate(),i=e.getHours(),o=e.getMinutes(),r=e.getSeconds(),l=a+"-"+(n<10?"0"+n:n)+"-"+(s<10?"0"+s:s)+" "+(i<10?"0"+i:i)+":"+(o<10?"0"+o:o)+":"+(r<10?"0"+r:r);return l},modalClose:function(){this.modal=!1,this.startTime=this.endTime=""},modalSubmit:function(){var t=this;this.$axios.get("/message/remove",{params:{startTime:+new Date(this.startTime),endTime:+new Date(this.endTime)}}).then(function(e){t.$Message.info(e.data.success),t.modal=!1,t.startTime=t.endTime="",t.$router.go(0)})}},watch:{$route:function(t,e){"添加客服消息"!=e.name&&"修改客服消息"!=e.name||this.showMessage()}}}),o=i,r=(a("b4cd"),a("2877")),l=Object(r["a"])(o,n,s,!1,null,"66100143",null);l.options.__file="manage.vue";e["default"]=l.exports},b4cd:function(t,e,a){"use strict";var n=a("0740"),s=a.n(n);s.a}}]);
//# sourceMappingURL=chunk-39b22d8d.c3421c10.js.map