import { Module } from "@nestjs/common";
import { CommentsModule } from "./comments/comments.module";
import { ThreadsModule } from "./threads/threads.module";

@Module({
  imports: [CommentsModule, ThreadsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
