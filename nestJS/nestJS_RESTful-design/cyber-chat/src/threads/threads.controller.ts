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
  HttpCode,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { PaginatedThreads, ThreadWithComments } from "../types";
import { CreateThreadDto } from "./dto/createThread.dto";
import { CreateCommentDto } from "../comments/dto/createComment.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadResponseDto } from "./dto/threadResponse.dto";
import { CommentResponseDto } from "../comments/dto/commentResponse.dto";
import { ThreadWithCommentsResponseDto } from "./dto/threadWithCommentsResponse.dto";
import { PaginationQueryDto } from "../common/dto/paginationQuery.dto";

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getAllThreads(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginatedThreads> {
    return this.threadsService.findAll(pagination);
  }

  @Get(":id")
  @SerializeOptions({ type: ThreadWithCommentsResponseDto })
  async getThread(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<ThreadWithComments> {
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
    @Param("id", ParseUUIDPipe) id: string,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteThread(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.threadsService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
  }
}
