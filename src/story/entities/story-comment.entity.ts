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
export class StoryComment {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  @Field()
  commentId: string;

  @Column({ name: 'comment', length: 500 })
  @Field()
  comment: string;

  @Column({ name: 'view_flag', length: 1 })
  @Field()
  viewFlag: string;

  @ManyToOne(() => Story, (story) => story.storyId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'story_id' })
  @Field(() => Story)
  story: Story;

  @Column({ name: 'user_id', length: 50 })
  @Field()
  user: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  @Field(() => Date)
  createDate: Date;
}
