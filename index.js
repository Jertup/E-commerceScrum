 document.addEventListener("DOMContentLoaded", () => {
    const plusBtn = document.querySelector(".qty-btn.plus");
    const minusBtn = document.querySelector(".qty-btn.minus");
    const quantityDisplay = document.querySelector(".quantity");
    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    const cartIcon = document.querySelector(".cart-icon");
    const cartWrapper = document.querySelector(".cart-wrapper");

    // Create cart badge and dropdown dynamically
    const cartBadge = document.createElement("div");
    cartBadge.id = "cart-count";
    cartBadge.className = "cart-badge hidden";
    cartWrapper.appendChild(cartBadge);

    const cartDropdown = document.createElement("div");
    cartDropdown.id = "cart-dropdown";
    cartDropdown.className = "cart-dropdown hidden";
    document.body.appendChild(cartDropdown);

    let quantity = 0;
    let cartQuantity = 0;

    // Update displayed quantity
    function updateQuantityDisplay() {
      quantityDisplay.textContent = quantity;
    }

    plusBtn.addEventListener("click", () => {
      quantity++;
      updateQuantityDisplay();
    });

    minusBtn.addEventListener("click", () => {
      if (quantity > 0) {
        quantity--;
        updateQuantityDisplay();
      }
    });

    // Render cart dropdown HTML
    function renderCart() {
      if (cartQuantity === 0) {
        cartDropdown.innerHTML = `<h4>Cart</h4><p class="empty-cart-msg">Your cart is empty.</p>`;
        cartBadge.classList.add("hidden");
        return;
      }

      const total = (125 * cartQuantity).toFixed(2);
      cartBadge.textContent = cartQuantity;
      cartBadge.classList.remove("hidden");

      cartDropdown.innerHTML = `
        <h4>Cart</h4>
        <div class="cart-item">
          <img src="./images/image-product-1-thumbnail.jpg" class="cart-thumb" alt="Product thumb">
          <div>
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x <span class="cart-qty">${cartQuantity}</span> <strong>$${total}</strong></p>
            <div class="cart-qty-controls">
              <button class="cart-minus">−</button>
              <button class="cart-plus">+</button>
            </div>
          </div>
          <img src="./images/icon-delete.svg" class="delete-icon" alt="Delete">
        </div>
        <button class="checkout-btn">Checkout</button>
      `;

  // Add event listeners after rendering
      cartDropdown.querySelector(".cart-plus").addEventListener("click", (e) => {
        e.stopPropagation();
        cartQuantity++;
        renderCart();
        updateQuantityDisplay();
      });

      cartDropdown.querySelector(".cart-minus").addEventListener("click", (e) => {
        e.stopPropagation();
        cartQuantity = Math.max(0, cartQuantity - 1);
        renderCart();
        updateQuantityDisplay();
      });

      cartDropdown.querySelector(".delete-icon").addEventListener("click", (e) => {
        e.stopPropagation();
        cartQuantity = 0;
        renderCart();
        updateQuantityDisplay();
      });

  // Prevent clicks inside cart from closing it
      cartDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    addToCartBtn.addEventListener("click", () => {
      if (quantity > 0) {
        cartQuantity += quantity;
        quantity = 0;
        renderCart();
        updateQuantityDisplay();

      }
    });

    cartIcon.addEventListener("click", () => {
      renderCart();
      cartDropdown.classList.toggle("hidden");
    });

    // Hide cart on outside click
    document.addEventListener("click", (e) => {
      if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
        cartDropdown.classList.add("hidden");
      }
    });
  });
