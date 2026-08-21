import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from "./threads/threads.module";
import { Thread } from "./threads/entities/thread.entity";
import { Comment } from "./comments/entities/comment.entity";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entity/user.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: "data/cyberchat.sqlite",
      entities: [Thread, Comment, User],
      synchronize: true,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    CommentsModule,
    ThreadsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
