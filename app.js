var generateResume = function () {
    var _a, _b, _c;
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    document.getElementById('resume-name').textContent = name;
    document.getElementById('resume-email').textContent = "Email: ".concat(email);
    document.getElementById('resume-phone').textContent = "Phone: ".concat(phone);
    document.getElementById('resume-education').textContent = education;
    document.getElementById('resume-work-experience').textContent = workExperience;
    document.getElementById('resume-skills').textContent = skills;
    localStorage.setItem("".concat(username, "-resume"), JSON.stringify({ name: name, email: email, phone: phone, education: education, workExperience: workExperience, skills: skills }));
    var uniqueUrl = "https://milestone-5-three.vercel.app/?username=".concat(username);
    document.getElementById('share-link').href = uniqueUrl;
    document.getElementById('share-link').textContent = uniqueUrl;
    (_a = document.getElementById('share-link-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    (_b = document.getElementById('resume')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    (_c = document.getElementById('resume-form')) === null || _c === void 0 ? void 0 : _c.classList.add('hidden');
};
var makeEditable = function () {
    var editableElements = document.querySelectorAll('.editable p');
    editableElements.forEach(function (element) {
        var _a;
        element.addEventListener('input', function (event) {
            var _a;
            var target = event.target;
            var section = (_a = target.closest('.editable')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-section');
            if (section) {
                localStorage.setItem(section, target.textContent || '');
            }
        });
        var section = (_a = element.closest('.editable')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-section');
        if (section) {
            var savedContent = localStorage.getItem(section);
            if (savedContent) {
                element.textContent = savedContent;
            }
        }
    });
};
var downloadPDF = function () {
    window.print();
};
var sharePage = function () {
    var shareButton = document.getElementById('share-page');
    var pageUrl = window.location.href;
    var pageTitle = document.title;
    if (navigator.share) {
        navigator.share({
            title: pageTitle,
            url: pageUrl
        }).then(function () {
            console.log('Thanks for sharing!');
        }).catch(function (error) {
            console.log('Error sharing:', error);
        });
    }
    else {
        alert('Share functionality is not supported on this browser.');
    }
};
// Add event listeners to buttons
var generateButton = document.getElementById('generate-resume');
var downloadButton = document.getElementById('download-pdf');
var shareButton = document.getElementById('share-page');
if (generateButton) {
    generateButton.addEventListener('click', function () {
        generateResume();
        makeEditable();
    });
}
if (downloadButton) {
    downloadButton.addEventListener('click', downloadPDF);
}
if (shareButton) {
    shareButton.addEventListener('click', sharePage);
}
document.addEventListener('DOMContentLoaded', makeEditable);
