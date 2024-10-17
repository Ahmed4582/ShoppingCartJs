document.addEventListener("DOMContentLoaded", function () {
  // استرجاع بيانات المستخدم من localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // التحقق إذا كان المستخدم مسجلاً أو لا
  if (user && user.email) {
    const userCart =
      JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    localStorage.setItem("cart", JSON.stringify(userCart));

    const usernameElement = document.getElementById("username");
    if (usernameElement) {
      usernameElement.textContent = user.email;
    }
  } else {
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
      usernameElement.textContent = "Guest";
    }
    localStorage.setItem("cart", JSON.stringify([]));
  }

  updateCartCount();
  displayCart();

  // إضافة مستمعين للأزرار التي تحمل فئة "add-to-cart"
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      addToCart(productId);
    });
  });

  // إضافة مستمع للزر الخاص بتسجيل الخروج
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  // دالة لإضافة منتج إلى السلة
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
    } else {
      const product = {
        id: productId,
        name: `Product Name ${productId}`,
        price: productId * 10 + 5,
        quantity: 1,
      };
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
    alert(`Product ${productId} added to cart!`);
  }

  // دالة لإزالة منتج من السلة
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
    alert(`Product removed from cart!`);
  }

  // دالة لتحديث عدد العناصر في السلة
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
      cartCount.textContent = totalItems;

      if (totalItems > 0) {
        cartCount.classList.remove("hidden");
      } else {
        cartCount.classList.add("hidden");
      }
    } else {
      console.error("Element with id 'cart-count' not found.");
    }
  }

  // دالة لعرض محتويات السلة
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartContainer");
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
          <div>
            <span>${product.name} - $${product.price} (Quantity: ${product.quantity})</span>
            <button class="bg-blue-800 text-white py-1 px-2 rounded remove-from-cart" data-id="${product.id}">Remove</button>
          </div>
        `;
        cartContainer.appendChild(productElement);

        productElement
          .querySelector(".remove-from-cart")
          .addEventListener("click", function () {
            removeFromCart(product.id);
          });
      });
    }
  }

  // دالة لتسجيل الخروج
  function handleLogout() {
    if (user && user.email) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(currentCart));
    }

    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.href = "logout.html";
  }

  // دالة للتعامل مع تغييرات المستخدم
  function handleUserChange() {
    const newUser = JSON.parse(localStorage.getItem("user"));
    const previousUserEmail = localStorage.getItem("previousUserEmail");

    if (newUser && newUser.email !== previousUserEmail) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else if (newUser && newUser.email === previousUserEmail) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${newUser.email}`)) || [];
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }

    localStorage.setItem("previousUserEmail", newUser ? newUser.email : null);
  }

  handleUserChange();
});
