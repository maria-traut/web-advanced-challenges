import { Module } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { CommentsService } from "../comments/comments.service";

@Module({
  providers: [ThreadsService, CommentsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
