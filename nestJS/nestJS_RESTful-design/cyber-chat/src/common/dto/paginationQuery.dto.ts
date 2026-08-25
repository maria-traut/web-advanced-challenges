import { Type } from "class-transformer";
import { IsInt, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryDto {
  @IsPositive() // Redundant, because of Min(1)?
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsPositive() // Redundant, because of Min(1)?
  @IsInt()
  @Min(1)
  @Max(100)
  // @Type(() => Number) converts the query string value (which arrives as a string) into a number before validation runs.
  @Type(() => Number)
  limit: number = 10;
}
