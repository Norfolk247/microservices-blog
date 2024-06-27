import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import {PostsService} from "./posts.service";
import {Post} from "PostTypes";
import {LogtoUser} from "LogtoServiceTypes";

describe('PostsController', () => {
    let controller: PostsController
    const serviceMock: {
        findPosts: jest.Mock<Promise<Post[]>,[string?,string?,string?]>
        createPost: jest.Mock<Promise<number>,[any,LogtoUser]>
    } = {
        findPosts: jest.fn(),
        createPost: jest.fn()
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [{
                provide: PostsService,
                useValue: serviceMock
            }]
        }).compile();

        controller = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('',()=>{
        const mockUser: LogtoUser = {
            sub: '',
            username: '',
            name: null,
            picture: null,
            updated_at: 1,
            created_at: 0,
        }

        controller.findPosts('1','2','123')
        controller.createPost('some text',mockUser)

        expect(serviceMock.findPosts).toHaveBeenCalledTimes(1)
        expect(serviceMock.createPost).toHaveBeenCalledTimes(1)
    })
});
