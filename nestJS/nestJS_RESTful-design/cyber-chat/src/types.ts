import { Thread } from "./threads/entities/thread.entity";
import { Comment } from "./comments/entities/comment.entity";

export type ThreadWithComments = Thread & { comments: Comment[] };
