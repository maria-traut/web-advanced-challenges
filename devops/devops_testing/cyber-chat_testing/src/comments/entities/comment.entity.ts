import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Thread } from "../../threads/entities/thread.entity";
import { User } from "../../users/entity/user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 500 })
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // Many-to-one is a relation where A (thread) contains multiple instances of B (comments)
  // Many comments belong to one thread (owning side of the relation, holds the foreign key)
  @ManyToOne(() => Thread, (thread) => thread.comments)
  thread!: Thread;

  // Many comments belong to one author/user (owning side of the relation, holds the foreign key)
  @ManyToOne(() => User, (user) => user.comments)
  author!: User;
}
