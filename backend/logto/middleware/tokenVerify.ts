import {Request, Response, NextFunction} from 'express'
import axios from "axios";
import {AxiosRequestConfig} from 'axios'

type LogtoUser = {
    sub: string,
    name: string|null,
    picture: unknown,
    updated_at: number,
    username: string|null,
    created_at: number
}
type LogtoError = {
    code: string,
    message: string,
    error: string,
    error_description: string
}

export const tokenVerify = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const options: AxiosRequestConfig = {
        headers: {
            Authorization: authHeader
        }
    }
    const {status,data} = await axios.post(`${process.env.LOGTOENDPOINT}/oidc/me`,{},options)
        .then(({status,data}:{status: number,data: LogtoUser})=>({status, data}))
        .catch(({response: {status,data}}: {response: {status: number,data: LogtoError}})=>({status,data}))
    res.status(status).send(data)
}