import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError
} from "@prisma/client/runtime/library";
import { IContentHandler } from ".";
import { IContentDTO, toContentDTO } from "../dto/content";
import { IContentRepository, ICreateContent } from "../repositories";

export default class ContentHandler implements IContentHandler {
  private repo: IContentRepository;
  constructor(repo: IContentRepository) {
    this.repo = repo;
  }

  createContent: IContentHandler["createContent"] = async (req, res) => {
    try {
      const id = res.locals.user.id;
      const { videoUrl, comment, rating } = req.body;
      if (videoUrl.length === 0 || typeof videoUrl !== "string") {
        throw new Error("invalid videoUrl");
      }
      if (comment === undefined || typeof comment !== "string") {
        throw new Error("invalid comment");
      }
      if (rating < 0 || rating > 5 || typeof rating !== "number") {
        throw new Error("invalid rating");
      }

      const createContentData: ICreateContent = {
        videoUrl,
        comment,
        rating,
        creatorName: "author_name",
        creatorUrl: "",
        thumbnaiUrl: "",
        videoTitle: ""
      };
      const result = await this.repo.createContent(createContentData, id);
      const contentResponse: IContentDTO = toContentDTO(result);
      return res.status(201).json(contentResponse).end();
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientValidationError) {
        return res.status(400).json({ message: "missing field" }).end();
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message }).end();
      }
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  getAllContent: IContentHandler["getAllContent"] = async (req, res) => {
    try {
      const result = await this.repo.getAllContent();
      const contentsResponse = result.map((content) => {
        return toContentDTO(content);
      });
      return res.status(200).json(contentsResponse).end();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  getContentById: IContentHandler["getContentById"] = async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await this.repo.getContentById(id);
      const contentResponse = toContentDTO(result);
      return res.status(200).json(contentResponse).end();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  updateContent: IContentHandler["updateContent"] = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const contentId = Number(req.params.id);
      const { comment, rating } = req.body;
      if (comment === undefined || typeof comment !== "string") {
        throw new Error("invalid comment");
      }
      if (
        rating === undefined ||
        rating < 0 ||
        rating > 5 ||
        typeof rating !== "number"
      ) {
        throw new Error("invalid rating");
      }
      const result = await this.repo.updateContent(contentId, {
        comment,
        rating
      });
      if (userId !== result.User.id) {
        throw new Error("cannot update content");
      }
      const contentResponse = toContentDTO(result);
      return res.status(200).json(contentResponse).end();
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "content does not exist" })
          .end();
      }
      if (error instanceof Error) {
        return res.status(403).json({ message: error.message }).end();
      }

      return res.status(500).json({ message: "internal server error" }).end();
    }
  };

  deleteContent: IContentHandler["deleteContent"] = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const contentId = Number(req.params.id);
      const result = await this.repo.deleteContent(contentId);
      if (userId !== result.User.id) {
        throw new Error("cannot delete content");
      }
      const contentResponse = toContentDTO(result);
      return res.status(200).json(contentResponse).end();
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ message: "content does not exist" })
          .end();
      }
      if (error instanceof Error) {
        return res.status(403).json({ message: error.message }).end();
      }

      return res.status(500).json({ message: "internal server error" }).end();
    }
  };
}
