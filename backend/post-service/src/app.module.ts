import { Module } from '@nestjs/common'
import { PostsService } from './posts/posts.service'
import { PostsController } from './posts/posts.controller'
import { HttpModule } from '@nestjs/axios'
import { PostgresModule } from 'nest-postgres'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
    imports: [
        HttpModule,
        PostgresModule.forRoot({
            connectionString: process.env.DATABASE_CONNECTIONSTRING,
        }),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class AppModule {}
