webpackJsonp([1],{"/Lrn":function(t,e){},"2DwX":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("sidemenu",{staticClass:"sidemenu"})],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},"3xxH":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAABG3AAARtwGaY1MrAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAHtQTFRF/////1VVzGZN1VVA2V5M1lpK2VlI11tK2FxL2FtJ1llK2FtK1ltL11pL1ltK11pK11pL1lpK1lpK11pK11pK11pK11pK11pK11pJ11pK11pK11pK11pK11pK11pK4YJ24ol944yB5JCG8snE8svG/vz8/v39//39////kP4UBwAAAB50Uk5TAAMKDBsfPExOYmRocHSKjqSwtr7Ay9XY5ery+Pn+bfME6gAAAZ1JREFUWMOtV9e2gkAMjBcL0gWR6iid///C+3DLUdgCxHnMcUY2m50kRBIYpuMFUZLnSRR4jmnQKuztsMAbitDeL2V/ufEdAtxj92sBfWelkCK1djr+6QYlbicl/XCFFteDnH/MsADZUcY/l1iE8izOno/F8AW53F2wApe5go9V8Gfnx0pM8nAs1wqUb3dxyLAa2Ws9XLEB15f6xSb8V/Xutk3g9neXFjbC+n3/6VaB9Mcf3Gn80TxFP6/axzTkEhFRPA23Y1fP+XU3NtNYTES0n/lX1QkU6m7sZh923xORLfyzqULdCT/LJqIQCxQkfIRERgG9goyPwiBTfENvFCkfMMmBVkHBh0MedAoqPjwKoFFQ8hFQBLWCmo+IEigVhl7JR0K56rXUwzj2Kj5yjUA/joNGQHOEftAdgZ1E9jWyC4ldyuzHxH7ObEPhW9rcVJ8yU62Epjq39UZm6+00FksaS1uJEvZsJI2F3drYzZXf3tkDBn/E4Q9Z7DGPP2jyR13+sM0e9/kLxwdWHv7SxV/7PrB48lffDyzf69b/b8tHe0SmdNyrAAAAAElFTkSuQmCC"},"84kS":function(t,e,a){"use strict";e.a={name:"sidemenu",data:function(){return{}}}},AGU5:function(t,e,a){"use strict";e.a={name:"login",data:function(){return{email:"",password:"",errorMessage:"",state:"signedOut"}},methods:{login:function(){var t=this;return this.errorMessage="",this.state="signingIn",""===this.email?(this.errorMessage="Please input an email",void(this.state="signedOut")):""===this.password?(this.errorMessage="Please input a password",void(this.state="signedOut")):void this.$store.dispatch("LOGIN",{email:this.email,password:this.password}).then(function(){t.state="signedIn",setTimeout(function(){t.$router.push({path:"/"})},1e3)}).catch(function(e){t.errorMessage=e.message,t.state="signedOut"})}},computed:{loginButtonText:function(){return"signedOut"===this.state?"Login":"signingIn"===this.state?"Logging In...":"signedIn"===this.state?"Success":void 0}}}},Bu4e:function(t,e){},CbhS:function(t,e,a){"use strict";var s=a("a1CX");e.a={name:"main",components:{sidemenu:s.a},data:function(){return{msg:"Welcome to the main view."}}}},DEN3:function(t,e){t.exports={apiKey:"AIzaSyDwYsGJXxpNMrdlOMcOk9qbOYH5ym-bZQQ",authDomain:"laxtest-20037.firebaseapp.com",databaseURL:"https://laxtest-20037.firebaseio.com",projectId:"laxtest-20037",storageBucket:"laxtest-20037.appspot.com",messagingSenderId:"766743615590"}},"FD/Q":function(t,e,a){"use strict";function s(t){a("WWMp")}var i=a("seFC"),n=a("eF6U"),r=a("VU/8"),o=s,c=r(i.a,n.a,o,"data-v-78010232",null);e.a=c.exports},HhE7:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"root"})},i=[],n={render:s,staticRenderFns:i};e.a=n},IcnI:function(t,e,a){"use strict";var s=a("7+uW"),i=a("NYxO"),n=a("mUbh"),r=a("ukYY"),o=a("UjVw");s.a.use(i.a),e.a=new i.a.Store({state:{hasFirebaseConfigured:!1,hasElasticSearch:!1,isLoggedIn:!1,lastViewedChannelId:"",name:"",users:{},channels:{}},actions:n.a,mutations:r.a,getters:o.a})},JMJy:function(t,e){},M93x:function(t,e,a){"use strict";function s(t){a("/Lrn")}var i=a("xJD8"),n=a("O5g4"),r=a("VU/8"),o=s,c=r(i.a,n.a,o,null,null);e.a=c.exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("M93x"),n=a("IcnI"),r=a("YaEn"),o=a("gyMJ");s.a.config.productionTip=!1,a.i(o.a)(n.a).then(function(){new s.a({el:"#app",router:r.a,store:n.a,template:"<App/>",components:{App:i.a}})})},O5g4:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view",{staticClass:"view"})],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},UjVw:function(t,e,a){"use strict";e.a={}},V6fb:function(t,e){},WWMp:function(t,e){},YNHd:function(t,e,a){"use strict";function s(t){a("V6fb")}var i=a("CbhS"),n=a("2DwX"),r=a("VU/8"),o=s,c=r(i.a,n.a,o,"data-v-2ada82d4",null);e.a=c.exports},YaEn:function(t,e,a){"use strict";function s(t,e,a){c.a.state.hasFirebaseConfigured?c.a.state.isLoggedIn?a():a("login"):a("/create")}function i(t,e,a){c.a.state.hasFirebaseConfigured?c.a.state.isLoggedIn?a("/"):a():a("/create")}function n(t,e,a){c.a.state.hasFirebaseConfigured?a(c.a.state.isLoggedIn?"/":"/login"):a()}var r=a("7+uW"),o=a("/ocq"),c=a("IcnI"),l=a("YNHd"),d=a("qAPS"),u=a("FD/Q");r.a.use(o.a),e.a=new o.a({routes:[{path:"/",beforeEnter:s,component:l.a},{path:"/login",beforeEnter:i,component:d.a},{path:"/create",beforeEnter:n,component:u.a}]})},a1CX:function(t,e,a){"use strict";function s(t){a("JMJy")}var i=a("84kS"),n=a("HhE7"),r=a("VU/8"),o=s,c=r(i.a,n.a,o,"data-v-6d9b2d1a",null);e.a=c.exports},eF6U:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"create"},[t._m(0),t._v(" "),s("div",{staticClass:"slide-up-fade-in",attrs:{id:"team_form"}},[s("h1",[t._v("\n      Create a team name\n    ")]),t._v(" "),s("div",{staticClass:"input_container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.teamName,expression:"teamName"}],staticClass:"text_field",attrs:{type:"text",placeholder:"Team name"},domProps:{value:t.teamName},on:{input:function(e){e.target.composing||(t.teamName=e.target.value)}}}),t._v(" "),t.showTeamNameError&&""===t.teamName?s("img",{staticClass:"icon",attrs:{src:a("3xxH")}}):t._e()]),t._v(" "),s("h1",[t._v("\n      Secret\n    ")]),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"input_container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.secret,expression:"secret"}],staticClass:"secret_field",attrs:{type:"password",placeholder:"Database secret"},domProps:{value:t.secret},on:{input:function(e){e.target.composing||(t.secret=e.target.value)}}}),t._v(" "),""!==t.secret&&t.isSecretValid?s("img",{staticClass:"icon",attrs:{src:a("mzrL")}}):t._e(),t._v(" "),""===t.secret||t.isSecretValid||t.testingSecret?t._e():s("img",{staticClass:"icon",attrs:{src:a("3xxH")}}),t._v(" "),t.testingSecret?s("div",{staticClass:"load_container"},[t._m(2)]):t._e()])]),t._v(" "),s("div",{staticClass:"slide-up-fade-in",attrs:{id:"create_user_form"}},[s("div",{staticClass:"create_container"},[s("h1",[t._v("\n        Register the first member\n      ")]),t._v(" "),s("div",{staticClass:"input_container"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"text_field",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),""!==t.email&&t.isEmailValid?s("img",{staticClass:"icon",attrs:{src:a("mzrL")}}):t._e(),t._v(" "),""===t.email||t.isEmailValid?t._e():s("img",{staticClass:"icon",attrs:{src:a("3xxH")}})]),t._v(" "),s("div",{staticClass:"input_container",attrs:{id:"display_name"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.displayName,expression:"displayName"}],staticClass:"text_field",attrs:{type:"text",placeholder:"Display name (no spaces)"},domProps:{value:t.displayName},on:{input:function(e){e.target.composing||(t.displayName=e.target.value)}}}),t._v(" "),t.showDisplayNameError&&""!==t.displayName?s("img",{staticClass:"icon",attrs:{src:a("3xxH")}}):t._e()]),t._v(" "),s("div",{staticClass:"input_container",attrs:{id:"password"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"password_field",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),""!==t.password&&t.isPasswordValid?s("img",{staticClass:"icon",attrs:{src:a("mzrL")}}):t._e(),t._v(" "),""===t.password||t.isPasswordValid?t._e():s("img",{staticClass:"icon",attrs:{src:a("3xxH")}})]),t._v(" "),s("div",{staticClass:"input_container",attrs:{id:"verify_password"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyPassword,expression:"verifyPassword"}],staticClass:"password_field",attrs:{type:"password",placeholder:"Verify password"},domProps:{value:t.verifyPassword},on:{input:function(e){e.target.composing||(t.verifyPassword=e.target.value)}}}),t._v(" "),""!==t.verifyPassword&&t.doesPasswordMatch?s("img",{staticClass:"icon",attrs:{src:a("mzrL")}}):t._e(),t._v(" "),""===t.verifyPassword||t.doesPasswordMatch?t._e():s("img",{staticClass:"icon",attrs:{src:a("3xxH")}})])]),t._v(" "),s("div",{staticClass:"create_container",attrs:{id:"create_right_container"}},[s("button",{staticClass:"create_button",class:{inactive:"initializing"===t.state||"initialized"===t.state},attrs:{type:"button"},on:{click:t.create}},[t._v(t._s(t.createButtonText))]),t._v(" "),"initializing"===t.state?s("div",{staticClass:"load_container",attrs:{id:"loading"}},[t._m(3)]):t._e()])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"background_container"},[a("div",{staticClass:"left_container"},[a("div",{staticClass:"left_container_left_diagonal"}),t._v(" "),a("div",{staticClass:"left_container_right_diagonal"})]),a("div",{staticClass:"right_container"},[a("div",{staticClass:"left_diagonal"}),t._v(" "),a("div",{staticClass:"right_diagonal"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("p",{staticClass:"secret_explanation"},[t._v("\n        Only an authorized user can initiate a team creation. To verify this we\n        check if the secret you provide belongs to the backing Firebase database. You\n        can find the secret in your\n        "),a("a",{attrs:{href:"https://console.firebase.google.com/project/_/settings/database?authuser=0"}},[t._v("Firebase console settings")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"load"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"line"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"load"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"line"})])}],n={render:s,staticRenderFns:i};e.a=n},gyMJ:function(t,e,a){"use strict";function s(t){console.log("Initializing Firebase...");var e=p.a.initializeApp(h);return A=e.database(),_=e.auth(),i(t)}function i(t){var e=n(t),a=r(t);return m.a.all([e,a])}function n(t){return A.ref("configured").once("value").then(function(e){if(null!==e.val()){var a=e.val();t.state.hasFirebaseConfigured=a}})}function r(t){return new m.a(function(e,a){_.onAuthStateChanged(function(a){a?(t.state.isLoggedIn=!0,d(a.uid,t).then(function(){e()})):(t.state.isLoggedIn=!1,e())})})}function o(t){return g.a.post("/api/test_secret",{secret:t})}function c(t,e,a,s,i){return g.a.post("/api/create",{secret:t,team_name:e,display_name:a,email:s,password:i})}function l(t,e){return _.signInWithEmailAndPassword(t,e)}function d(t,e){return A.ref("/users/"+t).once("value").then(function(t){null!==t.val()&&(e.state.lastViewedChannelId=t.val().last_viewed_channel_id)})}e.a=s,e.b=o,e.c=c,e.d=l;var u=a("//Fk"),m=a.n(u),v=a("q6Ae"),p=a.n(v),f=a("mtWM"),g=a.n(f),h=a("DEN3"),A=void 0,_=void 0},kdHF:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[t._m(0),t._v(" "),a("div",{staticClass:"slide-up-fade-in",attrs:{id:"login_form"}},[a("h1",[t._v("\n      Sign in\n    ")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"text_field",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"password_field",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("p",{attrs:{id:"error_message"}},[t._v(t._s(t.errorMessage))]),t._v(" "),a("button",{staticClass:"login_button",class:{inactive:"signingIn"==t.state||"signedIn"==t.state},attrs:{type:"button"},on:{click:t.login}},[t._v(t._s(t.loginButtonText))])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"background_container"},[a("div",{staticClass:"left_container"},[a("div",{staticClass:"left_container_left_diagonal"}),t._v(" "),a("div",{staticClass:"left_container_right_diagonal"})]),a("div",{staticClass:"right_container"},[a("div",{staticClass:"left_diagonal"}),t._v(" "),a("div",{staticClass:"right_diagonal"})])])}],n={render:s,staticRenderFns:i};e.a=n},mUbh:function(t,e,a){"use strict";var s=a("gyMJ");e.a={CREATE_TEAM:function(t,e){var i=t.commit,n=e.secret,r=e.teamName,o=e.displayName,c=e.email,l=e.password;return a.i(s.c)(n,r,o,c,l).then(function(){return i("SET_CONFIGURED")})},LOGIN:function(t,e){var i=t.commit,n=e.email,r=e.password;return a.i(s.d)(n,r).then(function(){return i("SET_LOGIN")})}}},mzrL:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAABG3AAARtwGaY1MrAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAUpQTFRF////AKqqGrOAK6qAJqqEIa2MJq6IJa6KJK2JJK6HJq2HJa6HJK2JJa6IJa6JJq6IJa6HJq6IJK6IJq6IJa6HJK+IJa6IJa6IJa6IJa6IJa6IJa6IJa6IJa6IJa6IJq6IJ6+JKK+JKbCKKrCLK7CLLLGMMbKPM7OPNLOQNLSQNbSRO7aUPreWQLiWRbqZSLubSbucS7ydTL2dTb2eTr2eWMGkWcGkXcOmXsOnYMSobMivbcmvbsmwcMqxcsuydMuzes22gtG7g9G7idO/i9TAmNnHmtrIm9rIndrJntvKodzMpN3NsuLVt+TYuOXYueXZwejdwujexurgx+rgyuviy+zjzOzj1/Dp2PDq2/Lr3PLs4fTv5PXw5fXx6Pby6ffz6vfz8Pr38vr48/v49Pv59fv59vz69/z7+Pz7+v38+/39/f7+/v//////BgrN1AAAAB50Uk5TAAMKDBsfPExOYmRocHSKjqSwtr7Ay9XY5ery+Pn+bfME6gAAAj9JREFUWMOtV1l72jAQFCEQB2xwbMyNmpY2pfeVpnfSpvdN0/u+27TN/P/XgpuCJEtGQswTWjz72aPRapcQBbKOW/LDWrNZC/2S62SJEeaLQYtyaAXFeV32nBd1qASdyJvToGcKdapEvZCZxF+o0lRUF1LpuQqdiEpOzc83qAYaeRV/sU210F6Uq1em2ihLtMwsUQMsJTOUqRHKie+nhhB0yLdNE7S5vcg1qDEarB8qdApUGP/SqTBydaY6XYLq/70s0ClR2D3/dQPO5ve7zOn+Vx88A/6VHTxjll6cINLnn/uF7bPMOorrX0ebf/oL/lzkqtywTha1+Uc/ANf4UHGQINDl914Dt4RYMKj/LU3+/ufAgz1CsJUljiZ/+SGw1U2EHeJqJrgHvFxJhl1S0uNfB94fkcRLxNfir+/g8wnZHz4JdfjnBQONEZIat+4elz115qtgoDFqpMmtH6F/MPHQsY8JA43QFBL0gbenhGcOvQFuU2UC/hMObwE/LnGhAy8kBmI+QRBx7x0AN5cZAz0GnnaV8obJbVz/CfR7o+V94NWKen98iZFW3zFC3FAYaGwkiZVjIS7HPzcGBjqZ5hBXephGQlz4je21VIs5iuM8FOJJb/Wb0kDj46woKLEQn4DNdI8H6pI2FCLFQExJUxXVoRBqAzFFVV3W167um/ACkfHFIsAzv9o47F5t1per/fVu3WDYtzj2TZZ1m2ffaNq3uvbNtnW7bz9wzGDksR+67Me+GQye9qPvDIZvs/H/LxtCm/1j3jkjAAAAAElFTkSuQmCC"},qAPS:function(t,e,a){"use strict";function s(t){a("Bu4e")}var i=a("AGU5"),n=a("kdHF"),r=a("VU/8"),o=s,c=r(i.a,n.a,o,"data-v-01a53078",null);e.a=c.exports},seFC:function(t,e,a){"use strict";var s=a("gyMJ"),i=a("HhAh"),n=a.n(i),r=new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");e.a={name:"create",data:function(){return{showTeamNameError:!1,isSecretValid:!1,isEmailValid:!1,showDisplayNameError:!1,isPasswordValid:!1,doesPasswordMatch:!1,teamName:"",secret:"",testingSecret:!1,email:"",displayName:"",password:"",verifyPassword:"",state:"uninitialized"}},methods:{create:function(){var t=this;return this.state="initializing",""===this.teamName?(this.showTeamNameError=!0,void(this.state="uninitialized")):""===this.displayName?(this.showDisplayNameError=!0,void(this.state="uninitialized")):void(this.isSecretValid&&this.isEmailValid&&this.isPasswordValid&&this.doesPasswordMatch?this.$store.dispatch("CREATE_TEAM",{secret:this.secret,teamName:this.teamName,displayName:this.displayName,email:this.email,password:this.password}).then(function(){t.state="initialized",setTimeout(function(){t.$router.push({path:"/login"})},1e3)}):this.state="uninitialized")},checkSecret:n()(function(t){var e=this;this.testingSecret=!0,a.i(s.b)(t).then(function(t){e.isSecretValid=t.data.match,e.testingSecret=!1}).catch(function(t){e.testingSecret=!1,console.log(t)})},500)},watch:{email:function(t){this.isEmailValid=r.test(t)},displayName:function(t){this.displayName=t.replace(/ /g,"")},password:function(t){this.isPasswordValid=t.length>=8,this.doesPasswordMatch=this.verifyPassword===t},verifyPassword:function(t){this.doesPasswordMatch=this.password===t},secret:function(t){this.checkSecret(t)}},computed:{createButtonText:function(){return"uninitialized"===this.state?"Create":"initializing"===this.state?"Creating":"initialized"===this.state?"Created":void 0}}}},ukYY:function(t,e,a){"use strict";e.a={SET_CONFIGURED:function(t){t.hasFirebaseConfigured=!0},SET_LOGIN:function(t){t.isLoggedIn=!0}}},xJD8:function(t,e,a){"use strict";e.a={name:"app"}}},["NHnr"]);
//# sourceMappingURL=app.1e2f2fc3ad6288aaaf59.js.map