/* Bộ chạy chung cho trang bài test (BÌNH 04/11/2026).
 * Trang khai báo window.BAI trước khi nạp file này:
 *   ma, nguonMacDinh, linkNhom, chuNutNhom, chuNutGui,
 *   cauHoi:[{hoi, xem?, anh?:true, lua:[{k, chu, anh?}]}],
 *   ma_hoa(tra)->'ABC..', giai_ma(code)->tra|null,
 *   tom_tat(tra)->html (hiện ngay trên trang), day_du(tra)->html (link trong email), chu_ngan(tra)->text (ghi Sheet)
 * Luồng: làm câu hỏi -> điền tên + email (+ Zalo) -> hiện kết quả tóm tắt + nút vào nhóm + email gửi link kết quả đầy đủ.
 * ?kq=<mã đáp án> : mở thẳng kết quả đầy đủ (link trong email).
 */
var API = "https://script.google.com/macros/s/AKfycbyk5OId1qNFx3spEcH2wGa3Ol1vGTr70MWSznrmfQAs_xquEYk13xCO2xxFyOIOpIJ2sQ/exec";
/* Xem thử trên máy (localhost / file) hoặc ?xemthu=1: KHÔNG gửi đi đâu */
if (/^(localhost|127\.0\.0\.1|)$/.test(location.hostname) || /[?&]xemthu=1/.test(location.search)) API = "";

