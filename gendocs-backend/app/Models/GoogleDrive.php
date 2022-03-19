<?php

namespace App\Models;

use Google\Client;
use Google\Service\Docs;
use Google\Service\Docs\BatchUpdateDocumentRequest;
use Google\Service\Docs\Request;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;

class GoogleDrive
{
    private Drive $service;
    private Docs $serviceDocs;

    public function __construct()
    {
        $client = new Client();
        $client->useApplicationDefaultCredentials();
        $client->setScopes([Drive::DRIVE, Drive::DRIVE_FILE]);

        $client->setAuthConfig(config("services.google.credentials"));

        $this->service = new Drive($client);
        $this->serviceDocs = new Docs($client);
    }

    public function create($nameFile, $type = "document" | "folder", $parentDirectory = null): DriveFile
    {
        $file = new DriveFile();

        $file->setName($nameFile);

        $file->setParents([
            $parentDirectory ?: config("services.google.root_directory")
        ]);

        $file->setMimeType("application/vnd.google-apps.$type");

        return $this->service->files->create($file);
    }

    public function move($file, $addParents, $removeParents)
    {
        $tempFile = new DriveFile();

        return $this->service->files->update($file, $tempFile, [
            'addParents' => $addParents,
            'removeParents' => $removeParents,
        ]);
    }

    public function rename($fileId, $newName)
    {
        $tempFile = new DriveFile([
            'name' => $newName,
        ]);

        return $this->service->files->update($fileId, $tempFile);
    }

    public function shareFolder($userEmail, $folderId, $role)
    {
        $userPermission = new Permission(array(
            'type' => 'user',
            'role' => $role,
            'emailAddress' => $userEmail
        ));

        return $this->service->permissions->create(
            $folderId,
            $userPermission,
        );
    }

    public function deletePermission($resourceId, $permissionId)
    {
        return $this->service->permissions->delete(
            $resourceId,
            $permissionId,
        );
    }

    public function retrieveAllPermissions($folderId, $userPermissionId)
    {
        return $this->service->permissions->get(
            $folderId,
            $userPermissionId,
        );
    }

    public function getFile($fileId)
    {
        return $this->service->files->get(
            $fileId,
        );
    }

    public function exportFile($fileId, $mimeType)
    {
        return $this->service->files->export(
            $fileId,
            $mimeType,
            array(
                'alt' => 'media',
            )
        );
    }

    public function copyFile($nameFile, $parentDirectory, $idFile)
    {
        $file = new DriveFile();

        $file->setName($nameFile);

        $file->setParents([
            $parentDirectory,
        ]);

        return $this->service->files->copy($idFile, $file);
    }
}
