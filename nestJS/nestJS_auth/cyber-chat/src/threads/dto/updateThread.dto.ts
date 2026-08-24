import { PartialType } from "@nestjs/mapped-types";
import { CreateThreadDto } from "./createThread.dto";

export class UpdateThreadDto extends PartialType(CreateThreadDto) {}
