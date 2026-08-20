import { Module } from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { ThreadsRepository } from "./threads.repository";
import { CommentsModule } from "../comments/comments.module";

@Module({
  providers: [ThreadsService, ThreadsRepository],
  controllers: [ThreadsController],
  imports: [CommentsModule],
})
export class ThreadsModule {}
