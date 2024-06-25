import { LogtoExpressConfig, handleAuthRoutes, withLogto } from '@logto/express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import express from 'express'
import dotenv from 'dotenv'
import {tokenVerify} from "./middleware/tokenVerify";

dotenv.config()

const config: LogtoExpressConfig = {
    endpoint: process.env.LOGTOENDPOINT || '',
    appId: process.env.APPID || '',
    appSecret: process.env.APPSECRET || '',
    baseUrl: process.env.BASEURL || '', // Change to your own base URL
}
const app = express()

app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIESECRET || '',
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, // In miliseconds
}))
app.use(handleAuthRoutes(config))
app.get('/', withLogto({...config,getAccessToken: true}),(req, res) => {
    if (!req.user.isAuthenticated) {
        res.redirect('/logto/sign-in')
        return
    }
    res.json(req.user)
})
app.get('/verify',tokenVerify)
app.listen(3000)