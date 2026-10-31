const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

let cartCount = 0;
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    cartCount += 1;
    document.getElementById("cartMessage").textContent = `Cart items: ${cartCount}`;
    button.textContent = "Added ✓";
    setTimeout(() => button.textContent = "Add to cart", 900);
  });
});

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showFeedback("Please complete all fields.", "error");
    return;
  }
  if (!emailPattern.test(email)) {
    showFeedback("Please enter a valid email address.", "error");
    return;
  }
  showFeedback(`Thanks, ${name}! The form passed validation.`, "success");
  form.reset();
});
function showFeedback(text, type) {
  feedback.textContent = text;
  feedback.className = `feedback ${type}`;
}
