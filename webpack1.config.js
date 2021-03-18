// Primer paso traer el modulo path que se encuentra en node
const path = require('path');
// Traemos el modulo de html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Traemos el modulo de mini_css_extract_plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Segundo crearemos un objeto que exporatara la configuracion deseada.
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // Obtenemos el path absoluto del proyecto utilizando resolve e indicando que queremos el nombre del directorio como primer argumento, y como segundo el nombre de la carpeta en la que se compilara nuestros archivos .js
        filename: 'main.js' // Ponemos el nombre del archivo al cual se va a unificar todo nuestro js que por estandar se llama main.js
    },
    // Ahora indicamos con que extensiones trabajaremos en este proyecto.
    resolve: {
        extensions: ['.js'] // Dentro de un arreglo aniadimos las extensiones que usaremos
    },
    module: { // En module aniadiremos las configuraciones que acabamos de crear y algunas otras particularidades.
        rules: [ // Establecemos las rules donde definiremos como trabajaremos con diferentes tipos de archivos o elementos dentro del proyecto.

            { // Dentro de este objeto indicaremos como trabajar con @babel-loader para conectar babel con webpack

                // Primero crearemos test para saber que tipo de extensiones vamos a utilizar
                test: /\.m?js$/, // Lo que indicamos usando esta Expresion regular es que vamos a trabajar con cualquier extension que sea m.js o .js
                // Ahora debemos excluir los archivos de nuestro node_modules con extension m.js, ya que si dejamos que babel trabaje con ellos la aplicacion se romperia
                exclude: /node_modules/,
                use: { // A use le pasaremos internamente el loader
                    loader: 'babel-loader' // Indicamos el loader que vamos a utilizar
                }
            }
        ]
    },
    // Aniadimos la seccion de plugins y dentro de un array los aniadiremos.
    plugins: [
        // Dentro utilizamos la palabra new para insertar el plugin
        new HtmlWebpackPlugin({ // Internamente crearemos un objeto en donde pondremos las configuraciones de nuestro plugin
            inject: true, // Usamos inject para hacer la insercion de los elementos.
            // indicamos la ruta del template
            template: './public/index.html',
            // Ahora indicamos cual sera el resultado de esta preparacion de html, este resultado lo pondra en la carpeta dist con el nombre que indiquemos en el file name.
            filename: './index.html'
        })
    ]
}