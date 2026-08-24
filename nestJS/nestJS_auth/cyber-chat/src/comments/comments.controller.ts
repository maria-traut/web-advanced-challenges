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
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CommentsService } from "./comments.service";
import { CommentResponseDto } from "./dto/commentResponse.dto";
import type { AuthenticatedRequest } from "../types";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  async getComment(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<CommentResponseDto> {
    const comment = await this.commentsService.find(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param("id", ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    const comment = await this.commentsService.softDeleteComment(
      id,
      req.user.userId,
    );
  }
}
