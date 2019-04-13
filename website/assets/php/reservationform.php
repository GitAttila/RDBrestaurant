<?php

header("Content-Type: application/json");

$result = array(
    "errors" => array(),
);

if (strlen($_POST["name"]) == 0) {
    $result["errors"]["reservation-name"] = "Please enter your name.";
}

if (strlen($_POST["email"]) == 0) {
    $result["errors"]["reservation-email"] = "Please enter your email.";
} else {
    if (!preg_match("/^.*@.*\\..*$/", $_POST["email"])) {
        $result["errors"]["reservation-email"] = "Invalid email.";
    }
}
if (strlen($_POST["phone"]) == 0) {
    $result["errors"]["reservation-phone"] = "Please enter your phone number.";
} else {
    if (!preg_match("/^\s*(?:\+?([-. (]*(\d{1,3})[-. )]*))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4}))\s*$/",$_POST["phone"])) {
        $result["errors"]["reservation-phone"] = "Invalid phone number!";
    }
}

if (strlen($_POST["reservationdate"]) == 0) {
    $result["errors"]["reservation-reservationdate"] = "Please enter your reservation date.";
}
if (strlen($_POST["reservationtime"]) == 0) {
    $result["errors"]["reservation-reservationtime"] = "Please enter your reservation time.";
}

if (strlen($_POST["guestsnumber"]) != 0) {
    if (!is_numeric($_POST["guestsnumber"])) {
        $result["errors"]["reservation-guestsnumber"] = "Must be a numeric value.";
    } else {
        if ($_POST["guestsnumber"] < 0 || $_POST["guestsnumber"] > 80) {
            $result["errors"]["reservation-guestsnumber"] = "Number of guests entered must be in the range of 0-80.";
        }
    }
}

if (strlen($_POST["message"]) > 1000) {
    $result["errors"]["reservation-message"] = "Your message has exceeded maximum allowed number of 1000 characters.";
}

if (count($result["errors"]) == 0) {
    $ResFormHistory = array();
    if (file_exists("ResFormHistory.json")) {
        $ResFormHistory = json_decode(file_get_contents("ResFormHistory.json"), true);
    }

    $ip = $_SERVER["REMOTE_ADDR"];
    if (!array_key_exists($ip, $ResFormHistory)) {
        $ResFormHistory[$ip] = array();
    }
    $ResFormHistory[$ip][] = time();

    // ulozime
    file_put_contents("ResFormHistory.json", json_encode($ResFormHistory));

    // zvalidujem
    $sendCount = 0;
    foreach ($ResFormHistory[$ip] as $timestamp) {
        if ($timestamp > time() - 24*3600) {
            $sendCount++;
        }
    }

    if ($sendCount > 5) {
        $result["errors"]["reservation-result"] = "It is not allowed to send more than 5 messages within 24 hours.";
    }else {
        require 'PHPMailer/PHPMailerAutoload.php';
        // form ok
        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $message = $_POST["message"];
        $resdate = $_POST["reservationdate"];
        $restime = $_POST["reservationtime"];
        $guestsnum = $_POST["guestsnumber"];

        $bodymsg = "Reservation from the RANGDEBASANTI.CZ website: \n\nName: " . $name . "\nEmail: " . $email . "\nPhone: " . $phone . "\nMessage: " . $message . "\nReservation date: " . $resdate . "\nReservation time: " . $restime. "\nNumber of guests: " . $guestsnum;

        $mail = new PHPMailer(); // https://github.com/PHPMailer/PHPMailer

        $mail->Host = "";
        $mail->Port = ""; // Likely 25, 465, or 587
        $mail->SMTPAuth = ""; // not sure what the auth details are for this
        $mail->Username = "";
        $mail->Password = "";

        $mail->setFrom($email, $name);
        $mail->addReplyTo($email);
        $mail->addAddress('info@rangdebasanti.cz');
        $mail->Subject = 'RANGDEBASANTI.CZ - RESERVATION ';
        $mail->Body = $bodymsg;

        // Send the message, check for errors
        $ok = $mail->send();

        if(!$ok) {
            $result["errors"]["reservation-result"] = "Email could not be sent!";
        }
        
    }
}

// vypisu vysledek
echo json_encode($result);

?>