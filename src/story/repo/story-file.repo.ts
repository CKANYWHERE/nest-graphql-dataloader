import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { StoryFile } from '../entities/story-file.entity';

@Injectable()
@EntityRepository(StoryFile)
export class StoryFileRepo extends Repository<StoryFile> {}
