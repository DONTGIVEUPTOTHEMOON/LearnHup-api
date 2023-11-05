import axios from "axios";
import { OEmbedData, OEmbedError, OEmbedResponseDto } from "../dto/oembed";

const isError = (data: OEmbedResponseDto | OEmbedError): data is OEmbedError =>
  Object.keys(data).includes("error");

export const oEmbed = async (youtubeUrl: string): Promise<OEmbedData> => {
  const result = await axios.get<OEmbedResponseDto | OEmbedError>(
    `https://noembed.com/embed?url=${youtubeUrl}`
  );

  const data = result.data;
  if (isError(data)) {
    throw new Error("invalid video link");
  }
  const { title, thumbnail_url, author_name, author_url } = data;

  return { title, thumbnail_url, author_name, author_url };
};
