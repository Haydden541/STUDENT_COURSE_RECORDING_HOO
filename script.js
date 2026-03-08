// 初始化下拉菜单
const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');

function init() {
    studentData.forEach((student, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = student.name;
        studentSelect.appendChild(option);
    });
    
    // 设置默认日期为今天
    document.getElementById('currentDate').valueAsDate = new Date();
    updateStudentInfo();
}

function updateStudentInfo() {
    const selected = studentData[studentSelect.value];
    majorInput.value = selected.major;
    countryInput.value = selected.country;
}

window.onload = init;
