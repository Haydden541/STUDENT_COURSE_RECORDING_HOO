/**
 * HOO 课堂反馈工具 - 核心逻辑文件
 */

// 获取页面中的关键元素
const studentSelect = document.getElementById('studentSelect');
const majorInput = document.getElementById('majorInput');
const countryInput = document.getElementById('countryInput');
const teacherInput = document.getElementById('teacherInput');
const currentDateInput = document.getElementById('currentDate');

/**
 * 1. 页面初始化
 */
function init() {
    // 填充学生下拉菜单
    if (typeof studentData !== 'undefined') {
        studentSelect.innerHTML = '';
        studentData.forEach((student, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.text = student.name;
            studentSelect.appendChild(option);
        });
    }

    // 填充默认老师姓名
    if (typeof teacherName !== 'undefined') {
        teacherInput.value = teacherName;
    }

    // 设置默认日期为今天
    const today = new Date().toISOString().split('T')[0];
    currentDateInput.value = today;

    // 加载第一个学生的信息
    updateStudentInfo();
}

/**
 * 2. 联动更新：根据选择的学生自动填写专业和国家
 */
function updateStudentInfo() {
    if (typeof studentData !== 'undefined' && studentData.length > 0) {
        const selected = studentData[studentSelect.value];
        if (selected) {
            majorInput.value = selected.major;
            countryInput.value = selected.country;
        }
    }
}

/**
 * 3. 核心功能：直接导出 PDF 并下载
 * 使用 html2pdf.js 库实现，不再调用浏览器的打印窗口
 */
function exportFeedback() {
    const element = document.getElementById('capture'); // 指定要导出的容器 ID
    const studentName = studentSelect.options[studentSelect.selectedIndex].text;
    const dateValue = currentDateInput.value;

    // PDF 配置参数
    const opt = {
        margin:       [10, 10, 10, 10], // 上、左、下、右边距
        filename:     `HOO课堂反馈_${studentName}_${dateValue}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,           // 提高清晰度，解决模糊问题
            useCORS: true,      // 解决跨域资源加载
            logging: false 
        },
        jsPDF:        { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    // 执行转换并下载
    html2pdf().set(opt).from(element).save();
}

// 绑定下拉菜单的切换事件
studentSelect.addEventListener('change', updateStudentInfo);

// 页面加载完成后启动
window.onload = init;
