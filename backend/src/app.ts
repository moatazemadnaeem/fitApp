import "express-async-errors";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";
import { __Router } from "./types";
import { BadReqErr } from "./error_classes/badReqError";
import { NotFound } from "./error_classes/notFoundError";
import { handleError } from "./middlewares/handleError";
class App {
  private express: Application;
  private port: number;
  constructor(routers: __Router[], port: number) {
    this.express = express();
    this.port = port || 9000;
    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeRouters(routers);
    this.initializeErrorHandling();
  }
  private async initializeDatabaseConnection(): Promise<void> {
    if (!process.env.JWT_KEY) {
      throw new BadReqErr("Jwt is not defined");
    }
    try {
      await mongoose.connect(process.env.DB_URL!);
      console.log("connected to db");
      this.listen();
    } catch (err) {
      console.log(err, "err to connect");
    }
  }
  private listen(): void {
    this.express.listen(this.port, () => {
      console.log(`listening in port ${this.port}`);
    });
  }
  private initializeMiddleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      cookieSession({
        signed: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
    );
  }
  private initializeRouters(routers: __Router[]): void {
    routers.forEach((routerInstance: __Router) => {
      this.express.use("/api/v1", routerInstance.router);
    });
    this.express.all("*", () => {
      throw new NotFound("can not find this page please try again");
    });
  }
  private initializeErrorHandling(): void {
    this.express.use(handleError);
  }
}
export default App;
