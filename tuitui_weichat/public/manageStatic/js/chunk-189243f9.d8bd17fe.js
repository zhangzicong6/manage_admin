(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-189243f9"],{"3c87":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"novel-transfer"},["小说推广链接"===e.$route.name?t("div",[t("Input",{staticStyle:{width:"400px"},attrs:{size:"large",type:"text",placeholder:"请输入查询链接"},model:{value:e.searchUrl,callback:function(a){e.searchUrl=a},expression:"searchUrl"}}),t("Button",{staticClass:"btn",attrs:{disabled:""===e.searchUrl,type:"success",size:"large"},on:{click:e.search}},[e._v("搜索")]),t("Table",{staticClass:"spread-table",attrs:{columns:e.spreadHeader,data:e.spreadData}})],1):e._e(),t("router-view")],1)},n=[],s=(t("cadf"),t("551c"),t("097d"),{data:function(){var e=this;return{spreadData:[],replaceUrl:"",searchUrl:"",spreadHeader:[{key:"_id",title:"id",align:"center"},{key:"url",title:"url",align:"center"},{key:"replaceUrl",title:"replaceUrl",align:"center"},{title:"Action",align:"center",render:function(a,t){var r=e;return a("div",[a("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){r.$Modal.confirm({render:function(e){return e("Input",{props:{value:r.replaceUrl,autofocus:!0,placeholder:"请输入replaceUrl"},on:{input:function(e){r.replaceUrl=e}}})},onOk:function(){r.$axios.get("/novel_transfer/update",{params:{_id:t.row._id,replaceUrl:r.replaceUrl}}).then(function(e){r.$Message.info(e.data.success)})},onCancel:function(){r.replaceUrl=""}})}}},"修改replaceUrl")])}}]}},mounted:function(){},methods:{showList:function(){var e=this;this.$axios.get("/novel_transfer").then(function(a){e.spreadData=a.data.data})},search:function(){var e=this;this.$axios.get("/novel_transfer/find_one",{params:{searchUrl:this.searchUrl}}).then(function(a){a.data.success?(e.$Message.info(a.data.success),e.spreadData=a.data.data,e.searchUrl=""):e.$Message.info(a.data.error)})}}}),c=s,l=(t("e9b0"),t("2877")),i=Object(l["a"])(c,r,n,!1,null,"685980c8",null);i.options.__file="novelTransfer.vue";a["default"]=i.exports},e86d:function(e,a,t){},e9b0:function(e,a,t){"use strict";var r=t("e86d"),n=t.n(r);n.a}}]);
//# sourceMappingURL=chunk-189243f9.d8bd17fe.js.map