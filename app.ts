// Function to generate the resume based on form input
const generateResume = () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Update the resume sections with the form data
    (document.getElementById('resume-name') as HTMLHeadingElement).textContent = name;
    (document.getElementById('resume-email') as HTMLParagraphElement).textContent = `Email: ${email}`;
    (document.getElementById('resume-phone') as HTMLParagraphElement).textContent = `Phone: ${phone}`;
    (document.getElementById('resume-education') as HTMLParagraphElement).textContent = education;
    (document.getElementById('resume-work-experience') as HTMLParagraphElement).textContent = workExperience;
    (document.getElementById('resume-skills') as HTMLParagraphElement).textContent = skills;

    // Store resume data in localStorage with a unique key
    localStorage.setItem(`${username}-resume`, JSON.stringify({ name, email, phone, education, workExperience, skills }));

    // Generate a unique URL (simulation)
    const uniqueUrl = `http://localhost:8000/resume.html?username=${username}`;
    (document.getElementById('share-link') as HTMLAnchorElement).href = uniqueUrl;
    (document.getElementById('share-link') as HTMLAnchorElement).textContent = uniqueUrl;
    document.getElementById('share-link-container')?.classList.remove('hidden');

    // Show the resume section and hide the form
    document.getElementById('resume')?.classList.remove('hidden');
    document.getElementById('resume-form')?.classList.add('hidden');
};

// Function to handle content-editable interactions
const makeEditable = () => {
    const editableElements = document.querySelectorAll('.editable p');

    editableElements.forEach(element => {
        element.addEventListener('input', (event) => {
            const target = event.target as HTMLElement;
            const section = target.closest('.editable')?.getAttribute('data-section');
            if (section) {
                // Store the updated content
                localStorage.setItem(section, target.textContent || '');
            }
        });

        // Restore previously saved content
        const section = element.closest('.editable')?.getAttribute('data-section');
        if (section) {
            const savedContent = localStorage.getItem(section);
            if (savedContent) {
                element.textContent = savedContent;
            }
        }
    });
};

// Function to download the resume as a PDF
const downloadPDF = () => {
    // const pdf = document.getElementById("resume")
    window.print()
};

// Add event listeners to buttons
const generateButton = document.getElementById('generate-resume');
const downloadButton = document.getElementById('download-pdf');

if (generateButton) {
    generateButton.addEventListener('click', () => {
        generateResume();
        makeEditable();
    });
}


if (downloadButton) {
    downloadButton.addEventListener('click', downloadPDF);
}

// Initialize editable content from local storage on page load
document.addEventListener('DOMContentLoaded', makeEditable);
