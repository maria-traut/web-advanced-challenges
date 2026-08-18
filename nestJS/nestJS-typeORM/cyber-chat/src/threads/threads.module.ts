import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { ThreadsRepository } from "./threads.repository";
import { CommentsModule } from "../comments/comments.module";

@Module({
  providers: [ThreadsService, ThreadsRepository],
  controllers: [ThreadsController],
  imports: [CommentsModule, TypeOrmModule.forFeature([Thread])],
})
export class ThreadsModule {}
