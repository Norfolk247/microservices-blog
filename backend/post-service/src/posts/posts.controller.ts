import {Controller, Get, Query, Post, Body, Patch, Delete} from "@nestjs/common"
import {PostsService} from "./posts.service"
import {User} from "../custom decorators/user.decorator";
import {LogtoUser} from "LogtoServiceTypes";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Get()
    findPosts(
        @Query('page') page?: string,
        @Query('id') id?: string,
        @Query('author_id') authorId?: string
    ) {
        return this.postsService.findPosts(page, id, authorId)
    }

    @Post('/create')
    createPost(@Body() body: any, @User() user: LogtoUser) {
        const {textBody} = body
        return this.postsService.createPost(textBody, user.sub)
    }

    @Patch('/edit')
    editPost(
        @Body() body: any,
        @User() user: LogtoUser,
        @Query('id') id?: string,
    ) {
        const {textBody} = body
        return this.postsService.editPost(textBody, id, user.sub)
    }
    @Delete('/delete')
    deletePost(@User() user: LogtoUser, @Query('id') id?: string) {
        return this.postsService.deletePost(id, user.sub)
    }
}