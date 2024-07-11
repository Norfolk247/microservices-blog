import {Configuration} from 'webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";

export const buildPlugins = (templatePath: string): Configuration['plugins'] => {
    return [
        new HtmlWebpackPlugin({template: templatePath})
    ]
}