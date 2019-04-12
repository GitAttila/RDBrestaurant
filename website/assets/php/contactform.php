<?php

header("Content-Type: application/json");

$result = array(
    "errors" => array(),
);

if (strlen($_POST["name"]) == 0) {
    $result["errors"]["contact-name"] = "Please enter your name.";
}
if (strlen($_POST["email"]) == 0) {
    $result["errors"]["contact-email"] = "Please enter your email.";
}else {
    if (!preg_match("/^.*@.*\\..*$/", $_POST["email"])) {
        $result["errors"]["contact-email"] = "Invalid email.";
    }
}
if (strlen($_POST["message"]) == 0) {
    $result["errors"]["contact-message"] = "Please fill out your message.";
}

if (strlen($_POST["message"]) > 1000) {
    $result["errors"]["contact-message"] = "Your message has exceeded maximum allowed number of 1000 characters.";
}

$siteSecret = 'fill your site secret here';
if (strlen($_POST["g-recaptcha-response"]) == 0) {
    $result["errors"]["contact-recaptcha"] = "Recaptcha must be selected.";
} else {
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=6Lee64QUAAAAAF_63x1saE5nryLtMx0wCYLiGJIN'.$siteSecret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if ($responseData->success) {
            // recaptcha resposne was successful.
            $result["success"]["contact-recaptcha"] = "Recaptcha passed successfully.";
        } else {
            $result["errors"]["contact-recaptcha"] = "Server error in recaptcha response.";
        }
}

if (count($result["errors"]) == 0) {
    $contactFormHistory = array();
    if (file_exists("contactFormHistory.json")) {
        $contactFormHistory = json_decode(file_get_contents("contactFormHistory.json"), true);
    }

    $ip = $_SERVER["REMOTE_ADDR"];
    if (!array_key_exists($ip, $contactFormHistory)) {
        $contactFormHistory[$ip] = array();
    }
    $contactFormHistory[$ip][] = time();

    // ulozime
    file_put_contents("contactFormHistory.json", json_encode($contactFormHistory));

    // zvalidujem
    $sendCount = 0;
    foreach ($contactFormHistory[$ip] as $timestamp) {
        if ($timestamp > time() - 24*3600) {
            $sendCount++;
        }
    }

    if ($sendCount > 5) {
        $result["errors"]["contact-result"] = "It is not allowed to send more than 5 messages within 24 hours.";
    }else {
        require 'PHPMailer/PHPMailerAutoload.php';
        // form ok
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];
        $bodyToSender = "You have sent the following information to RANGDEBANSATI.CZ: \n\nName: " . $name . "\nEmail: " . $email . "\nMessage: " . $message;
        $bodyToOwner = "Contact information has been sent from the RANGDEBASANTI.CZ website: \n\nName: " . $name . "\nEmail: " . $email . "\nMessage: " . $message;

        $mail = new PHPMailer(); 
        $mailToSender = new PHPMailer(); 

        // set up the mailer for rangdebasanti.cz:
        $mail->Host = "";
        $mail->Port = ""; // Likely 25, 465, or 587
        $mail->SMTPAuth = ""; // not sure what the auth details are for this
        $mail->Username = "";
        $mail->Password = "";
        $mail->setFrom($email, $name);
        //$mail->addReplyTo($email);
        $mail->addAddress('info@rangdebasanti.cz');
        $mail->Subject = 'RANGDEBASANTI.CZ: contact message from ' . $name;
        $mail->Body = $bodyToOwner;

        // set up the mailer for the sender:
        $mailToSender->Host = "";
        $mailToSender->Port = ""; // Likely 25, 465, or 587
        $mailToSender->SMTPAuth = ""; // not sure what the auth details are for this
        $mailToSender->Username = "";
        $mailToSender->Password = "";
        $mailToSender->setFrom('info@rangdebasanti.cz', 'Rang De Basanti restaurant');
        //$mail->addReplyTo($email);
        $mailToSender->addAddress($email);
        $mailToSender->Subject = 'RANGDEBASANTI.CZ: contact information / copy of the message ';
        $mailToSender->Body = $bodyToSender;

        // Send the message to rangdebasanti.cz owner, check for errors
        $okToOwner = $mail->send();

        if(!$okToOwner) {
            $result["errors"]["contact-result"] = "Email to the restaurant could not be sent!";
        }
        
        // Send the message to the sender from the formular, check for errors
        $okToSender = $mailToSender->send();

        if(!$okToSender) {
            $result["errors"]["contact-resulttosender"] = "Email could not be delivered to the address submitted: " . $email;
        }

    }
}

// vypisu vysledek
echo json_encode($result);

?>