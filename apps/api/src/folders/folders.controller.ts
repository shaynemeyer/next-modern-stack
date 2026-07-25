import { Controller, Get } from "@nestjs/common";
import { FoldersService } from "./folders.service";

@Controller("folders")
export class FoldersController {
  constructor(private readonly folderService: FoldersService) {}

  @Get()
  async findAll() {
    const folders = await this.folderService.findAll();
    return folders;
  }
}
