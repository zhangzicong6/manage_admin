(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-657836d0"],{"49ad":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"menu-setting"},["配置定时菜单"==t.$route.name?n("div",[n("Button",{staticClass:"create",attrs:{type:"primary",to:"/manage/gonghao/timingMenu/create"}},[t._v("配置新菜单栏")]),n("Table",{staticClass:"menu-table",attrs:{stripe:"",columns:t.menuHeader,data:t.menuData}})],1):t._e(),n("router-view")],1)},i=[],o=(n("7f7f"),n("bc3a"),{data:function(){var t=this;return{menuData:[],menuHeader:[{key:"title",title:"标题",align:"center"},{key:"time",title:"时间",align:"center"},{title:"Action",align:"center",render:function(e,n){var a=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){a.updateOne(n.row)}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){a.deleteOne(n.row)}}},"删除")])}}]}},mounted:function(){this.showMenuList()},methods:{showMenuList:function(){var t=this;this.$axios.get("/menuTime").then(function(e){for(var n=0;n<e.data.data.length;n++){var a=e.data.data[n].time;a=t.formatDate(a),e.data.data[n].time=a}t.menuData=e.data.data})},updateOne:function(t){this.$router.push({name:"修改定时菜单",params:t})},deleteOne:function(t){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){e.$axios.get("/menuTime/del",{params:{id:t._id}}).then(function(t){e.showMenuList(),e.$Message.info(t.data.success)})}})},formatDate:function(t){var e=new Date(t),n=e.getFullYear(),a=e.getMonth()+1,i=e.getDate(),o=e.getHours(),s=e.getMinutes(),r=e.getSeconds(),u=n+"-"+(a<10?"0"+a:a)+"-"+(i<10?"0"+i:i)+" "+(o<10?"0"+o:o)+":"+(s<10?"0"+s:s)+":"+(r<10?"0"+r:r);return u}},watch:{$route:function(t,e){"新建定时菜单"!=e.name&&"修改定时菜单"!=e.name||this.showMenuList()}}}),s=o,r=(n("9a34"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,"38c83dec",null);u.options.__file="timingMenu.vue";e["default"]=u.exports},"9a34":function(t,e,n){"use strict";var a=n("e31c"),i=n.n(a);i.a},e31c:function(t,e,n){}}]);
//# sourceMappingURL=chunk-657836d0.a6a75e00.js.map