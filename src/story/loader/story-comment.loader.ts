import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { StoryCommentRepo } from '../repo/story-comment.repo';
import { StoryComment } from '../entities/story-comment.entity';
import { In } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class StoryCommentLoader {
  constructor(private readonly storyCommentRepo: StoryCommentRepo) {}

  findByStoryId = new DataLoader<string, StoryComment[]>(
    async (storyIds: string[]) => {
      const comments = await this.storyCommentRepo.find({
        where: {
          story: {
            storyId: In(storyIds),
          },
        },
        relations: ['story'],
      });
      const storyCommentGroup: { [key: string]: StoryComment[] } = {};
      comments.forEach((comment) => {
        if (!storyCommentGroup[comment.story.storyId]) {
          storyCommentGroup[comment.story.storyId] = [];
        }
        storyCommentGroup[comment.story.storyId].push(comment);
      });
      return storyIds.map((storyId) => storyCommentGroup[storyId]);
    },
    { cache: false },
  );
}
