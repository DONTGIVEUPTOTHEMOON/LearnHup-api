import { RequestHandler } from "express";
import { IUserHandler } from ".";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IUserRepository } from "../repositories";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../const";
import { AuthStatus } from "../middleware/jwt";

export default class UserHandler implements IUserHandler {
  private repo: IUserRepository;

  constructor(repo: IUserRepository) {
    this.repo = repo;
  }
  public selfcheck: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  > = async (req, res) => {
    try {
      const { registerAt, ...other } = await this.repo.findById(
        res.locals.user.id
      );
      return res
        .status(200)
        .json({
          ...other,
          registerAt: registerAt.toISOString()
        })
        .end();
    } catch (error) {
      console.error(error);

      return res.status(500).send({
        message: "Interal Server Error"
      });
    }
  };

  public login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto> =
    async (req, res) => {
      const { username, password: plainPassword } = req.body;
      try {
        const { id, password } = await this.repo.findByUsername(username);
        if (!verifyPassword(plainPassword, password))
          throw new Error("Invalid username or password");

        const accessToken = sign({ id: id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
          issuer: "learnhub-api",
          subject: "user-credential"
        });

        return res.status(200).json({ accessToken }).end();
      } catch (error) {
        return res.status(401).json({ message: "Logged In" }).end();
      }
    };

  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateUserDto
  > = async (req, res) => {
    const { name, username, password: plainPassword } = req.body;

    if (typeof name !== "string" || name.length === 0)
      return res.status(400).json({ message: "name is invalid" });
    if (typeof username !== "string" || username.length === 0)
      return res.status(400).json({ message: "username is invalid" });
    if (typeof plainPassword !== "string" || plainPassword.length < 5)
      return res.status(400).json({ message: "password is invalid" });

    try {
      const {
        id: registeredId,
        name: registeredName,
        registerAt,
        username: registeredUsername
      } = await this.repo.create({
        name,
        username,
        password: hashPassword(plainPassword)
      });

      return res
        .status(201)
        .json({
          id: registeredId,
          name: registeredName,
          registerAt: `${registerAt}`,
          username: registeredUsername
        })
        .end();
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res.status(500).json({
          message: `name is invalid`
        });
      }
      return res.status(500).json({
        message: `Internal Server Error`
      });
    }
  };
}
