<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

define('DATA_DIR', __DIR__ . '/../data');
define('UPLOADS_DIR', __DIR__ . '/../public/uploads');
define('ADMIN_PASSWORD', 'zaina2026');

if (!file_exists(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
if (!file_exists(UPLOADS_DIR)) mkdir(UPLOADS_DIR, 0755, true);

function getApplicationsFile() { return DATA_DIR . '/applications.json'; }
function getLogFile() { return DATA_DIR . '/activity.log'; }

function readJSON($file) {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?: [];
}

function writeJSON($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function logActivity($message) {
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents(getLogFile(), "[$timestamp] $message\n", FILE_APPEND);
}

function verifyAdmin() {
    $headers = getallheaders();
    $password = $headers['X-Admin-Password'] ?? $_POST['password'] ?? '';
    if ($password !== ADMIN_PASSWORD) {
        http_response_code(401);
        exit(json_encode(['error' => 'Unauthorized']));
    }
}
