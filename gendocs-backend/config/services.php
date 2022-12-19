<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'google' => [
        'timeout_processing' => env('TIMEOUT_DOCUMENT_PROCESSING', 500000),
        'root_directory' => env('GOOGLE_DRIVE_ROOT_DIRECTORY_ID'),
        'default_template' => env('DEFAULT_TEMPLATE'),
        'credentials' => [
            'type' => env('GOOGLE_APPLICATION_CREDENTIALS_TYPE'),
            'project_id' => env('GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID'),
            'private_key_id' => env('GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY_ID'),
            'private_key' => env('GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY'),
            'client_email' => env('GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL'),
            'client_id' => env('GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID'),
            'auth_uri' => env('GOOGLE_APPLICATION_CREDENTIALS_AUTH_URI'),
            'token_uri' => env('GOOGLE_APPLICATION_CREDENTIALS_TOKEN_URI'),
            'auth_provider_x509_cert_url' => env('GOOGLE_APPLICATION_CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL'),
            'client_x509_cert_url' => env('GOOGLE_APPLICATION_CREDENTIALS_CLIENT_X509_CERT_URL'),
        ],
        // DIRECTORIOS COMUNES
        'agd' => env('GOOGLE_DRIVE_AGD_ID'),
    ],

];
