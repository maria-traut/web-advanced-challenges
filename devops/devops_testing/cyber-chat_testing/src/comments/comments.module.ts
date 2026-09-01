import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comment } from "./entities/comment.entity";
import { User } from "../users/entity/user.entity";
import { Thread } from "../threads/entities/thread.entity";

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment, Thread, User])],
})
export class CommentsModule {}
