/* Bước để lại tên + Zalo cho các trang quà (giữ luồng chị chốt 12/11) — BÌNH 24/11/2026.
   Trang cần: #cong (form #f, #ten #sdt #email #dongy #agreeBox #btn #msg), #noiDung (ruột quà, class "an"),
   nút [data-chep="id"] để chép chữ. Nguồn mặc định: <body data-nguon="...">.
   Khách đã điền ở cổng quà / trang quà khác (localStorage dhKhach) thì mở luôn, không phải điền lại. */
(function(){
  var API="https://script.google.com/macros/s/AKfycbyk5OId1qNFx3spEcH2wGa3Ol1vGTr70MWSznrmfQAs_xquEYk13xCO2xxFyOIOpIJ2sQ/exec";
  if (/^(localhost|127\.0\.0\.1|)$/.test(location.hostname) || /[?&]xemthu=1/.test(location.search)) API="";
  var NGUON=((location.search.match(/[?&]nguon=([A-Za-z0-9-]{1,20})/)||[])[1]||document.body.getAttribute('data-nguon')||'qua').toLowerCase();
  function $(id){ return document.getElementById(id); }
  function daDien(){ try{ var c=JSON.parse(localStorage.getItem('dhKhach')||'null'); return !!(c&&c.ten&&c.sdt); }catch(e){ return false; } }
  var cong=$('cong'), noiDung=$('noiDung');
  function mo(){ cong.classList.add('an'); noiDung.classList.remove('an'); }
  if (daDien()) mo();

  var f=$('f'), btn=$('btn'), msg=$('msg'), chuNut=btn.textContent;
  function bao(chu){ msg.className='msg no'; msg.innerHTML=chu; }
  function moKhoa(d){ try{ localStorage.setItem('dhKhach', JSON.stringify({ten:d.ten, sdt:d.sdt, email:d.email})); }catch(e){} mo(); noiDung.scrollIntoView({behavior:'smooth'}); }
  f.addEventListener('submit',function(ev){
    ev.preventDefault();
    var ten=$('ten'), sdt=$('sdt'), email=$('email'), dongy=$('dongy'), agreeBox=$('agreeBox');
    [ten,sdt,email].forEach(function(x){ x.classList.remove('err'); }); agreeBox.classList.remove('err-box');
    var s=sdt.value.replace(/[\s.\-()]/g,'').replace(/^\+?84/,'0');
    if(!ten.value.trim()){ ten.classList.add('err'); ten.focus(); return bao('Bạn cho Hoa xin tên với nhé.'); }
    if(!/^0\d{9}$/.test(s)){ sdt.classList.add('err'); sdt.focus(); return bao('Số Zalo chưa đúng — bạn ghi đủ 10 số giúp Hoa nhé (ví dụ 0912 345 678).'); }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.value.trim())){ email.classList.add('err'); email.focus(); return bao('Email chưa đúng, bạn kiểm tra lại giúp Hoa nhé.'); }
    if(!dongy.checked){ agreeBox.classList.add('err-box'); dongy.focus(); return bao('Bạn tick ô đồng ý giúp Hoa nhé.'); }
    var d={ ten:ten.value.trim(), sdt:s, email:email.value.trim().toLowerCase(), nguon:NGUON, dongy:true };
    if(!API) return moKhoa(d);
    btn.disabled=true; btn.textContent='Đang mở…';
    fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)})
      .then(function(r){ return r.json(); })
      .then(function(k){ if(k&&k.ok) moKhoa(d); else { btn.disabled=false; btn.textContent=chuNut; bao((k&&k.thongDiep)||'Có trục trặc, bạn thử lại giúp Hoa nhé.'); } })
      .catch(function(){ moKhoa(d); });   /* mạng lỗi: không để khách kẹt */
  });

  function chepCu(t){ var a=document.createElement('textarea'); a.value=t; document.body.appendChild(a); a.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(a); }
  document.querySelectorAll('[data-chep]').forEach(function(b){
    b.addEventListener('click',function(){
      var t=$(b.getAttribute('data-chep')).textContent, c=b.textContent;
      var xong=function(){ b.textContent='✅ Đã chép'; setTimeout(function(){ b.textContent=c; },2000); };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(xong,function(){ chepCu(t); xong(); }); }
      else { chepCu(t); xong(); }
    });
  });
})();
