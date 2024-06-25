import * as dotenv from 'dotenv'
import {Client} from 'pg'
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

dotenv.config()

// init postgresql config
export const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    // @ts-expect-error port is number
    port: process.env.DATABASE_PORT
})

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    client.connect()
    app.enableShutdownHooks()
    await app.listen(3001);
}

bootstrap();
