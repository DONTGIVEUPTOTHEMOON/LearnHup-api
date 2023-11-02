import { RequestHandler } from "express";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { ICredentialDto, ILoginDto } from "../dto/auth";

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
}
