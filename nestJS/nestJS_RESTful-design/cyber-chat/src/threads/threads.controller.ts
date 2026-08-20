import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { ThreadWithComments } from "../types";
import { CreateThreadDto } from "./dto/createThread.dto";
import { CreateCommentDto } from "../comments/dto/createComment.dto";

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getAllThreads(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Get(":id")
  getThread(@Param("id") id: string): Promise<ThreadWithComments> {
    const thread = this.threadsService.find(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return thread;
  }

  @Post()
  createThread(@Body() dto: CreateThreadDto): Promise<Thread> {
    return this.threadsService.create(dto);
  }

  @Post(":id/comments")
  createNewPost(
    @Param("id") id: string,
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(id, dto);
  }

  @Delete(":id")
  deleteThread(@Param("id") id: string): { message: string } {
    const deleted = this.threadsService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return { message: `Thread with ID "${id}" deleted.` };
  }
}
