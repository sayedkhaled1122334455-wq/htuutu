let currentPortal = '';

function handleLogin(event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const studentPassword = document.getElementById('studentPassword').value;

    // محاكاة إرسال البيانات وتسجيل الدخول
    console.log("تم تسجيل الدخول بالبيانات:", { studentId, studentPassword });

    // الانتقال إلى شاشة البوابات
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('portalSection').style.display = 'block';
}

function selectPortal(portalName) {
    currentPortal = portalName;
    document.getElementById('portalSection').style.display = 'none';
    document.getElementById('solverPanel').style.display = 'block';
    document.getElementById('solverTitle').innerText = `إعداد أداة حل (${portalName})`;
}

function goBackToPortals() {
    document.getElementById('solverPanel').style.display = 'none';
    document.getElementById('portalSection').style.display = 'block';
    document.getElementById('resultBox').style.display = 'none';
}

function generateBookmarklet() {
    const answersText = document.getElementById('answersInput').value;
    if(!answersText.trim()) {
        alert('الرجاء كتابة الإجابات أو الكود أولاً يا برنس!');
        return;
    }

    // برمجة كود الـ Bookmarklet الذي سيقوم بالحل داخل منصة Qureo
    const solverScript = `javascript:(function() {
        alert('أهلاً بك في أداتك Elalmanee Auto Solver (${currentPortal}) - جاري حل المنصة...');
        
        const customAnswers = ${JSON.stringify(answersText)};
        console.log("تم تحميل الإجابات المخصصة:", customAnswers);

        const inputs = document.querySelectorAll('input, textarea');
        if(inputs.length > 0) {
            inputs[0].value = customAnswers;
            inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        }

        alert('تم تطبيق الحل الآلي بنجاح!');
    })();`;

    const outputLink = document.getElementById('bookmarkletOutput');
    outputLink.href = solverScript;
    outputLink.innerText = `⚡ شغل حل ${currentPortal}`;
    
    document.getElementById('resultBox').style.display = 'block';
}