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

|     **VARIABLE**    |         **VALOR**        |
|:-------------------:|:------------------------:|
| {{ESTUDIANTE}}      | Juan Perez Paredes       |
| {{ESTUDIANTEUP}}    | JUAN PEREZ PAREDES       |
| {{CEDULA}}          | 1805240302               |
| {{MATRICULA}}       | 0120                     |
| {{FOLIO}}           | 0123                     |
| {{TELEFONO}}        | 025461052                |
| {{CELULAR}}         | 0986019417               |
| {{CORREO}}          | abc@gmail.com            |
| {{CORREOUTA}}       | abc@uta.edu.ec           |
| {{NOMBRECARRERA}}   | Ingeniería en Sistemas   |
| {{NOMBRECARRERAUP}} | INGENIERÍA EN SISTEMAS   |
| {{FECHA}}           | 10/09/2020               |
| {{FECHAUP}}         | 10 de septiembre de 2020 |
| {{CREADOPOR}}       | Guillermo Barcia         |
| {{NUMDOC}}          | 0001                     |
| {{SESION}}          | Ordinaria                |
| {{RESPONSABLE}}     | Guillermo Barcia         |
