import {Controller, Get, Query, Post, Body} from "@nestjs/common"
import { PostsService } from "./posts.service"
import {User} from "../tokens/tokens.decorator";
import {LogtoUser} from "LogtoServiceTypes";
import {UsersService} from "../users/users.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService,private usersService: UsersService) {}
    @Get()
    findPosts(
        @Query('page') page?: string,
        @Query('id') id?: string,
        @Query('author') authorId?: string
    ) {
        return this.postsService.findPosts(page, id, authorId)
    }
    @Post('/create')
    createPost(@Body() body: any, @User() user: LogtoUser) {
        const { textBody } = body
        return this.postsService.createPost(textBody,user.username)
    }
}