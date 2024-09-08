// Function to generate the resume based on form input
var generateResume = function () {
    var _a, _b, _c;
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    // Update the resume sections with the form data
    document.getElementById('resume-name').textContent = name;
    document.getElementById('resume-email').textContent = "Email: ".concat(email);
    document.getElementById('resume-phone').textContent = "Phone: ".concat(phone);
    document.getElementById('resume-education').textContent = education;
    document.getElementById('resume-work-experience').textContent = workExperience;
    document.getElementById('resume-skills').textContent = skills;
    // Store resume data in localStorage with a unique key
    localStorage.setItem("".concat(username, "-resume"), JSON.stringify({ name: name, email: email, phone: phone, education: education, workExperience: workExperience, skills: skills }));
    // Generate a unique URL (simulation)
    var uniqueUrl = "http://localhost:8000/resume.html?username=".concat(username);
    document.getElementById('share-link').href = uniqueUrl;
    document.getElementById('share-link').textContent = uniqueUrl;
    (_a = document.getElementById('share-link-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    // Show the resume section and hide the form
    (_b = document.getElementById('resume')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    (_c = document.getElementById('resume-form')) === null || _c === void 0 ? void 0 : _c.classList.add('hidden');
};
// Function to handle content-editable interactions
var makeEditable = function () {
    var editableElements = document.querySelectorAll('.editable p');
    editableElements.forEach(function (element) {
        var _a;
        element.addEventListener('input', function (event) {
            var _a;
            var target = event.target;
            var section = (_a = target.closest('.editable')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-section');
            if (section) {
                // Store the updated content
                localStorage.setItem(section, target.textContent || '');
            }
        });
        // Restore previously saved content
        var section = (_a = element.closest('.editable')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-section');
        if (section) {
            var savedContent = localStorage.getItem(section);
            if (savedContent) {
                element.textContent = savedContent;
            }
        }
    });
};
// Function to download the resume as a PDF
var downloadPDF = function () {
    // const pdf = document.getElementById("resume")
    window.print();
};
// const downloadPDF = () => {
//     const docContent = `
//         <html>
//             <head>
//                 <title>Resume</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; margin: 20px; }
//                     h1, h2 { color: #333; }
//                     p { margin: 10px 0; }
//                 </style>
//             </head>
//             <body>
//                 <h1>${(document.getElementById('resume-name') as HTMLHeadingElement).textContent || ''}</h1>
//                 <p>${(document.getElementById('resume-email') as HTMLParagraphElement).textContent || ''}</p>
//                 <p>${(document.getElementById('resume-phone') as HTMLParagraphElement).textContent || ''}</p>
//                 <h2>Education</h2>
//                 <p>${(document.getElementById('resume-education') as HTMLParagraphElement).textContent || ''}</p>
//                 <h2>Work Experience</h2>
//                 <p>${(document.getElementById('resume-work-experience') as HTMLParagraphElement).textContent || ''}</p>
//                 <h2>Skills</h2>
//                 <p>${(document.getElementById('resume-skills') as HTMLParagraphElement).textContent || ''}</p>
//             </body>
//         </html>
//     `;
//     const blob = new Blob([docContent], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
// };
// Add event listeners to buttons
var generateButton = document.getElementById('generate-resume');
var downloadButton = document.getElementById('download-pdf');
if (generateButton) {
    generateButton.addEventListener('click', function () {
        generateResume();
        makeEditable();
    });
}
if (downloadButton) {
    downloadButton.addEventListener('click', downloadPDF);
}
// Initialize editable content from local storage on page load
document.addEventListener('DOMContentLoaded', makeEditable);
