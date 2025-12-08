document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        console.log('Switched to DARK mode'); // Add this
    } else {
        localStorage.setItem('theme', 'light');
        console.log('Switched to LIGHT mode'); // Add this
    }
});

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in-show");
});
