import "reflect-metadata";
import { DataSource } from "typeorm";
import { Thread } from "./threads/entities/thread.entity";
import { Comment } from "./comments/entities/comment.entity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "data/cyberchat.sqlite",
  entities: [Thread, Comment],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // Absolutely critical to disable this here
});
