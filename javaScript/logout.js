// استرجاع بيانات المستخدم من localStorage
const user = JSON.parse(localStorage.getItem("user"));

// عرض رسالة الترحيب إذا كان المستخدم مسجل الدخول
if (user && user.email) {
  document.getElementById(
    "welcomeMessage"
  ).textContent = `Welcome, ${user.email}!`;
} else {
  // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك مستخدم مسجل الدخول
  window.location.href = "login.html";
}

// التعامل مع النقر على زر تسجيل الخروج
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
  // إزالة بيانات المستخدم من localStorage
  localStorage.removeItem("user");
  // إعادة التوجيه إلى صفحة تسجيل الدخول
  window.location.href = "login.html";
});
