import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dto/userResponse.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ThreadResponseDto {
  @Expose()
  @ApiProperty({
    description: "The id of the thread",
    example: "550e8400-e29b-41d4-a716-446655440000",
    format: "uuid",
  })
  id!: string;

  @Expose()
  @ApiProperty({
    description: "The title of the thread",
    example: "What do you think about the color violet?",
  })
  title!: string;

  @Expose()
  @ApiProperty({
    description: "The subtitle of the thread",
    example: "Finding a color for my room",
    nullable: true,
  })
  subtitle!: string | null;

  @Expose()
  @ApiProperty({
    description: "The text content of the thread",
    example:
      "I'm considering violet as the main color for my room. Do you think it feels calm and welcoming, or is it too intense?",
  })
  body!: string;

  @Expose()
  @ApiProperty({
    description: "The author of the thread",
    type: () => UserResponseDto,
  })
  @Type(() => UserResponseDto)
  author!: UserResponseDto;

  @Expose()
  @ApiProperty({
    description: "The date the thread was created",
    example: "2026-08-26T13:42:15.123Z",
    format: "date-time",
  })
  @Type(() => Date)
  createdAt!: Date;
}
