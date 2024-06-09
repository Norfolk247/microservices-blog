import { Controller, Get, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }
    @Get()
    findPosts(
        @Query('page') page?: string,
        @Query('id') id?: string,
        @Query('author') authorId?: string
    ) {
        return this.postsService.findPosts(
            isNaN(+page) ? undefined : +page,
            isNaN(+id) ? undefined : +id,
            isNaN(+authorId) ? undefined : +authorId,
        )
    }
}
