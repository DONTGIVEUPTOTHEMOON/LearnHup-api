import { IContent } from "../repositories";
import { IUserDTO, toUserDTO } from "./user";

export interface ICreateContentDTO {
  videoUrl: string;
  comment: string;
  rating: number;
}

export interface IContentDTO {
  id: number;
  videoTitle: string;
  videoUrl: string;
  comment: string;
  rating: number;
  thumbnailUrl: string;
  creatorName: string;
  creatorUrl: string;
  postedBy: IUserDTO;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateContentDTO {
  comment: string;
  rating: number;
}

export const toContentDTO = (content: IContent): IContentDTO => {
  const contentDTO: IContentDTO = {
    id: content.id,
    videoTitle: content.videoTitle,
    videoUrl: content.videoUrl,
    comment: content.comment,
    rating: content.rating,
    thumbnailUrl: content.thumbnaiUrl,
    creatorName: content.creatorName,
    creatorUrl: content.creatorUrl,
    postedBy: toUserDTO(content.User),
    createdAt: content.createdAt.toISOString(),
    updatedAt: content.updatedAt.toISOString()
  };

  return contentDTO;
};
