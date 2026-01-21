
const toggleButton = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'light'; 
document.documentElement.setAttribute('data-theme', savedTheme);

toggleButton.textContent = savedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});

const slider = document.getElementById('weight-slider');
const sampleText = document.getElementById('sample-text');

sampleText.style.fontWeight = slider.value;

slider.addEventListener('input', () => {
    sampleText.style.fontWeight = slider.value;
});



const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded); 
    navList.classList.toggle('show'); 
});

hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        hamburger.click();
    }
});