
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

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const ham = document.getElementById('hamburger');
    const overlay = document.getElementById('navOverlay');
    nav.classList.toggle('open');
    ham.classList.toggle('active');
    overlay.classList.toggle('show');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navOverlay').classList.remove('show');
    document.body.style.overflow = '';
}

function toggleFaq(el) {
    const isOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) el.classList.add('open');
}

function updateCountdown() {
    const end = new Date('2025-04-30T23:59:59');
    const now = new Date();
    let diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86400000); diff %= 86400000;
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000); diff %= 60000;
    const s = Math.floor(diff / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

function searchHouse() {
    alert('Chức năng đang cập nhật. Vui lòng gọi hotline 0901 234 567!');
}
function sendForm(e) {
    e.preventDefault();
    alert('✅ Gửi thành công! Chúng tôi sẽ liên hệ lại trong 30 phút.');
    e.target.reset();
}

