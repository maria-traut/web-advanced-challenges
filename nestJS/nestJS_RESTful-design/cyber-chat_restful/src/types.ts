import { Thread } from "./threads/entities/thread.entity";
import { Comment } from "./comments/entities/comment.entity";
import { ThreadResponseDto } from "./threads/dto/threadResponse.dto";

export type ThreadWithComments = Thread & { comments: Comment[] };

export interface PaginatedThreads {
  data: ThreadResponseDto[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}
