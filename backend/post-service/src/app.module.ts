import { Module, OnApplicationShutdown } from "@nestjs/common";
import { PostsService } from "./posts/posts.service";
import { PostsController } from "./posts/posts.controller";
import { client } from './main';

@Module({
    imports: [],
    controllers: [PostsController],
    providers: [PostsService]
})
export class AppModule implements OnApplicationShutdown {
    onApplicationShutdown(signal?: string) {
        client.end();
    }
}
