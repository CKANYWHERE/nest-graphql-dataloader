import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Story } from './story/entities/story.entity';
import { StoryFile } from './story/entities/story-file.entity';
import { StoryComment } from './story/entities/story-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      entities: [Story, StoryFile, StoryComment],
      logging: true,
    }),
    StoryModule,
  ],
})
export class AppModule {}
