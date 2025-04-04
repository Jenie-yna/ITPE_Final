function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalAmountContainer = document.getElementById("total-amount"); 

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            if (totalAmountContainer) totalAmountContainer.textContent = "₱0.00"; 
        } else {
            let totalAmount = 0; 
            cart.forEach((item, index) => {
                totalAmount += parseFloat(item.price); 

                let listItem = document.createElement("li");
                listItem.className = "cart-item";
                listItem.innerHTML = `
                    <div class="cart-content">
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <span>${item.name} - ₱${parseFloat(item.price).toFixed(2)}</span>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(listItem);
            });

            if (totalAmountContainer) {
                totalAmountContainer.textContent = `₱${totalAmount.toFixed(2)}`;
            }
        }
    }

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price: parseFloat(price).toFixed(2), image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
    loadCart(); 
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); 
    }
}

document.addEventListener("DOMContentLoaded", loadCart);


function validateForm(event, name, price, image) {
    event.preventDefault(); 
    addToCart(name, price, image);
}


document.addEventListener("DOMContentLoaded", loadCart);
function openPopup(id) {
    document.getElementById(id).classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closePopup(id) {
    document.getElementById(id).classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function closeAllPopups() {
    document.querySelectorAll(".popup").forEach(popup => popup.classList.remove("active"));
    document.getElementById("overlay").classList.remove("active");
}