(function(){
  var B = window.BAI, $ = function(id){ return document.getElementById(id); };
  var NGUON = ((location.search.match(/[?&]nguon=([A-Za-z0-9-]{1,20})/) || [])[1] || B.nguonMacDinh).toLowerCase();
  var tra = [], i = 0, n = B.cauHoi.length;

  function laDienThoai(){
    var ua = navigator.userAgent || '';
    if (/Android|iPhone|iPod|iPad|Windows Phone/i.test(ua)) return true;
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
    return !!(window.matchMedia && window.matchMedia('(pointer:coarse)').matches && window.innerWidth < 900);
  }
  function hienNhom(ma){
    var nut = $('nutNhom'); nut.href = B.linkNhom;
    nut.addEventListener('click', function(){ if (API && ma) (new Image()).src = API + '?bam=' + encodeURIComponent(ma); });
    if (!laDienThoai()){
      $('qrNhom').src = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=8&data=' + encodeURIComponent(B.linkNhom);
      $('qrBox').style.display = 'block';
    }
  }

  /* ---------- mở bằng link kết quả trong email ---------- */
  var kq = (location.search.match(/[?&]kq=([A-Za-z]{1,20})/) || [])[1];
  var traKq = kq ? B.giai_ma(kq.toUpperCase()) : null;
  if (traKq){
    $('khuGioiThieu').style.display = 'none';
    $('test').style.display = 'none';
    $('khuDayDu').innerHTML = B.day_du(traKq);
    $('khuKetQua').style.display = 'block';
    $('khuTomTat').style.display = 'none';
    $('emailNote').style.display = 'none';
    $('loiChao').textContent = 'Kết quả đầy đủ của bạn';
    hienNhom('');
    return;
  }

  /* ---------- câu hỏi ---------- */
  function ve(){
    var c = B.cauHoi[i];
    $('soCau').textContent = 'Câu ' + (i + 1) + '/' + n;
    $('phanTram').textContent = Math.round(i / n * 100) + '%';
    $('thanh').style.width = (i / n * 100) + '%';
    $('hoi').textContent = c.hoi;
    $('xem').style.display = c.xem ? 'block' : 'none';
    $('xem').innerHTML = c.xem ? '👀 <b>Xem ở đâu:</b> ' + c.xem : '';
    var l = $('lua'); l.innerHTML = ''; l.className = 'lua' + (c.anh ? ' anh' : '');
    c.lua.forEach(function(o){
      var b = document.createElement('button'); b.type = 'button';
      if (tra[i] === o.k) b.className = 'chon';
      b.innerHTML = (o.anh ? '<img src="' + o.anh + '" alt="">' : '') +
        (c.anh ? '<span class="ct"><span class="k">' + o.k + '</span><span>' + o.chu + '</span></span>'
               : '<span class="k">' + (o.nhan || o.k) + '</span><span>' + o.chu + '</span>');
      b.addEventListener('click', function(){
        tra[i] = o.k; b.className = 'chon';
        setTimeout(function(){ if (i < n - 1){ i++; ve(); } else xong(); }, 220);
      });
      l.appendChild(b);
    });
    $('nutLui').style.visibility = i > 0 ? 'visible' : 'hidden';
  }
  $('nutLui').addEventListener('click', function(){ if (i > 0){ i--; ve(); } });
  $('nutBatDau') && $('nutBatDau').addEventListener('click', function(){ $('test').scrollIntoView({behavior:'smooth'}); });

  function xong(){
    $('thanh').style.width = '100%';
    $('khuHoi').style.display = 'none';
    $('khuForm').style.display = 'block';
    $('test').scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(function(){ $('ten').focus({preventScroll:true}); }, 400);
  }
  $('lamLai').addEventListener('click', function(){
    $('khuForm').style.display = 'none'; $('khuHoi').style.display = 'block'; i = 0; tra = []; ve();
  });
  ve();

  /* ---------- form ---------- */
  var f = $('f'), btn = $('btn'), msg = $('msg');
  function bao(chu){ msg.className = 'msg no'; msg.innerHTML = chu; }
  function hopLeEmail(v){ return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v); }
  function chuanSdt(v){ return v.replace(/[\s.\-()]/g, '').replace(/^\+?84/, '0'); }

  function moKetQua(ten, email, ma, daGuiThu){
    $('khuTomTat').innerHTML = B.tom_tat(tra);
    $('loiChao').textContent = ten + ' ơi, đây là kết quả của bạn';
    $('emailDaGui').textContent = email;
    if (!daGuiThu) $('emailNote').style.display = 'none';
    hienNhom(ma);
    $('test').style.display = 'none';
    $('khuKetQua').style.display = 'block';
    $('khuKetQua').scrollIntoView({behavior:'smooth', block:'start'});
  }

  f.addEventListener('submit', function(ev){
    ev.preventDefault();
    var ten = $('ten'), sdt = $('sdt'), email = $('email'), dongy = $('dongy'), agreeBox = $('agreeBox');
    [ten, sdt, email].forEach(function(o){ o.classList.remove('err'); });
    agreeBox.classList.remove('err-box');
    var s = chuanSdt(sdt.value);
    if (!ten.value.trim()){ ten.classList.add('err'); ten.focus(); return bao('Bạn cho Hoa xin tên với nhé.'); }
    if (!hopLeEmail(email.value.trim())){ email.classList.add('err'); email.focus(); return bao('Email chưa đúng, bạn kiểm tra lại giúp Hoa nhé — kết quả đầy đủ gửi về email này.'); }
    if (s && !/^0\d{9}$/.test(s)){ sdt.classList.add('err'); sdt.focus(); return bao('Số Zalo chưa đúng — bạn ghi đủ 10 số (ví dụ 0912 345 678), hoặc để trống cũng được.'); }
    if (!dongy.checked){ agreeBox.classList.add('err-box'); dongy.focus(); return bao('Bạn tick ô đồng ý giúp Hoa nhé — có vậy Hoa mới được gửi kết quả cho bạn.'); }

    var duLieu = { ten: ten.value.trim(), sdt: s, email: email.value.trim().toLowerCase(), nguon: NGUON, dongy: true,
                   qua: B.ma, kq: B.ma_hoa(tra), tomtat: B.chu_ngan(tra) };
    if (!API) return moKetQua(duLieu.ten, duLieu.email, '', true);
    btn.disabled = true; btn.textContent = 'Đang gửi…';
    fetch(API, { method:'POST', headers:{ 'Content-Type':'text/plain;charset=utf-8' }, body: JSON.stringify(duLieu) })
      .then(function(r){ return r.json(); })
      .then(function(d){
        if (d && d.ok) moKetQua(duLieu.ten, duLieu.email, d.ma || '', !!d.daGuiThu);
        else { btn.disabled = false; btn.textContent = B.chuNutGui; bao((d && d.thongDiep) || 'Có trục trặc, bạn thử lại giúp Hoa nhé.'); }
      })
      .catch(function(){ moKetQua(duLieu.ten, duLieu.email, '', false); });   /* mạng lỗi: vẫn cho xem kết quả + vào nhóm */
  });
})();
