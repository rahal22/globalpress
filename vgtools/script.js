function pasteLink() {
  navigator.clipboard.readText().then(text => {
    document.getElementById("linkInput").value = text;
  });
}
function startDownload() {
  const link = document.getElementById("linkInput").value.trim();
  if (!link) return alert(getText("alert.paste_first"));
  window.location.href = `fetch.php?url=${encodeURIComponent(link)}`;
}
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage();
}
function getText(key) {
  return translations[currentLang][key] || key;
}
const translations = {
  en: {
    "title": "Pixverse Downloader",
    "by": "by Versus Giants",
    "btn.paste": "Paste",
    "btn.download": "Download",
    "instruction": "Paste a Pixverse video link above and click download to save it without watermark.",
    "alert.paste_first": "Please paste a Pixverse link first.",
    "menu.about": "About",
    "menu.contact": "Contact",
    "menu.channel": "Channel"
  },
  id: {
    "title": "Pixverse Downloader",
    "by": "oleh Versus Giants",
    "btn.paste": "Tempel",
    "btn.download": "Download",
    "instruction": "Tempel link video dari Pixverse di atas, lalu klik tombol download untuk mulai mengunduh tanpa watermark.",
    "alert.paste_first": "Silakan tempelkan link Pixverse terlebih dahulu.",
    "menu.about": "Tentang",
    "menu.contact": "Kontak",
    "menu.channel": "Channel"
  }
};
let currentLang = "id";
function applyLanguage() {
  currentLang = localStorage.getItem("lang") || "id";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
  });
}
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  applyLanguage();
});
