(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69235990"],{"0d58":function(t,e,a){"use strict";a("47e3")},"16e4":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));a("99af"),a("7db0"),a("fb6a"),a("4e82"),a("b0c0"),a("a9e3"),a("d3b7");var n=a("ed09"),r=a("55b3"),c=a("4360");function o(t,e){var a=Object(n["ref"])([]),o=Object(n["ref"])(null),s=Object(n["ref"])([]),i=Object(n["ref"])([]),u=Object(n["computed"])((function(){return c["a"].state.app.windowWidth})),l=Object(n["computed"])((function(){return c["a"].getters["widya-analytic-blog/getCategories"]})),f=function(t){var a=t.sourceCode,n=t.category,c=t.href;c?(Object(r["l"])((function(t){t.setContext("blogPost",{address:c}),Object(r["d"])("User has accessed post in blog","info"),t.clear()})),window.open(c)):e.root.$router.push({name:"blog-all",params:{sourceCode:a,category:n}})},p=function(t,e){var a=[],n=0,r=0,c=0;while(c<t.length+e.length){var o=n>=t.length,s=r>=e.length;!o&&(s||new Date(t[n].date)>new Date(e[r].date))?(a[c]=t[n],n+=1):(a[c]=e[r],r+=1),c+=1}return a},b=function(t){a.value=t.data,o.value=t.headers["x-wp-total"]},d=function(t){s.value=t,i.value=s.value.slice(0,7)},v=function(){i.value=s.value.sort((function(){return Math.random()-.5})).slice(0,7)},g=function(t){var e=s.value.find((function(e){return e.id===t}));return e?e.name:""},h=function(t){c["a"].dispatch("widya-analytic-blog/fetchAllPosts",t).then((function(t){a.value=p(t[0],t[1]),o.value=a.value.length}))},m=function(t){c["a"].dispatch("widya-analytic-blog/fetchTobaPosts",t).then((function(t){b(t)}))},y=function(t){c["a"].dispatch("widya-analytic-blog/fetchWidyaPosts",t).then((function(t){b(t)}))},O=function(){c["a"].dispatch("widya-analytic-blog/fetchAllCategories").then((function(t){d(t)}))},j=function(){c["a"].dispatch("widya-analytic-blog/fetchTobaCategories").then((function(t){d(t.data)}))},w=function(){c["a"].dispatch("widya-analytic-blog/fetchWidyaCategories").then((function(t){d(t.data)}))},P=function(t){var e=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sept","Oct","Nov","Des"],a=new Date(t).toLocaleDateString().split("/");return"".concat(e[Number(a[0])-1]," ").concat(a[1],", ").concat(a[2])},C=function(t){var e=new Date;e.setDate(e.getDate()-t);var a=e.toISOString();return a};return{posts:a,postsInTotal:o,categories:s,categoriesInRandom:i,allCategories:l,windowWidth:u,goToPageAll:f,getDateMinusNDay:C,getCategoryById:g,fetchAllCategories:O,fetchAllPosts:h,fetchTobaCategories:j,fetchTobaPosts:m,fetchWidyaCategories:w,fetchWidyaPosts:y,mergeTwoArray:p,shuffleCategories:v,formatDate:P}}},"34f3":function(t,e,a){"use strict";var n=a("3835"),r=(a("d81d"),a("d3b7"),a("3ca3"),a("ddb0"),a("bc3a")),c=a.n(r);e["a"]={namespaced:!0,state:{},mutations:{},getters:{},actions:{fetchAllPosts:function(t,e){var a=t.dispatch;return new Promise((function(t,r){return[Promise.all([a("fetchWidyaPostByCategory",e[0]),a("fetchTobaPosts",e[1])]).then((function(e){var a=e.map((function(t){return t.data})),r=Object(n["a"])(a,2),c=r[0],o=r[1],s=[c,o];t(s)})).catch((function(t){return r(t)}))]}))},fetchWidyaPostByCategory:function(t,e){return new Promise((function(t,a){c.a.get("https://widyaanalytic.com/wp-json/wp/v2/posts",{params:e}).then((function(e){t(e)})).catch((function(t){a(t)}))}))},fetchTobaPosts:function(t,e){return new Promise((function(t,a){c.a.get("https://toba.ai/blog/wp-json/wp/v2/posts",{params:e}).then((function(e){t(e)})).catch((function(t){a(t)}))}))}}}},"47e3":function(t,e,a){},"4a37":function(t,e,a){"use strict";var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"event-card"},[e("a",{attrs:{href:t.event.yoast_head_json.og_url,target:"_blank"}},[e("b-card",{staticClass:"card-base w-100 mb-2"},[e("div",{staticClass:"card-img-top w-100"},[e("b-img",{staticClass:"w-100",attrs:{src:t.event.yoast_head_json.og_image?t.event.yoast_head_json.og_image[0].url:a("aecf"),lazy:""}})],1),e("b-card-text",{staticClass:"mt-1"},[e("span",{staticClass:"text-toba-gradient-pink font-weight-bold"},[t._v(" "+t._s(t.formatDate(t.event.yoast_head_json.article_published_time))+" ")]),e("div",{staticClass:"card-title-event mt-1",class:{"overflow-auto":t.event.yoast_head_json.og_title.length>=49}},[e("h3",{staticClass:"text-black font-weight-bolder"},[t._v(" "+t._s(t.event.yoast_head_json.og_title)+" ")])])])],1)],1)])},r=[],c=a("16e4"),o=a("1947"),s=a("205f"),i=a("d6e4"),u=a("4918"),l={props:["event"],components:{BButton:o["a"],BCard:s["a"],BCardText:i["a"],BImg:u["a"]},setup:function(t,e){var a=Object(c["a"])(t,e),n=a.formatDate;return{formatDate:n}}},f=l,p=a("2877"),b=Object(p["a"])(f,n,r,!1,null,null,null);e["a"]=b.exports},"4e82":function(t,e,a){"use strict";var n=a("23e7"),r=a("1c0b"),c=a("7b0b"),o=a("d039"),s=a("a640"),i=[],u=i.sort,l=o((function(){i.sort(void 0)})),f=o((function(){i.sort(null)})),p=s("sort"),b=l||!f||!p;n({target:"Array",proto:!0,forced:b},{sort:function(t){return void 0===t?u.call(c(this)):u.call(c(this),r(t))}})},a148:function(t,e,a){"use strict";a.d(e,"a",(function(){return h}));var n=a("2b0e"),r=a("b42e"),c=a("c637"),o=a("cf75"),s=a("a723"),i=a("8690"),u=a("d82f"),l=a("aa59");function f(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?f(Object(a),!0).forEach((function(e){b(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function b(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d=Object(o["d"])(Object(u["m"])(p(p({},Object(u["j"])(l["b"],["event","routerTag"])),{},{ariaCurrent:Object(o["c"])(s["t"],"location"),html:Object(o["c"])(s["t"]),text:Object(o["c"])(s["t"])})),c["f"]),v=n["default"].extend({name:c["f"],functional:!0,props:d,render:function(t,e){var a=e.props,n=e.data,c=e.children,s=a.active,u=s?"span":l["a"],f={attrs:{"aria-current":s?a.ariaCurrent:null},props:Object(o["e"])(d,a)};return c||(f.domProps=Object(i["a"])(a.html,a.text)),t(u,Object(r["a"])(n,f),c)}}),g=Object(o["d"])(d,c["e"]),h=n["default"].extend({name:c["e"],functional:!0,props:g,render:function(t,e){var a=e.props,n=e.data,c=e.children;return t("li",Object(r["a"])(n,{staticClass:"breadcrumb-item",class:{active:a.active}}),[t(v,{props:a},c)])}})},aecf:function(t,e,a){t.exports=a.p+"img/empty-post.1a17d5a9.png"},bb4d:function(t,e,a){"use strict";a.r(e);a("b0c0");var n=function(){var t=this,e=t._self._c;return e("b-container",{staticClass:"event-all d-flex flex-column"},[e("b-breadcrumb",{directives:[{name:"show",rawName:"v-show",value:"event"!==this.$route.name,expression:"(this.$route.name !== 'event')"}],staticClass:"text-black breadcrumb-slash",attrs:{items:t.breadcrumbItems}}),e("header",{staticClass:"d-flex justify-content-center mt-4"},[e("h1",{directives:[{name:"show",rawName:"v-show",value:"event"!==this.$route.name,expression:"(this.$route.name !== 'event')"}],staticClass:"font-weight-bolder text-black"},[t._v(" "+t._s(this.$route.params.category)+" ")])]),e("b-row",{staticClass:"mt-3",attrs:{"align-h":"center"}},t._l("Event Terbaru"===this.$route.params.category?t.paginationStep:t.posts,(function(t,a){return e("b-col",{key:a,staticClass:"d-flex justify-content-center",attrs:{cols:"12",md:"6",xl:"4"}},[e("event-card",{attrs:{event:t}})],1)})),1),e("b-pagination",{staticClass:"overflow-auto justify-content-sm-center my-3",attrs:{"per-page":t.perPage,"total-rows":t.postsInTotal,pills:"",align:"fill","prev-text":"Sebelumnya","next-text":"Selanjutnya"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)},r=[],c=(a("fb6a"),a("ed09")),o=a("4360"),s=a("e235"),i=a("b28b"),u=a("a15b7"),l=a("26d2"),f=a("1bbb"),p=a("4a37"),b=a("34f3"),d=a("fd7b"),v={components:{BBreadcrumb:s["a"],BCol:i["a"],BRow:u["a"],BPagination:l["a"],BContainer:f["a"],EventCard:p["a"]},setup:function(t,e){var a="widya-analytic-event";o["a"].hasModule(a)||o["a"].registerModule(a,b["a"]);var n=Object(c["ref"])([{text:"Event",to:"/store/event"}]),r=Object(c["ref"])(1),s=Object(c["ref"])(9),i=e.root._route,u=Object(d["a"])(t,e),l=u.posts,f=u.postsInTotal,p=u.fetchWidyaEvents,v=u.fetchTobaEvents,g=u.fetchAllPosts;Object(c["onMounted"])((function(){n.value.push({text:i.params.category,to:i.fullPath}),"Live Course"===i.params.category?v({categories:147,per_page:9,offset:0}):"Toba Talks"===i.params.category?v({categories:158,per_page:9,offset:0}):"event"===i.name?p({categories:3,per_page:9}):g([{categories:3,per_page:999},{categories:"147,158",per_page:999}])})),Object(c["watch"])(r,(function(t){"Live Course"===i.params.category?v({categories:147,per_page:9,page:t}):"Toba Talks"===i.params.category?v({categories:158,per_page:9,page:t}):"event"===i.name&&p({categories:3,per_page:9,page:t})}));var h=Object(c["computed"])((function(){var t=l.value;return t.slice(s.value*(r.value-1),s.value*r.value)}));return{posts:l,breadcrumbItems:n,currentPage:r,perPage:s,postsInTotal:f,paginationStep:h}}},g=v,h=(a("0d58"),a("2877")),m=Object(h["a"])(g,n,r,!1,null,null,null);e["default"]=m.exports},d6e4:function(t,e,a){"use strict";a.d(e,"a",(function(){return u}));var n=a("2b0e"),r=a("b42e"),c=a("c637"),o=a("a723"),s=a("cf75"),i=Object(s["d"])({textTag:Object(s["c"])(o["t"],"p")},c["o"]),u=n["default"].extend({name:c["o"],functional:!0,props:i,render:function(t,e){var a=e.props,n=e.data,c=e.children;return t(a.textTag,Object(r["a"])(n,{staticClass:"card-text"}),c)}})},e235:function(t,e,a){"use strict";a.d(e,"a",(function(){return v}));var n=a("2b0e"),r=a("b42e"),c=a("c637"),o=a("a723"),s=a("7b1e"),i=a("cf75"),u=a("fa73"),l=a("a148");function f(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?f(Object(a),!0).forEach((function(e){b(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function b(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d=Object(i["d"])({items:Object(i["c"])(o["b"])},c["d"]),v=n["default"].extend({name:c["d"],functional:!0,props:d,render:function(t,e){var a=e.props,n=e.data,c=e.children,o=a.items,i=c;if(Object(s["a"])(o)){var f=!1;i=o.map((function(e,a){Object(s["i"])(e)||(e={text:Object(u["g"])(e)});var n=e,r=n.active;return r&&(f=!0),r||f||(r=a+1===o.length),t(l["a"],{props:p(p({},e),{},{active:r})})}))}return t("ol",Object(r["a"])(n,{staticClass:"breadcrumb"}),i)}})},fd7b:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var n=a("c7eb"),r=a("1da1"),c=a("ed09"),o=a("4360"),s=a("16e4");function i(t,e){var a=Object(c["computed"])((function(){return o["a"].getters["app/currentBreakPoint"]})),i=Object(c["ref"])([]),u=Object(c["ref"])(0),l=Object(s["a"])(t,e),f=l.mergeTwoArray,p=function(t){o["a"].dispatch("widya-analytic-event/fetchAllPosts",t).then((function(t){i.value=f(t[0],t[1]),u.value=i.value.length}))},b=function(){var t=Object(r["a"])(Object(n["a"])().mark((function t(e){var a;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o["a"].dispatch("widya-analytic-event/fetchWidyaPostByCategory",e);case 3:a=t.sent,i.value=a.data,v(a),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(r["a"])(Object(n["a"])().mark((function t(e){var a;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o["a"].dispatch("widya-analytic-event/fetchTobaPosts",e);case 3:a=t.sent,i.value=a.data,v(a),t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}(),v=function(t){u.value=t.headers["x-wp-total"]};return{currentBreakpoint:a,posts:i,postsInTotal:u,fetchWidyaEvents:b,fetchTobaEvents:d,fetchAllPosts:p}}}}]);
//# sourceMappingURL=chunk-69235990.d0d1ad4b.js.map