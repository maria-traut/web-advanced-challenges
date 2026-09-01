import { Expose, Type } from "class-transformer";
import { ThreadResponseDto } from "./threadResponse.dto";
import { CommentResponseDto } from "../../comments/dto/commentResponse.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ThreadWithCommentsResponseDto extends ThreadResponseDto {
  @ApiProperty({
    description: "The comments belonging to this Thread",
    type: () => [CommentResponseDto],
  })
  @Expose()
  @Type(() => CommentResponseDto)
  comments!: CommentResponseDto[];
}
