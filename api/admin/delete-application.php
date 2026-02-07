<?php
require_once '../config.php';

verifyAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if (!$id) {
    http_response_code(400);
    exit(json_encode(['error' => 'Missing application ID']));
}

$applications = readJSON(getApplicationsFile());
$applications = array_filter($applications, function($app) use ($id) {
    return $app['id'] !== $id;
});

writeJSON(getApplicationsFile(), array_values($applications));
logActivity("Application deleted: $id");

echo json_encode(['success' => true]);
