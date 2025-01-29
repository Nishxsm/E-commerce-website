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


function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

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

// Cart array to store selected items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add product to cart
function addToCart(event) {
    if (!event.target.classList.contains("add-to-cart") && !event.target.closest(".add-to-cart")) return;

    let productCard = event.target.closest(".product-card");
    if (!productCard) return; // Safety check
    
    // Extract product details
    let product = {
        id: productCard.querySelector("h3").textContent,
        name: productCard.querySelector("h3").textContent,
        price: parseFloat(productCard.querySelector(".product-price h3").textContent.replace("$", "")),
        image: productCard.querySelector("img").src,
        quantity: 1
    };

    // Check for existing item
    let existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    // Update storage and UI
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();

    // Fixed notification - use 'product' instead of 'newItem'
    showNotification(`${product.name} added to cart! 🛒`);
}
// Function to update the cart display
function updateCartUI() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = 0;  // Ensure that totalPrice is defined here before usage

    // Clear current cart list (for fresh render)
    cartList.innerHTML = "";

    // Ensure we are only showing valid cart items
    cart = cart.filter(item => item.id && item.name && item.price && item.quantity);

    // Update cart items dynamically
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        cartList.innerHTML += `
            <li class="cart-item">
            <img src="${item.image}" width="50" alt="${item.name}" class="item-image">
            <span class="item-details">${item.name} - $${item.price} x ${item.quantity}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        </li>
        `;
    });

    // Update total price (ensure totalPrice is correctly set here)
    document.getElementById("cart-total").textContent = totalPrice.toFixed(2);

    // Attach event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}


// Function to remove an item from the cart
function removeFromCart(event) {
    let productId = event.target.getAttribute("data-id");
    cart = cart.filter(item => item.id !== productId);

    // Update localStorage and UI
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Event delegation for "Add to Cart" buttons across all sections
document.body.addEventListener("click", addToCart);

// Load cart on page load
updateCartUI();
