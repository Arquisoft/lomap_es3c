### Load testing (Gatling)
Guia de ejecución del test de carga.

Para ejecutar estos test se ha de descargar gatling(versión: gatling-charts-highcharts-bundle-3.9.3) que posee además del ejecutable, el recorder. 
Al descargarnos obtendremos un archivo zip que lo debemos descomprimir en cualquier lado.
Dentro del archo encontraremos una carpeta user-files. Accedemos a esta y después a la carpeta simulations. Dentro de la carpeta simulations, copiamos y pegamos el test (LoadTest.java).

Ahora, para su ejecución, accedemos a la carpeta bin y abrimso el cmd. Aquí intoducimos gatling.bat.
Se nos habrirá una iterfaz de línea de comandos donde debemos seleccionar 1 para ver los archivos locales (los archivos de la carpeta simulations). Finalemnte, seleccionamos el número del archivo LoadTest (Seguramente el 0 si no poseemos más tests) y le damos a intro si no queremos establecer una descripción. Tras esto, se empezará a ejecutar el test.

Una vez finalizada la ejecución del test, se creará una carpeta con varios documentos html con los resultados en la carpeta results.