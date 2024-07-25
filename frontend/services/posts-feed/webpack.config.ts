import {buildConfig} from '@packages/build-config'
import * as path from 'path'
import * as webpack from 'webpack'
import packageJson from './package.json'

type EnvVariables = {
    mode: 'production' | 'development'
}

export default (env: EnvVariables) => {
    const config = buildConfig({
        entryPath: '/src/bootstrap.tsx',
        port: 3001,
        outputPath: path.resolve(__dirname, 'dist'),
        templatePath: path.resolve(__dirname, 'public/index.html'),
        mode: env.mode
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'posts',
        filename: 'remoteEntry.js',
        exposes: {
            './Routes': './src/bootstrap.tsx'
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

    /*config.resolve.alias = {
        '@effector': path.resolve(__dirname, 'src', 'effector')
    }*/

    return config
}