import { IsNotEmpty, IsString, MaxLength } from "class-validator";

// A DTO (Data Transfer Object) is a class that describes the shape of data crossing an application boundary.
// This request DTO defines and validates the data that the client is allowed to send when logging in.
// The class-validator decorators define validation rules that the incoming request data must satisfy.

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  body!: string;
}
