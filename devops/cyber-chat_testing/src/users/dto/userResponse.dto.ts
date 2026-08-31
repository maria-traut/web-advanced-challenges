import { Expose } from "class-transformer";

// A DTO (Data Transfer Object) is a class that describes the shape of data crossing an application boundary.
// The response DTO defines what the server is willing to return.
// Response DTOs lean on class-transformer decorators to 'allowlist' the fields that ship to the client.

export class UserResponseDto {
  @Expose()
  id!: string;

  @Expose()
  username!: string;
}
