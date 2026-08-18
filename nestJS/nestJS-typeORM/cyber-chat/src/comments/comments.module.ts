import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";
import { Comment } from "./entities/comment.entity";

@Module({
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  exports: [CommentsService, CommentsRepository],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}
