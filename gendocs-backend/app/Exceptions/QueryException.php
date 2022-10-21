<?php

namespace App\Exceptions;

use Illuminate\Database\QueryException as QueryExceptionBase;
use Log;
use Symfony\Component\HttpFoundation\Response;

class QueryException
{
    private QueryExceptionBase $exception;
    private $uniqueRestrictionNames = [];
    private $messageTransKey = "";

    public function __construct($exception)
    {
        $this->exception = $exception;
    }

    public function setMessageTranskey($key)
    {
        $this->messageTransKey = "validation.custom." . $key . ".create.unique.";
    }

    public function setUniqueRestrictionNames($uniqueRestrictionNames)
    {
        $this->uniqueRestrictionNames = $uniqueRestrictionNames;
    }

    public function execute()
    {
        $errorCode = $this->exception->errorInfo[1];
        $message = $this->exception->errorInfo[2];

        $messages = [];
        $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;

        Log::info([
            "errorCode" => $errorCode,
            "message" => $message,
        ]);

        switch ($errorCode) {
            case 1062: //code dublicate entry

                foreach ($this->uniqueRestrictionNames as $key) {
                    if (str_contains($message, $key)) {
                        $messages[] = trans($this->messageTransKey . $key);
                    }
                }

                $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
                break;

            case 1048: // column cannot be null
                $messages[] = $message;
                break;
            default:
                $messages[] = $this->exception->getMessage();
                $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
                break;
        }

        return [
            [
                "errors" => $messages,
            ],
            $statusCode
        ];
    }
}
