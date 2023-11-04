import { PrismaClient } from "@prisma/client";

export default class ContentRespository implements IContentRepository {
    private prisma: PrismaClient
    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
}

createImageBitmap(ownerId: string, content: ICreateContent)