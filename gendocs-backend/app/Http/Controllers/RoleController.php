<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceCollection;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Role::class);
    }

    public function index()
    {
        return Role::all();
    }
}
