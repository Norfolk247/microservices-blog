import { Controller, Get, Query, Post, Body } from "@nestjs/common"
import { PostsService } from "./posts.service"
import {User} from "../tokens/tokens.decorator";

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
        return this.postsService.findPosts(page, id, authorId)
    }
    @Post('/create')
    createPost(@Body() body: any) {
        const { textBody } = body
        return this.postsService.createPost(textBody)
    }
    @Get('/a')
    a(@User() user) {
        return user
    }
}