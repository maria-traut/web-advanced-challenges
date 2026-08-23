import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

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

  @Column({ type: "varchar", length: 120 })
  author!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // One-to-many is a relation where B (comment) contains only one instance of A (thread)
  // One thread can have many comments (inverse side of the relation)
  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[];

  // @ManyToOne(() => User, (user) => user.threads)
  // user!: User;
}
