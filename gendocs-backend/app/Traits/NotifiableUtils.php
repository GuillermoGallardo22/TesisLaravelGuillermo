<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait NotifiableUtils
{
    public function getSenderName()
    {
        $senderName = Auth::user()->name;
        $app = config('app.name');
        return "$senderName ($app)";
    }

    public function getSenderEmail()
    {
        $senderEmail = Auth::user()->email;
        return $senderEmail;
    }

    public function getSubject($subject)
    {
        $app = config('app.name');
        return $app . " | " . $subject;
    }
}
