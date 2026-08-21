import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120, unique: true })
  username!: string;

  @Column()
  passwordHash!: string;
}

// const saltOrRounds = 10;
// const password = "random_password";
// const hash = await bcrypt.hash(password, saltOrRounds);

// const salt = await bcrypt.genSalt();
