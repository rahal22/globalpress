<?php
if (!isset($_GET['url'])) {
    die("URL tidak tersedia");
}

$url = $_GET['url'];
$html = @file_get_contents($url);

if (!$html) {
    die("Gagal mengambil halaman");
}

if (preg_match('/https:\/\/media\.pixverse\.ai[^"]+\.mp4/', $html, $matches)) {
    $videoUrl = $matches[0];
    $filename = basename(parse_url($videoUrl, PHP_URL_PATH));

    // Kirim header agar langsung download
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    readfile($videoUrl);
    exit;
} else {
    die("Video tidak ditemukan.");
}
?>
