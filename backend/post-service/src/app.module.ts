import { Module, OnApplicationShutdown } from "@nestjs/common";
import { PostsService } from "./posts/posts.service";
import { PostsController } from "./posts/posts.controller";
import { client } from './main';
import {HttpModule} from "@nestjs/axios";
import { UsersService } from './users/users.service';

@Module({
    imports: [HttpModule],
    controllers: [PostsController],
    providers: [PostsService, UsersService]
})
export class AppModule implements OnApplicationShutdown {
    onApplicationShutdown(signal?: string) {
        client.end();
    }
}
