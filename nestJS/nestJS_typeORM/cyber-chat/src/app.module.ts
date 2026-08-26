import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from "./threads/threads.module";
import { Thread } from "./threads/entities/thread.entity";
import { Comment } from "./comments/entities/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: "data/cyberchat.sqlite",
      entities: [Thread, Comment],
      // synchronize: false -> only for testing migrations
      synchronize: false,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    CommentsModule,
    ThreadsModule,
  ],
})
export class AppModule {}
