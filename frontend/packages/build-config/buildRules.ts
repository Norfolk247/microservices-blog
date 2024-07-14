import {ModuleOptions, RuleSetRule} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildRules = (): ModuleOptions['rules'] => {
    const swcLoader: RuleSetRule = {
        test: /\.(ts|tsx)$/,
        use: 'swc-loader',
        exclude: /node_modules/
    }
    const cssLoader: RuleSetRule = {
        test: /\.css$/i,
        use: [
            //'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    }
    return [
        swcLoader,
        cssLoader,
    ]
}