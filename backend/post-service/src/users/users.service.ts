import {Injectable} from '@nestjs/common';
import {getIdByUsername} from "./usersTableQueries";

@Injectable()
export class UsersService {
    findIdByUsername(username: string) {
        return getIdByUsername(username)
    }
}
