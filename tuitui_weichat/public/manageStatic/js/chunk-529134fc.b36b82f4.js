(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-529134fc"],{1166:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"group-list"},["群发列表"===t.$route.name?a("div",[a("Table",{staticClass:"group-table",attrs:{stripe:"",columns:t.groupHeader,data:t.groupData}})],1):t._e(),a("router-view")],1)},i=[],o=(a("cadf"),a("551c"),a("097d"),{data:function(){var t=this;return{groupData:[],groupHeader:[{key:"code",title:"code",align:"center",width:80},{key:"name",title:"公号名称",align:"center"},{title:"Action",align:"center",render:function(e,a){var n=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){n.$axios.get("/material",{params:{code:a.row.code}}).then(function(t){n.$Message.info(t.data.success)})}}},"同步素材"),e("Button",{style:{marginRight:"10px"},props:{type:"success",size:"small"},on:{click:function(){n.$router.push({name:"发送消息",params:{code:a.row.code}})}}},"群发消息")])}}]}},mounted:function(){this.showDataList()},methods:{showDataList:function(){var t=this;this.$axios.get("/conf").then(function(e){for(var a=e.data.data,n=0;n<a.length;n++)1==a[n].status&&t.groupData.push(a[n])})}}}),s=o,r=(a("9482"),a("2877")),c=Object(r["a"])(s,n,i,!1,null,"411093e8",null);c.options.__file="groupList.vue";e["default"]=c.exports},9482:function(t,e,a){"use strict";var n=a("f1da"),i=a.n(n);i.a},f1da:function(t,e,a){}}]);
//# sourceMappingURL=chunk-529134fc.b36b82f4.js.map