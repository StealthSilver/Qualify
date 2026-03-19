import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  console.log("hello world");
});

app.listen(8000, () => {
  console.log("the app is listenting on port 8000");
});
