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

}
