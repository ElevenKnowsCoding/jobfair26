<?php
require_once '../config.php';

verifyAdmin();

$applications = readJSON(getApplicationsFile());

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="applications_' . date('Y-m-d') . '.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, ['ID', 'Name', 'Email', 'Phone', 'University', 'Major', 'Graduation Year', 'Skills', 'CV', 'Status', 'Timestamp']);

foreach ($applications as $app) {
    fputcsv($output, [
        $app['id'],
        $app['name'],
        $app['email'],
        $app['phone'] ?? '',
        $app['university'] ?? '',
        $app['major'] ?? '',
        $app['graduationYear'] ?? '',
        implode(', ', $app['skills'] ?? []),
        $app['cvPath'] ?? '',
        $app['status'] ?? 'pending',
        $app['timestamp']
    ]);
}

fclose($output);
