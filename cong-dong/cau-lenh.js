/* Nút "Sao chép câu lệnh" — BÌNH 05/11/2026 */
document.querySelectorAll('.chep').forEach(function (nut) {
  nut.addEventListener('click', function () {
    var lenh = document.getElementById(nut.dataset.lenh).innerText.trim();
    function xong() { nut.textContent = '✓ Đã chép — mở Gemini/ChatGPT và dán vào'; nut.classList.add('da');
      setTimeout(function () { nut.textContent = '📋 Sao chép câu lệnh'; nut.classList.remove('da'); }, 3500); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(lenh).then(xong, cu);
    } else cu();
    function cu() {
      var t = document.createElement('textarea'); t.value = lenh; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); try { document.execCommand('copy'); xong(); } catch (e) { alert('Bạn giữ tay vào ô câu lệnh để chép nhé'); }
      document.body.removeChild(t);
    }
  });
});
