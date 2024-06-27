import {Test, TestingModule} from '@nestjs/testing';
import {PostsService} from './posts.service';
import {getConnectionToken} from "nest-postgres";
import {HttpException, HttpStatus} from "@nestjs/common";

describe('PostsService', () => {
    let service: PostsService;
    const clientMock = {
        query: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                {
                    provide: getConnectionToken(),
                    useValue: clientMock,
                }
            ],
        }).compile();
        service = module.get<PostsService>(PostsService);
    });

    it('PostsService.findPosts("2") выполняется 1 раз и проверяется запрос в бд', async () => {
        clientMock.query.mockImplementation(() => ({rows: [1337]}))

        const result = await service.findPosts('2')

        expect(result).toStrictEqual([1337])
        expect(clientMock.query).toHaveBeenCalledTimes(1)
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 3])
    })
    it('проверить запрос в бд при PostsService.findPosts("asd|undefined")', () => {
        clientMock.query.mockResolvedValue({rows: []})

        service.findPosts()
        service.findPosts('asd')

        expect(clientMock.query).toHaveBeenCalledTimes(2)
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 0])
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 0])
    })
    it('проверить запрос в бд при PostsService.findPosts(undefined,rawId|rawAuthorId)', () => {
        clientMock.query.mockResolvedValue({rows: []})

        service.findPosts(undefined, '1')
        service.findPosts(undefined, undefined, '2')
        service.findPosts(undefined, '1', '2')

        expect(clientMock.query).toHaveBeenCalledTimes(3)
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE id = $3 ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 0, 1])
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE author_id = $3 ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 0, "2"])
        expect(clientMock.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE id = $3 AND author_id = $4 ORDER BY create_date DESC LIMIT $1 OFFSET $2", [3, 0, 1, "2"])
    })
    it('проверить бросание ошибок аргументов при PostsService.deletePosts', async () => {
        await expect(service.deletePost()).rejects.toThrow(new HttpException('Bad request', HttpStatus.BAD_REQUEST))
        await expect(service.deletePost('asd', '1')).rejects.toThrow(new HttpException('Bad request', HttpStatus.BAD_REQUEST))
        await expect(service.deletePost('1', 'asd')).rejects.toThrow(new HttpException('Bad request', HttpStatus.BAD_REQUEST))
        await expect(service.deletePost('asd', 'asd')).rejects.toThrow(new HttpException('Bad request', HttpStatus.BAD_REQUEST))
    })
    it('проверить бросание ошибок если не найдены записи в бд при PostsService.deletePosts', async () => {
        clientMock.query.mockResolvedValueOnce({rowCount: 0})
        clientMock.query.mockResolvedValueOnce({rowCount: 1}).mockResolvedValueOnce({rowCount: 0, rows: []})

        await expect(service.deletePost('0', '1')).rejects.toThrow(new HttpException('Not found', HttpStatus.NOT_FOUND))
        await expect(service.deletePost('1', '0')).rejects.toThrow(new HttpException('Forbidden', HttpStatus.FORBIDDEN))
    })
    it('проверить успешность PostsService.deletePosts', async () => {
        clientMock.query.mockResolvedValueOnce({rowCount: 1}).mockResolvedValueOnce({rowCount: 1, rows: [1]})

        expect(await service.deletePost('1', '1')).toBe(1)
    })
});
