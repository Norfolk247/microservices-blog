import type {Configuration} from 'webpack-dev-server'

export const buildDevServer = (port: string|number): Configuration => {
    return {
        port,
        open: true,
        historyApiFallback: true
    }
}