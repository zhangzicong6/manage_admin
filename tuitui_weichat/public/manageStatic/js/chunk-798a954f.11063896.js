(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-798a954f"],{"0bfb":function(t,a,e){"use strict";var o=e("cb7c");t.exports=function(){var t=o(this),a="";return t.global&&(a+="g"),t.ignoreCase&&(a+="i"),t.multiline&&(a+="m"),t.unicode&&(a+="u"),t.sticky&&(a+="y"),a}},3846:function(t,a,e){e("9e1e")&&"g"!=/./g.flags&&e("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:e("0bfb")})},"6b54":function(t,a,e){"use strict";e("3846");var o=e("cb7c"),n=e("0bfb"),r=e("9e1e"),s="toString",i=/./[s],l=function(t){e("2aba")(RegExp.prototype,s,t,!0)};e("79e5")(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?l(function(){var t=o(this);return"/".concat(t.source,"/","flags"in t?t.flags:!r&&t instanceof RegExp?n.call(t):void 0)}):i.name!=s&&l(function(){return i.call(this)})},"6f7b":function(t,a,e){},9065:function(t,a,e){"use strict";var o=e("6f7b"),n=e.n(o);n.a},b20f:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"edit-info"},[e("h2",{staticClass:"title"},[t._v("\n    "+t._s("修改公号"==t.$route.name?"编辑公号信息":"接管新公号")+"\n  ")]),e("Form",{staticClass:"form-group",attrs:{model:t.formData,"label-position":"right","label-width":100}},[e("FormItem",{attrs:{label:"公号名称",prop:"name"}},[e("Input",{attrs:{size:"large",type:"text",placeholder:"请输入公号名称"},model:{value:t.formData.name,callback:function(a){t.$set(t.formData,"name",a)},expression:"formData.name"}})],1),e("FormItem",{attrs:{label:"appid",prop:"appid"}},[e("Input",{attrs:{size:"large",type:"text",placeholder:"请输入appid"},model:{value:t.formData.appid,callback:function(a){t.$set(t.formData,"appid","string"===typeof a?a.trim():a)},expression:"formData.appid"}})],1),e("FormItem",{attrs:{label:"appsecret",prop:"appsecret"}},[e("Input",{attrs:{size:"large",type:"text",placeholder:"请输入appsecret"},model:{value:t.formData.appsecret,callback:function(a){t.$set(t.formData,"appsecret","string"===typeof a?a.trim():a)},expression:"formData.appsecret"}})],1),e("FormItem",{attrs:{label:"token",prop:"token"}},[e("Input",{attrs:{size:"large",type:"text",placeholder:"请输入token"},model:{value:t.formData.token,callback:function(a){t.$set(t.formData,"token",a)},expression:"formData.token"}})],1),e("FormItem",{attrs:{label:"是否实时获取用户信息",prop:"real_time"}},[e("i-switch",{model:{value:t.formData.real_time,callback:function(a){t.$set(t.formData,"real_time",a)},expression:"formData.real_time"}})],1),e("FormItem",{attrs:{label:"是否保存用户",prop:"save_user"}},[e("i-switch",{model:{value:t.formData.save_user,callback:function(a){t.$set(t.formData,"save_user",a)},expression:"formData.save_user"}})],1),e("FormItem",{attrs:{label:"选择标签"}},[t.changeTag?e("Tag",{attrs:{name:t.formData.group,closable:""},on:{"on-close":t.handleClose}},[t._v(t._s(t.formData.group))]):e("Input",{attrs:{size:"large",type:"text",placeholder:"请输入分组名"},on:{"on-blur":t.tagConfirm},model:{value:t.formData.group,callback:function(a){t.$set(t.formData,"group",a)},expression:"formData.group"}})],1),e("FormItem",{attrs:{label:"标签选项"}},t._l(t.tagList,function(a,o){return e("Tag",{attrs:{name:a.name,closable:""},on:{"on-close":function(e){t.deleteTag(a,o)}},nativeOn:{click:function(e){t.select(a)}}},[t._v(t._s(a.name)+"\n      ")])})),e("FormItem",{attrs:{label:"公号属性"}},[e("RadioGroup",{model:{value:t.formData.attribute,callback:function(a){t.$set(t.formData,"attribute",a)},expression:"formData.attribute"}},[e("Radio",{attrs:{label:"0"}},[t._v("默认")]),e("Radio",{attrs:{label:"1"}},[t._v("男")]),e("Radio",{attrs:{label:"2"}},[t._v("女")])],1)],1),e("FormItem",[e("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"primary"},on:{click:t.submitForm}},[t._v("提交")]),e("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"error"},on:{click:t.resetForm}},[t._v("重置")]),e("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"warning"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)},n=[],r=(e("6b54"),e("7f7f"),e("cadf"),e("551c"),e("097d"),{data:function(){return{formData:{token:"mingxingshuo",real_time:!1,save_user:!1,attribute:"0"},tagList:[],changeTag:!1}},mounted:function(){this.showTagList(),"修改公号"===this.$route.name&&(this.formData=this.$route.query,this.formData.attribute=this.formData.attribute.toString())},methods:{cancel:function(){this.$router.push("/manage/gonghao/tuoguan"),this.resetForm()},resetForm:function(){this.formData={token:"mingxingshuo",real_time:!1,save_user:!1,attribute:"0"}},submitForm:function(){var t=this;"/manage/gonghao/tuoguan/create"===this.$route.path?this.$axios.post("/conf/create",this.formData).then(function(a){window.location.href="/manage/gonghao/tuoguan",t.$Message.info("新建成功"),t.resetForm()}):"/manage/gonghao/tuoguan/update"===this.$route.path&&this.$axios.post("/conf/update",this.formData).then(function(a){window.location.href="/manage/gonghao/tuoguan",t.$Message.info("修改成功"),t.resetForm()})},showTagList:function(){var t=this;this.$axios.get("/gonghaoTag").then(function(a){t.tagList=a.data.data})},tagConfirm:function(){var t=this;this.changeTag=!0,this.$axios.post("/gonghaoTag",{name:this.formData.group}).then(function(a){0==a.data.exist&&t.tagList.push(a.data.data)})},handleClose:function(){this.formData.group="",this.changeTag=!1},select:function(t){this.formData.group=t.name,this.changeTag=!0},deleteTag:function(t,a){var e=this;this.$Modal.confirm({title:"提示:",content:"确认删除这个分组吗？",onOk:function(){e.$axios.delete("/gonghaoTag/"+t._id).then(function(t){e.tagList.splice(1,a)})}})}}}),s=r,i=(e("9065"),e("2877")),l=Object(i["a"])(s,o,n,!1,null,"39e43d6c",null);l.options.__file="editInfo.vue";a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-798a954f.11063896.js.map