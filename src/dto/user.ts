import { IUser } from "../repositories";

export interface IdParam {
  id: string;
}
export interface usernameParam {
  username: string;
}
export interface IUserDTO {
  id: string;
  username: string;
  name: string;
  registeredAt: string;
}

export interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
}

export const toUserDTO = (user: IUser): IUserDTO => {
  const { id, name, registerAt, username } = user;
  const userDTO: IUserDTO = {
    id,
    name,
    username,
    registeredAt: registerAt.toISOString()
  };

  return userDTO;
};
