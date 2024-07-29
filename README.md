
<h2>Endpoints:</h2>


<h3> Registrar nuevo usuario:</h3>

- POST/auth/register

Enviar en el boddy un JSON: 

{

    "nombre": "string",
    "email": "email",
    "password": "password"
}

Devolverá la información del nuevo usuario registrado. 

<h3>Logear a un usuario ya registrado:</h3>

- POST/auth/login

Enviar en el boddy un JSON: 

{
    
    "email": "email",
    "password": "password"
}

<h3>Verificar un usuario:</h3>

- PATCH/auth/verify 

Enviar en el boddy un JSON: 
 
{
    
    "nombre": "string",
    "email": "email",
    "code": "code"
}







