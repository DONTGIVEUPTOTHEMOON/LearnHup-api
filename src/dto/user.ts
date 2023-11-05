import { IUser } from "../repositories";

export interface Id {
  id: string;
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
  const userDTO: IUserDTO = {
    ...user,
    registeredAt: user.registerAt.toISOString()
  };

  return userDTO;
};
