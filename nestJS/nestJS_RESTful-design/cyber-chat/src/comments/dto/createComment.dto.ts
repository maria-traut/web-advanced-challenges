import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  body!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  author!: string;
}
