<?php

namespace App\Http\Controllers;

use App\Models\Directorio;
use App\Models\GoogleDrive;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GoogleDriveController extends Controller
{
    public GoogleDrive $googleDrive;

    public function __construct(GoogleDrive $googleDrive)
    {
        $this->googleDrive = $googleDrive;
    }

    public function myPermissions(Request $request)
    {
        $user = User::query()->where('email_gmail', $request->query('email'))->first();

        return response()->json($this->googleDrive->retrieveAllPermissions(
            Directorio::query()->activeDirectory()->drive_id,
            $user->permission->google_drive_id,
        ));
    }

    public function getFile(Request $request)
    {
        return response()->json(
            $this->googleDrive->getFile(
                $request->query('fileId'),
            )
        );
    }

    public function exportFile(Request $request)
    {
        $file = $this->googleDrive->exportFile(
            $request->query('fileId'),
            // "application/rtf",
            // "application/vnd.oasis.opendocument.text"
            "application/pdf"
        );

        dd($file);

        $headers = [
            'Content-Type' => 'application/pdf',
        ];

        // Log::debug($file);

        $size = $file->getBody()->getSize();
        $content = $file->getBody()->read($size);

        Storage::disk('local')->put('prueba.pdf', $content);

        // return $file;
        // return $file->getBody()->getContents();
        // return response()->json('ok');
        // return response()->download($content, "prueba.pdf", $headers);

        return response()->json([
            // "content" => $file->content(),
            // "getData" => $file->getData(),
            // "file" => $file,
            'size' => $size,
            // "content" => $content,
        ]);
    }
}
