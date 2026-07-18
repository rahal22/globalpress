<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (!isset($_POST['url'])) {
    echo json_encode(['success' => false, 'message' => 'URL tidak ditemukan.']);
    exit;
}

$raw_url = $_POST['url'];

// 1. Ekstrak URL jika user menempelkan teks promosi panjang Pixverse
preg_match('/https:\/\/share\.pix\.video\/video\/[0-9]+/', $raw_url, $matches);

if (empty($matches[0])) {
    echo json_encode(['success' => false, 'message' => 'URL Pixverse tidak valid.']);
    exit;
}

$clean_url = $matches[0];

// 2. Ambil konten HTML dari halaman Pixverse
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $clean_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
$html = curl_exec($ch);
curl_close($ch);

if (!$html) {
    echo json_encode(['success' => false, 'message' => 'Gagal mengambil data dari Pixverse.']);
    exit;
}

// 3. Cari link video original (biasanya ada di og:video atau twitter:player)
// Menggunakan regex untuk mencari pola link media.pixverse.ai
preg_match('/https:\/\/media\.pixverse\.ai\/[^"\' ]+\.mp4/', $html, $video_matches);

if (!empty($video_matches[0])) {
    // Bersihkan karakter encoding jika ada (seperti &amp;)
    $direct_video_url = htmlspecialchars_decode($video_matches[0]);
    
    echo json_encode([
        'success' => true,
        'video_url' => $direct_video_url
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menemukan tautan video asli di halaman tersebut.']);
}
?>
