import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Request,
  SerializeOptions,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentResponseDto } from "./dto/commentResponse.dto";
import type { AuthenticatedRequest } from "../types/types";
import { Comment } from "./entities/comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  @SerializeOptions({ type: CommentResponseDto })
  async getComment(@Param("id", ParseUUIDPipe) id: string): Promise<Comment> {
    const comment = await this.commentsService.find(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }

    return comment;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    await this.commentsService.softDeleteComment(id, req.user.userId);
  }
}
