// Paste link from clipboard into input field
function pasteLink() {
  navigator.clipboard.readText().then(text => {
    document.getElementById("linkInput").value = text;
  });
}

// Start the download process (Sudah diperbaiki tanpa PHP)
async function startDownload() {
  const rawText = document.getElementById("linkInput").value.trim();
  const pixverseLink = extractPixverseLink(rawText);

  console.log("Link yang diproses:", pixverseLink); // Debug

  if (!pixverseLink) {
    alert(getText("alert.paste_first"));
    return;
  }

  // Membuat info status sederhana di bawah tombol (opsional agar user tahu web sedang bekerja)
  let statusDiv = document.getElementById("downloadStatus");
  if (!statusDiv) {
    statusDiv = document.createElement("div");
    statusDiv.id = "downloadStatus";
    statusDiv.style.color = "#ffffff";
    statusDiv.style.marginTop = "10px";
    statusDiv.style.textAlign = "center";
    document.getElementById("linkInput").parentNode.appendChild(statusDiv);
  }
  statusDiv.innerText = "Menganalisis video Pixverse...";

  try {
    // Membaca isi halaman Pixverse lewat CORS Proxy gratis (allorigins)
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(pixverseLink)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) throw new Error("Gagal terhubung ke proxy server.");
    
    const data = await response.json();
    const htmlContent = data.contents;

    // Regex untuk mencari direct link video mp4 asli milik Pixverse
    const videoPattern = /https:\/\/media\.pixverse\.ai\/[^"'\s>]+\.mp4/;
    const videoMatches = htmlContent.match(videoPattern);

    if (videoMatches && videoMatches[0]) {
      // Bersihkan karakter encoding amp jika ada
      let directVideoUrl = videoMatches[0].replace(/&amp;/g, '&');
      
      statusDiv.innerText = "Unduhan dimulai!";
      
      // Pemicu download otomatis file MP4 asli ke device user
      const a = document.createElement('a');
      a.href = directVideoUrl;
      a.download = 'pixverse_video.mp4';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => { statusDiv.innerText = ""; }, 3000);
    } else {
      alert("Gagal menemukan tautan video asli. Pastikan link video publik.");
      statusDiv.innerText = "";
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan sistem saat mengambil data video.");
    statusDiv.innerText = "";
  }
}

// Ambil hanya link Pixverse dari teks
function extractPixverseLink(text) {
  const regex = /(https?:\/\/(?:www\.)?share\.pix\.video\/video\/[0-9]+)/;
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
