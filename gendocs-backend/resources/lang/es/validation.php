<?php

/*
|--------------------------------------------------------------------------
| Validation Language Lines
|--------------------------------------------------------------------------
|
| The following language lines contain the default error messages used by
| the validator class. Some of these rules have multiple versions such
| as the size rules. Feel free to tweak each of these messages here.
|
*/

use App\Constants\UniqueConstraintNames;

return [
    'accepted' => ':attribute debe ser aceptado.',
    'accepted_if' => ':attribute debe ser aceptado cuando :other sea :value.',
    'active_url' => ':attribute no es una URL válida.',
    'after' => ':attribute debe ser una fecha posterior a :date.',
    'after_or_equal' => ':attribute debe ser una fecha posterior o igual a :date.',
    'alpha' => ':attribute sólo debe contener letras.',
    'alpha_dash' => ':attribute sólo debe contener letras, números, guiones y guiones bajos.',
    'alpha_num' => ':attribute sólo debe contener letras y números.',
    'array' => ':attribute debe ser un conjunto.',
    'before' => ':attribute debe ser una fecha anterior a :date.',
    'before_or_equal' => ':attribute debe ser una fecha anterior o igual a :date.',
    'between' => [
        'array' => ':attribute tiene que tener entre :min - :max elementos.',
        'file' => ':attribute debe pesar entre :min - :max kilobytes.',
        'numeric' => ':attribute tiene que estar entre :min - :max.',
        'string' => ':attribute tiene que tener entre :min - :max caracteres.',
    ],
    'boolean' => 'El campo :attribute debe tener un valor verdadero o falso.',
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'current_password' => 'La contraseña es incorrecta.',
    'date' => ':attribute no es una fecha válida.',
    'date_equals' => ':attribute debe ser una fecha igual a :date.',
    'date_format' => ':attribute no corresponde al formato :format.',
    'declined' => ':attribute debe ser rechazado.',
    'declined_if' => ':attribute debe ser rechazado cuando :other sea :value.',
    'different' => ':attribute y :other deben ser diferentes.',
    'digits' => ':attribute debe tener :digits dígitos.',
    'digits_between' => ':attribute debe tener entre :min y :max dígitos.',
    'dimensions' => 'Las dimensiones de la imagen :attribute no son válidas.',
    'distinct' => 'El campo :attribute contiene un valor duplicado.',
    'email' => ':attribute no es un correo válido.',
    'ends_with' => 'El campo :attribute debe finalizar con uno de los siguientes valores: :values',
    'enum' => 'El :attribute seleccionado es inválido.',
    'exists' => 'El :attribute seleccionado es inválido.',
    'file' => 'El campo :attribute debe ser un archivo.',
    'filled' => 'El campo :attribute es obligatorio.',
    'gt' => [
        'array' => 'El campo :attribute debe tener más de :value elementos.',
        'file' => 'El campo :attribute debe tener más de :value kilobytes.',
        'numeric' => 'El campo :attribute debe ser mayor que :value.',
        'string' => 'El campo :attribute debe tener más de :value caracteres.',
    ],
    'gte' => [
        'array' => 'El campo :attribute debe tener como mínimo :value elementos.',
        'file' => 'El campo :attribute debe tener como mínimo :value kilobytes.',
        'numeric' => 'El campo :attribute debe ser como mínimo :value.',
        'string' => 'El campo :attribute debe tener como mínimo :value caracteres.',
    ],
    'image' => ':attribute debe ser una imagen.',
    'in' => ':attribute es inválido.',
    'in_array' => 'El campo :attribute no existe en :other.',
    'integer' => ':attribute debe ser un número entero.',
    'ip' => ':attribute debe ser una dirección IP válida.',
    'ipv4' => ':attribute debe ser una dirección IPv4 válida.',
    'ipv6' => ':attribute debe ser una dirección IPv6 válida.',
    'json' => 'El campo :attribute debe ser una cadena JSON válida.',
    'lt' => [
        'array' => 'El campo :attribute debe tener menos de :value elementos.',
        'file' => 'El campo :attribute debe tener menos de :value kilobytes.',
        'numeric' => 'El campo :attribute debe ser menor que :value.',
        'string' => 'El campo :attribute debe tener menos de :value caracteres.',
    ],
    'lte' => [
        'array' => 'El campo :attribute debe tener como máximo :value elementos.',
        'file' => 'El campo :attribute debe tener como máximo :value kilobytes.',
        'numeric' => 'El campo :attribute debe ser como máximo :value.',
        'string' => 'El campo :attribute debe tener como máximo :value caracteres.',
    ],
    'mac_address' => 'El campo :attribute debe ser una dirección MAC válida.',
    'max' => [
        'array' => ':attribute no debe tener más de :max elementos.',
        'file' => ':attribute no debe ser mayor que :max kilobytes.',
        'numeric' => ':attribute no debe ser mayor que :max.',
        'string' => ':attribute no debe ser mayor que :max caracteres.',
    ],
    'mimes' => ':attribute debe ser un archivo con formato: :values.',
    'mimetypes' => ':attribute debe ser un archivo con formato: :values.',
    'min' => [
        'array' => ':attribute debe tener al menos :min elementos.',
        'file' => 'El tamaño de :attribute debe ser de al menos :min kilobytes.',
        'numeric' => 'El tamaño de :attribute debe ser de al menos :min.',
        'string' => ':attribute debe contener al menos :min caracteres.',
    ],
    'multiple_of' => 'El campo :attribute debe ser múltiplo de :value',
    'not_in' => ':attribute es inválido.',
    'not_regex' => 'El formato del campo :attribute no es válido.',
    'numeric' => ':attribute debe ser numérico.',
    'password' => 'La contraseña es incorrecta.',
    'present' => 'El campo :attribute debe estar presente.',
    'prohibited' => 'El campo :attribute está prohibido.',
    'prohibited_if' => 'El campo :attribute está prohibido cuando :other es :value.',
    'prohibited_unless' => 'El campo :attribute está prohibido a menos que :other sea :values.',
    'prohibits' => 'El campo :attribute prohibe que :other esté presente.',
    'regex' => 'El formato de :attribute es inválido.',
    'required' => 'El campo :attribute es obligatorio.',
    'required_if' => 'El campo :attribute es obligatorio cuando :other es :value.',
    'required_unless' => 'El campo :attribute es obligatorio a menos que :other esté en :values.',
    'required_with' => 'El campo :attribute es obligatorio cuando :values está presente.',
    'required_with_all' => 'El campo :attribute es obligatorio cuando :values están presentes.',
    'required_without' => 'El campo :attribute es obligatorio cuando :values no está presente.',
    'required_without_all' => 'El campo :attribute es obligatorio cuando ninguno de :values está presente.',
    'same' => ':attribute y :other deben coincidir.',
    'size' => [
        'array' => ':attribute debe contener :size elementos.',
        'file' => 'El tamaño de :attribute debe ser :size kilobytes.',
        'numeric' => 'El tamaño de :attribute debe ser :size.',
        'string' => ':attribute debe contener :size caracteres.',
    ],
    'starts_with' => 'El campo :attribute debe comenzar con uno de los siguientes valores: :values',
    'string' => 'El campo :attribute debe ser una cadena de caracteres.',
    'timezone' => ':Attribute debe ser una zona horaria válida.',
    'unique' => 'El campo :attribute ya ha sido registrado.',
    'uploaded' => 'Subir :attribute ha fallado.',
    'url' => ':Attribute debe ser una URL válida.',
    'uuid' => 'El campo :attribute debe ser un UUID válido.',
    'custom' => [
        'email' => [
            'unique' => 'El :attribute ya ha sido registrado.',
        ],
        'password' => [
            'min' => 'La :attribute debe contener más de :min caracteres',
        ],
        // CUSTOM VALIDATION
        'consejo' => [
            'update' => [
                'estado' => 'No se puede actualizar el registro con el estado actual.'
            ],
            'delete' => [
                'estado' => 'No se puede eliminar el registro con el estado actual.',
                'documentos' => 'No se puede eliminar el registro porque tiene documentos asignados.',
                'numeracion' => 'No se puede eliminar el registro porque tiene números reservados asignados.'
            ],
            'close' => [
                'documentos' => 'No se puede cerrar el consejo porque no tiene documentos asignados.',
            ]
        ],
        'user' => [
            'update' => [
                'password' => 'La contraseña proporcionada no coincide con su contraseña actual.'
            ]
        ],
        'documento' => [
            'create' => [
                'numero' => [
                    'usado' => 'El número seleccionado ya ha sido asignado',
                    'numeroConsejoInconsistente' => 'Al consejo seleccionado no se le puede asignar el número deseado'
                ],
                'consejo' => [
                    'responsable' => 'El consejo seleccionado no tiene un responsable'
                ],
                'consejo_plantilla_modulo' => 'La plantilla no puede ser usada con el consejo seleccionado',
            ]
        ],
        'numeracion' => [
            'create' => [
                'rangoValido' => 'El rango seleccionado no es válido',
                'rangoNoDisponible' => 'El rango seleccionado ya no se encuentra disponible',
                'numeroReservado' => 'El número (:attribute) seleccionado ya ha sido reservado',
                'numeroInicio' => 'El número de inicio no es válido'
            ]
        ],
        'miembro' => [
            'delete' => [
                'consejo' => [
                    'estado' => 'No se puede eliminar el registro con el estado del consejo actual.'
                ],
            ]
        ],
        'acta' => [
            'create' => [
                'consejo' => [
                    'documentos' => 'No se puede generar el acta, porque no existen documentos generados'
                ]
            ]
        ],
        'notificacion' => [
            'documento' => [
                'estudiante' => [
                    'correo' => 'El estudiante no cuenta con un correo institucional'
                ]
            ]
        ],
        "acta_grado" => [
            "create" => [
                "validation" => [
                    "disponibilidad_docente" => "El docente ya se encuentra asignado en otro grado en la misma fecha y hora",
                    "disponibilidad_aula" => "El aula ya se encuentra asignada en otra fecha y hora",
                    "disponibilidad_link" => "El link ya se encuentra asignado en otra fecha y hora",
                    "numero_asignado" => "El número ya esta asignado",
                    "modalidad_seleccionada_aula_link" => "La modalidad seleccionada no concuerda con los datos provistos, verifique si debe de ingresar un aula o link",
                ],
                "unique" => [
                    "unique_restriction_link_fecha_presentacion" => "El link ingresado no puede ser usado en más de dos fechas al mismo tiempo",
                    "unique_restriction_numero_carrera_id_directorio_id" => "El número seleccionado ya está en uso",
                ],
            ],
            "documento" => [
                "create" => [
                    "tipo_estado" => "El acta aun no tiene un estado o tipo asignado",
                    "documento_notas" => "El acta aun no tiene un documento con notas asignadas",
                    "estudiante" => "Los datos del estudiante se encuentran incompletos",
                    "actaGrado" => "Los datos del acta se encuentran incompletos",
                ]
            ]
        ],
        "miembro_acta_grado" => [
            "create" => [
                "unique" => [
                    UniqueConstraintNames::ACTA_GRADO_ACTA_GRADO_ID_DOCENTE_ID => "No se puede ingresar el mismo docente",
                ]
            ]
        ]
    ],
];
