import { Controller } from "@nestjs/common";

@Controller("comments")
export class CommentsController {
  // GET	/comments/:id/	Get one comment
  // DELETE	/comments/:id/	Special: Does not delete the comment, but sets its body to “deleted”
}
