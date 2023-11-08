import { PrismaClient, User } from "@prisma/client";
import { IToken, IUser, IUserRepository } from ".";
import { ICreateUserDTO } from "../dto/user";
import { DEFAULT_USER_SELECT } from "../const";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  createUser(user: ICreateUserDTO): Promise<IUser> {
    return this.prisma.user.create({
      data: user,
      select: DEFAULT_USER_SELECT
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { username }
    });
  }

  findById(id: string): Promise<IUser> {
    return this.prisma.user.findUniqueOrThrow({
      select: DEFAULT_USER_SELECT,
      where: { id }
    });
  }

  addInvalidToken(token: IToken): Promise<IToken> {
    return this.prisma.blackListToken.create({
      data: token
    });
  }

  getInvalidToken(token: string): Promise<IToken | null> {
    return this.prisma.blackListToken.findUnique({
      where: { token }
    });
  }
}
