import { PrismaClient } from "@prisma/client";
import { IContent, IContentRepository, ICreateContent } from ".";
import { IUpdateContentDTO } from "../dto/content";

export default class ContentRepository implements IContentRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createContent(content: ICreateContent, userId: string): Promise<IContent> {
    return this.prisma.content.create({
      data: {
        ...content,
        User: {
          connect: { id: userId }
        }
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            registerAt: true
          }
        }
      }
    });
  }

  getAllContent(): Promise<IContent[]> {
    return this.prisma.content.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            registerAt: true
          }
        }
      }
    });
  }

  getContentById(id: number): Promise<IContent> {
    return this.prisma.content.findUniqueOrThrow({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            registerAt: true
          }
        }
      }
    });
  }

  updateContent(
    id: number,
    updateContent: IUpdateContentDTO
  ): Promise<IContent> {
    const now = new Date().toISOString();
    return this.prisma.content.update({
      where: { id },
      data: { ...updateContent, updatedAt: now },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            registerAt: true
          }
        }
      }
    });
  }

  deleteContent(id: number): Promise<IContent> {
    return this.prisma.content.delete({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            registerAt: true
          }
        }
      }
    });
  }
}
