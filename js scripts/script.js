const links = document.querySelectorAll('.nav-left .nav-item');
const sections = document.querySelectorAll('section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // Show the targeted section
        const target = link.getAttribute('href').substring(1); // Get the ID from the href
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});
