import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Story } from './story.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci' })
@ObjectType()
export class StoryFile {
  @PrimaryGeneratedColumn('increment', { name: 'file_id' })
  @Field()
  fileId: string;

  @Column({ name: 'file_path', length: 150 })
  @Field()
  filePath: string;

  @Column({ name: 'file_name', length: 100 })
  @Field()
  fileName: string;

  @ManyToOne(() => Story, (story) => story.storyId)
  @JoinColumn({ name: 'story_id' })
  @Field(() => Story)
  story: Story;

  @CreateDateColumn({ name: 'created_at', type: Date })
  @Field(() => Date)
  createDate: Date;
}
