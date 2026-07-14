document.addEventListener("DOMContentLoaded", () => {
    const pressForm = document.getElementById('press-form');
    const inputSection = document.getElementById('input-section');
    const outputSection = document.getElementById('output-section');

    pressForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload halaman standar

        // 1. Tangkap semua data dari kolom formulir input
        const title = document.getElementById('in-title').value;
        const subtitle = document.getElementById('in-subtitle').value;
        const bodyContent = document.getElementById('in-body').value;
        const imgUrl = document.getElementById('in-img').value;
        const date = document.getElementById('in-date').value;
        const company = document.getElementById('in-company').value;
        const email = document.getElementById('in-email').value;
        const phone = document.getElementById('in-phone').value;
        const webUrl = document.getElementById('in-web').value;
        const location = document.getElementById('in-location').value;

        // 2. Suntikkan data input ke elemen tampilan rilis pers
        document.getElementById('view-title').innerText = title;
        document.getElementById('view-subtitle').innerText = subtitle;
        document.getElementById('view-location').innerText = location.toUpperCase();
        document.getElementById('view-date').innerText = date;
        document.getElementById('view-company').innerText = company;
        document.getElementById('view-email').innerText = email;
        document.getElementById('view-phone').innerText = phone;
        
        // Setup Anchor Link untuk Website Custom
        const webLink = document.getElementById('view-web');
        webLink.href = webUrl;
        webLink.innerText = webUrl.replace('https://', '').replace('http://', '');

        // Format paragraf body berita (agar letak enter/baris baru tetap rapi)
        document.getElementById('view-body').innerText = `${location.toUpperCase()} – ${bodyContent}`;

        // 3. Logika Deteksi & Pemuatan Gambar Otomatis dari URL User
        const imgContainer = document.getElementById('view-img-container');
        const viewImg = document.getElementById('view-img');

        if (imgUrl && (imgUrl.startsWith('http://') || imgUrl.startsWith('https://'))) {
            viewImg.src = imgUrl;
            imgContainer.classList.remove('hidden');
        } else {
            imgContainer.classList.add('hidden');
        }

        // 4. Sembunyikan formulir input, langsung munculkan halaman berita utama
        inputSection.classList.add('hidden');
        outputSection.classList.remove('hidden');

        // Scroll otomatis ke bagian atas halaman agar pengguna langsung melihat hasilnya
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
