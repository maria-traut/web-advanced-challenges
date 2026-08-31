import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { CommentsModule } from "../comments/comments.module";
import { User } from "../users/entity/user.entity";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [ThreadsService],
  controllers: [ThreadsController],
  imports: [
    TypeOrmModule.forFeature([Thread, Comment, User]),
    CommentsModule,
    UsersModule,
  ],
})
export class ThreadsModule {}
