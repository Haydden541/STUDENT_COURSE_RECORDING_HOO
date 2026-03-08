/**
 * HOO 课堂反馈 - 增强版逻辑
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
    currentDateInput.value = new Date().toISOString().split('T')[0];
    updateStudentInfo();
}

// 联动逻辑
function updateStudentInfo() {
    if (typeof studentData !== 'undefined' && studentData.length > 0) {
        const selected = studentData[studentSelect.value];
        if (selected) {
            majorInput.value = selected.major;
            countryInput.value = selected.country;
        }
    }
}

// 输入框自适应高度 (填写时更舒服)
function autoHeight(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

/**
 * 核心导出功能：延用 Twine 成功逻辑
 */
window.exportFeedback = function() {
    const container = document.getElementById('report-table');
    const textareas = container.querySelectorAll('textarea');
    const allInputs = container.querySelectorAll('input, select');

    // 1. 进入导出模式
    container.classList.add('export-mode'); 

    // 2. 同步内容到替身 div 并隐藏 textarea
    textareas.forEach(area => {
        const displayDiv = area.parentElement.querySelector('.pdf-display');
        if (displayDiv) {
            displayDiv.innerText = area.value;
        }
    });

    // 3. 锁定 Select 的值 (确保 PDF 渲染时选中的是当前项)
    allInputs.forEach(el => {
        if(el.tagName === 'SELECT') {
            Array.from(el.options).forEach(opt => {
                if(opt.value === el.value) opt.setAttribute('selected', 'selected');
                else opt.removeAttribute('selected');
            });
        } else {
            el.setAttribute('value', el.value);
        }
    });

    // 4. 使用你的动态高度公式 (scrollHeight * 0.264583)
    const elementHeight = container.scrollHeight * 0.264583 + 20; 
    const studentName = studentSelect.options[studentSelect.selectedIndex]?.text || "反馈单";

    const opt = {
        margin: [10, 10],
        filename: `HOO反馈_${studentName}_${currentDateInput.value}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: [210, Math.max(297, elementHeight)], orientation: 'portrait' }
    };

    // 5. 执行保存并还原
    html2pdf().set(opt).from(container).save().then(() => {
        container.classList.remove('export-mode'); 
    });
};

studentSelect.addEventListener('change', updateStudentInfo);
window.onload = init;
