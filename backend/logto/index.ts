import {LogtoExpressConfig, handleAuthRoutes, withLogto} from '@logto/express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {tokenVerify} from "./middleware/tokenVerify"
import {handleErrors} from "./middleware/handleErrors"

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
    cookie: {maxAge: 14 * 24 * 60 * 60 * 1000}, // In miliseconds
}))
app.use(handleAuthRoutes(config))

app.get('/', withLogto({...config, getAccessToken: true}), (req, res) => {
    if (!req.user.isAuthenticated) {
        res.redirect('/logto/sign-in')
        return
    }
    res.json(req.user)
})
app.post('/verify', tokenVerify)

app.listen(3002, () => console.log('logto service up'))

process.on('uncaughtException', (err) => {
    console.error(err);
});