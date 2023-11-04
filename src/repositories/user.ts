import { PrismaClient, User } from "@prisma/client";
import { IUser, IUserRepository, UserCreationError } from ".";
import { ICreateUserDto } from "../dto/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(user: ICreateUserDto): Promise<IUser> {
    try {
      return await this.prisma.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          username: true,
          registerAt: true
        }
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new UserCreationError("UNIQUE", "username");

      throw new Error(`${error}`);
    }
  }

  public async findById(id: string): Promise<IUser> {
    return await this.prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        username: true,
        registerAt: true
      },
      where: { id }
    });
  }
  public async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username }
    });
  }
}
