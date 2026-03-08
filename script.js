/**
 * HOO 课堂反馈工具 - 逻辑处理
 */

const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');
const teacherInput = document.getElementById('teacherInput');
const currentDateInput = document.getElementById('currentDate');

function init() {
    // 1. 填充学生下拉菜单
    studentSelect.innerHTML = '';
    studentData.forEach((student, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = student.name;
        studentSelect.appendChild(option);
    });
    
    // 2. 填充老师姓名 (从 config.js 读取)
    if (typeof teacherName !== 'undefined') {
        teacherInput.value = teacherName;
    }

    // 3. 设置默认日期为当天
    const today = new Date().toISOString().split('T')[0];
    currentDateInput.value = today;

    // 4. 初始加载第一个学生信息
    updateStudentInfo();
}

function updateStudentInfo() {
    const selected = studentData[studentSelect.value];
    if (selected) {
        majorInput.value = selected.major;
        countryInput.value = selected.country;
    }
}

// 绑定事件
studentSelect.addEventListener('change', updateStudentInfo);

window.onload = init;
