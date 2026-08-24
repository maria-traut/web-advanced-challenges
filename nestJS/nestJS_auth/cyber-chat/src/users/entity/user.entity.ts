import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "../../threads/entities/thread.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120, unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => Thread, (thread) => thread.author)
  threads!: Thread[];

  //   @OneToMany(() => Thread, (thread) => thread.user)
  //   threads!: Thread[]

  //   @OneToMany(() => Comment, (comment) => comment.user)
  //   comments!: Comment[]
}
