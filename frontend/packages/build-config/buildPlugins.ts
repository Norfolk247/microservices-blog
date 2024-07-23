import webpack, {Configuration} from 'webpack'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path"

export const buildPlugins = (templatePath: string): Configuration['plugins'] => {
    return [
        new HtmlWebpackPlugin({
            template: templatePath,
            publicPath: '/'
        }),
        new webpack.ProvidePlugin({
            __MAIN_DOMAIN_URL__: 'http://localhost:3000',
        }),
        new Dotenv({
            path: path.resolve(__dirname,'..','..','.env'),
            safe: false
        })
    ]
}