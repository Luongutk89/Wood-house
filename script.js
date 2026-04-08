
function getOpt(id) {
    const el = document.getElementById(id);
    return el.options[el.selectedIndex].text;
}
function searchHouse() {
    const wood = document.getElementById('woodType').value;
    const style = document.getElementById('style').value;
    const area = document.getElementById('area').value;
    let msg = 'Đang tìm kiếm';
    if (wood) msg += ' gỗ ' + getOpt('woodType');
    if (style) msg += ', kiểu ' + getOpt('style');
    if (area) msg += ', diện tích ' + area + 'm²';
    alert(msg + '…\n(Kết nối backend để hiển thị kết quả thực tế)');
}
function sendForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = '✅ Đã gửi! Chúng tôi sẽ liên hệ sớm';
    btn.style.background = '#3a6b35';
    setTimeout(() => { btn.textContent = '📨 Gửi yêu cầu tư vấn'; btn.style.background = ''; e.target.reset(); }, 3000);
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});
