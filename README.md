# Prueba técnica para Frontend @ Adtuo

Esta prueba es parte del proceso de selección de Adtuo para el puesto de Frontend. El tiempo para ser completada, no debería exceder las 2-3 horas, dependiendo de tu experiencia.

## Resumen

El objetivo de esta prueba es crear un pequeño buscador de películas y mostrar un listado con los resultados. Hemos dejado preparada la estructura de la aplicación con Webpack, SASS y HTML, para que no tengas que invertir tiempo configurando el proyecto.

En este ejercicio se evaluarán tres aspectos distintos:
- **Semántica** - Estructuración y uso correcto de las etiquetas HTML
- **Maquetación** - Capacidad para reproducir un diseño utilizando SASS
- **Javascript** - Uso sencillo de un API

Te recomendamos que sigas los siguientes pasos:

### Maquetación estática

Replica el diseño dado. Crea un código limpio y fácil de leer.

Puedes encontrar el diseño aquí: https://sketch.cloud/s/GxrAY/a/OMkEzm

- En src/index.html, escribe tu marcado HTML.
- En src/styles/app.scss, escribe tu código SCSS.
- En src/scripts/index.js, escribe tu código JS.

Evita utilizar bootstrap o librerías de terceros para la maquetación. La maquetación no tiene que ser responsive.

No es necesario que estructures tu código en diferentes archivos o módulos. Puedes escribirlo en esos tres archivos, pero procura que sea limpio y legible.

Hemos dejado incluida en el HTML la fuente que utiliza el diseño: "IBM Plex Sans", y un pequeño reset CSS para facilitarte el trabajo.

Si miras el diseño más abajo, la única parte que deberá ser dinámica es el listado con las películas. El resto de elementos serán estáticos.

![The Movie DB](/preview.png)

### Cargar listado de películas

Para esta parte usaremos el API pública de The Movie DB https://www.themoviedb.org/documentation/api.

Al introducir una película en el buscador y hacer click sobre el botón "Search", haremos una petición a este api que nos devolverá un listado de las películas coincidentes con el texto que hemos introducido en el buscador.

Para hacer la petición, puedes utilizar el método `fetch` propio del navegador o utilizar una librería como Axios. Por favor, evita usar la librería jQuery.

Sólo haremos uso del endpoint `/search`, que nos devolverá un JSON y será lo que pintemos en los resultados.

La url del endpoint que vamos a usar tiene la siguiente estructura:

**GET** - https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}

El API Key que necesitarás es el siguiente: bb6f51bef07465653c3e553d6ab161a8

Para añadir el thumbnail de la película, el api te devolverá sólo el nombre del archivo, por lo que deberás añadir tú la parte estática del siguiente modo: `https://image.tmdb.org/t/p/w500/${thumbnail}`

## Instalación e inicio

```
npm install
npm start
```

## Envío de la prueba

No pretendemos que dediques mucho más de 3 horas para hacer este ejercicio. Ajústate a lo que se pide y si hay algo que no consigas hacer, no te preocupes, envíalo de todos modos y explica por qué crees que no lo has conseguido.

Clona este repositorio y trabaja en local. Una vez tengas la prueba, súbelo a tu cuenta de Github y escribe a victor@adtuo.com para que podamos revisarla. No olvides incluir el enlace al repositorio :)

¡Muchas gracias y mucha suerte!