<?php

namespace App\Traits;

trait NotifiableUtils
{
    public function getSenderName($user)
    {
        $senderName = $user->name;
        $app = config('app.name');
        return "$senderName ($app)";
    }

    public function getSenderEmail($user)
    {
        $senderEmail = $user->email;
        return $senderEmail;
    }

    public function getSubject($subject)
    {
        $app = config('app.name');
        return $app . " | " . $subject;
    }
}
