(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-087923de"],{cbee:function(e,t,a){"use strict";var n=a("e589"),s=a.n(n);s.a},d13c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"random-links"},["推广链接"===e.$route.name?a("div",[a("Button",{staticClass:"create",attrs:{type:"success",size:"large",to:"/manage/links/spread/create"}},[e._v("添加新链接")]),a("Table",{staticClass:"spread-table",attrs:{columns:e.spreadHeader,data:e.spreadData}})],1):e._e(),a("router-view")],1)},s=[],r=(a("7f7f"),a("cadf"),a("551c"),a("097d"),{data:function(){var e=this;return{spreadData:[],isShow:!1,isUpdate:!1,domain_names:[],spreadHeader:[{title:"链接",align:"center",render:function(e,t){var a="http://erji.nyzda.top/transfer/"+t.row.id;return e("span",{props:{}},a)}},{key:"title",title:"标题",align:"center"},{title:"Action",align:"center",render:function(t,a){var n=e;return t("div",[t("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){n.$router.push({name:"修改推广链接",params:{row:a.row,index:a.index}})}}},"修改"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){n.deleteOne(a.row,a.index)}}},"删除")])}}]}},mounted:function(){this.showList()},methods:{deleteOne:function(e,t){var a=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){a.$axios.get("/transfer/delete",{params:{id:e._id}}).then(function(e){a.$Message.info(e.data.success),a.spreadData.splice(t,1)})}})},showList:function(){var e=this;this.$axios.get("/transfer").then(function(t){e.spreadData=t.data.messages.reverse(),e.domain_names=t.data.domain_names})}},watch:{$route:function(e,t){"cancel"!=this.$route.params.state&&("创建推广链接"==t.name?this.spreadData.push(this.$route.params):"修改推广链接"==t.name&&this.spreadData.splice(this.$route.params.index,1,this.$route.params.row))}}}),i=r,o=(a("cbee"),a("2877")),c=Object(o["a"])(i,n,s,!1,null,"7b66d7b4",null);c.options.__file="randomLinks.vue";t["default"]=c.exports},e589:function(e,t,a){}}]);
//# sourceMappingURL=chunk-087923de.e24e6026.js.map