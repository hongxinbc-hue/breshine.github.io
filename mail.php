<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"] ?? "");
    $phone = trim($_POST["number"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $subject = trim($_POST["subject"] ?? "");
    $comment = trim($_POST["comment"] ?? "");

    $to = "hongxinbc@gmail.com";
    $mail_subject = "Website Inquiry: " . $subject;

    $message = "Name: " . $name . "\n";
    $message .= "Phone: " . $phone . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Subject: " . $subject . "\n\n";
    $message .= "Message:\n" . $comment . "\n";

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    if (mail($to, $mail_subject, $message, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Message sending failed.";
    }
}
?>