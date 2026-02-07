<?php
require_once '../config.php';

verifyAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$applications = readJSON(getApplicationsFile());
echo json_encode(['applications' => $applications]);
