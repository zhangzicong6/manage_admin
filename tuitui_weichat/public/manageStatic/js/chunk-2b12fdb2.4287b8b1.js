(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b12fdb2"],{"386b":function(t,e,n){var s=n("5ca1"),i=n("79e5"),a=n("be13"),r=/"/g,o=function(t,e,n,s){var i=String(a(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+String(s).replace(r,"&quot;")+'"'),o+">"+i+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(o),s(s.P+s.F*i(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}},"3e05":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-con"},[n("h2",{staticClass:"title"},[t._v("\n    "+t._s("修改推广链接"==t.$route.name?"修改推广链接":"创建推广链接")+"\n  ")]),n("Form",{staticClass:"form-group",attrs:{model:t.form,"label-position":"right","label-width":100}},[n("FormItem",{attrs:{label:"id",prop:"id"}},[n("Input",{staticClass:"inputtxt",attrs:{size:"large",type:"text",placeholder:"请输入id"},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),n("FormItem",{attrs:{label:"标题",prop:"title"}},[n("Input",{staticClass:"inputtxt",attrs:{size:"large",type:"text",placeholder:"请输入标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),n("FormItem",{attrs:{label:"链接",prop:"link"}},[n("Input",{staticClass:"inputtxt",attrs:{size:"large",type:"text",placeholder:"请输入链接"},model:{value:t.link,callback:function(e){t.link=e},expression:"link"}}),n("Button",{staticStyle:{"margin-left":"20px"},attrs:{type:"success",size:"large"},on:{click:t.addOne}},[t._v("添加")])],1),n("FormItem",{attrs:{label:"链接组",prop:"links"}},[n("ul",t._l(t.form.links,function(e,s){return n("li",{key:s},[n("span",[t._v(t._s(e))]),n("Button",{attrs:{type:"error",size:"large"},on:{click:function(e){t.deleteLink(s)}}},[t._v("X")])],1)}))]),n("FormItem",["创建推广链接"==t.$route.name?n("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"primary"},on:{click:t.create}},[t._v("立即创建")]):n("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"primary"},on:{click:t.save}},[t._v("保 存")]),n("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"warning"},on:{click:t.cancel}},[t._v("取 消")])],1)],1)],1)},i=[],a=(n("b54a"),n("7f7f"),n("cadf"),n("551c"),n("097d"),{data:function(){return{form:{links:[]},link:""}},mounted:function(){console.log(this.$route),"修改推广链接"==this.$route.name&&(this.form=this.$route.params.row)},methods:{deleteLink:function(t){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这条内容吗？",onOk:function(){e.form.links.splice(t,1)}})},addOne:function(){""==this.link?this.$Message.info("链接不能为空"):(this.form.links.push(this.link),this.link="")},save:function(){var t=this;this.$axios.post("/transfer/update",this.form).then(function(e){e.data.success?(t.$Message.info(e.data.success),t.$router.push({name:"推广链接",params:{row:t.form,index:t.$route.params.index}}),t.form={links:[]}):t.$Message.info(e.data.err)})},create:function(){var t=this;this.$axios.post("/transfer/create",this.form).then(function(e){e.data.success?(t.$Message.info(e.data.success),t.$router.push({name:"推广链接",params:e.data.data}),t.form={links:[]}):t.$Message.info(e.data.err)})},cancel:function(){this.$router.push({name:"推广链接",params:{state:"cancel"}}),this.form={links:[]}}}}),r=a,o=(n("d324"),n("2877")),l=Object(o["a"])(r,s,i,!1,null,"5db8ee54",null);l.options.__file="editInfo.vue";e["default"]=l.exports},b54a:function(t,e,n){"use strict";n("386b")("link",function(t){return function(e){return t(this,"a","href",e)}})},cb0f:function(t,e,n){},d324:function(t,e,n){"use strict";var s=n("cb0f"),i=n.n(s);i.a}}]);
//# sourceMappingURL=chunk-2b12fdb2.4287b8b1.js.map