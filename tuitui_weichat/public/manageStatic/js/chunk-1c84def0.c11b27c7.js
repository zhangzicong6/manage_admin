(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c84def0"],{a0ad:function(t,e,n){"use strict";var s=n("ea2b"),a=n.n(s);a.a},ce3d:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message"},["回复消息"===t.$route.name?n("div",[n("Button",{staticClass:"create",attrs:{type:"primary",to:"/manage/gonghao/message/create"}},[t._v("添加新消息")]),n("Table",{staticClass:"message-table",attrs:{stripe:"",columns:t.msgHeader,data:t.msgData}})],1):t._e(),n("router-view")],1)},a=[],r=(n("cadf"),n("551c"),n("097d"),{data:function(){var t=this;return{msgData:[],msgHeader:[{key:"msgId",title:"msgId",align:"center"},{key:"type",title:"类型",align:"center",render:function(t,e){var n=0==e.row.type?"文本消息":"图文消息";return t("span",{props:{}},n)}},{title:"标题",align:"center",render:function(t,e){var n=e.row.contents[0].title;return t("span",{props:{}},n)}},{title:"详细信息",align:"center",render:function(t,e){var n=e.row.contents[0].description;return t("span",{props:{}},n)}},{title:"链接",align:"center",render:function(t,e){var n=e.row.contents[0].url;return t("span",{props:{}},n)}},{title:"图片",align:"center",render:function(t,e){return t("img",{attrs:{src:e.row.contents[0].picurl,style:"width:100%;padding:10px;"}})}},{title:"Action",align:"center",width:200,render:function(e,n){var s=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"warning",size:"small"},on:{click:function(){s.$axios.post("/msg/create",{contents:n.row.contents,type:n.row.type,description:n.row.description}).then(function(t){s.showMessage()})}}},"复制"),e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){s.$router.push({name:"编辑回复消息",params:n.row})}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){s.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){s.$axios.get("/msg/del",{params:{id:n.row._id}}).then(function(t){s.$Message.info(t.data.success),s.showMessage(),s.msgData.splice(n.index,1)})}})}}},"删除")])}}]}},mounted:function(){this.showMessage()},methods:{showMessage:function(){var t=this;this.$axios.get("/msg").then(function(e){0!=e.data.data.length&&(t.msgData=e.data.data)})}}}),i=r,o=(n("a0ad"),n("2877")),c=Object(o["a"])(i,s,a,!1,null,"7bd02e15",null);c.options.__file="message.vue";e["default"]=c.exports},ea2b:function(t,e,n){}}]);
//# sourceMappingURL=chunk-1c84def0.c11b27c7.js.map