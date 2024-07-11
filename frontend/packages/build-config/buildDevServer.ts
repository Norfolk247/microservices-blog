import type {Configuration} from 'webpack-dev-server'

export const buildDevServer = (): Configuration => {
    return {
        port: 3000,
        open: true,
        historyApiFallback: true
    }
}