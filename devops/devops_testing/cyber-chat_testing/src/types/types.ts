import { Thread } from "../threads/entities/thread.entity";
import { Comment } from "../comments/entities/comment.entity";
import { Request as ExpressRequest } from "express";

export type ThreadWithComments = Thread & { comments: Comment[] };

export interface AuthenticatedUser {
  userId: string;
  username: string;
}

export interface AuthenticatedRequest extends ExpressRequest {
  user: AuthenticatedUser;
}
