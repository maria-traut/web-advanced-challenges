import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";
import { User } from "../../users/entity/user.entity";

@Entity("threads")
export class Thread {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120 })
  title!: string;

  @Column({ type: "varchar", length: 120, nullable: true })
  subtitle?: string;

  @Column({ type: "text" })
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // One-to-many is a relation where B (comment) contains only one instance of A (thread).
  // One thread can have many comments (inverse side of the relation).
  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[];

  // Many threads belong to one author/user (owning side of the relation, holds the foreign key).
  @ManyToOne(() => User, (user) => user.threads)
  author!: User;
}
