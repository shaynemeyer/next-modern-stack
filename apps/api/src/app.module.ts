import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FoldersModule } from "./folders/folders.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, FoldersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
