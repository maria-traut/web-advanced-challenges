import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "../../users/dto/userResponse.dto";

export class ThreadResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  subtitle!: string | null;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => UserResponseDto)
  author!: UserResponseDto;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
