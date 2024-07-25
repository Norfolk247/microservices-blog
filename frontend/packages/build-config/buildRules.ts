import {ModuleOptions, RuleSetRule} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildRules = (): ModuleOptions['rules'] => {
    const swcLoader: RuleSetRule = {
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: 'swc-loader',
                options: {
                    jsc: {
                        transform: {
                            react: {
                                development: true,
                                refresh: true
                            }
                        }
                    }
                }
            }
        ],
        exclude: /node_modules/,
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