import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "../../threads/entities/thread.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120, unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  // One user can have many threads (inverse side of the relation).
  @OneToMany(() => Thread, (thread) => thread.author)
  threads!: Thread[];

  // One user can have many comments (inverse side of the relation).
  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];
}
