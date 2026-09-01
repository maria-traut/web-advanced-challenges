import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateThreadDto {
  @ApiProperty({
    description: "The title of the thread",
    example: "What do you think about the color violet?",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @ApiProperty({
    description: "The text content of the thread",
    example:
      "I'm considering violet as the main color for my room. Do you think it feels calm and welcoming, or is it too intense?",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  body!: string;
}
