# LoMap Es3C

[![CI for LOMAP ES3C](https://github.com/Arquisoft/lomap_es3c/actions/workflows/lomap_es3c.yml/badge.svg)](https://github.com/Arquisoft/lomap_es3c/actions/workflows/lomap_es3c.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es3c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es3c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es3c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es3c)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c513a965-bb85-4405-9775-017d7e02091a/deploy-status)](https://app.netlify.com/sites/lomapes3c/deploys)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
<img src="https://solidproject.org/TR/solid.svg" height="100">
</p>


Proyecto en el que los usuarios pueden tener mapas personalizados, en el que la información compartida será almacenada en el pod personal que cada usuario proporcione siguiendo los principios del proyecto SOLID.

## Guía inicial
<mark>En caso de que ya tengas node.js y npm, asegurate de actualizarlos antes de intentar construir las imágenes.</mark>

Clona el proyecto con `git clone https://github.com/arquisoft/lomap_es3c`. La manera más rápida de ejecutarlo todo es con Docker:
```bash
docker-compose up --build
```
Esto creará dos imágenes Docker ya que no existen en su sistema (la aplicación web y el restapi) y lanzará una base de datos de contenedores mongo. También lanzará contenedores Prometheus y Grafana para monitorear el servicio web. Debería poder acceder a todo desde aquí:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
Si lo quieres ejecutar sin Docker. Compila y ejecuta restapi:
```shell
cd restapi
npm install
npm start
```

Ahora con webapp:

```shell
cd webapp
npm install
npm start
```

Deberías poder acceder a la aplicación con [http://localhost:3000](http://localhost:3000).

## Más información
Puedes obtener más información del repositorio con estos enlaces:
- Documentation: https://github.com/arquisoft/lomap_es3c/tree/master/docs
- Webapp: https://github.com/arquisoft/lomap_es3c/tree/master/webapp
- Restapi: https://github.com/arquisoft/lomap_es3c/tree/master/restapi
- Aplicación desplegada: https://98.71.248.38


## Aviso sobre aplicación
- La base de datos mongo no funciona en la aplicación desplegada con el navegador Firefox.
- Para enviar una solicitud de amistad hay que introducir el username únicamente.
- Al aceptar una solicitud se necesita refrescar la página para ver el nuevo amigo.
- Para ser amigo de alguien en nuestra aplicación ambos deben conocerse.
- Para ver los mapas de los amigos es necesario que te los comparta mediante la aplicación.





