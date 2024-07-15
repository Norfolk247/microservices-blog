import webpack, {Configuration} from 'webpack'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";

export const buildPlugins = (templatePath: string): Configuration['plugins'] => {
    return [
        new HtmlWebpackPlugin({
            template: templatePath,
            publicPath: '/'
        }),
        new Dotenv({
            safe: false
        })
    ]
}