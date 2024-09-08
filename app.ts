const generateResume = () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    (document.getElementById('resume-name') as HTMLHeadingElement).textContent = name;
    (document.getElementById('resume-email') as HTMLParagraphElement).textContent = `Email: ${email}`;
    (document.getElementById('resume-phone') as HTMLParagraphElement).textContent = `Phone: ${phone}`;
    (document.getElementById('resume-education') as HTMLParagraphElement).textContent = education;
    (document.getElementById('resume-work-experience') as HTMLParagraphElement).textContent = workExperience;
    (document.getElementById('resume-skills') as HTMLParagraphElement).textContent = skills;

    localStorage.setItem(`${username}-resume`, JSON.stringify({ name, email, phone, education, workExperience, skills }));

    const uniqueUrl = `https://milestone-5-three.vercel.app/?username=${username}`;
    (document.getElementById('share-link') as HTMLAnchorElement).href = uniqueUrl;
    (document.getElementById('share-link') as HTMLAnchorElement).textContent = uniqueUrl;
    document.getElementById('share-link-container')?.classList.remove('hidden');

    document.getElementById('resume')?.classList.remove('hidden');
    document.getElementById('resume-form')?.classList.add('hidden');
};

const makeEditable = () => {
    const editableElements = document.querySelectorAll('.editable p');

    editableElements.forEach(element => {
        element.addEventListener('input', (event) => {
            const target = event.target as HTMLElement;
            const section = target.closest('.editable')?.getAttribute('data-section');
            if (section) {
                localStorage.setItem(section, target.textContent || '');
            }
        });

        const section = element.closest('.editable')?.getAttribute('data-section');
        if (section) {
            const savedContent = localStorage.getItem(section);
            if (savedContent) {
                element.textContent = savedContent;
            }
        }
    });
};

const downloadPDF = () => {
    window.print()
};
const sharePage = () => {
    const shareButton = document.getElementById('share-page') as HTMLButtonElement;
    const pageUrl = window.location.href; 
    const pageTitle = document.title; 

    if (navigator.share) {
        navigator.share({
            title: pageTitle,
            url: pageUrl
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        alert('Share functionality is not supported on this browser.');
    }
};

// Add event listeners to buttons
const generateButton = document.getElementById('generate-resume');
const downloadButton = document.getElementById('download-pdf');
const shareButton = document.getElementById('share-page');

if (generateButton) {
    generateButton.addEventListener('click', () => {
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
