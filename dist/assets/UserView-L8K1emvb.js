import{d as g,r as h,o as n,c as l,f as e,a as u,w as v,g as i,t as c,_ as y,s as p,F as m,j as P}from"./index-C29zAVTH.js";const T={props:["theMainImg","theTitle","saledPrice","thePrice","selectedSize","selectedColor","theDetails","theStyle","theCounter"],emits:["SeenProduct","goToUp"]},w={class:"flex gap-4 my-4"},k=["src"],x={key:0},U={key:1};function I(a,r,s,C,S,o){const d=h("RouterLink");return n(),l("div",w,[e("div",null,[e("img",{src:s.theMainImg,class:"w-[30vw] h-[40vh] img tab:w-[50-vw] tab:h-[20vh]"},null,8,k)]),e("div",null,[u(d,{class:"text-nowrap",to:`/${s.theDetails.theStyle}/${s.theTitle}`,onClick:r[0]||(r[0]=_=>(this.$emit("SeenProduct"),this.$emit("goToUp")))},{default:v(()=>[i(c(s.theTitle),1)]),_:1},8,["to"]),e("p",null,[i(" Size : "),e("strong",null,c(s.selectedSize),1)]),e("p",null,[i(" Color : "),e("strong",null,c(s.selectedColor),1)]),s.saledPrice?(n(),l("p",x," $"+c(s.saledPrice),1)):(n(),l("p",U," $"+c(s.thePrice*s.theCounter),1))])])}const $=g(T,[["render",I]]),N={components:{FooterComp:y,ProductContent:$},data(){return{HiddenCart:!1}},methods:{LogOut(){this.$router.push("/"),localStorage.removeItem("user")},SeenProduct(a){return p(a)},goToUp(){return window.scrollTo(0,0)}},computed:{User:function(){return JSON.parse(localStorage.getItem("user"))},CartProducts:function(){return localStorage.getItem("cart")}}},O={class:"py-16 px-8"},D={class:"flex items-center justify-between"},b={class:"tracking-wider"},z=e("hr",{class:"my-4"},null,-1),L={class:"flex justify-between"},F=e("div",{class:"mb-6"},[e("h1",null," ORDER HISTORY ")],-1),M={key:0},R={key:1};function V(a,r,s,C,S,o){const d=h("ProductContent"),_=h("FooterComp");return n(),l(m,null,[e("main",O,[e("div",D,[e("h1",b,[i(" Hello "),e("strong",null,c(o.User.firstName)+" "+c(o.User.lastName),1)]),e("button",{onClick:r[0]||(r[0]=t=>o.LogOut())}," LOG OUT ")]),z,e("section",L,[e("div",null,[F,o.CartProducts?(n(),l("section",M,[(n(!0),l(m,null,P(JSON.parse(o.CartProducts),t=>(n(),l("div",{key:t},[u(d,{theMainImg:t.theMainImg.replace("./","../"),saledPrice:t.saledPrice,selectedColor:t.selectedColor,selectedSize:t.selectedSize,theDetails:t.theDetails,thePrice:t.thePrice,theStyle:t.theStyle,theTitle:t.theTitle,theCounter:t.theCounter,onSeenProduct:f=>o.SeenProduct(t),onGoToUp:r[1]||(r[1]=f=>o.goToUp())},null,8,["theMainImg","saledPrice","selectedColor","selectedSize","theDetails","thePrice","theStyle","theTitle","theCounter","onSeenProduct"])]))),128))])):(n(),l("p",R," No Products Added "))])])]),u(_)],64)}const B=g(N,[["render",V]]);export{B as default};