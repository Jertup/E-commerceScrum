// Variables

let cart = document.querySelector('.cart');
let cartContent = document.querySelector('.cart-content');
let cartList = document.querySelector('.cart-content .cart-list');
let inCart = document.querySelector('.cart .in-cart');

let addToCartForm = document.querySelector('.add-to-cart-form');
let formValidation = document.querySelector('.add-to-cart-form .form-alert');
let checkOutBtn = document.querySelector('.cart-list-wrapper .checkout-btn');
let productQuantity = document.querySelector('.add-to-cart-form .product-quantity-num');

let plusBtn = document.querySelector('.add-to-cart-form .plus');
let minusBtn = document.querySelector('.add-to-cart-form .minus');

//Functions


// Add product to cart
function addToCart() {
    addToCartForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let getProductQuantity = productQuantity.textContent;
        if (getProductQuantity != 0) {
            let productTitle = document.querySelector(
                '.product-details-wrapper .product-title'
            ).textContent;
            
            // Use first thumbnail image as product image in the cart
            let productThumb = thumbImagesDivs[0]
            .querySelector('img')
            .getAttribute('src')

            let productPrice = document
            .querySelector('product-details-wrapper .current-price')
            .textContent.replace('$', '');
            let totalPrice = '$' + parseInt(getProductQuantity * productPrice);
            if (cartList.childElementCount == 0) {
                checkOutBtn.style.display = 'block';
                cartList.innerHTML = '';
            }
            cartList.innerHTML += `
            <div class='cart-item'>
                <div class='item-image>
                    <img
                    src=${productThumb}
                    alt='Product Image'
                    />
                 </div>
                <div class='item-info'>
                    <h4 class='item-title'>
                    ${productTitle}
                    </h4>
                    <p class='item-price-wrapper'>
                        <span class='item-price'>${productPrice}</span>
                        <span class='item-count'>${getProductQuantity}</span>
                        <span class='total-price'>${totalPrice}</span>
                    </p>
                    </div>
                    <div class='item-delete'>
                        <img
                            src='./images/icon-delete.svg'
                            alt='Delete Product'
                        />
                    </div>
                </div>
            `;
            deleteFromCart();
            inCartCount();
            formAlert(`Product has been added to your cart sucessfully┌`, 'success');
        }   else {
            formAlert(`Can't add negative value`, 'failure');
        }
        };
}
addToCart();

//Show cart product's count
function inCartCount {
    let productsCount = cartList.childElementCount;
    inCart.textContent = productsCount;
    if (productsCount == 0) {
        cart.classList.remove('show-count');
        cart.classList.add('empty');
        checkOutBtn.style.display = 'none';
        cartList.textContent = 'Your cart is empty';
    }   else {
        cart.classList.add('show-count');
        cart.classList.remove('remove');
    }
}
inCartCount();

// Delete cart product 
function deleteFromCart() {
    cartContent.querySelectorAll('.cart-item').forEach((product) => {
        product.addEventListener('click', (e) => {
            if (!e.target.closest('.item-delete')) return;
            product.remove();
            inCartCount();
        });
    });
}

//Events
cart.addEventListener('click', (e) => {
    let cartIcon = e.target.closest('.cart-icon');
    cartIcon ? cart.classList.toggle('open') ; '';
});

//How many items will be added by plus (+) and (-) buttons
plusBtn.addEventListener('click', () => {
    productQuantity.textContent++;
});

minusBtn.addEventListener('click', () => {
    if (productQuantity.textContent != 0) productQuantity.textContent--;
});
