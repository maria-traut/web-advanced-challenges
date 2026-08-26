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
  async getComment(@Param("id") id: string): Promise<Comment> {
    const comment = await this.commentsService.find(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return comment;
  }

  @Delete(":id")
  deleteComment(@Param("id") id: string): { message: string } {
    const comment = this.commentsService.softDeleteComment(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return { message: `Comment with ID "${id}" deleted.` };
  }
}
