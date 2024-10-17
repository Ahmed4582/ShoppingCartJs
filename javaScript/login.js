// جلب النموذج من صفحة تسجيل الدخول
const loginForm = document.getElementById("loginForm");

// عند إرسال النموذج يتم تنفيذ هذا الكود
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  // الحصول على القيم من الحقول
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // التحقق إذا كان الحقلان فارغين
  if (email === "" || password === "") {
    alert("Please Enter Email and Password");
    return;
  }

  // إذا كانت القيم موجودة، يتم حفظ البيانات في localStorage
  localStorage.setItem("user", JSON.stringify({ email, password }));

  // الانتقال إلى الصفحة الرئيسية
  window.location.href = "home.html";
});

// وظائف التحكم في عرض كلمة المرور
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.addEventListener("click", function () {
  // تغيير نوع الإدخال بين text و password
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // تغيير لون الأيقونة بناءً على الحالة
  if (type === "text") {
    eyeIcon.classList.remove("text-gray-700");
    eyeIcon.classList.add("text-blue-700");
  } else {
    eyeIcon.classList.remove("text-blue-700");
    eyeIcon.classList.add("text-gray-700");
  }
});
