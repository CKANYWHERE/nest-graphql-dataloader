import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { Story } from './entities/story.entity';
import { StoryFile } from './entities/story-file.entity';
import { StoryComment } from './entities/story-comment.entity';
import { StoryFileLoader } from './loader/story-file.loader';
import { StoryCommentLoader } from './loader/story-comment.loader';

@Resolver(() => Story)
export class StoryResolver {
  constructor(
    private readonly storyService: StoryService,
    private readonly storyFileLoader: StoryFileLoader,
    private readonly storyCommentLoader: StoryCommentLoader,
  ) {}

  @Query(() => [Story], { name: 'storyList' })
  async findAll() {
    return await this.storyService.findAll();
  }

  @Query(() => Story, { name: 'story' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.storyService.findOne(id);
  }

  //this gonna make n + 1 problem
  @ResolveField(() => [StoryFile])
  async file(@Parent() story: Story) {
    return await this.storyFileLoader.findByStoryId.load(story.storyId);
  }

  //this gonna make n + 1 problem
  @ResolveField(() => [StoryComment])
  async comment(@Parent() story: Story) {
    return await this.storyCommentLoader.findByStoryId.load(story.storyId);
  }
}
