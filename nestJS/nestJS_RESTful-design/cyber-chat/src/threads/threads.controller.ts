import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotFoundException,
  Delete,
  ParseUUIDPipe,
  SerializeOptions,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { ThreadWithComments } from "../types";
import { CreateThreadDto } from "./dto/createThread.dto";
import { CreateCommentDto } from "../comments/dto/createComment.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadResponseDto } from "./dto/threadResponse.dto";
import { CommentResponseDto } from "../comments/dto/commentResponse.dto";
import { ThreadWithCommentsResponseDto } from "./dto/threadWithCommentsResponse.dto";

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @SerializeOptions({ type: ThreadResponseDto })
  getAllThreads(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Get(":id")
  @SerializeOptions({ type: ThreadWithCommentsResponseDto })
  async getThread(@Param("id") id: string): Promise<ThreadWithComments> {
    const thread = await this.threadsService.find(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return thread;
  }

  @Post()
  @SerializeOptions({ type: ThreadResponseDto })
  createThread(@Body() dto: CreateThreadDto): Promise<Thread> {
    return this.threadsService.create(dto);
  }

  @Post(":id/comments")
  @SerializeOptions({ type: CommentResponseDto })
  createNewPost(
    @Param("id") id: string,
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(id, dto);
  }

  @Patch(":id")
  @SerializeOptions({ type: ThreadResponseDto })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateThreadDto,
  ) {
    const thread = await this.threadsService.update(id, dto);

    if (!thread) {
      throw new NotFoundException(`Thread with ID '${id}' not found`);
    }

    return thread;
  }

  @Delete(":id")
  async deleteThread(@Param("id") id: string): Promise<{ message: string }> {
    const deleted = await this.threadsService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return { message: `Thread with ID "${id}" deleted.` };
  }
}
