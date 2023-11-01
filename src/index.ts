import express from "express";
import { PrismaClient } from "@prisma/client";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const client = new PrismaClient();

app.get("/", (req, res) => {
  return res.status(200).send("Welcome").end();
});

app.listen(PORT, () => {
  console.log(`LearnHup API is up at ${PORT}`);
});
