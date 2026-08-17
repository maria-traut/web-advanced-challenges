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
import type { Thread } from "./entities/thread.type";
import type { Comment } from "../comments/entities/comment.type";

@Controller("threads")
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  // POST	/threads	Create a thread with title and body
  @Post()
  createThread(@Body() body: { title: string; body: string }): Thread {
    return this.threadsService.addNewThread(body.title, body.body);
  }

  // GET	/threads	List all threads
  @Get()
  listAllThreads(): Thread[] {
    return this.threadsService.getAllThreads();
  }

  // GET	/threads/:id	Get one thread including its comments
  @Get(":id")
  showThreadIncludingComments(
    @Param("id") id: string,
  ): Thread & { comments: Comment[] } {
    const thread = this.threadsService.getThreadByIdIncludingComments(
      Number(id),
    );
    if (!thread) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return thread;
  }

  // POST	/threads/:id/comments	Add a comment to a thread
  @Post(":id/comments")
  createNewPost(
    @Param("id") id: string,
    @Body() body: { author: string; body: string },
  ): Comment {
    return this.commentsService.addNewComment(
      Number(id),
      body.author,
      body.body,
    );
  }

  // DELETE	/threads/:id/	Deletes the thread and all of its comments (comments are actually deleted)
  @Delete(":id")
  remove(@Param("id") id: string): { message: string } {
    const deleted = this.threadsService.deleteThreadIncludingComments(
      Number(id),
    );
    if (!deleted) {
      throw new NotFoundException(`Thread with ID "${id}" not found.`);
    }
    return { message: `Thread with ID "${id}" deleted.` };
  }
}
