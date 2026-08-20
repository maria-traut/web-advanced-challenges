import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CommentsService } from "./comments.service";
import { CommentResponseDto } from "./dto/commentResponse.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(":id")
  async getComment(@Param("id") id: string): Promise<CommentResponseDto> {
    const comment = await this.commentsService.find(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found.`);
    }
    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
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

// Task 2: The Response Boundary
// Create ThreadResponseDto and CommentResponseDto. Mark every exposed field with @Expose(). Use @Type(() => Date) on the createdAt field so it serializes as a real Date.
// Register ClassSerializerInterceptor globally in main.ts with excludeExtraneousValues: true.
// Update the services to map TypeORM entities to response DTOs with plainToInstance before returning. No service method should return a raw entity.
// Confirm that adding a new column to the Thread entity does not change the API response. The new column should stay invisible to clients until it is opted into the response DTO.
