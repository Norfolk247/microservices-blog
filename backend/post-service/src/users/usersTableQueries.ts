import {client} from "../main";
import {HttpException, HttpStatus} from "@nestjs/common";

export const getIdByUsername = async (username: string): Promise<number> => {
    return await client.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
    )
        .then(res=>{
            if (res.rowCount) return res.rows[0]
            throw new HttpException('User not found',HttpStatus.NOT_FOUND)
        })
        .catch(err=>{
            console.error(err)
            throw err
        })
}