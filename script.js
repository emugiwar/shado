// Dashboard Data
const dashboardData = {
    'unauthorized-status': {
        title: 'حالت غیر مجاز',
        details: [
            { name: 'علی احمدی', id: '12345', department: 'فناوری اطلاعات', issue: 'عدم تایید مدیر' },
            { name: 'مریم حسینی', id: '12346', department: 'منابع انسانی', issue: 'مدارک ناقص' },
            { name: 'محمد کریمی', id: '12347', department: 'مالی', issue: 'در انتظار بررسی' }
        ]
    },
    'incomplete-timecard': {
        title: 'کارت زنی ناقص',
        details: [
            { name: 'زهرا موسوی', id: '12348', department: 'فروش', issue: 'ورود ثبت نشده' },
            { name: 'حسن زارعی', id: '12349', department: 'تولید', issue: 'خروج ثبت نشده' }
        ]
    },
    'pending-missions': {
        title: 'ماموریت‌های منتظر تعیین تکلیف',
        details: [
            { employee: 'رضا نوری', destination: 'تهران', duration: '3 روز', status: 'در انتظار تایید' },
            { employee: 'سارا جلالی', destination: 'اصفهان', duration: '2 روز', status: 'در انتظار بودجه' }
        ]
    }
};

// Chart configurations
const chartConfigs = {
    personnelStatus: {
        type: 'doughnut',
        data: {
            labels: ['فعال', 'غیرفعال', 'مرخصی', 'ماموریت'],
            datasets: [{
                data: [145, 12, 18, 12],
                backgroundColor: [
                    '#27ae60',
                    '#e74c3c',
                    '#f39c12',
                    '#3498db'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Vazir',
                            size: 12
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    },
    settlement: {
        type: 'bar',
        data: {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            datasets: [{
                label: 'تسویه شده',
                data: [12, 19, 15, 21, 18, 23],
                backgroundColor: '#3498db',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            }
        }
    },
    contracts: {
        type: 'line',
        data: {
            labels: ['یک ماه', 'دو ماه', 'سه ماه', 'شش ماه', 'یک سال'],
            datasets: [{
                label: 'قراردادهای منقضی شونده',
                data: [5, 8, 12, 14, 6],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            }
        }
    },
    leave: {
        type: 'pie',
        data: {
            labels: ['استفاده شده', 'باقی‌مانده'],
            datasets: [{
                data: [78, 22],
                backgroundColor: ['#e74c3c', '#95a5a6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Vazir'
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    },
    overtime: {
        type: 'bar',
        data: {
            labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'],
            datasets: [{
                label: 'ساعت کاری',
                data: [8, 8.5, 7.5, 8, 8.5, 7],
                backgroundColor: '#3498db'
            }, {
                label: 'اضافه‌کار',
                data: [2, 1.5, 3, 2.5, 1, 3.5],
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Vazir'
                        }
                    }
                }
            }
        }
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    setupSearch();
    // Start with low priority section collapsed
    const lowPriorityCards = document.getElementById('low-priority-cards');
    if (lowPriorityCards) {
        lowPriorityCards.classList.add('collapsed');
    }
});

// Initialize all charts
function initializeCharts() {
    const charts = {
        'personnelStatusChart': chartConfigs.personnelStatus,
        'settlementChart': chartConfigs.settlement,
        'contractChart': chartConfigs.contracts,
        'leaveChart': chartConfigs.leave,
        'overtimeChart': chartConfigs.overtime
    };

    Object.keys(charts).forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            new Chart(ctx, charts[chartId]);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Modal close functionality
    window.onclick = function(event) {
        const modal = document.getElementById('detailModal');
        if (event.target === modal) {
            closeModal();
        }
    };

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterCards(searchTerm);
        });
    }
}

// Filter cards based on search term
function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const shouldShow = searchTerm === '' || cardText.includes(searchTerm);
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
        }
    });

    // Show/hide sections based on visible cards
    updateSectionVisibility(searchTerm);
}

// Update section visibility based on search results
function updateSectionVisibility(searchTerm) {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const visibleCards = Array.from(section.querySelectorAll('.card')).filter(card => 
            card.style.opacity !== '0.3'
        );
        
        if (searchTerm === '' || visibleCards.length > 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Toggle collapsible sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const toggleIcon = document.getElementById(sectionId.replace('-cards', '-toggle'));
    
    if (section && toggleIcon) {
        section.classList.toggle('collapsed');
        toggleIcon.classList.toggle('rotated');
        
        // Add animation effect
        if (section.classList.contains('collapsed')) {
            setTimeout(() => {
                section.style.maxHeight = '0';
            }, 10);
        } else {
            section.style.maxHeight = '2000px';
        }
    }
}

// Show detail modal
function showDetails(cardType) {
    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (dashboardData[cardType]) {
        modalTitle.textContent = dashboardData[cardType].title;
        modalBody.innerHTML = generateDetailContent(dashboardData[cardType]);
    } else {
        modalTitle.textContent = 'جزئیات';
        modalBody.innerHTML = generateGenericDetailContent(cardType);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

// Generate detail content for modal
function generateDetailContent(data) {
    let content = '<div class="detail-content">';
    
    if (data.details) {
        content += '<table class="detail-table">';
        content += '<thead><tr>';
        
        // Generate table headers based on first item
        const firstItem = data.details[0];
        Object.keys(firstItem).forEach(key => {
            const headerMap = {
                'name': 'نام',
                'id': 'کد پرسنلی',
                'department': 'واحد',
                'issue': 'مسئله',
                'employee': 'کارمند',
                'destination': 'مقصد',
                'duration': 'مدت',
                'status': 'وضعیت'
            };
            content += `<th>${headerMap[key] || key}</th>`;
        });
        
        content += '</tr></thead><tbody>';
        
        // Generate table rows
        data.details.forEach(item => {
            content += '<tr>';
            Object.values(item).forEach(value => {
                content += `<td>${value}</td>`;
            });
            content += '</tr>';
        });
        
        content += '</tbody></table>';
    }
    
    content += '<div class="detail-actions">';
    content += '<button class="action-btn primary" onclick="exportData()">خروجی Excel</button>';
    content += '<button class="action-btn secondary" onclick="printDetails()">چاپ</button>';
    content += '</div>';
    content += '</div>';
    
    return content;
}

// Generate generic detail content
function generateGenericDetailContent(cardType) {
    const contentMap = {
        'general-report': 'گزارش کامل وضعیت پرسنل شامل آمار کلی، تحلیل عملکرد و پیشنهادات بهبود',
        'settlement-report': 'گزارش تفصیلی تسویه‌های سنواتی انجام شده و در انتظار پردازش',
        'contract-status': 'لیست قراردادهای نزدیک به اتمام با جزئیات تاریخ پایان و اقدامات لازم',
        'leave-usage': 'آمار تفصیلی استفاده از مرخصی‌ها بر اساس نوع مرخصی و واحد سازمانی',
        'overtime-report': 'گزارش ساعات کاری و اضافه‌کار پرسنل با تحلیل روندها'
    };
    
    return `
        <div class="generic-detail">
            <p>${contentMap[cardType] || 'جزئیات این بخش در حال آماده‌سازی است.'}</p>
            <div class="detail-stats">
                <div class="stat-item">
                    <span class="stat-label">تعداد کل:</span>
                    <span class="stat-value">${Math.floor(Math.random() * 100) + 1}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">آخرین بروزرسانی:</span>
                    <span class="stat-value">${new Date().toLocaleDateString('fa-IR')}</span>
                </div>
            </div>
            <div class="detail-actions">
                <button class="action-btn primary" onclick="generateReport('${cardType}')">تولید گزارش</button>
                <button class="action-btn secondary" onclick="exportData('${cardType}')">خروجی</button>
            </div>
        </div>
    `;
}

// Close modal
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Refresh dashboard
function refreshDashboard() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const originalContent = refreshBtn.innerHTML;
    
    // Show loading state
    refreshBtn.innerHTML = '<div class="loading"></div> در حال بروزرسانی...';
    refreshBtn.disabled = true;
    
    // Simulate data refresh
    setTimeout(() => {
        // Update random numbers
        updateRandomNumbers();
        
        // Reset button
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
        
        // Show success message
        showNotification('داشبورد با موفقیت بروزرسانی شد', 'success');
    }, 2000);
}

// Update random numbers for demonstration
function updateRandomNumbers() {
    const countElements = document.querySelectorAll('.card-count');
    countElements.forEach(element => {
        if (!isNaN(element.textContent)) {
            const currentValue = parseInt(element.textContent);
            const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
            const newValue = Math.max(0, currentValue + change);
            element.textContent = newValue;
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Position notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Vazir', sans-serif;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export data functionality
function exportData(cardType) {
    showNotification('خروجی در حال آماده‌سازی است...', 'info');
    // Here you would implement actual export functionality
}

// Print details functionality
function printDetails() {
    window.print();
}

// Generate report functionality
function generateReport(cardType) {
    showNotification('گزارش در حال تولید است...', 'info');
    // Here you would implement actual report generation
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'f':
                event.preventDefault();
                document.getElementById('searchInput').focus();
                break;
            case 'r':
                event.preventDefault();
                refreshDashboard();
                break;
        }
    }
});

// Add CSS for notifications and detail tables
const additionalStyles = `
<style>
.detail-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-family: 'Vazir', sans-serif;
}

.detail-table th,
.detail-table td {
    padding: 12px;
    text-align: right;
    border-bottom: 1px solid #ecf0f1;
}

.detail-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
}

.detail-table tr:hover {
    background: #f8f9fa;
}

.detail-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.generic-detail {
    font-family: 'Vazir', sans-serif;
}

.detail-stats {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.stat-label {
    font-size: 0.9rem;
    color: #7f8c8d;
}

.stat-value {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
}

.notification {
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);