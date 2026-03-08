/**
 * HOO 课堂反馈工具 - 逻辑处理
 */

// 1. 获取 DOM 元素
const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');
const currentDateInput = document.getElementById('currentDate');

// 2. 初始化页面
function init() {
    // 清空现有选项（防止重复初始化）
    studentSelect.innerHTML = '';

    // 填充学生下拉菜单
    studentData.forEach((student, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = student.name;
        studentSelect.appendChild(option);
    });
    
    // 设置默认日期为当天 (格式: YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    currentDateInput.value = today;

    // 初始加载第一个学生的信息
    if (studentData.length > 0) {
        updateStudentInfo();
    }
}

// 3. 当选择学生改变时，自动填充专业和国家
function updateStudentInfo() {
    const selectedIndex = studentSelect.value;
    const selectedStudent = studentData[selectedIndex];
    
    if (selectedStudent) {
        majorInput.value = selectedStudent.major;
        countryInput.value = selectedStudent.country;
    }
}

// 4. 导出 PDF 功能
function downloadPDF() {
    const element = document.getElementById('capture'); // 抓取范围
    const studentName = studentSelect.options[studentSelect.selectedIndex].text;
    const dateValue = currentDateInput.value;

    // 配置 html2pdf 参数
    const opt = {
        margin:       [10, 10, 10, 10], // 边距 (mm)
        filename:     `${studentName}_课堂反馈_${dateValue}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,           // 提升分辨率，确保文字清晰
            useCORS: true,      // 允许跨域图片
            letterRendering: true 
        },
        jsPDF:        { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' // 纵向打印
        }
    };

    // 导出流程
    // 在导出前可以隐藏下载按钮防止它出现在 PDF 里（如果按钮在 capture 容器内）
    html2pdf().set(opt).from(element).save();
}

// 5. 绑定下拉菜单切换事件
studentSelect.addEventListener('change', updateStudentInfo);

// 页面加载完成后执行初始化
window.onload = init;
