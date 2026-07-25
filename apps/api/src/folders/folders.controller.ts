import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FolderDto } from "./folder.dto";
import { FoldersService } from "./folders.service";

@Controller("folders")
export class FoldersController {
  constructor(private readonly folderService: FoldersService) {}

  @Get()
  @ApiOperation({ summary: "Get all folders", operationId: "getFolders" })
  @ApiResponse({
    status: 200,
    description: "List of folders",
    type: [FolderDto],
  })
  async findAll() {
    const folders = await this.folderService.findAll();
    return folders;
  }
}
