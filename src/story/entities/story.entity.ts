import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoryComment } from './story-comment.entity';
import { StoryFile } from './story-file.entity';

@ObjectType()
@Entity({ engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci' })
export class Story {
  @PrimaryGeneratedColumn('uuid', { name: 'story_id' })
  @Field({ description: 'story 고유 아이디' })
  storyId: string;

  @Column({ name: 'content', type: 'longtext' })
  @Field()
  content: string;

  @Column({ name: 'view_flag', length: 1 })
  @Field()
  viewFlag: string;

  @Column({ name: 'user_id', length: 50 })
  @Field()
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  @Field(() => Date)
  createDate: Date;

  @OneToMany(() => StoryFile, (file) => file.story)
  @Field(() => [StoryFile], { nullable: true })
  file: StoryFile;

  @OneToMany(() => StoryComment, (comment) => comment.story)
  @Field(() => [StoryComment], { nullable: true })
  comment: StoryComment;
}
