// Paste link from clipboard into input field
function pasteLink() {
  navigator.clipboard.readText().then(text => {
    document.getElementById("linkInput").value = text;
  });
}

// Start the download process
function startDownload() {
  const rawText = document.getElementById("linkInput").value.trim();
  const pixverseLink = extractPixverseLink(rawText);

  console.log("Link yang diproses:", pixverseLink); // Debug

  if (!pixverseLink) {
    alert(getText("alert.paste_first"));
    return;
  }

  window.location.href = `fetch.php?url=${encodeURIComponent(pixverseLink)}`;
}

// Ambil hanya link Pixverse dari teks
function extractPixverseLink(text) {
  const regex = /(https?:\/\/(?:www\.)?share\.pix\.video\/[^\s]+)/;
  const match = text.match(regex);
  return match ? match[1] : null;
}

// Toggle the mobile navigation menu
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  const isOpen = menu.style.display === "flex";
  menu.style.display = isOpen ? "none" : "flex";
}

// Translation data
const translations = {
  "title": "Pixverse Downloader",
  "by": "by Versus Giants",
  "btn.paste": "Paste",
  "btn.download": "Download",
  "instruction": "Paste a Pixverse video link above and click download to save it without watermark.",
  "alert.paste_first": "Please paste a Pixverse link first.",
  "menu.about": "About",
  "menu.contact": "Contact",
  "menu.channel": "Channel"
};

// Get translation text
function getText(key) {
  return translations[key] || key;
}

// Apply translated text
function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
});
