(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44124438"],{"389c":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit-message"},[i("h2",{staticStyle:{"margin-bottom":"30px","font-size":"30px"}},[t._v(t._s("编辑回复消息"==t.$route.name?"编辑回复消息":"新建回复消息"))]),i("Form",{staticClass:"form-group",attrs:{"label-position":"right","label-width":80}},[i("FormItem",{attrs:{label:"类型",prop:"type"}},[i("RadioGroup",{attrs:{type:"button"},on:{"on-change":t.change},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[i("Radio",{attrs:{label:0}},[t._v("文本")]),i("Radio",{attrs:{label:1}},[t._v("图文")])],1)],1),1==t.type?i("Form",{attrs:{model:t.subForm,"label-position":"right","label-width":80}},[i("FormItem",{attrs:{label:"图片",prop:"picurl"}},[i("Upload",{attrs:{action:"http://test.oorggt.top/reply/upload","show-upload-list":!1,name:"imageFile","on-success":t.handleSuccess}},[i("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("点击上传")]),i("br"),t.imgUrl?i("img",{staticStyle:{"margin-top":"10px"},attrs:{src:t.imgUrl,alt:"",width:"200"}}):t._e()],1)],1),i("FormItem",{attrs:{label:"标题",prop:"title"}},[i("Input",{attrs:{size:"large",type:"text",placeholder:"请输入标题"},model:{value:t.subForm.title,callback:function(e){t.$set(t.subForm,"title",e)},expression:"subForm.title"}})],1),i("FormItem",{attrs:{label:"链接",prop:"url"}},[i("Input",{attrs:{size:"large",type:"text",placeholder:"请输入链接"},model:{value:t.subForm.url,callback:function(e){t.$set(t.subForm,"url",e)},expression:"subForm.url"}})],1),i("FormItem",{attrs:{label:"详细信息",prop:"description"}},[i("Input",{attrs:{size:"large",type:"textarea",placeholder:"请输入详细信息"},model:{value:t.subForm.description,callback:function(e){t.$set(t.subForm,"description",e)},expression:"subForm.description"}})],1),i("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"success"},on:{click:t.addOne}},[t._v("添加")]),i("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"primary"},on:{click:t.saveOne}},[t._v("保存")]),i("FormItem",{attrs:{label:"图文消息"}},[i("Table",{staticClass:"edit-message-table",attrs:{stripe:"",columns:t.editHeader,data:t.editData}})],1)],1):0==t.type?i("FormItem",{attrs:{label:"详细信息",prop:"description"}},[i("Input",{attrs:{size:"large",type:"textarea",placeholder:"请输入详细信息"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1):t._e(),i("FormItem",[i("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"success"},on:{click:t.onSave}},[t._v("保存")]),i("Button",{staticClass:"edit-btn",attrs:{size:"large",type:"warning"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)},a=[],o=(i("7f7f"),{data:function(){var t=this;return{type:0,subForm:{},contents:[],description:"",imgUrl:"",id:"",index:0,editData:[],editHeader:[{key:"title",title:"标题",align:"center"},{key:"picurl",title:"图片",align:"center",render:function(t,e){return t("img",{attrs:{src:e.row.picurl,style:"width:100%;padding:10px;"}})}},{key:"url",title:"链接",align:"center"},{key:"title",title:"详细信息",align:"description",width:100},{title:"Action",align:"center",render:function(e,i){var s=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){s.index=i.index,s.subForm=i.row,s.imgUrl=i.row.picurl}}},"修改"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){"messageUpdate"==s.$route.name&&s.editData.length<=1?s.$Message.info("列表中最少展示一条数据"):(s.editData.splice(i.index,1),s.$Message.info("删除成功"))}}},"删除")])}}]}},mounted:function(){"编辑回复消息"==this.$route.name&&(this.data_info=this.$route.params,this.type=this.data_info.type,this.description=this.data_info.description,this.editData=this.data_info.contents,this.subForm=this.editData[0],this.imgUrl=this.subForm.picurl,this.id=this.data_info._id)},methods:{onSave:function(){var t=this;"messageCreate"==this.$route.name?(""!=this.description?this.contents.push({description:this.description}):this.contents=this.editData,this.$axios.post("/msg/create",{type:this.type,description:this.description,contents:this.contents}).then(function(e){t.reset(),t.$Message.info("创建成功"),window.location.href="/gonghao/message"})):"messageUpdate"==this.$route.name&&(""!=this.description?this.contents.push({description:this.description}):this.contents=this.editData,this.$axios.post("/msg/update",{id:this.id,type:this.type,description:this.description,contents:this.contents}).then(function(e){t.reset(),t.$Message.info("修改成功"),window.location.href="/gonghao/message"}))},addOne:function(){this.subForm.picurl=this.imgUrl,this.editData.push(this.subForm),this.subForm={},this.imgUrl=""},saveOne:function(){this.subForm.picurl=this.imgUrl,this.editData.splice(this.index,1,this.subForm),this.subForm={},this.imgUrl=""},change:function(){this.description="",this.subForm={}},handleSuccess:function(t,e){this.imgUrl="http://test.oorggt.top/uploads/"+t.filename},cancel:function(){this.$router.push({name:"回复消息"}),this.reset()},reset:function(){this.type=0,this.imgUrl=this.description="",this.subForm={},this.editData=[]}}}),n=o,r=(i("b2af"),i("2877")),l=Object(r["a"])(n,s,a,!1,null,"774aad98",null);l.options.__file="editMessage.vue";e["default"]=l.exports},"4c59":function(t,e,i){},b2af:function(t,e,i){"use strict";var s=i("4c59"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-44124438.c4614b3d.js.map