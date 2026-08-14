import { Module } from "@nestjs/common";
import { QuoteController } from "./quotes.controller";
import { QuoteService } from "./quotes.service";

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class AppModule {}
