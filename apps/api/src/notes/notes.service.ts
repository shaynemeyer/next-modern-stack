import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  create(folderId: number) {
    return this.prisma.note.create({ data: { text: "", folderId } });
  }

  update(id: number, text: string) {
    return this.prisma.note.update({ where: { id }, data: { text } });
  }
}
