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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  @SerializeOptions({ type: CommentResponseDto })
  @ApiOperation({ summary: "Get a comment by id" })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: "No comment exists with that id" })
  async getComment(@Param("id", ParseUUIDPipe) id: string): Promise<Comment> {
    const comment = await this.commentsService.find(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }

    return comment;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete one comment by id" })
  @ApiNotFoundResponse({ description: "No comment exists with that id" })
  @ApiUnauthorizedResponse({
    description: "Not allowed to delete this comment",
  })
  async deleteComment(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    await this.commentsService.softDeleteComment(id, req.user.userId);
  }
}
