import {LogtoNextConfig} from "@logto/next"

export const logtoConfig: LogtoNextConfig = {
    appId: process.env.APPID,
    appSecret: process.env.APPSECRET,
    endpoint: process.env.LOGTOENDPOINT,
    baseUrl: process.env.BASEURL,
    cookieSecret: process.env.COOKIESECRET,
    cookieSecure: true
}