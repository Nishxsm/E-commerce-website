//to toggle sections 
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


//to toggle burger menu

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const sideMenuActive = sideMenu.classList.contains('active');
    
    if (sideMenuActive) {
        sideMenu.classList.remove('active');
    } else {
        sideMenu.classList.add('active');
    }
    
    // Close menu when clicking anywhere outside of it
    document.addEventListener('click', function(event) {
        if (!sideMenu.contains(event.target) && !document.querySelector('.burger-icon').contains(event.target)) {
            sideMenu.classList.remove('active');
        }
    });
}

  