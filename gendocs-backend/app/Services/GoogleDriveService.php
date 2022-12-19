<?php

namespace App\Services;

use App\Constants\MimeType;
use Exception;
use Google\Client;
use Google\Service\Docs;
use Google\Service\Docs\BatchUpdateDocumentRequest;
use Google\Service\Docs\Request;
use Google\Service\Drive;
use Google\Service\Sheets;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;

class GoogleDriveService
{
    private Drive $service;
    private Docs $serviceDocs;
    private Sheets $serviceSheets;

    public function __construct()
    {
        $client = new Client();
        $client->useApplicationDefaultCredentials();
        $client->setScopes([Docs::DOCUMENTS, Drive::DRIVE, Drive::DRIVE_FILE]);

        $client->setAuthConfig(config("services.google.credentials"));

        $this->service = new Drive($client);
        $this->serviceDocs = new Docs($client);
        $this->serviceSheets = new Sheets($client);
    }

    public function create(
        $nameFile,
        $mimeType = MimeType::DRIVE_DOC | MimeType::DRIVE_FOLDER | MimeType::DRIVE_SS,
        $parentDirectory = null
    ): DriveFile {
        $file = new DriveFile();

        $file->setName($nameFile);

        $file->setParents([
            $parentDirectory ?: config("services.google.root_directory")
        ]);

        $file->setMimeType($mimeType);

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

    public function replaceTextOnDocument($data, $fileId)
    {
        $requests = [];

        foreach ($data as $key => $value) {
            $replaceAllTextRequest = [
                'replaceAllText' => [
                    'replaceText' => $value,
                    'containsText' => [
                        'text' => $key,
                        'matchCase' => true,
                    ],
                ],
            ];
            $requests[] = new Request($replaceAllTextRequest);
        }

        $batchUpdateRequest = new BatchUpdateDocumentRequest(['requests' => $requests]);
        return $this->serviceDocs->documents->batchUpdate($fileId, $batchUpdateRequest);
    }

    function getValues($spreadsheetId, $range)
    {
        $result = $this->serviceSheets->spreadsheets_values->get($spreadsheetId, $range);
        try {
            $numRows = $result->getValues() != null ? count($result->getValues()) : 0;
            printf("%d rows retrieved.", $numRows);
            return $result;
        } catch (Exception $e) {
            dd($e);
            echo 'Message: ' . $e->getMessage();
        }
    }
}
