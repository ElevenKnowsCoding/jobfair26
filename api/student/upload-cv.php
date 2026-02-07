<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

if (!isset($_FILES['cv'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'No file uploaded']));
}

$file = $_FILES['cv'];
$allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid file type']));
}

if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    exit(json_encode(['error' => 'File too large']));
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '_' . time() . '.' . $extension;
$filepath = UPLOADS_DIR . '/' . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    logActivity("CV uploaded: $filename");
    echo json_encode(['success' => true, 'path' => '/uploads/' . $filename]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload file']);
}
