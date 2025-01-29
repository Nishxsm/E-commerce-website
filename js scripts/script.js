const links = document.querySelectorAll('.nav-left .nav-item, .nav-right .nav-item');
const sections = document.querySelectorAll('section');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Get the target section ID from the link href
        const target = link.getAttribute('href').substring(1); // Get the ID from the href
        const targetSection = document.getElementById(target);

        // If target section exists, toggle its visibility
        if (targetSection) {
            if (targetSection.classList.contains('active')) {
                targetSection.classList.remove('active');
            } else {
                // Hide all other sections
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
            }
        }
    });
});


// To handle "Learn More" buttons dynamically
const learnMoreButtons = document.querySelectorAll('.card-content a, .card-content2 a');

learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // Get the target section ID from a custom data attribute
        const target = button.getAttribute('data-target'); // e.g., 'men', 'women', etc.
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// To toggle the burger menuu
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const sideMenuActive = sideMenu.classList.contains('active');
    
    if (sideMenuActive) {
        sideMenu.classList.remove('active');
    } else {
        sideMenu.classList.add('active');
    }
    
    // Close menu when clicking anywhere ouside of itt
    document.addEventListener('click', function(event) {
        if (!sideMenu.contains(event.target) && !document.querySelector('.burger-icon').contains(event.target)) {
            sideMenu.classList.remove('active');
        }
    });
}

