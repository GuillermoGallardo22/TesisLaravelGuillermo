
# BACKEND - LARAVEL - GENDOCS V.2

## GOOGLE DRIVE SERVICE

1. Crear proyecto en [Google cloud console](https://console.cloud.google.com/)

![pasos para crear proyecto](docs/img/Screenshot%20from%202022-01-29%2018-12-22.png "Crear proyecto")

2. Habilidar la API de Google Docs en la [Biblioteca de API](https://console.cloud.google.com/apis/library)

![google drive api](docs/img/Screenshot%20from%202022-03-27%2016-12-18.png 'Google Drive API' )

3. Habilidar la API de Google Drive en la [Biblioteca de API](https://console.cloud.google.com/apis/library)

![google drive api](docs/img/Screenshot%20from%202022-01-29%2018-20-16.png 'Google Drive API' )

3. En la sección **Api y servicios**, crear credenciales de tipo **Cuenta de servicios**.
   ![paso 1](docs/img/Screenshot%20from%202022-01-29%2018-25-29.png 'Cuenta de servicios' )

    1. Agregar un nombre a la cuenta de servicio
        1. ![paso 1.1](docs/img/Screenshot%20from%202022-01-29%2018-30-25.png)
    2. Agregar la función **Propietario**
        1. ![paso 1.2](docs/img/Screenshot%20from%202022-01-29%2018-33-21.png)
    3. Finalizar

4. Crear credenciales
    1. Ingresar a la cuenta de servicio creada
        1. ![correo cuenta de servicio](docs/img/Screenshot%20from%202022-01-29%2018-35-35.png)
    2. En la sección **Claves** agregar una nueva clave de tipo JSON
        1. ![claves](docs/img/Screenshot%20from%202022-01-29%2019-00-54.png)
        2. ![clave json](docs/img/Screenshot%20from%202022-01-29%2019-07-53.png)
    3. Copiar el contenido en el archivo **json** en el archivo `.env` del proyecto
        1. ![](docs/img/Screenshot%20from%202022-01-29%2019-11-51.png)

5. Copiar el correo electrónico de la cuenta de servicio creada.

![correo cuenta de servicio](docs/img/Screenshot%20from%202022-01-29%2018-35-35.png)

5. Crear una carpata en google drive y compartirla al correo de la cuenta de servicio

![](docs/img/Screenshot%20from%202022-01-29%2018-53-40.png)

6. Documentación [DRIVE API](https://developers.google.com/drive/api/v3/about-sdk)

## VARIABLES DE DOCUMENTOS

|    **VARIABLE**     |                **VALOR**                |
| :-----------------: | :-------------------------------------: |
|   {{ESTUDIANTE}}    |           Juan Perez Paredes            |
|  {{ESTUDIANTEUP}}   |           JUAN PEREZ PAREDES            |
|     {{CEDULA}}      |               1805240302                |
|    {{MATRICULA}}    |                  0120                   |
|      {{FOLIO}}      |                  0123                   |
|    {{TELEFONO}}     |                025461052                |
|     {{CELULAR}}     |               0986019417                |
|     {{CORREO}}      |              abc@gmail.com              |
|    {{CORREOUTA}}    |             abc@uta.edu.ec              |
|  {{NOMBRECARRERA}}  |         Ingeniería en Sistemas          |
| {{NOMBRECARRERAUP}} |         INGENIERÍA EN SISTEMAS          |
|      {{FECHA}}      |               10/09/2020                |
|     {{FECHAUP}}     |        10 de septiembre de 2020         |
|    {{CREADOPOR}}    |            Guillermo Barcia             |
|     {{NUMDOC}}      |                  0001                   |
|     {{SESION}}      |                Ordinaria                |
|   {{RESPONSABLE}}   |            Guillermo Barcia             |
|     {{FECHA_U}}     |           16 DE JULIO DE 2021           |
|    {{SESIONUP}}     |                ORDINARIA                |
|    {{SESION_L}}     |                ordinaria                |
|     {{NUMACT}}      |                   001                   |
|        {{Y}}        |                  2022                   |
|    {{DIASEM_T}}     |                 VIERNES                 |
|   {{NUMMES_T_U}}    |                  JULIO                  |
|     {{MES_T_L}}     |                  julio                  |
|    {{NUMDIA_T}}     |               VEINTICINCO               |
|    {{NUMANIO_T}}    |            DOS MIL VEINTIUNO            |
|   {{NUMANIO_T_L}}   |            dos mil veintiuno            |
|     {{DIAS_T}}      |            veinticinco días             |
|    {{HORA_T_L}}     |                  ocho                   |
|   {{MINUTOS_T_L}}   |                 treinta                 |
|   {{ASISTIERON}}    | Ing. Pepito Perez, Ing. Carlitos Castro |
|  {{NO_ASISTIERON}}  |           Ing. Juanito Garcia           |
|  {{NO_ASISTIERON}}  |           Ing. Juanito Garcia           |
|  {{DOCENTE_N_$i}}   |       Variable docentes dinámica        |

## VARIABLES DE ACTAS DE GRADOS

|                 **VARIABLE**                 |                                            **VALOR**                                            |
| :------------------------------------------: | :---------------------------------------------------------------------------------------------: |
|           {{HORA_MINUTOS_TEXTO_L}}           |                                  trece horas y treinta minutos                                  |
|              {{ACTAGRADO_TIPO}}              |                                    PROYECTO DE INVESTIGACION                                    |
|             {{DISNACION_GENERO}}             |     [el señor/la señorita, portador/portadora, El mencionado señor/La mencionada señorita]      |
|       {{ESTUDIANTE_FECHA_NACIMIENTO}}        |                                    10 de septiembre de 2020                                     |
|                {{PROVINCIA}}                 |                                           Tungurahua                                            |
|                  {{CANTON}}                  |                                             Ambato                                              |
|            {{ESTUDIANTE_TITULO}}             |                            Ingeniero en Electrónica y Comunicaciones                            |
|         {{ESTUDIANTE_TITULO_UPPER}}          |                            INGENIERO EN ELECTRÓNICA Y COMUNICACIONES                            |
|             {{ESTUDIANTE_TEMA}}              |     DISPOSITIVO ELECTRÓNICO NO INVASIVO PARA LA MEDICIÓN DE NIVELES DE GLUCOSA EN LA SANGRE     |
|                 {{NOTA_$i}}                  |                                              9.80                                               |
|              {{NOTA_$i_TEXTO}}               |                                       nueve punto ochenta                                       |
|       {{ESTUDIANTE_TITULO_BACHILLER}}        | Bachiller Técnico en Informática en el Instituto Tecnológico Superior Bolívar del cantón Ambato |
| {{ESTUDIANTE_FECHA_INICIO_ESTUDIOS_FECHAUP}} |                                       18 de marzo de 2013                                       |
|  {{ESTUDIANTE_FECHA_FIN_ESTUDIOS_FECHAUP}}   |                                       18 de marzo de 2013                                       |
|             {{CREDITOS_NUMEROS}}             |                                               247                                               |
|              {{CREDITOS_TEXTO}}              |                                   DOSCIENTOS CUARENTA Y SIETE                                   |
|         {{HORAS_PRACTICAS_NUMEROS}}          |                                               400                                               |
|          {{ACTAGRADO_ESTADO_UPPER}}          |                                            APROBADO                                             |

## DUDAS

1. ¿Cuando se genere el acta y se seleccione la modalidad(virtual/presencial), solo habrá que considerar la duración en el caso presencial, por temas de disponibilidad de aulas?
2. ¿El link de zoom siempre será único para cada acta?
3. ¿El docente que preside siempre existirá en todos los demás tipos de actas de grado?
4. ¿Los miembros de tribunal existirán siempre en todos los demás tipos de actas de grado?
5. ¿Puede haber el caso de que un miembro principal sea a la vez un miembro secundario?
6. ¿Como identificar cual miembro asistió, se tendría que hacer un flujo similar al de Consejos > Miembros?
7. ¿Cual sería la definición final para la lógica de miembros de tribunales principales y suplentes?

## NOTAS

la fecha fin debería de ser no requerido

estado de acta => no debería de ser obligatorio
- aprobado
- reprobado
- no presentación
  - articulo academico, proyecto de investigación

numeración
- empezar desde cualquier número, entonces los anteriores tendrían que colocarse a encolados

cambio de universidad
- número de resolución
- de que universidad proviene
