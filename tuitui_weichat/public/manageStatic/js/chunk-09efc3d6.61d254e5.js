(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09efc3d6"],{aacd:function(t,e,n){"use strict";var a=n("dccd"),i=n.n(a);i.a},d7cb:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"menu-setting"},["配置菜单"==t.$route.name?n("div",[n("Button",{staticClass:"create",attrs:{type:"primary",to:"/manage/gonghao/menu/create"}},[t._v("配置新菜单栏")]),n("Table",{staticClass:"menu-table",attrs:{stripe:"",columns:t.menuHeader,data:t.menuData}})],1):t._e(),n("router-view")],1)},i=[],r=(n("7f7f"),{data:function(){var t=this;return{menuList:[],data_info:{},menuData:[],menuHeader:[{title:"菜单类型",align:"center",render:function(t,e){var n=e.row.individual?"个性化菜单":"通用菜单";return t("span",{props:{}},n)}},{title:"菜单性别",align:"center",render:function(t,e){var n=e.row.individual?"0"===e.row.sex?"未知":"1"===e.row.sex?"男":"女":"——";return t("span",{props:{}},n)}},{key:"title",title:"标题",align:"center"},{title:"Action",align:"center",render:function(e,n){var a=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){a.updateOne(n.row)}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){a.deleteOne(n.row)}}},"删除")])}}]}},mounted:function(){this.showMenuList()},methods:{tap:function(t){this.dialogVisible=!0,this.data_info=t},showMenuList:function(){var t=this;this.$axios.get("/menu").then(function(e){t.menuData=e.data.data.reverse()})},updateOne:function(t){this.$router.push({name:"修改菜单",params:t})},deleteOne:function(t){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){e.$axios.get("/menu/del",{params:{id:t._id}}).then(function(t){e.showMenuList(),e.$Message.info(t.data.success)})}})}},watch:{$route:function(t,e){"新建菜单"!=e.name&&"修改菜单"!=e.name||this.showMenuList()}}}),s=r,o=(n("aacd"),n("2877")),u=Object(o["a"])(s,a,i,!1,null,"67857f2a",null);u.options.__file="menuSetting.vue";e["default"]=u.exports},dccd:function(t,e,n){}}]);
//# sourceMappingURL=chunk-09efc3d6.61d254e5.js.map