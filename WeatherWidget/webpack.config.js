const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATH = {
    src: './src/',
    dist: './dist/'
}
module.exports = {
    entry: {
        app: `${PATH.src}js/index.js`
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, PATH.dist),
        // publicPath: '../'

    },
    watch: true,
    devServer: {
        contentBase: PATH.dist
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,

                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './src/js/postcss.config.js',
                            }
                        }
                    },

                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }]

            }, {
                test: /\.(png|svg|gif|jpeg|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),
        new CopyPlugin([{
                from: `${PATH.src}img`,
                to: 'img'
            },
            {
                from: `${PATH.src}fonts`,
                to: 'fonts'
            }

        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${PATH.src}index.html`
        }),
        new CleanWebpackPlugin()
    ]
}