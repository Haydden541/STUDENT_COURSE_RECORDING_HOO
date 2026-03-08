/**
 * HOO 课堂反馈工具 - 核心逻辑
 */

const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');
const teacherInput = document.getElementById('teacherInput');
const currentDateInput = document.getElementById('currentDate');

function init() {
    // 1. 初始化数据
    if (typeof studentData !== 'undefined') {
        studentSelect.innerHTML = '';
        studentData.forEach((student, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.text = student.name;
            studentSelect.appendChild(option);
        });
    }
    if (typeof teacherName !== 'undefined') {
        teacherInput.value = teacherName;
    }
    document.getElementById('currentDate').value = new Date().toISOString().split('T')[0];

    // 2. 绑定同步更新逻辑
    syncTextareaToDiv('courseContent');
    syncTextareaToDiv('homework');

    updateStudentInfo();
}

/**
 * 核心逻辑：将文本框内容实时同步到打印专用的 div 中
 */
function syncTextareaToDiv(id) {
    const area = document.getElementById(id);
    const printDiv = document.getElementById(id + '_print');
    
    area.addEventListener('input', function() {
        printDiv.innerText = this.value; // 同步文字内容
        
        // 同时也尝试自动调整高度（为了填写时好看）
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

function updateStudentInfo() {
    const selected = studentData[studentSelect.value];
    if (selected) {
        majorInput.value = selected.major;
        countryInput.value = selected.country;
    }
}

studentSelect.addEventListener('change', updateStudentInfo);
window.onload = init;
