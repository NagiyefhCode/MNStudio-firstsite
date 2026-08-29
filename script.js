// Səhifədə istifadə olunan əsas elementlər
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".nav-link");
const contactModal = document.getElementById("contactModal");
const designModal = document.getElementById("designModal");
const contactTriggers = document.querySelectorAll(
  ".contact-trigger, #navContactBtn",
);
const designBtn = document.getElementById("designBtn");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal-close");

// Pəncərəni açır və açıq qalan digər pəncərəni bağlayır.
function openModal(modal) {
  modals.forEach((item) => {
    item.classList.remove("open");
    item.setAttribute("aria-hidden", "true");
  });
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
// Pəncərəni bağlayır.
function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}
// Mobil menyu
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menyunu bağla" : "Menyunu aç",
  );
});
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);
// Əlaqə pəncərəsini açan bütün düymələr
contactTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => openModal(contactModal)),
);
// Dizayn xidməti pəncərəsi
designBtn.addEventListener("click", () => openModal(designModal));
closeButtons.forEach((button) =>
  button.addEventListener("click", () => closeModal(button.closest(".modal"))),
);
modals.forEach((modal) =>
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  }),
);
// Escape düyməsi ilə açıq pəncərəni bağlamaq
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape")
    modals.forEach((modal) => {
      if (modal.classList.contains("open")) closeModal(modal);
    });
});
// Footer-də ili avtomatik yeniləmək
document.getElementById("currentYear").textContent = new Date().getFullYear();
