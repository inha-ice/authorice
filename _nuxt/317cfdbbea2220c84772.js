(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{176:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){"use strict";var r=n(176);n.n(r).a},179:function(e,t,n){"use strict";var r=n(177);n.n(r).a},180:function(e,t,n){"use strict";var r={name:"Logo",props:{color:{type:String,default:"#181924"},size:{type:String,default:"96px"}}},l=n(20),component=Object(l.a)(r,(function(e,t){var n=t._c;return n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 192 192",width:t.props.size}},[n("symbol",{attrs:{id:"piece",viewBox:"0 0 80 80"}},[n("path",{attrs:{fill:t.props.color,d:"M13 47.5L0 40l47.6-27.5v15z"}}),t._v(" "),n("path",{attrs:{fill:t.props.color,d:"M13 47.5L0 40l47.6-27.5v15z",transform:"rotate(240 46.2 40)"}}),t._v(" "),n("path",{attrs:{fill:"none",stroke:t.props.color,"stroke-width":"4",d:"M80 0v80z"}})]),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",href:"#piece"}}),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",transform:"rotate(60 96 96)",href:"#piece"}}),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",transform:"rotate(120 96 96)",href:"#piece"}}),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",transform:"rotate(180 96 96)",href:"#piece"}}),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",transform:"rotate(240 96 96)",href:"#piece"}}),t._v(" "),n("use",{attrs:{width:"72",height:"72",x:"106",y:"56",transform:"rotate(300 96 96)",href:"#piece"}})])}),[],!0,null,null,null);t.a=component.exports},181:function(e,t,n){"use strict";var r={name:"OutlineButton",methods:{click:function(e){this.$emit("click",e)}}},l=(n(178),n(20)),component=Object(l.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("button",{staticClass:"button",on:{click:this.click}},[this._t("default")],2)}),[],!1,null,"0c9c6fce",null);t.a=component.exports},182:function(e,t,n){"use strict";var r={name:"TextField",props:{disabled:{type:Boolean,default:!1},label:{type:String,default:""},name:{type:String,required:!0},placeholder:{type:String,default:""},required:{type:Boolean,default:!1},type:{type:String,default:"text"},value:{type:String,default:""}},methods:{input:function(e){this.$emit("input",e.target.value)}}},l=(n(179),n(20)),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"input"},[n("label",{staticClass:"input__label",attrs:{for:"signup-name"}},[e._v("\n    "+e._s(e.label)+"\n    "),e.required?n("span",{staticClass:"input__required",attrs:{title:"필수"}},[e._v("*")]):e._e()]),e._v(" "),n("input",{staticClass:"input__text",attrs:{name:e.name,type:e.type,placeholder:e.placeholder,disabled:e.disabled},domProps:{value:e.value},on:{input:e.input}})])}),[],!1,null,"77f1e74b",null);t.a=component.exports},183:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return f})),n.d(t,"d",(function(){return h})),n.d(t,"e",(function(){return m}));n(57);var r=/^\d{8}$/,l=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,o=/^\d{2,3}-\d{3,4}-\d{4}$/,c=function(text){return l.test(text)&&text.length<=200},d=function(text){return o.test(text)},f=function(text){return r.test(text)},h=function(text){return"string"==typeof text&&text.length>=1&&text.length<=50},m=function(text){return"string"==typeof text&&text.length>=4&&text.length<=200}},184:function(e,t,n){},188:function(e,t,n){"use strict";var r=n(184);n.n(r).a},201:function(e,t,n){"use strict";n.r(t);n(21),n(14),n(58),n(56),n(17);var r=n(2),l=n(57),o=n(180),c=n(181),d=n(182),f=n(41),h=n(183),m={middleware:"auth",components:{Logo:o.a,OutlineButton:c.a,TextField:d.a},asyncData:function(e){var t=e.$axios,n=e.redirect;return Object(r.a)(regeneratorRuntime.mark((function e(){var r,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.setToken(Object(f.getToken)(),"Bearer"),e.prev=1,e.next=4,t.$get("/auth/me");case 4:return r=e.sent,l=r.user,e.abrupt("return",{profile:{id:String(l.id),name:l.name,nameEnglish:l.nameEnglish,level:l.level,email:l.email,phone:l.phone,picture:l.picture,passwordOld:"",passwordNew:"",passwordNewRepeat:""},profileReadOnly:{id:String(l.id),name:l.name,nameEnglish:l.nameEnglish,level:l.level,email:l.email,phone:l.phone,picture:l.picture}});case 9:e.prev=9,e.t0=e.catch(1),Object(f.removeToken)(),n("/");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))()},computed:{isManager:function(){return this.profile.level&(l.a.ADMIN|l.a.OWNER)}},methods:{changePassword:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$axios,!((r=e.profile).passwordOld&&Object(h.e)(r.passwordOld)&&r.passwordNew&&Object(h.e)(r.passwordNew)&&r.passwordNew===r.passwordNewRepeat)){t.next=8;break}return n.setToken(Object(f.getToken)(),"Bearer"),t.next=5,n.$patch("/auth/me",{password:r.passwordNew});case 5:alert("비밀번호가 변경되었습니다."),t.next=9;break;case 8:alert("비밀번호가 잘못되었습니다. 다시 확인해주세요.");case 9:case"end":return t.stop()}}),t)})))()},logout:function(){var e=this.$router;Object(f.removeToken)(),e.push("/")},saveProfile:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$axios,r=e.profile,l=e.profileReadOnly,o={},r.name!==l.name&&(""===r.name?o.name=null:Object(h.d)(r.name)?o.name=r.name:alert("이름이 올바르지 않습니다")),r.nameEnglish!==l.nameEnglish&&(""===r.nameEnglish?o.nameEnglish=null:Object(h.d)(r.nameEnglish)?o.nameEnglish=r.nameEnglish:alert("이름이 올바르지 않습니다")),r.email!==l.email&&(""===r.email?o.email=null:Object(h.a)(r.email)?o.email=r.email:alert("올바르지 않은 이메일입니다.")),r.phone!==l.phone&&(""===r.phone?o.phone=null:Object(h.b)(r.phone)?o.phone=r.phone:alert("올바르지 않은 전화번호입니다.")),!(Object.keys(o).length>=1)){t.next=14;break}return n.setToken(Object(f.getToken)(),"Bearer"),t.next=10,n.$patch("/auth/me",o);case 10:Object.assign(l,o),alert("저장했습니다."),t.next=15;break;case 14:alert("수정할 정보를 입력해주세요.");case 15:case"end":return t.stop()}}),t)})))()}}},v=(n(188),n(20)),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[n("section",{staticClass:"container"},[n("div",{staticClass:"float-text"},[e.isManager?n("a",{staticClass:"float-item link",on:{click:function(t){return e.$router.push("/users")}}},[e._v("사용자 관리")]):e._e(),e._v(" "),n("a",{staticClass:"float-item link",on:{click:e.logout}},[e._v("로그아웃")])]),e._v(" "),n("logo",{attrs:{size:"80px"}}),e._v(" "),n("h1",{staticClass:"title"},[e._v("\n      안녕하세요, "+e._s(e.profile.name)+"님\n    ")]),e._v(" "),n("text-field",{attrs:{label:"학번",name:"id",placeholder:"학번을 입력해주세요",disabled:"",required:""},model:{value:e.profile.id,callback:function(t){e.$set(e.profile,"id",t)},expression:"profile.id"}}),e._v(" "),n("text-field",{attrs:{label:"이름",name:"name",placeholder:"이름을 입력해주세요"},model:{value:e.profile.name,callback:function(t){e.$set(e.profile,"name",t)},expression:"profile.name"}}),e._v(" "),n("text-field",{attrs:{label:"이름(영문)",name:"name-english",placeholder:"이름을 입력해주세요"},model:{value:e.profile.nameEnglish,callback:function(t){e.$set(e.profile,"nameEnglish",t)},expression:"profile.nameEnglish"}}),e._v(" "),n("text-field",{attrs:{label:"이메일",name:"email",placeholder:"이메일을 입력해주세요",type:"email"},model:{value:e.profile.email,callback:function(t){e.$set(e.profile,"email",t)},expression:"profile.email"}}),e._v(" "),n("text-field",{attrs:{label:"전화번호",name:"phone",placeholder:"전화번호를 입력해주세요",type:"tel"},model:{value:e.profile.phone,callback:function(t){e.$set(e.profile,"phone",t)},expression:"profile.phone"}}),e._v(" "),n("outline-button",{on:{click:e.saveProfile}},[e._v("\n      저장\n    ")])],1),e._v(" "),n("section",{staticClass:"container"},[n("h1",{staticClass:"title"},[e._v("\n      비밀번호 변경\n    ")]),e._v(" "),n("text-field",{attrs:{label:"이전 비밀번호",name:"password",placeholder:"사용하던 비밀번호를 입력해주세요",type:"password",required:""},model:{value:e.profile.passwordOld,callback:function(t){e.$set(e.profile,"passwordOld",t)},expression:"profile.passwordOld"}}),e._v(" "),n("text-field",{attrs:{label:"새로운 비밀번호",name:"password-new",placeholder:"사용할 비밀번호를 입력해주세요",type:"password",required:""},model:{value:e.profile.passwordNew,callback:function(t){e.$set(e.profile,"passwordNew",t)},expression:"profile.passwordNew"}}),e._v(" "),n("text-field",{attrs:{label:"새로운 비밀번호 확인",name:"password-new-repeat",placeholder:"사용할 비밀번호를 다시 입력해주세요",type:"password",required:""},model:{value:e.profile.passwordNewRepeat,callback:function(t){e.$set(e.profile,"passwordNewRepeat",t)},expression:"profile.passwordNewRepeat"}}),e._v(" "),n("outline-button",{on:{click:e.changePassword}},[e._v("\n      변경\n    ")])],1)])}),[],!1,null,"4df3be1b",null);t.default=component.exports}}]);