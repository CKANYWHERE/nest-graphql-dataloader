import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { StoryComment } from '../entities/story-comment.entity';

@Injectable()
@EntityRepository(StoryComment)
export class StoryCommentRepo extends Repository<StoryComment> {}
