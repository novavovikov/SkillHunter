(window.webpackJsonp=window.webpackJsonp||[]).push([["af66"],{EM9C:function(e,t,a){"use strict";a.r(t);var n=a("ln6h"),r=a.n(n),i=a("O40h"),l=a("0iUn"),c=a("sLSF"),o=a("MI3g"),s=a("a7VT"),u=a("Tit0"),m=a("q1tI"),d=a.n(m),p=a("k7Sn"),f=a("I9Wv"),_=a("HVWv"),g=a("9Jkg"),v=a.n(g),h=a("zrwo"),b=a("doui"),O=a("nOHt"),E=a.n(O),j=a("TSYQ"),w=a.n(j),N=a("UXZV"),y=a.n(N);function R(){return(R=y.a||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var x=a("vYYK"),F=a("qNsG"),k=a("a8qT"),Z=a.n(k),z=function(e){e.children;var t,a,n=e.theme,r=e.type,i=e.className,l=e.error,c=e.warning,o=Object(F.a)(e,["children","theme","type","className","error","warning"]);return d.a.createElement("div",{className:w()(Z.a.Field,(t={},Object(x.a)(t,Z.a["Field_"+n],n),Object(x.a)(t,i,i),t))},"textarea"===r?d.a.createElement("textarea",R({className:w()(Z.a.Field__input,Z.a.Field__input_textarea)},o)):d.a.createElement("input",R({className:Z.a.Field__input,type:r},o)),d.a.createElement("i",{className:w()(Z.a.Field__indicator,Object(x.a)({},Z.a.Field__indicator_error,l))}),(l||c)&&d.a.createElement("div",{className:w()(Z.a.Field__notification,(a={},Object(x.a)(a,Z.a.Field__notification_error,l),Object(x.a)(a,Z.a.Field__notification_warning,c),a))},l||c))},S=a("MTde"),T=a.n(S),C=function(e){var t=e.title,a=e.text,n=e.field;return d.a.createElement(d.a.Fragment,null,t&&d.a.createElement("div",{className:T.a.Registration__title},t),d.a.createElement("div",{className:T.a.Registration__text},a),n&&d.a.createElement(z,n))},A=a("diRK"),P=a.n(A),M=function(e){var t=e.step,a=e.count;return d.a.createElement("div",{className:P.a.Progress},d.a.createElement("div",{className:P.a.Progress__status,style:{width:"".concat(t/a*100,"%")}}))},q=a("WZNZ"),I=a("Deze"),J=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,V=Object(p.withNamespaces)("registration")(function(e){var t=e.t,a=Object(m.useState)(1),n=Object(b.default)(a,2),r=n[0],i=n[1],l=Object(m.useState)({value:"",error:null,warning:null}),c=Object(b.default)(l,2),o=c[0],s=c[1],u=Object(m.useState)({value:"",error:null,warning:null}),p=Object(b.default)(u,2),f=p[0],_=p[1],g=Object(m.useState)({value:"",error:null,warning:null}),O=Object(b.default)(g,2),j=O[0],N=O[1];return d.a.createElement("form",{className:T.a.Registration,onSubmit:function(e){switch(e.preventDefault(),r){case 1:return o.value?i(r+1):s(Object(h.a)({},o,{error:t("field.empty")}));case 2:return i(r+1);default:!function(){if(!j.value)return N(Object(h.a)({},j,{error:t("field.empty")}));if(!j.value.match(J))return N(Object(h.a)({},j,{warning:t("field.email")}));var e={profession:o.value,expectations:f.value,email:j.value};fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:v()(e)}).then(function(e){return e.json()}).then(function(){return E.a.push(I.c)}).catch(function(e){console.log(e.message),N(Object(h.a)({},j,{error:t("field.unknown")}))})}()}}},d.a.createElement("div",{className:T.a.Registration__header},r<=2?d.a.createElement(d.a.Fragment,null,d.a.createElement("div",{className:T.a.Registration__title},d.a.createElement("img",{className:T.a.Registration__icon,src:"/static/images/blank.svg",alt:""}),t("title")),d.a.createElement("div",{className:T.a.Registration__step},r,"/",2)):d.a.createElement("div",{className:w()(T.a.Registration__title,T.a.Registration__title_light)},t("email.title"))),d.a.createElement(M,{step:r-1,count:2}),d.a.createElement("div",{className:T.a.Registration__body},1===r&&d.a.createElement(C,{title:t("profession.title"),text:t("profession.description"),field:Object(h.a)({},o,{placeholder:t("profession.placeholder"),onChange:function(e){return s({value:e.target.value,error:null,warning:null})}})}),2===r&&d.a.createElement(C,{title:t("expectations.title"),text:t("expectations.description"),field:Object(h.a)({},f,{type:"textarea",placeholder:t("expectations.placeholder"),onChange:function(e){return _({value:e.target.value,error:null,warning:null})}})}),3===r&&d.a.createElement(C,{text:t("email.description"),field:Object(h.a)({},j,{placeholder:t("email.placeholder"),onChange:function(e){return N({value:e.target.value,error:null,warning:null})}})})),d.a.createElement("div",{className:T.a.Registration__footer},1!==r&&d.a.createElement(q.a,{type:"button",theme:"gray",onClick:function(){i(r-1)}},t("common:back")),d.a.createElement(q.a,{className:T.a.Registration__submit},t(r>2?"common:done":"common:further"))))}),W=function(e){function t(){return Object(l.default)(this,t),Object(o.default)(this,Object(s.default)(t).apply(this,arguments))}return Object(u.default)(t,e),Object(c.default)(t,[{key:"render",value:function(){var e=this.props.t;return d.a.createElement(f.a,{header:{withRegistration:!1},head:{title:e("title.registration")}},d.a.createElement(_.a,null,d.a.createElement(V,null)))}}],[{key:"getInitialProps",value:function(){var e=Object(i.default)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{namespacesRequired:["registration"]});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()}]),t}(d.a.Component);t.default=Object(p.withNamespaces)("common")(W)},pm2M:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/registration",function(){var e=a("EM9C");return{page:e.default||e}}])}},[["pm2M","5d41","9da1","ad9d"]]]);