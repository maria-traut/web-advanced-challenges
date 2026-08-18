import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";

@Module({
  providers: [ThreadsService],
  controllers: [ThreadsController],
  imports: [TypeOrmModule.forFeature([Thread, Comment])],
})
export class ThreadsModule {}
