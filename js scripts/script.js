const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show the targeted section
        const target = link.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});
