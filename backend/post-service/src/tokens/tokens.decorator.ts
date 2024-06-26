import {createParamDecorator, ExecutionContext, HttpException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {firstValueFrom} from "rxjs";
import {LogtoError, LogtoUser} from "LogtoServiceTypes";
import * as dotenv from 'dotenv'

dotenv.config()

const tokenVerificationURL = process.env.TOKEN_VERIFICATION || 'localhost:3000'

export const User = createParamDecorator(async (data,ctx: ExecutionContext)=>{
    const httpService = new HttpService()
    const request = ctx.switchToHttp().getRequest()
    const authHeader: string = request.headers.authorization
    const options: AxiosRequestConfig = {
        headers: {
            Authorization: authHeader
        }
    }
    try {
        const response: AxiosResponse<LogtoUser> = await firstValueFrom(httpService.post(tokenVerificationURL,{},options))
        return response.data
    } catch (e) {
        const {status, data}: {status: number, data: LogtoError} = e.response
        throw new HttpException(data.message || data,status)
    }
})
