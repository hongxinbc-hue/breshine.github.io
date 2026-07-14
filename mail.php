<?php
declare(strict_types=1);

session_start();
header('Content-Type: text/plain; charset=UTF-8');

if (isset($_GET['captcha'])) {
    $a = random_int(2, 9);
    $b = random_int(1, 9);
    $_SESSION['contact_captcha'] = $a + $b;
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['question' => "Security question: {$a} + {$b} = ?"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Method not allowed.';
    exit;
}

function fail_request(string $message, int $status = 422): void
{
    http_response_code($status);
    echo $message;
    exit;
}

if (trim((string)($_POST['website'] ?? '')) !== '') {
    fail_request('Unable to process this request.');
}

$lastSent = (int)($_SESSION['contact_last_sent'] ?? 0);
if ($lastSent > 0 && time() - $lastSent < 60) {
    fail_request('Please wait 60 seconds before sending another message.', 429);
}

$expectedCaptcha = $_SESSION['contact_captcha'] ?? null;
unset($_SESSION['contact_captcha']);
if ($expectedCaptcha === null || !isset($_POST['captcha']) || (int)$_POST['captcha'] !== $expectedCaptcha) {
    fail_request('The security answer is incorrect. Please try again.');
}

$name = trim((string)($_POST['name'] ?? ''));
$phone = trim((string)($_POST['number'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$comment = trim((string)($_POST['comment'] ?? ''));

if (mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    fail_request('Please enter a valid name.');
}
if (!preg_match('/^[0-9+() .-]{6,30}$/', $phone)) {
    fail_request('Please enter a valid phone number.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || preg_match('/[\r\n]/', $email)) {
    fail_request('Please enter a valid email address.');
}
if (mb_strlen($subject) < 2 || mb_strlen($subject) > 120 || preg_match('/[\r\n]/', $subject)) {
    fail_request('Please enter a valid subject.');
}
if (mb_strlen($comment) < 10 || mb_strlen($comment) > 3000) {
    fail_request('Please enter a message between 10 and 3000 characters.');
}

$to = 'hongxinbc@gmail.com';
$mailSubject = 'Website Inquiry: ' . $subject;
$message = "Name: {$name}\nPhone: {$phone}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$comment}\n";
$headers = "From: Breshine Website <noreply@breshine.com>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (!mail($to, $mailSubject, $message, $headers)) {
    fail_request('Message sending failed. Please try again later.', 500);
}

$_SESSION['contact_last_sent'] = time();
echo 'Message sent successfully.';
