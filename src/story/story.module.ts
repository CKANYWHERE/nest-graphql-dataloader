import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryRepo } from './repo/story.repo';
import { StoryCommentRepo } from './repo/story-comment.repo';
import { StoryFileRepo } from './repo/story-file.repo';
import { StoryFileLoader } from './loader/story-file.loader';
import { StoryCommentLoader } from './loader/story-comment.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryRepo, StoryCommentRepo, StoryFileRepo]),
  ],
  providers: [StoryResolver, StoryService, StoryFileLoader, StoryCommentLoader],
})
export class StoryModule {}
