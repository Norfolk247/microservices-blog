import {WebpackConfiguration} from "webpack-cli";
import {buildDevServer} from "./buildDevServer";
import {buildRules} from "./buildRules";
import {buildPlugins} from "./buildPlugins";

export const buildConfig = (
    entryPath: string,
    outputPath: string,
    templatePath: string,
    mode: 'production'|'development'
): WebpackConfiguration => {
    return {
        mode,
        entry: entryPath,
        output: {
            filename: '[name].[contenthash].js',
            path: outputPath,
            clean: true
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: buildRules()
        },
        plugins: buildPlugins(templatePath),
        devtool: mode == 'development' ? 'inline-source-map': undefined,
        devServer: mode == 'development' ? buildDevServer() : undefined,
        performance: {
            hints: mode == 'production' ? 'warning' : false
        }
    }
}