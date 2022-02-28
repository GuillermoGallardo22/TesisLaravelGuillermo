<?php

namespace App\Models;

use Google;

class GoogleDrive
{
    // private Google\Client $client;
    private Google\Service\Drive $service;

    public function __construct()
    {
        $client = new Google\Client();
        $client->useApplicationDefaultCredentials();
        $client->setScopes([Google\Service\Drive::DRIVE, Google\Service\Drive::DRIVE_FILE]);

        $client->setAuthConfig(config("services.google.credentials"));

        $this->service = new Google\Service\Drive($client);
    }


    public function create($nameFile, $type = "document" | "folder", $parentDirectory = null): Google\Service\Drive\DriveFile
    {
        $file = new Google\Service\Drive\DriveFile();

        $file->setName($nameFile);

        $file->setParents([
            $parentDirectory ?: config("services.google.root_directory")
        ]);

        $file->setMimeType("application/vnd.google-apps.$type");

        return $this->service->files->create($file);
    }

    public function move($file, $addParents, $removeParents)
    {
        $tempFile = new Google\Service\Drive\DriveFile();

        return $this->service->files->update($file, $tempFile, [
            'addParents' => $addParents,
            'removeParents' => $removeParents,
        ]);
    }

    public function rename($fileId, $newName)
    {
        $tempFile = new Google\Service\Drive\DriveFile([
            'name' => $newName,
        ]);

        return $this->service->files->update($fileId, $tempFile);
    }

    public function shareFolder($userEmail, $folderId, $role)
    {
        $userPermission = new Google\Service\Drive\Permission(array(
            'type' => 'user',
            'role' => $role,
            'emailAddress' => $userEmail
        ));

        return $this->service->permissions->create(
            $folderId,
            $userPermission,
            array('fields' => 'id')
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
}
