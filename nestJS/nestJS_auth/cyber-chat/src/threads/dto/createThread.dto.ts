import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  body!: string;
}
