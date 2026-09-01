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
  Request,
} from "@nestjs/common";
import { ThreadsService } from "./threads.service";
import { CommentsService } from "../comments/comments.service";
import { Thread } from "./entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import type { AuthenticatedRequest, ThreadWithComments } from "../types/types";
import { CreateThreadDto } from "./dto/createThread.dto";
import { CreateCommentDto } from "../comments/dto/createComment.dto";
import { UpdateThreadDto } from "./dto/updateThread.dto";
import { ThreadResponseDto } from "./dto/threadResponse.dto";
import { CommentResponseDto } from "../comments/dto/commentResponse.dto";
import { ThreadWithCommentsResponseDto } from "./dto/threadWithCommentsResponse.dto";
import { Public } from "../common/decorators/public.decorator";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get all threads" })
  @ApiOkResponse({ type: [ThreadResponseDto] })
  @SerializeOptions({ type: ThreadResponseDto })
  getAllThreads(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Get a single thread by id" })
  @ApiOkResponse({ type: ThreadWithCommentsResponseDto })
  @ApiNotFoundResponse({ description: "Thread not found" })
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
  @ApiOperation({ summary: "Create a new thread" })
  @ApiOkResponse({ type: ThreadResponseDto })
  @ApiNotFoundResponse({ description: "No thread exists with that id" })
  @SerializeOptions({ type: ThreadResponseDto })
  createThread(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateThreadDto,
  ): Promise<Thread> {
    return this.threadsService.create(req.user.userId, dto);
  }

  @Post(":id/comments")
  @ApiOperation({ summary: "Add a comment to a thread" })
  @ApiCreatedResponse({ type: Comment })
  @ApiNotFoundResponse({ description: "Thread not found" })
  @SerializeOptions({ type: CommentResponseDto })
  createComment(
    // Gets the thread ID from the URL and validates that it is a UUID.
    @Param("id", ParseUUIDPipe) id: string,
    // Gets the full HTTP request, including the authenticated user added by Passport.
    @Request() req: AuthenticatedRequest,
    // Gets and validates the comment data sent in the request body.
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(id, req.user.userId, dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a thread partially" })
  @ApiOkResponse({ type: ThreadResponseDto })
  @ApiNotFoundResponse({ description: "Thread not found" })
  @SerializeOptions({ type: ThreadResponseDto })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
    @Body() dto: UpdateThreadDto,
  ) {
    const thread = await this.threadsService.update(id, req.user.userId, dto);

    if (!thread) {
      throw new NotFoundException(`Thread with ID '${id}' not found`);
    }

    return thread;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a thread including its comments" })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: "Thread not found" })
  async deleteThread(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    const deleted = await this.threadsService.delete(id, req.user.userId);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
  }
}
