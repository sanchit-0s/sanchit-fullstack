
const toggleButton = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'light'; 
document.documentElement.setAttribute('data-theme', savedTheme);

toggleButton.textContent = savedTheme === 'dark' ? 'Light Theme' : 'Dark Theme';

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? 'Light Theme' : 'Dark Theme';
});


const logoutButton = document.getElementById('login-btn');

logoutButton.addEventListener('click', function () {
    window.location.href = '/ui/task-notes-frontend/index.html';
});