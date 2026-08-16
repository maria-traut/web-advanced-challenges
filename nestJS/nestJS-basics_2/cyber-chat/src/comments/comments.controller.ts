import { Controller } from "@nestjs/common";

@Controller("comments")
export class CommentsController {
  // POST	/threads	Create a thread with title and body
  // GET	/threads	List all threads
  // GET	/threads/:id	Get one thread including its comments
  // POST	/threads/:id/comments	Add a comment to a thread
  // DELETE	/threads/:id/	Deletes the thread and all of its comments (comments are actually deleted)
}
