
<h2>Endpoints:</h2>


- Registrar nuevo usuario:

POST/auth/register
Enviar en el boddy un JSON: 
{
    "nombre": "string",
    "email": "email",
    "password": "password"
}

Devolverá la información del nuevo usuario registrado. 

- Logear a un usuario ya registrado:

POST/auth/login
Enviar en el boddy un JSON: 
{
    "email": "email",
    "password": "password"
}

- Verificar un usuario

PATCH/auth/verify 
Enviar en el boddy un JSON: 
Json 
{
    "nombre": "string",
    "email": "email",
    "code": "code"
}



Nodemailer
Código de app dentro de meiler. 

1° modelo
2° rutas
3° creacion del controlador





