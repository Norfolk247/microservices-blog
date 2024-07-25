import webpack, {Configuration} from 'webpack'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path"
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export const buildPlugins = (templatePath: string): Configuration['plugins'] => {
    return [
        new HtmlWebpackPlugin({
            template: templatePath,
            publicPath: '/'
        }),
        new webpack.ProvidePlugin({
            __MAIN_DOMAIN_URL__: 'http://localhost:3000',
            __POST_SERVICE_DOMAIN_URL__: 'http://localhost:3011'
        }),
        new Dotenv({
            path: path.resolve(__dirname,'..','..','.env'),
            safe: false
        }),
        new ReactRefreshPlugin()
    ]
}