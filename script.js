/**
 * HOO 课堂反馈工具 - 核心逻辑
 */

const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');
const teacherInput = document.getElementById('teacherInput');
const currentDateInput = document.getElementById('currentDate');

function init() {
    // 1. 初始化学生下拉列表
    studentSelect.innerHTML = '';
    studentData.forEach((student, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = student.name;
        studentSelect.appendChild(option);
    });
    
    // 2. 自动填充老师姓名
    if (typeof teacherName !== 'undefined') {
        teacherInput.value = teacherName;
    }

    // 3. 默认日期设为今天
    const today = new Date().toISOString().split('T')[0];
    currentDateInput.value = today;

    // 4. 加载首位学生资料
    updateStudentInfo();
}

function updateStudentInfo() {
    const selected = studentData[studentSelect.value];
    if (selected) {
        majorInput.value = selected.major;
        countryInput.value = selected.country;
    }
}

// 事件监听
studentSelect.addEventListener('change', updateStudentInfo);

// 启动
window.onload = init;
