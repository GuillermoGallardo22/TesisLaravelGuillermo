<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Authentication
{
    public static function login(Request $request)
    {
        $user = User::where([
            ['email', '=', $request->email],
            ['status', '=', 1],
        ])->first();

        if (
            $user &&
            Hash::check($request->password, $user->password)
        ) {
            return $user;
        }
    }
}
