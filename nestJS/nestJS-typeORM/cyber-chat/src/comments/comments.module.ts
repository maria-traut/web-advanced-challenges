import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";

@Module({
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
