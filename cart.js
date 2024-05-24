document.addEventListener('DOMContentLoaded', function() {
    renderCart();

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = document.getElementById('cart_items');
        let cartTotal = document.getElementById('cart_total');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            let subtotal = item.price * item.quantity;
            total += subtotal;

            let row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    ${item.name}
                </td>
                <td>₱${item.price.toFixed(2)}</td>
                <td>
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </td>
                <td>₱${subtotal.toFixed(2)}</td>
                <td><a class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</a></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.textContent = `${total.toFixed(2)}`;
    }

    window.updateQuantity = function(name, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let product = cart.find(item => item.name === name);

        if (product) {
            product.quantity += change;
            if (product.quantity <= 0) {
                cart = cart.filter(item => item.name !== name);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    window.removeFromCart = function(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    window.confirmOrder = function(event) {
        event.preventDefault();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Error: There are no products ordered.");
            return;
        }

        let name = document.getElementById('name').value;
        let address = document.getElementById('address').value;
        let contact = document.getElementById('contact').value;
        let email = document.getElementById('email').value;
        
        let orderDetails = `Order successful!\n\nORDER DETAILS\nName: ${name}\nAddress: ${address}\nContact: ${contact}\nE-mail Account: ${email}\n\nProducts:\n`;
        let total = 0;

        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;
            orderDetails += `${index + 1}. ${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity} = ₱${subtotal.toFixed(2)}\n`;
        });

        orderDetails += `\nTotal Price: ₱${total.toFixed(2)}`;

        alert(orderDetails);
        localStorage.removeItem('cart');
        renderCart();
        document.getElementById('orderForm').reset();
    };
});
