import { Expose, Type } from "class-transformer";
import { ThreadResponseDto } from "./threadResponse.dto";
import { CommentResponseDto } from "../../comments/dto/commentResponse.dto";

export class ThreadWithCommentsResponseDto extends ThreadResponseDto {
  @Expose()
  @Type(() => CommentResponseDto)
  comments!: CommentResponseDto[];
}
