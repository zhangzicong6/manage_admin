(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eec68abe"],{"0c1d":function(t,a,e){"use strict";var n=e("9c3d"),s=e.n(n);s.a},"9c3d":function(t,a,e){},d13c:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"random-links"},["推广链接"===t.$route.name?e("div",[e("Button",{staticClass:"create",attrs:{type:"success",size:"large",to:"/manage/links/spread/create"}},[t._v("添加新链接")]),e("RadioGroup",{staticClass:"tuiguang-tag",attrs:{type:"button"},on:{"on-change":t.showDataList},model:{value:t.tuiguangTag,callback:function(a){t.tuiguangTag=a},expression:"tuiguangTag"}},[e("Radio",{attrs:{label:"全部"}}),t._l(t.tagList,function(t,a){return e("Radio",{attrs:{label:t.name}})})],2),e("Table",{staticClass:"spread-table",attrs:{columns:t.spreadHeader,data:t.spreadData}}),e("Page",{attrs:{"show-total":"",total:t.dataList.length,"page-size":10},on:{"on-change":t.changePage}})],1):t._e(),e("router-view")],1)},s=[],i=(e("7f7f"),{data:function(){var t=this;return{spreadData:[],isShow:!1,isUpdate:!1,dataList:[],domain_names:[],spreadHeader:[{title:"链接",align:"center",render:function(t,a){var e="http://t.jswoge.top/transfer/"+a.row.id;return t("a",{attrs:{href:e,target:"_blank"}},e)}},{key:"group",title:"分组",align:"center",width:120},{key:"title",title:"标题",align:"center"},{key:"remarks",title:"备注",align:"center"},{title:"数据",align:"center",render:function(t,a){var e="http://n.jtjsmp.top/tuiguang/data?tid="+a.row.id;return t("Button",{props:{type:"primary",size:"small"},on:{click:function(){window.open(e)}}},"查看数据")}},{title:"Action",align:"center",render:function(a,e){var n=t;return a("div",[a("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){n.$router.push({name:"修改推广链接",params:{row:e.row,index:e.index}})}}},"修改"),a("Button",{style:{marginRight:"10px"},props:{type:"error",size:"small"},on:{click:function(){n.deleteOne(e.row,e.index)}}},"删除"),a("Button",{props:{type:"warning",size:"small"},on:{click:function(){n.copy(e.row)}}},"复制")])}}],tuiguangTag:"全部",tagList:[]}},mounted:function(){this.showDataList(),this.showTagList()},methods:{showTagList:function(){var t=this;this.$axios.get("/tuiguangTag").then(function(a){t.tagList=a.data.data})},showDataList:function(){var t=this;this.$axios.get("/transfer").then(function(a){var e=a.data.messages;if(t.domain_names=a.data.domain_names,"全部"===t.tuiguangTag)t.dataList=e;else{t.dataList=[];for(var n=0;n<e.length;n++)t.tuiguangTag===e[n].group&&t.dataList.push(e[n])}t.spreadData=t.dataList.slice(0,10)})},copy:function(t){var a=this;t.id+="_copy",this.$axios.post("/transfer/create",t).then(function(t){t.data.success?(a.$Message.info("复制成功"),a.spreadData.unshift(t.data.data)):a.$Message.info(t.data.err)})},deleteOne:function(t,a){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){e.$axios.get("/transfer/delete",{params:{id:t._id}}).then(function(t){e.$Message.info(t.data.success),e.spreadData.splice(a,1)})}})},changePage:function(t){var a=10*(t-1),e=10*t;this.spreadData=this.dataList.slice(a,e),this.goTop()},goTop:function(){var t=this;t.timer=setInterval(function(){var a=document.documentElement.scrollTop||document.body.scrollTop,e=Math.floor(-a);document.documentElement.scrollTop=document.body.scrollTop=a+e,t.isTop=!0,0===a&&clearInterval(t.timer)},30)}},watch:{$route:function(t,a){"cancel"!=this.$route.params.state&&("创建推广链接"==a.name?this.spreadData.unshift(this.$route.params):"修改推广链接"==a.name&&this.spreadData.splice(this.$route.params.index,1,this.$route.params.row))}}}),o=i,r=(e("0c1d"),e("2877")),c=Object(r["a"])(o,n,s,!1,null,"5a06b886",null);c.options.__file="randomLinks.vue";a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-eec68abe.fea20508.js.map