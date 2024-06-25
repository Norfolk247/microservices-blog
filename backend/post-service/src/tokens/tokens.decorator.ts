import {createParamDecorator, ExecutionContext, HttpException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {firstValueFrom} from "rxjs";
import {LogtoError, LogtoUser} from "LogtoServiceTypes";

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
    return await firstValueFrom(
        httpService.post(tokenVerificationURL,{},options)
    )
        .then((response: AxiosResponse<LogtoUser>)=>response.data)
        .catch(({response: {status,data}}:{response: {status: number,data: LogtoError}})=>{
            throw new HttpException(data.message || data,status)
        })
})
