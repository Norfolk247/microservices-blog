import {WebpackConfiguration} from "webpack-cli";
import {buildDevServer} from "./buildDevServer";
import {buildRules} from "./buildRules";
import {buildPlugins} from "./buildPlugins";

type buildConfigOptions = {
    entryPath: string,
    port: string|number,
    outputPath: string,
    templatePath: string,
    mode: 'production' | 'development'
}

export const buildConfig = (options: buildConfigOptions): WebpackConfiguration => {
    return {
        mode: options.mode,
        entry: options.mode == 'production' ? options.entryPath : undefined,
        output: options.mode == 'production' ? {
            filename: '[name].[contenthash].js',
            path: options.outputPath,
            clean: true
        } : undefined,
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: buildRules()
        },
        plugins: buildPlugins(options.templatePath),
        devtool: options.mode == 'development' ? 'inline-source-map' : undefined,
        devServer: options.mode == 'development' ? buildDevServer(options.port) : undefined,
        performance: {
            hints: options.mode == 'production' ? 'warning' : false
        }
    }
}