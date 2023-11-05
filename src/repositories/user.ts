import { PrismaClient, User } from "@prisma/client";
import { IUser, IUserRepository } from ".";
import { ICreateUserDTO } from "../dto/user";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  createUser(user: ICreateUserDTO): Promise<IUser> {
    return this.prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        username: true,
        registerAt: true
      }
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { username }
    });
  }

  findById(id: string): Promise<IUser> {
    return this.prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        username: true,
        registerAt: true
      },
      where: { id }
    });
  }
}
