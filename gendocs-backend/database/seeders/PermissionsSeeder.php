<?php

namespace Database\Seeders;

use App\Constants\Permissions;
use App\Constants\Roles;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
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
            'name' => Roles::Admin,
            'name_role_drive' => Str::lower(Roles::GWriter),
        ]);

        $roleAdminTemp = Role::create([
            'name' => Roles::AdminTemp,
            'name_role_drive' => Str::lower(Roles::GWriter),
        ]);

        $roleWriter = Role::create([
            'name' => Roles::Writer,
            'name_role_drive' => Str::lower(Roles::GWriter),
        ]);

        $roleReader = Role::create([
            'name' => Roles::Reader,
            'name_role_drive' => Str::lower(Roles::GReader),
        ]);

        $permissions = array_merge(
            Arr::divide(Permissions::Estudiantes)[1],
            Arr::divide(Permissions::Plantillas)[1],
            Arr::divide(Permissions::Procesos)[1],
            Arr::divide(Permissions::Consejos)[1],
            Arr::divide(Permissions::Documentos)[1],
            Arr::divide(Permissions::Numeracion)[1],
            Arr::divide(Permissions::Carreras)[1],
            Arr::divide(Permissions::Docentes)[1],
            Arr::divide(Permissions::ConsejosMiembros)[1],
            Arr::divide(Permissions::Cargos)[1],
            Arr::divide(Permissions::ActaGrado)[1],
            Arr::divide(Permissions::MiembroActaGrado)[1],
        );

        foreach ($permissions as $permissionName) {
            $permission = Permission::create([
                'name' => $permissionName,
            ]);

            list(, $action) = explode('.', $permissionName);

            if ($action === 'index') {
                $roleReader->givePermissionTo($permission);
            }

            if ($action !== 'delete') {
                $roleWriter->givePermissionTo($permission);
            }

            $roleAdmin->givePermissionTo($permission);
            $roleAdminTemp->givePermissionTo($permission);
        }

        foreach (Arr::divide(Permissions::Users)[1] as $permissionName) {
            $permission = Permission::create([
                'name' => $permissionName,
            ]);

            $roleAdmin->givePermissionTo($permission);
        }
    }
}
