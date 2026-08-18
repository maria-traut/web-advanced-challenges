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

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  // GET    /threads   List all threads
  @Get()
  listAllThreads(): Promise<Thread[]> {
    return this.threadsService.getAllThreads();
  }

  // GET	/threads/:id	Get one thread including its comments
  @Get(":id")
  showThreadIncludingComments(
    @Param("id") id: string,
  ): Promise<Thread & { comments: Comment[] }> {
    const thread = this.threadsService.getThreadByIdIncludingComments(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return thread;
  }

  // POST	/threads	Create a thread with title and body
  @Post()
  createThread(
    @Body() body: { title: string; author: string; body: string },
  ): Promise<Thread> {
    return this.threadsService.addNewThread(body.title, body.author, body.body);
  }

  // POST	/threads/:id/comments	Add a comment to a thread
  @Post(":id/comments")
  createNewPost(
    @Param("id") id: string,
    @Body() body: { author: string; body: string },
  ): Promise<Comment> {
    return this.commentsService.addNewComment(id, body.author, body.body);
  }

  // DELETE     /threads/:id/   Deletes the thread and all of its comments (comments are actually deleted)
  @Delete(":id")
  removeThread(@Param("id") id: string): { message: string } {
    const deleted = this.threadsService.deleteThreadIncludingComments(id);
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return { message: `Thread with ID "${id}" deleted.` };
  }
}
