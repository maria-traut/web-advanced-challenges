import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  body: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  author: string;
}
