import { Injectable } from '@nestjs/common';
import { CreateStoryInput } from './dto/create-story.input';
import { StoryRepo } from './repo/story.repo';
import { StoryFileRepo } from './repo/story-file.repo';
import { StoryCommentRepo } from './repo/story-comment.repo';

@Injectable()
export class StoryService {
  constructor(
    private readonly storyRepo: StoryRepo,
    private readonly storyFileRepo: StoryFileRepo,
    private readonly storyCommentRepo: StoryCommentRepo,
  ) {}

  create(createStoryInput: CreateStoryInput) {
    return 'This action adds a new story';
  }

  async findAll() {
    return await this.storyRepo.find();
  }

  async findOne(storyId: string) {
    return await this.storyRepo.findOne({ where: { storyId } });
  }

  async findFileByStoryId(storyId: string) {
    return await this.storyFileRepo.find({
      story: { storyId },
    });
  }

  async findCommentByStoryId(storyId: string) {
    return await this.storyCommentRepo.find({
      story: { storyId },
    });
  }
}
