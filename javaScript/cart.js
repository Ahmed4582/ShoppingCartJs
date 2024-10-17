// استرجاع بيانات المستخدم المخزنة في localStorage
let user = JSON.parse(localStorage.getItem("user"));

// دالة لعرض اسم المستخدم أو "Guest" إذا لم تكن بيانات المستخدم متاحة
function displayUsername() {
  if (user && user.email) {
    document.getElementById("username").textContent = user.email;
  } else {
    document.getElementById("username").textContent = "Guest";
  }
}

// دالة لعرض العناصر المخزنة في السلة
function displayCartItems() {
  // استرجاع العناصر من السلة من localStorage أو تعيينها كمصفوفة فارغة إذا لم تكن موجودة
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");

  // التحقق إذا كانت السلة فارغة
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // إنشاء عناصر HTML لعرض المنتجات في السلة
  cartItemsContainer.innerHTML = ""; // تفريغ المحتوى قبل إضافة العناصر
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "bg-white p-4 rounded shadow-md";
    cartItem.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${item.name}</h2>
            <p class="text-green-500 font-semibold mb-4">$${item.price.toFixed(
              2
            )}</p>
        `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// دالة لتفريغ السلة
function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  displayCartItems(); // تحديث عرض السلة بعد التفريغ
}

// دالة لمراقبة التغيير في بيانات المستخدم
function checkUserChange() {
  const newUser = JSON.parse(localStorage.getItem("user"));
  if (user && newUser && user.email !== newUser.email) {
    clearCart(); // تفريغ السلة إذا تغير اسم المستخدم
  }
  user = newUser;
  displayUsername();
}

// استدعاء الدوال عند تحميل الصفحة
window.addEventListener("load", () => {
  displayUsername();
  displayCartItems();
  checkUserChange();
});

// مراقبة أي تغيير في localStorage
window.addEventListener("storage", (event) => {
  if (event.key === "user") {
    checkUserChange();
  }
});
