<?php
require_once '../config.php';

verifyAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$logFile = getLogFile();
$logs = file_exists($logFile) ? file_get_contents($logFile) : '';
echo json_encode(['logs' => $logs]);
