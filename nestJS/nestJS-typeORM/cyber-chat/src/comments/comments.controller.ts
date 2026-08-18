import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  showComment(@Param("id") id: string): Promise<Comment | null> {
    const comment = this.commentsService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return comment;
  }

  @Delete(":id")
  removeComment(@Param("id") id: string): { message: string } {
    const deleted = this.commentsService.softDeleteComment(id);
    if (!deleted) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return { message: `Comment with ID "${id}" deleted.` };
  }
}
