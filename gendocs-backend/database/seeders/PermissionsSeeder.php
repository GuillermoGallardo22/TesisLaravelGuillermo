<?php

namespace Database\Seeders;

use App\Constants\Permissions;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roleAdmin = Role::create([
            'name' => 'Admin'
        ]);

        $roleAdminTemp = Role::create([
            'name' => 'AdminTemp'
        ]);

        $roleWriter = Role::create([
            'name' => 'Writer'
        ]);

        $roleReader = Role::create([
            'name' => 'Reader'
        ]);

        $permissions = array_merge(
            Arr::divide(Permissions::$Estudiantes)[1],
            Arr::divide(Permissions::$Plantillas)[1],
            Arr::divide(Permissions::$Procesos)[1],
        );

        foreach ($permissions as $permissionName) {
            $permission = Permission::create([
                'name' => $permissionName,
            ]);

            $roleAdmin->givePermissionTo($permission);
            $roleAdminTemp->givePermissionTo($permission);
            $roleWriter->givePermissionTo($permission);

            list(, $action) = explode('.', $permissionName);

            if ($action === 'index') {
                $roleReader->givePermissionTo($permission);
            }
        }

        foreach (Arr::divide(Permissions::$Users)[1] as $permissionName) {
            $permission = Permission::create([
                'name' => $permissionName,
            ]);

            $roleAdmin->givePermissionTo($permission);
        }

    }
}
