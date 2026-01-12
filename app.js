// Main application JavaScript - will be obfuscated
(function(){
'use strict';
// Use centralized base URL configuration
const _0x=window.__API?window.__API.base:(window.getApiBaseUrl?window.getApiBaseUrl():(window.location.hostname==='joltchat.org'?'https://joltchat.org':'https://jolt-backendnew.onrender.com'));
const _0xp=window.location.hostname==='joltchat.org'||window.location.hostname==='www.joltchat.org';
async function _0xs(e,o={}){
if(window.__API&&window.__API.fetch&&_0xp)return window.__API.fetch(e,o);
return fetch(`${_0x}${e}`,{...o,method:o.method||'POST',headers:{'Content-Type':'application/json',...o.headers},body:o.body?JSON.stringify(o.body):o.body});
}
let _0xsocket=null,_0xuser='',_0xage='',_0xbio='',_0ximg='branding/image.png',_0xpartner='',_0xstream=null,_0xskip=false,_0xpeer=null,_0xsid=null,_0xtok=null,_0xstrikes=0;
const _0xice={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};
window.onload=async function(){
const _0xls=localStorage.getItem('joltUser');
if(_0xls){
const _0xu=JSON.parse(_0xls);_0xsid=_0xu.sessionId||null;_0xtok=_0xu.execToken||null;
try{
const _0xr=await _0xs('/login',{method:'POST',body:{username:_0xu.username,password:_0xu.password||''}});
const _0xd=await _0xr.json();
if(_0xd.message&&_0xd.message.startsWith('Login successful')){
_0xsid=_0xd.sessionId;_0xtok=_0xd.execToken;const _0xp=_0xd.profile||{};_0xprofile(_0xp.username||_0xd.username||_0xu.username,_0xp.age||_0xd.age||_0xu.age,_0xp.bio||_0xd.bio||_0xu.bio,_0xp.image||_0xd.image||_0xu.image);
localStorage.setItem('joltUser',JSON.stringify({username:_0xp.username||_0xd.username||_0xu.username,age:_0xp.age||_0xd.age||_0xu.age,bio:_0xp.bio||_0xd.bio||_0xu.bio,image:_0xp.image||_0xd.image||_0xu.image,password:_0xu.password||'',sessionId:_0xd.sessionId,execToken:_0xd.execToken}));
}
}catch{_0xprofile(_0xu.username,_0xu.age,_0xu.bio,_0xu.image);}
}
};
function _0xprofile(u,a,b,i){
document.getElementById('loginForm').style.display='none';
document.getElementById('signupForm').style.display='none';
document.getElementById('profileSection').style.display='block';
document.getElementById('chatSection').style.display='none';
document.getElementById('profileUsername').innerText=u;
document.getElementById('profileAge').innerText=a||'';
document.getElementById('profileBio').innerText=b||'';
_0xuser=u;_0xage=a||'';_0xbio=b||'';_0ximg=i||'branding/image.png';
document.getElementById('profileImgPreview').src=_0ximg;
document.getElementById('profileImgPreview').style.display='inline-block';
document.getElementById('chatUserName').innerText=u;
document.getElementById('chatUserImg').src=_0ximg;
document.getElementById('editArea').style.display='none';
localStorage.setItem('joltUser',JSON.stringify({username:u,age:a,bio:b,image:_0ximg,password:localStorage.getItem('joltUser')?JSON.parse(localStorage.getItem('joltUser')).password:''}));
}
document.getElementById('editProfileBtn').onclick=function(){
document.getElementById('editArea').style.display='block';
document.getElementById('editAge').value=_0xage;
document.getElementById('editBio').value=_0xbio;
};
document.getElementById('saveProfileBtn').onclick=async function(){
_0xage=document.getElementById('editAge').value;_0xbio=document.getElementById('editBio').value;
const _0xu={username:_0xuser,age:_0xage,bio:_0xbio,image:_0ximg};
const _0xls=localStorage.getItem('joltUser');
const _0xid=_0xls?JSON.parse(_0xls).sessionId:_0xsid;
try{
const _0xr=await _0xs('/profile/update',{method:'POST',headers:{'X-Session-Id':_0xid||''},body:_0xu});
const _0xd=await _0xr.json();
if(_0xd.message&&_0xd.message.includes('Unauthorized')){alert('Session expired. Please login again.');_0xlogout();return;}
_0xprofile(_0xuser,_0xd.profile?.age||_0xd.age,_0xd.profile?.bio||_0xd.bio,_0xd.profile?.image||_0xd.image);
}catch(e){console.error('Profile update error:',e);_0xprofile(_0xuser,_0xage,_0xbio,_0ximg);}
};
document.getElementById('cancelEditBtn').onclick=function(){document.getElementById('editArea').style.display='none';};
function _0xsignup(){document.getElementById('loginForm').style.display='none';document.getElementById('signupForm').style.display='block';document.getElementById('signupResult').innerText='';}
function _0xlogin(){document.getElementById('signupForm').style.display='none';document.getElementById('loginForm').style.display='block';document.getElementById('loginResult').innerText='';}
function _0xlogout(){
_0xstop();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
document.getElementById('profileSection').style.display='none';
document.getElementById('chatSection').style.display='none';
document.getElementById('loginForm').style.display='block';
document.getElementById('loginUsername').value='';
document.getElementById('loginPassword').value='';
document.getElementById('loginResult').innerText='';
localStorage.removeItem('joltUser');
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
}
window.switchToSignup=_0xsignup;
window.switchToLogin=_0xlogin;
function _0xbanner(m,s,l){
const _0xb=document.getElementById('moderationBanner');
const _0xt=document.getElementById('moderationBannerText');
const _0xc=document.getElementById('strikeCounter');
const _0xsp=document.getElementById('strikeCount');
if(!_0xb||!_0xt)return;_0xt.innerText=m;
if(s!==null){
_0xstrikes+=s?1:0;_0xsp.innerText=_0xstrikes;_0xc.style.display='inline-block';
if(l==='warning'||_0xstrikes===1){_0xb.style.background='#fffde7';_0xb.style.color='#bfa710';_0xb.style.border='1.5px solid #ffc107';}
else if(l==='kick'||_0xstrikes===2){_0xb.style.background='#ffe0b2';_0xb.style.color='#c25c00';_0xb.style.border='1.5px solid #ff9800';}
else if(l==='ban'||_0xstrikes>=3){_0xb.style.background='#ffebee';_0xb.style.color='#b71c1c';_0xb.style.border='1.5px solid #f44336';}
}else{_0xc.style.display='none';_0xb.style.background='#fff4e5';_0xb.style.color='#b71c1c';_0xb.style.border='1.5px solid #f44336';}
_0xb.style.opacity=0;_0xb.style.display='block';
setTimeout(()=>{_0xb.style.transition='opacity 0.33s';_0xb.style.opacity=1;},10);
if(window.bannerTimer)clearTimeout(window.bannerTimer);
window.bannerTimer=setTimeout(()=>{_0xb.style.opacity=0;setTimeout(()=>{_0xb.style.display='none';_0xt.innerText='';_0xc.style.display='none';},350);},4000);
}
document.addEventListener('DOMContentLoaded',()=>{
const _0xbtn=document.getElementById('bannerCloseBtn');
if(_0xbtn){
_0xbtn.onclick=function(){
const _0xb=document.getElementById('moderationBanner');
_0xb.style.opacity=0;
setTimeout(()=>{_0xb.style.display='none';document.getElementById('moderationBannerText').innerText='';document.getElementById('strikeCounter').style.display='none';},350);
};
}
});
function _0xcreate(){
_0xpeer=new RTCPeerConnection(_0xice);
if(_0xstream){
_0xstream.getTracks().forEach(t=>{_0xpeer.addTrack(t,_0xstream);});
}else{console.error('No webcam stream available!');}
_0xpeer.ontrack=(e)=>{
const _0xv=document.getElementById('remoteVideo');
if(_0xv&&e.streams[0]){_0xv.srcObject=e.streams[0];}
};
_0xpeer.onicecandidate=(e)=>{
if(e.candidate&&_0xsocket){_0xsocket.emit('webrtc-ice-candidate',{candidate:e.candidate,from:_0xuser});}
};
_0xpeer.onconnectionstatechange=()=>{
if(_0xpeer.connectionState==='connected'){console.log('WebRTC connected!');}
};
return _0xpeer;
}
async function _0xoffer(){
try{
const _0xo=await _0xpeer.createOffer();
await _0xpeer.setLocalDescription(_0xo);
_0xsocket.emit('webrtc-offer',{offer:_0xo,from:_0xuser});
}catch(e){console.error('Error creating offer:',e);}
}
async function _0xhandleoffer(o,f){
try{
if(!_0xpeer)_0xcreate();
await _0xpeer.setRemoteDescription(new RTCSessionDescription(o));
const _0xa=await _0xpeer.createAnswer();
await _0xpeer.setLocalDescription(_0xa);
_0xsocket.emit('webrtc-answer',{answer:_0xa,from:_0xuser,to:f});
}catch(e){console.error('Error handling offer:',e);}
}
async function _0xhandleanswer(a){
try{
await _0xpeer.setRemoteDescription(new RTCSessionDescription(a));
}catch(e){console.error('Error handling answer:',e);}
}
async function _0xhandleice(c){
try{
if(_0xpeer){await _0xpeer.addIceCandidate(new RTCIceCandidate(c));}
}catch(e){console.error('Error adding ICE candidate:',e);}
}
function _0xclose(){
if(_0xpeer){_0xpeer.close();_0xpeer=null;}
const _0xv=document.getElementById('remoteVideo');
if(_0xv){_0xv.srcObject=null;}
}
function _0xstart(){
const _0xv=document.getElementById('localVideo');
return navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(s=>{
_0xstream=s;_0xv.srcObject=s;return s;
}).catch(e=>{
let msg='Camera/Microphone access denied. Please allow permissions in your browser settings and refresh the page.';
if(e.name==='NotAllowedError'||e.name==='PermissionDeniedError')msg='Permission denied! Click the camera icon in your browser address bar to allow access, then refresh.';
else if(e.name==='NotFoundError')msg='No camera/microphone found. Please connect a device and refresh.';
else if(e.name==='NotReadableError')msg='Camera/microphone is in use by another app. Close it and try again.';
alert(msg);
throw e;
});
}
function _0xstop(){
const _0xv=document.getElementById('localVideo');
if(_0xstream){
_0xstream.getTracks().forEach(t=>{t.stop();});
_0xstream=null;
}
if(window.webcamInterval){clearInterval(window.webcamInterval);window.webcamInterval=null;}
}
function _0xframe(){
if(window.webcamInterval)clearInterval(window.webcamInterval);
window.webcamInterval=setInterval(()=>{
try{
const _0xv=document.getElementById('localVideo');
if(_0xv&&_0xstream&&_0xsocket){
const _0xc=document.createElement('canvas');
_0xc.width=_0xv.videoWidth||320;
_0xc.height=_0xv.videoHeight||240;
const _0xctx=_0xc.getContext('2d');
_0xctx.drawImage(_0xv,0,0,_0xc.width,_0xc.height);
const _0xf=_0xc.toDataURL('image/jpeg',0.4);
_0xsocket.emit('moderate-frame',{username:_0xuser,frame:_0xf});
}
}catch{}
},2000);
}
document.getElementById('checkBtn').onclick=async function(){
try{
const _0xr=await fetch(`${_0x}/health`);
const _0xd=await _0xr.json();
document.getElementById('result').innerText=_0xd.status;
}catch(e){
document.getElementById('result').innerText="Could not connect to backend. Is your server running?";
}
};
document.getElementById('loginForm').onsubmit=async function(e){
e.preventDefault();
const _0xu=document.getElementById('loginUsername').value;
const _0xp=document.getElementById('loginPassword').value;
try{
const _0xr=await _0xs('/login',{method:'POST',body:{username:_0xu,password:_0xp}});
const _0xd=await _0xr.json();
document.getElementById('loginResult').innerText=_0xd.message;
if(_0xd.message&&_0xd.message.startsWith('Login successful')){
_0xsid=_0xd.sessionId;_0xtok=_0xd.execToken;
const _0xp=_0xd.profile||{};
localStorage.setItem('joltUser',JSON.stringify({username:_0xu,password:_0xp,age:_0xp.age||'',bio:_0xp.bio||'',image:_0xp.image||'',sessionId:_0xd.sessionId,execToken:_0xd.execToken}));
_0xprofile(_0xp.username||_0xu,_0xp.age||'',_0xp.bio||'',_0xp.image||'');
}
}catch(e){console.error('Login error:',e);document.getElementById('loginResult').innerText='Could not reach backend. Try again.';}
};
document.getElementById('signupForm').onsubmit=async function(e){
e.preventDefault();
const _0xu=document.getElementById('signupUsername').value;
const _0xp=document.getElementById('signupPassword').value;
const _0xa=document.getElementById('signupAge').value;
const _0xb=document.getElementById('signupBio').value;
try{
const _0xr=await _0xs('/signup',{method:'POST',body:{username:_0xu,password:_0xp,age:_0xa,bio:_0xb}});
const _0xd=await _0xr.json();
document.getElementById('signupResult').innerText=_0xd.message;
if(_0xd.message&&_0xd.message.startsWith('Signup successful'))setTimeout(()=>_0xlogin(),1300);
}catch(e){console.error('Signup error:',e);document.getElementById('signupResult').innerText='Could not reach backend. Try again.';}
};
document.getElementById('profileImgInput').addEventListener('change',function(e){
const _0xf=e.target.files[0];
if(!_0xf)return;
const _0xr=new FileReader();
_0xr.onload=async function(evt){
_0ximg=evt.target.result;
document.getElementById('profileImgPreview').src=_0ximg;
document.getElementById('profileImgPreview').style.display='inline-block';
document.getElementById('chatUserImg').src=_0ximg;
const _0xu=JSON.parse(localStorage.getItem('joltUser')||'{}');
_0xu.image=_0ximg;
localStorage.setItem('joltUser',JSON.stringify(_0xu));
try{
const _0xls=localStorage.getItem('joltUser');
const _0xid=_0xls?JSON.parse(_0xls).sessionId:_0xsid;
await _0xs('/profile/update',{method:'POST',headers:{'X-Session-Id':_0xid||''},body:{username:_0xuser,image:_0ximg}});
}catch(e){console.error('Image update error:',e);}
};
_0xr.readAsDataURL(_0xf);
});
document.getElementById('joinChatBtn').onclick=async function(){
const _0xls=localStorage.getItem('joltUser');
if(_0xls){
const _0xu=JSON.parse(_0xls);
_0xsid=_0xu.sessionId||_0xsid;
_0xtok=_0xu.execToken||_0xtok;
}
if(!_0xsocket){
_0xsocket=io(_0x,{auth:{sessionId:_0xsid,execToken:_0xtok},transports:['websocket','polling']});
}
_0xsocket.on('imageRejected',function(d){_0xbanner(d.message||"Unsafe image!",d.strike,d.level);});
_0xsocket.on('audioRejected',function(d){_0xbanner(d.message||"Unsafe audio!",d.strike,'warning');});
_0xsocket.on('content-warning',function(d){_0xbanner(d.message||"Content warning issued.",0,'warning');});
_0xsocket.on('kicked',function(d){
_0xbanner(d.message||"You have been kicked.",1,'kick');
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
_0xstop();_0xclose();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
});
_0xsocket.on('ai-banned',(d)=>{
_0xbanner(d.message||"You were banned.",3,'ban');
alert(d.reason||d.message||"Account banned due to unsafe content.");
_0xstop();_0xclose();
document.getElementById('chatStatus').innerText='Account banned due to unsafe content.';
document.getElementById('chatMessages').innerHTML+='<div style="color:#f44336;font-weight:bold;">You have been banned due to unsafe content.</div>';
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
});
_0xsocket.on('waiting',()=>{document.getElementById('chatStatus').innerText='Waiting for someone to join...';});
_0xsocket.on('matched',n=>{
document.getElementById('chatPartner').innerText=n;
document.getElementById('chatStatus').innerText='Chat started! Say hi or Skip.';
_0xpartner=n;
});
_0xsocket.on('chatMsg',m=>{
const _0xd=document.createElement('div');
_0xd.innerText=m;
document.getElementById('chatMessages').appendChild(_0xd);
});
_0xsocket.on('chatEnded',()=>{
document.getElementById('chatStatus').innerText='Chat ended by partner.';
document.getElementById('chatMessages').innerHTML+='<div><em>Your partner ended the chat.</em></div>';
_0xstop();_0xclose();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
});
_0xsocket.on('start-webrtc',(d)=>{
if(_0xstream){_0xcreate();if(d.initiator)setTimeout(()=>_0xoffer(),1500);}else{console.error('Webcam not ready for WebRTC!');}
});
_0xsocket.on('webrtc-offer',(d)=>{_0xhandleoffer(d.offer,d.from);});
_0xsocket.on('webrtc-answer',(d)=>{_0xhandleanswer(d.answer);});
_0xsocket.on('webrtc-ice-candidate',(d)=>{_0xhandleice(d.candidate);});
document.getElementById('profileSection').style.display='none';
document.getElementById('chatSection').style.display='block';
document.getElementById('chatMessages').innerHTML='';
document.getElementById('chatPartner').innerText='Waiting...';
document.getElementById('chatStatus').innerText='Starting webcam...';
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
try{
await _0xstart();
document.getElementById('chatStatus').innerText='Connecting...';
_0xsocket.emit('joinChat',_0xuser);
_0xframe();
}catch(e){
document.getElementById('chatStatus').innerText='Webcam error. Please refresh.';
console.error('Webcam error:',e);
}
};
document.getElementById('chatForm').onsubmit=function(e){
e.preventDefault();
if(!_0xsocket)return;
const _0xm=document.getElementById('chatInput').value;
if(!_0xm.trim())return;
_0xsocket.emit('chatMsg',_0xuser+': '+_0xm);
document.getElementById('chatInput').value='';
};
document.getElementById('endChatBtn').onclick=function(){
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
if(_0xsocket)_0xsocket.emit('endChat');
document.getElementById('chatMessages').innerHTML+='<div><em>You ended the chat.</em></div>';
document.getElementById('chatStatus').innerText='Chat ended.';
_0xstop();_0xclose();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
};
document.getElementById('homeBtn').onclick=function(){
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
_0xstop();_0xclose();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
document.getElementById('chatSection').style.display='none';
document.getElementById('profileSection').style.display='block';
document.getElementById('chatStatus').innerText='';
document.getElementById('chatMessages').innerHTML='';
};
document.getElementById('skipChatBtn').onclick=function(){
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
if(_0xskip)return;
_0xskip=true;
_0xstop();_0xclose();
if(_0xsocket)_0xsocket.emit('endChat');
document.getElementById('chatStatus').innerText='Skipping chat...';
document.getElementById('chatMessages').innerHTML+='<div><em>You skipped this chat.</em></div>';
setTimeout(()=>{
_0xskip=false;
if(!_0xsocket){
_0xsocket=io(_0x,{auth:{sessionId:_0xsid,execToken:_0xtok},transports:['websocket','polling']});
}
_0xsocket.emit('joinChat',_0xuser);
_0xstart();_0xframe();
document.getElementById('chatStatus').innerText='Looking for new partner...';
document.getElementById('chatMessages').innerHTML+='<div><em>Finding new partner...</em></div>';
},600);
};
document.getElementById('logoutBtn').onclick=_0xlogout;
document.getElementById('logoutBtnChat').onclick=function(){
_0xlogout();
document.getElementById('chatSection').style.display='none';
document.getElementById('profileSection').style.display='none';
document.getElementById('loginForm').style.display='block';
_0xstrikes=0;
document.getElementById('strikeCount').innerText=_0xstrikes;
document.getElementById('strikeCounter').style.display='none';
_0xstop();_0xclose();
if(_0xsocket){_0xsocket.disconnect();_0xsocket=null;}
};
document.getElementById('reportBtn').onclick=async function(){
if(!_0xpartner)return alert('No user to report.');
if(!confirm('Are you sure you want to report this user?'))return;
const _0xr=prompt('Reason for report? (optional)');
const _0xls=localStorage.getItem('joltUser');
const _0xid=_0xls?JSON.parse(_0xls).sessionId:_0xsid;
try{
const _0xres=await _0xs('/report',{method:'POST',headers:{'X-Session-Id':_0xid||''},body:{reported:_0xpartner,reason:_0xr||''}});
const _0xd=await _0xres.json();
if(_0xd.message&&_0xd.message.includes('Unauthorized')){alert('Session expired. Please login again.');_0xlogout();return;}
alert('Report sent. Thank you for helping us improve JOLT!');
}catch(e){console.error('Report error:',e);alert('Could not send report. Try again later.');}
};
document.getElementById('blockBtn').onclick=async function(){
if(!_0xpartner)return alert('No user to block.');
if(!confirm('Block this user? You will never be matched again.'))return;
const _0xls=localStorage.getItem('joltUser');
const _0xid=_0xls?JSON.parse(_0xls).sessionId:_0xsid;
try{
const _0xres=await _0xs('/block',{method:'POST',headers:{'X-Session-Id':_0xid||''},body:{blocked:_0xpartner}});
const _0xd=await _0xres.json();
if(_0xd.message&&_0xd.message.includes('Unauthorized')){alert('Session expired. Please login again.');_0xlogout();return;}
alert('User blocked.');
if(_0xsocket)_0xsocket.emit('endChat');
}catch(e){console.error('Block error:',e);alert('Could not block user. Try again later.');}
};
document.getElementById('fullscreenBtn').onclick=function(){
const _0xc=document.getElementById('videoContainer');
if(!document.fullscreenElement){
if(_0xc.requestFullscreen)_0xc.requestFullscreen();
else if(_0xc.webkitRequestFullscreen)_0xc.webkitRequestFullscreen();
else if(_0xc.msRequestFullscreen)_0xc.msRequestFullscreen();
}else{
if(document.exitFullscreen)document.exitFullscreen();
else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
else if(document.msExitFullscreen)document.msExitFullscreen();
}
};
function _0xcookie(){
localStorage.setItem('cookieConsent','true');
document.getElementById('cookieConsent').style.display='none';
}
window.acceptCookies=_0xcookie;
if(!localStorage.getItem('cookieConsent')){
document.getElementById('cookieConsent').style.display='block';
}
if(window.adsbygoogle)(window.adsbygoogle=window.adsbygoogle||[]).push({});
})();
