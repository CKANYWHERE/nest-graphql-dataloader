import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Story } from '../entities/story.entity';

@Injectable()
@EntityRepository(Story)
export class StoryRepo extends Repository<Story> {}
