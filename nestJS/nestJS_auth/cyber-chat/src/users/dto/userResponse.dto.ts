import { Exclude, Expose } from "class-transformer";

export class ThreadResponseDto {
  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Exclude()
  passwordHash!: string;
}
