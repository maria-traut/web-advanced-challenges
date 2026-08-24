import { IsString, IsNotEmpty, MaxLength, MinLength } from "class-validator";

// A DTO (Data Transfer Object) is a class that describes the shape of data crossing an application boundary.
// This request DTO defines and validates the data that the client is allowed to send when logging in.
// The class-validator decorators define validation rules that the incoming request data must satisfy.

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
