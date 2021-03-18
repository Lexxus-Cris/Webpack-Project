const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Arriba mandamos a llamar por require a nuestro plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Llamamos al plugin de Css
// Requerimos el plugin de copy-webpack
const CopyWebpack = require('copy-webpack-plugin');
// Llamamos a la dependencia que maneja las variables de entorno
const Dotenv = require('dotenv-webpack')

module.exports = {
    //watch: true, // Habilitamos el modo watch
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js', // EL NOMBRE DEL ARCHIVO FINAL pero lo indicaremos usando hash
        //Nos ayudara a definir de una mejor forma nuestras imagenes
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'], // LOS ARCHIVOS QUE WEBPACK VA A LEER
        // Dentro de resolve agregamos los alias
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        },
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            // En un nuevo objeto agregamos el loader de CSS
            {
                test: /\.css|.styl$/i,
                // El use de este loader nos pide trabajar con un arreglo
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            // Aqui agregaremos nuestra regla para utilizar el loader de las imagenes
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                }
            }
        ]
    },
    // SECCION DE PLUGINS
    plugins: [
        // Plugin de HTML
        new HtmlWebpackPlugin({
            inject:true,
            template:'./public/index.html',
            filename: './index.html'
        }),
        // Ahora agregamos nuestro plugin de CSS
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // Aniadimos el plugin copy-webpack
        new CopyWebpack({
            // indicamos los elementos que se van a copiar
            patterns: [
                {
                    // Desde donde queremos agarrar nuestra carpete o archivos
                    from: path.resolve(__dirname, "src", "assets/images"),
                    // En donde queremos que lo guarde en la carpeta dist.
                    to: "assets/images"
                }
            ]
        }),
        // Aniadimos el plugin para usar variables de entorno.
        new Dotenv(),
    ],
    // En el archivo de desarrollo quitamos la seccion de optimizacion
}