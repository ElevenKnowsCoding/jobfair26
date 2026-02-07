<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['name']) || !isset($data['email'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'Missing required fields']));
}

$applications = readJSON(getApplicationsFile());

$application = [
    'id' => uniqid(),
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $data['name'],
    'email' => $data['email'],
    'phone' => $data['phone'] ?? '',
    'university' => $data['university'] ?? '',
    'major' => $data['major'] ?? '',
    'graduationYear' => $data['graduationYear'] ?? '',
    'skills' => $data['skills'] ?? [],
    'cvPath' => $data['cvPath'] ?? null,
    'status' => 'pending'
];

$applications[] = $application;
writeJSON(getApplicationsFile(), $applications);
logActivity("New application: {$data['name']} ({$data['email']})");

echo json_encode(['success' => true, 'applicationId' => $application['id']]);
