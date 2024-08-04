<h2 align="start">API - CRUD | Shoes</h2> 

<p align="start">
<img width="500px"  src="https://skillicons.dev/icons?i=typescript,nodejs,npm,mongodb,express,postman,git,github,perline=10"  />
</p>

API de <a href="https://crud-shoes.vercel.app/" target="_blank" >CRUD|shoes</a>.

<h4>&#128640;  Herramientas de desarrollo y ejecución:</h4>


-   Me sirvo de <strong> Node.js </strong> como entorno de ejecución.  
- <strong> Typescript </strong>  para construir un código tipado y manejar posibles errores.
- <strong> MongoDB, MongoAtlas y MongoCompass</strong> para la creación de la base de datos NoSQL y su posterior conexión con el back.
- <strong> Express.js </strong> para poder utilizar la arquitectura de middlewares en las solicitudes HTTP al back.

<hr>

<h2>Endpoints:</h2>


<b>  Esta API:</b> permite almaecer los usuarios logueados y verificados del e-comerce, así como también poder acceder a sus ordenes.  


<h3> &#128640; POST/auth/register</h3>
<h4> Registrar nuevo usuario:</h4>

Enviar en el boddy un JSON: 

{

    "nombre": "string",
    "email": "email",
    "password": "password"
}

Devolverá la información del nuevo usuario registrado. 


<h3>&#128640; POST/auth/login</h3>
<h4>Logear a un usuario ya registrado:</h4>


Enviar en el boddy un JSON: 

{
    
    "email": "email",
    "password": "password"
}

<h3>&#9989; PATCH/auth/verify </h3>
<h4>Verificar un usuario:</h4>

Enviar en el boddy un JSON: 
 
{
    
    "nombre": "string",
    "email": "email",
    "code": "code"
}


<h3> &#9994; GET/orders</h3>
<h4>Obtener ordenes de usuarios registrados y verificados:</h4>


Obtener todas las ordenes realizadas por el usuario actual.

Enviar en el header el JWT del usuario logueado. ( {"x-token": token} )

Retorna un array de objetos con las ordenes realizadas
 
<h3>&#9989; POST /orders</h3>
<h4>Crear una nueva order de un usuario logueado y verificado</h4>

Enviar en el header el JWT del usuario logueado. ( {"x-token": token} )

Enviar en el body un JSON con los siguientes campos:

<img src="./imgReadme/order.png" alt="order" style="max-width: 150px; border-radius: 10px;">

<br><br>

<h4>&#128193; Librerías utilizadas:</h4> 

- <strong> Bcryptjs: </strong> me permite encriptar contraseñas a través de algoritmos.
- <strong> Cors: </strong> Middleware para habilitar CORS (Cross-Origin Resource Sharing) en aplicaciones Express.
- <strong> dotenv:</strong> Para cargar variables de entorno e información sensible del back.
- <strong> Express-validator: </strong> middlewares para validar y sanitizar datos en Express.
- <strong> Jsonwebtoken: </strong> para crear y verificar tokens JWT (JSON Web Tokens).
- <strong> Mongoose: </strong> Librería de MongoDB para Object Data Modeling.
- <strong> Nodemailer: </strong> módulo para enviar correos electrónicos desde Node.js, a través de el envío tokens de verificación a usuarios que deseen registrarse en el sitio para poder validar sus cuentas. 
- <strong> Nodemon: </strong> combinado con Ts me permite un seguimiento más exaustivo de mi back ya que ésta librería reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el directorio.

<br>

El proyecto se encuentra desplegado en <a href="https://back-crud.vercel.app/" target="_blank" >Vercel</a>.


