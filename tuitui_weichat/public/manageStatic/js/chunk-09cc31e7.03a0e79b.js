(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09cc31e7"],{"17a1":function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"channel"},[t("Input",{staticClass:"inputtxt",attrs:{placeholder:"请输入渠道名称"},model:{value:n.channel,callback:function(e){n.channel="string"===typeof e?e.trim():e},expression:"channel"}}),t("Button",{attrs:{type:"primary"},on:{click:n.createChannel}},[n._v("创建")]),t("Table",{staticStyle:{"margin-top":"30px"},attrs:{columns:n.channelHeader,data:n.channelList}})],1)},i=[],c=(t("7f7f"),t("cadf"),t("551c"),t("097d"),{name:"channel",data:function(){var n=this;return{channel:"",channelList:[],channelHeader:[{key:"id",title:"id",align:"center"},{title:"渠道名称",align:"center",width:500,render:function(e,t){var a=n.index===t.index,i=n;return e("div",[e("span",{style:{display:a?"none":"block"}},t.row.name),e("div",[e("Input",{style:{display:a?"inline-block":"none",width:"300px"},attrs:{value:t.row.name},on:{"on-change":function(n){i.name=n.target.value}}}),e("Button",{style:{display:a?"inline-block":"none",margin:" 0 10px"},props:{type:"primary",size:"small",ref:"channel"},on:{click:function(){i.$Modal.confirm({title:"提示:",content:"确认修改吗？",onOk:function(){i.$axios.put("/channel",{name:i.name||t.row.name,_id:t.row._id}).then(function(n){n.data.success?(i.$Message.success(n.data.success),i.channelList.splice(t.index,1,n.data.data),i.index=-1):i.$Message.info(n.data.err)})}})}}},"提交"),e("Button",{style:{display:a?"inline-block":"none"},props:{type:"warning",size:"small"},on:{click:function(){i.index=-1}}},"取消")])])}},{title:"Action",align:"center",render:function(e,t){var a=n;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){a.index=t.index}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){a.$Modal.confirm({title:"提示:",content:"确认删除吗？",onOk:function(){a.$axios.delete("/channel",{params:{id:t.row._id}}).then(function(n){a.$Message.success(n.data.success),a.channelList.splice(t.index,1)})}})}}},"删除")])}}],index:-1,name:""}},methods:{getChannelList:function(){var n=this;this.$axios.get("/channel").then(function(e){e.data.success&&(n.channelList=e.data.data.reverse())})},createChannel:function(){var n=this;this.channel?this.$Modal.confirm({title:"提示:",content:"确认创建吗？",onOk:function(){n.$axios.post("/channel",{name:n.channel}).then(function(e){e.data.success?(n.$Message.success(e.data.success),n.channelList.unshift(e.data.data),n.channel=""):n.$Message.info(e.data.err)})}}):this.$Message.info("渠道名不能为空")}},mounted:function(){this.getChannelList()}}),s=c,l=(t("8ffa"),t("2877")),o=Object(l["a"])(s,a,i,!1,null,"46d9f53e",null);o.options.__file="channel.vue";e["default"]=o.exports},"8ffa":function(n,e,t){"use strict";var a=t("b26c"),i=t.n(a);i.a},b26c:function(n,e,t){}}]);
//# sourceMappingURL=chunk-09cc31e7.03a0e79b.js.map