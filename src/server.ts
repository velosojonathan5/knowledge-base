import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ok");
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
