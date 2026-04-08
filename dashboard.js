// ── KPI Counter Animation ──
function animateCounters() {
    const counters = document.querySelectorAll('.kpi-value');
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const decimal = parseInt(counter.dataset.decimal) || 0;
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            counter.textContent = decimal > 0 ? current.toFixed(decimal) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when KPIs are visible
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

// ── Chart.js Configuration ──
const chartColors = {
    gold: '#c8902a',
    goldLight: 'rgba(200, 144, 42, 0.15)',
    brown: '#8b5e1a',
    brownLight: 'rgba(139, 94, 26, 0.15)',
    green: '#27ae60',
    blue: '#2980b9',
    orange: '#e67e22',
    red: '#e74c3c',
    cream: '#fdf6ee'
};

Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#6b5a45';

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
    const monthlyData = [2.8, 3.1, 3.5, 4.2, 5.1, 4.8, 5.5, 4.9, 5.2, 4.6, 3.8, 4.0];
    const quarterlyData = [9.4, 14.1, 15.6, 12.4];

    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Doanh thu',
                data: monthlyData,
                backgroundColor: chartColors.goldLight,
                borderColor: chartColors.gold,
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: chartColors.gold,
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
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Tab switching
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.dataset.period === 'quarterly') {
                revenueChart.data.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
                revenueChart.data.datasets[0].data = quarterlyData;
            } else {
                revenueChart.data.labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
                revenueChart.data.datasets[0].data = monthlyData;
            }
            revenueChart.update();
        });
    });
}

// Project Type Doughnut Chart
const typeCtx = document.getElementById('projectTypeChart');
if (typeCtx) {
    new Chart(typeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Nhà gỗ 3 gian', 'Nhà gỗ 5 gian', 'Nhà thờ họ', 'Nhà sàn', 'Đình/Chùa', 'Khác'],
            datasets: [{
                data: [35, 25, 18, 10, 8, 4],
                backgroundColor: [
                    chartColors.gold,
                    chartColors.brown,
                    chartColors.green,
                    chartColors.blue,
                    chartColors.orange,
                    chartColors.red
                ],
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
