import { PrismaClient } from "@prisma/client";
import express from "express";
import { IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import { IUserRepository } from "./repositories";
import UserRepository from "./repositories/user";
import JWTMiddleware from "./middleware/jwt";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const clnt = new PrismaClient();

const jwtMiddleware = new JWTMiddleware();

const userRepo: IUserRepository = new UserRepository(clnt);

const userHandler: IUserHandler = new UserHandler(userRepo);

app.use(express.json());

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to LearnHub").end();
});

const userRouter = express.Router();

app.use("/user", userRouter);

userRouter.post("/", userHandler.registration);

const authRouter = express.Router();
app.use("/auth", authRouter);

authRouter.post("/login", userHandler.login);
authRouter.post("/me", jwtMiddleware.auth, userHandler.selfcheck);

app.listen(PORT, () => {
  console.log(`LearnHub API is up at ${PORT}`);
});
