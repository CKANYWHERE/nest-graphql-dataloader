import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { StoryFileRepo } from '../repo/story-file.repo';
import { StoryFile } from '../entities/story-file.entity';
import { In } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class StoryFileLoader {
  constructor(private readonly storyFileRepo: StoryFileRepo) {}

  findByStoryId = new DataLoader<string, StoryFile[]>(
    async (storyIds: string[]) => {
      const files = await this.storyFileRepo.find({
        where: {
          story: {
            storyId: In(storyIds),
          },
        },
        relations: ['story'],
      });
      const filesGroup: { [key: string]: StoryFile[] } = {};
      files.forEach((file) => {
        if (!filesGroup[file.story.storyId]) {
          filesGroup[file.story.storyId] = [];
        }
        filesGroup[file.story.storyId].push(file);
      });
      return storyIds.map((storyId) => filesGroup[storyId]);
    },
    { cache: false },
  );
}
