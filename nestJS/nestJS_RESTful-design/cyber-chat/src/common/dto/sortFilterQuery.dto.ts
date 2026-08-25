import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";
import { PaginationQueryDto } from "./paginationQuery.dto";

export class SortFilterQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(["-createdAt", "createdAt"])
  sort?: string = "-createdAt";

  @IsOptional()
  @IsString()
  @MaxLength(15)
  author?: string;
}
