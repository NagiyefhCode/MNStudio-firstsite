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

// Pəncərə açılmazdan əvvəl fokusda olan elementi yadda saxlayır ki,
// pəncərə bağlananda fokus ora qaytarıla bilsin.
let lastFocusedElement = null;

// Pəncərə daxilindəki fokuslana bilən bütün elementləri qaytarır.
function getFocusableElements(modal) {
  return modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
  );
}

// Pəncərə açıq ikən Tab düyməsi ilə fokusun pəncərədən kənara çıxmasının qarşısını alır.
function trapFocus(event, modal) {
  if (event.key !== "Tab") return;
  const focusable = getFocusableElements(modal);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else if (document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

// Pəncərəni açır və açıq qalan digər pəncərəni bağlayır.
function openModal(modal, trigger) {
  lastFocusedElement = trigger || document.activeElement;
  modals.forEach((item) => {
    item.classList.remove("open");
    item.setAttribute("aria-hidden", "true");
  });
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
// Pəncərəni bağlayır və fokusu onu açan elementə qaytarır.
function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  if (
    lastFocusedElement &&
    document.body.contains(lastFocusedElement) &&
    lastFocusedElement.offsetParent !== null
  ) {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
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
  trigger.addEventListener("click", () => openModal(contactModal, trigger)),
);
// Dizayn xidməti pəncərəsi
designBtn.addEventListener("click", () => openModal(designModal, designBtn));
closeButtons.forEach((button) =>
  button.addEventListener("click", () => closeModal(button.closest(".modal"))),
);
modals.forEach((modal) =>
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  }),
);
// Açıq pəncərədə Escape ilə bağlamaq və Tab ilə fokusu pəncərə daxilində saxlamaq
document.addEventListener("keydown", (event) => {
  const openModalEl = document.querySelector(".modal.open");
  if (!openModalEl) return;

  if (event.key === "Escape") {
    closeModal(openModalEl);
    return;
  }

  trapFocus(event, openModalEl);
});
// Footer-də ili avtomatik yeniləmək
document.getElementById("currentYear").textContent = new Date().getFullYear();
