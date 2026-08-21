import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CommentsService } from "./comments.service";
import { CommentResponseDto } from "./dto/commentResponse.dto";

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
  async deleteComment(@Param("id") id: string): Promise<void> {
    const comment = await this.commentsService.softDeleteComment(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
  }
}
