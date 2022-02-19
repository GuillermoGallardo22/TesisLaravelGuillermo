@component('mail::message')
# Hola {{$name}}

Su contraseña es:

@component('mail::panel')
{{$password}}
@endcomponent

@component('mail::button', ['url'=>$url])
Iniciar sesión
@endcomponent

@endcomponent
