import { RequestHandler } from "express";
import { ICreateUserDTO, IUserDTO, Id } from "../dto/user";
import { IErrorDTO } from "../dto/error";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { AuthStatus } from "../middleware/jwt";
import {
  IContentDTO,
  ICreateContentDTO,
  IUpdateContentDTO
} from "../dto/content";

export interface IEmpty {}
export interface IUserHandler {
  registration: RequestHandler<IEmpty, IUserDTO | IErrorDTO, ICreateUserDTO>;
  login: RequestHandler<IEmpty, ICredentialDTO | IErrorDTO, ILoginDTO>;
  selfcheck: RequestHandler<
    IEmpty,
    IUserDTO | IErrorDTO,
    unknown,
    unknown,
    AuthStatus
  >;
}

export interface IContentHandler {
  createContent: RequestHandler<
    IEmpty,
    IContentDTO | IErrorDTO,
    ICreateContentDTO,
    unknown,
    AuthStatus
  >;

  getAllContent: RequestHandler<IEmpty, IContentDTO[] | IErrorDTO>;
  getContentById: RequestHandler<Id, IContentDTO | IErrorDTO>;
  updateContent: RequestHandler<
    Id,
    IContentDTO | IErrorDTO,
    IUpdateContentDTO,
    unknown,
    AuthStatus
  >;
  deleteContent: RequestHandler<
    Id,
    IContentDTO | IErrorDTO,
    unknown,
    unknown,
    AuthStatus
  >;
}
