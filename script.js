/* =========================================
   GREENLIFE - JAVASCRIPT
========================================= */


/* ================= CART DATA ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const contactButton =
    document.getElementById("contactButton");

const addCartButtons =
    document.querySelectorAll(".add-cart");


/* ================= ADD TO CART ================= */

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(button.getAttribute("data-price"));

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        button.textContent = "Added ✓";

        button.disabled = true;

        setTimeout(function () {

            button.textContent = "Add to Cart";

            button.disabled = false;

        }, 1000);

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    cartCount.textContent = cart.length;


    /* Empty cart */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart text-center">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0 VNĐ";

        return;
    }


    /* Display cart */

    cartItems.innerHTML = "";


    cart.forEach(function (product, index) {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <br>
                <small>
                    ${formatPrice(product.price)}
                </small>
            </div>

            <button
                class="remove-item"
                data-index="${index}">

                Remove

            </button>
        `;


        cartItems.appendChild(item);

    });


    /* Total */

    const total = cart.reduce(
        function (sum, product) {

            return sum + product.price;

        },
        0
    );


    cartTotal.textContent =
        formatPrice(total);


    /* Remove buttons */

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(
                    button.getAttribute("data-index")
                );


            cart.splice(index, 1);

            updateCart();

        });

    });

}


/* ================= FORMAT PRICE ================= */

function formatPrice(number) {

    return number.toLocaleString("vi-VN")
        + " VNĐ";

}


/* ================= CHECKOUT ================= */

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a plant first."
            );

            return;
        }


        alert(
            "Thank you for your order! " +
            "GreenLife will contact you soon."
        );

        cart = [];

        updateCart();

    }
);


/* ================= CONTACT ================= */

contactButton.addEventListener(
    "click",
    function () {

        alert(
            "Thank you for contacting GreenLife! " +
            "We will get back to you soon."
        );

    }
);


/* ================= NAVIGATION ================= */

const navLinks =
    document.querySelectorAll(
        ".navbar .nav-link"
    );


const navigation =
    document.getElementById(
        "mainNavigation"
    );


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            if (
                navigation.classList.contains("show")
            ) {

                const navbar =
                    bootstrap.Collapse.getInstance(
                        navigation
                    );

                if (navbar) {
                    navbar.hide();
                }

            }

        }
    );

});


/* ================= INITIALIZE ================= */

updateCart();
