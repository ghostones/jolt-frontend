// Developer Tools Protection (basic - can be bypassed but adds barrier)
(function(){
'use strict';
const _0xdev=()=>{
const _0xw=window;
let _0xd=false;
const _0xcheck=()=>{
const _0xw=window.innerWidth;
const _0xh=window.innerHeight;
const _0xsw=screen.width;
const _0xsh=screen.height;
if((_0xsw-_0xw>200)||(_0xsh-_0xh>200)){
if(!_0xd){
_0xd=true;
document.body.innerHTML='';
console.clear();
console.log('%cStop!','color:red;font-size:50px;font-weight:bold;');
console.log('%cThis is a browser feature intended for developers.','font-size:16px;');
}
}
setTimeout(()=>_0xd=false,500);
};
setInterval(_0xcheck,500);
const _0xkey=(e)=>{
if(e.keyCode===123||(e.ctrlKey&&e.shiftKey&&(e.keyCode===73||e.keyCode===74||e.keyCode===67))||(e.ctrlKey&&e.keyCode===85)){
e.preventDefault();
return false;
}
};
document.addEventListener('keydown',_0xkey);
document.addEventListener('contextmenu',e=>e.preventDefault());
document.onkeydown=function(e){
if(e.ctrlKey&&e.shiftKey&&e.keyCode===73)return false;
if(e.ctrlKey&&e.shiftKey&&e.keyCode===74)return false;
if(e.ctrlKey&&e.keyCode===85)return false;
if(e.keyCode===123)return false;
};
};
if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',_0xdev);
}else{
_0xdev();
}
})();
