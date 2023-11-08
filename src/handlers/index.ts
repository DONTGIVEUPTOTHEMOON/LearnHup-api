import { RequestHandler } from "express";
import { ICreateUserDTO, IUserDTO, IdParam, usernameParam } from "../dto/user";
import { IErrorDTO } from "../dto/error";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { AuthStatus } from "../middleware/jwt";
import {
  IContentDTO,
  IContentsDTO,
  ICreateContentDTO,
  IUpdateContentDTO
} from "../dto/content";

export interface IEmpty {}
export interface IUserHandler {
  registration: RequestHandler<IEmpty, IUserDTO | IErrorDTO, ICreateUserDTO>;
  //login
  login: RequestHandler<IEmpty, ICredentialDTO | IErrorDTO, ILoginDTO>;
  //logout
  logout: RequestHandler<IEmpty, IErrorDTO, undefined, undefined, AuthStatus>;
  getPersonalInfo: RequestHandler<
    IEmpty,
    IUserDTO | IErrorDTO,
    unknown,
    unknown,
    AuthStatus
  >;
  getUserByUsername: RequestHandler<usernameParam, IUserDTO | IErrorDTO>;
}

export interface IContentHandler {
  createContent: RequestHandler<
    IEmpty,
    IContentDTO | IErrorDTO,
    ICreateContentDTO,
    unknown,
    AuthStatus
  >;

  getAllContent: RequestHandler<IEmpty, IContentsDTO | IErrorDTO>;
  getContentById: RequestHandler<IdParam, IContentDTO | IErrorDTO>;
  updateContent: RequestHandler<
    IdParam,
    IContentDTO | IErrorDTO,
    IUpdateContentDTO,
    unknown,
    AuthStatus
  >;
  deleteContent: RequestHandler<
    IdParam,
    IContentDTO | IErrorDTO,
    unknown,
    unknown,
    AuthStatus
  >;
}
