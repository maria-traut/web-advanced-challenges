import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dto/userResponse.dto";

// A DTO (Data Transfer Object) is a class that describes the shape of data crossing an application boundary.
// The response DTO defines what the server is willing to return.
// Response DTOs lean on class-transformer decorators to 'allowlist' the fields that ship to the client.

export class CommentResponseDto {
  @Expose()
  id!: string;

  @Expose()
  body!: string;

  @Type(() => UserResponseDto)
  author!: UserResponseDto;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
