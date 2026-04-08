// ── KPI Counter Animation ──
function animateCounters() {
    const counters = document.querySelectorAll('.kpi-value');
    counters.forEach(counter => {
        const target  = parseFloat(counter.dataset.target);
        const decimal = parseInt(counter.dataset.decimal) || 0;
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            const current  = eased * target;
            counter.textContent = decimal > 0 ? current.toFixed(decimal) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when KPIs scroll into view
const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            kpiObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const kpiGrid = document.querySelector('.kpi-grid');
if (kpiGrid) kpiObserver.observe(kpiGrid);

// ── Chart.js Shared Config ──
const C = {
    gold:        '#c8902a',
    goldLight:   'rgba(200, 144, 42, 0.15)',
    brown:       '#8b5e1a',
    brownLight:  'rgba(139, 94, 26, 0.15)',
    green:       '#27ae60',
    blue:        '#2980b9',
    orange:      '#e67e22',
    red:         '#e74c3c',
};

Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#8b7355';

// ── Revenue Bar Chart ──
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
    const monthlyData   = [2.8, 3.1, 3.5, 4.2, 5.1, 4.8, 5.5, 4.9, 5.2, 4.6, 3.8, 4.0];
    const quarterlyData = [9.4, 14.1, 15.6, 12.4];

    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
            datasets: [{
                label: 'Doanh thu',
                data: monthlyData,
                backgroundColor: C.goldLight,
                borderColor: C.gold,
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: C.gold,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2c1c08',
                    titleFont: { weight: '600' },
                    callbacks: {
                        label: (ctx) => ctx.parsed.y + ' tỷ VNĐ'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(139, 94, 26, 0.08)' },
                    ticks: { callback: (v) => v + ' tỷ' }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // Tab switching: Monthly / Quarterly
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.dataset.period === 'quarterly') {
                revenueChart.data.labels = ['Q1','Q2','Q3','Q4'];
                revenueChart.data.datasets[0].data = quarterlyData;
            } else {
                revenueChart.data.labels = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
                revenueChart.data.datasets[0].data = monthlyData;
            }
            revenueChart.update();
        });
    });
}

// ── Project Type Doughnut Chart ──
const typeCtx = document.getElementById('projectTypeChart');
if (typeCtx) {
    new Chart(typeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Nhà gỗ 3 gian','Nhà gỗ 5 gian','Nhà thờ họ','Nhà sàn','Đình/Chùa','Khác'],
            datasets: [{
                data: [35, 25, 18, 10, 8, 4],
                backgroundColor: [C.gold, C.brown, C.green, C.blue, C.orange, C.red],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        pointStyleWidth: 10,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: '#2c1c08',
                    callbacks: {
                        label: (ctx) => ctx.label + ': ' + ctx.parsed + '%'
                    }
                }
            }
        }
    });
}

// ── Growth Line Chart (năm nay vs năm trước) ──
const growthCtx = document.getElementById('growthChart');
if (growthCtx) {
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
            datasets: [
                {
                    label: 'Năm nay',
                    data: [2.8, 3.1, 3.5, 4.2, 5.1, 4.8, 5.5, 4.9, 5.2, 4.6, 3.8, 4.0],
                    borderColor: C.gold,
                    backgroundColor: C.goldLight,
                    borderWidth: 2.5,
                    pointBackgroundColor: C.gold,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Năm trước',
                    data: [2.1, 2.4, 2.8, 3.0, 3.6, 3.4, 3.9, 3.5, 3.7, 3.2, 2.9, 3.1],
                    borderColor: C.brown,
                    backgroundColor: C.brownLight,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: C.brown,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    tension: 0.4,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        pointStyleWidth: 10,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: '#2c1c08',
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (ctx) => ctx.dataset.label + ': ' + ctx.parsed.y + ' tỷ VNĐ'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(139, 94, 26, 0.08)' },
                    ticks: { callback: (v) => v + ' tỷ' }
                },
                x: { grid: { display: false } }
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false }
        }
    });
}

// ── Region Horizontal Bar Chart ──
const regionCtx = document.getElementById('regionChart');
if (regionCtx) {
    new Chart(regionCtx, {
        type: 'bar',
        data: {
            labels: ['Hà Nội','TP.HCM','Đà Nẵng','Hải Phòng','Nghệ An','Thanh Hóa','Quảng Ninh','Khác'],
            datasets: [{
                label: 'Số dự án',
                data: [42, 18, 12, 9, 8, 7, 6, 15],
                backgroundColor: C.goldLight,
                borderColor: C.gold,
                borderWidth: 2,
                borderRadius: 4,
                hoverBackgroundColor: C.gold,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2c1c08',
                    callbacks: {
                        label: (ctx) => ctx.parsed.x + ' dự án'
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(139, 94, 26, 0.08)' },
                    ticks: { callback: (v) => v + ' DA' }
                },
                y: { grid: { display: false } }
            }
        }
    });
}

// ── Toast Notification ──
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ── Active Nav Link ──
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ── Scroll To Top ──
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Dark Mode Toggle ──
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme',
            document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        );
    });
}

// ── Export Button ──
const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        showToast('Đang xuất báo cáo PDF...', 'info');
        setTimeout(() => showToast('Xuất báo cáo thành công!', 'success'), 2000);
    });
}

// ── Print ──
const printBtn = document.getElementById('printBtn');
if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
}