import {buildConfig} from "@packages/build-config";
import * as path from "path";

type EnvVariables = {
    mode: 'production'|'development'
}

export default (env: EnvVariables) => {
    return buildConfig(
        '/src/index.tsx',
        path.resolve(__dirname, 'dist'),
        path.resolve(__dirname,'public/index.html'),
        env.mode
    )
}