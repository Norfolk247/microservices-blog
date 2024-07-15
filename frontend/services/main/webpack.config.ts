import {buildConfig} from "@packages/build-config"
import * as path from "path"
import * as webpack from 'webpack'
import packageJson from "./package.json"

type EnvVariables = {
    mode: 'production' | 'development',
    POST_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
    const POST_REMOTE_URL = env.POST_REMOTE_URL ?? 'http://localhost:3000'

    const config = buildConfig({
        entryPath: '/src/bootstrap.tsx',
        port: 3000,
        outputPath: path.resolve(__dirname, 'dist'),
        templatePath: path.resolve(__dirname, 'public/index.html'),
        mode: env.mode
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'main',
        filename: 'remoteEntry.js',
        remotes: {
            posts: `posts@${POST_REMOTE_URL}/remoteEntry.js`
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react']
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom']
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom']
            }
        }
    }))

    return config
}