import { Expose, Type } from "class-transformer";

export class ThreadsResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  body!: string;

  @Expose()
  author!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}

// Create ThreadResponseDto and CommentResponseDto.
// Mark every exposed field with @Expose().
// Use @Type(() => Date) on the createdAt field so it serializes as a real Date.
