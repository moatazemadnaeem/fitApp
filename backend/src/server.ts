import * as dotenv from "dotenv";
import { resolve } from "path";
const envPath = resolve("./src/.env");
dotenv.config({ path: envPath });
import App from "./app";
import CreateUser from "./routes/users/createUser";
import SignIn from "./routes/users/signInUser";
import CurrentUser from "./routes/users/currentUser";
import SignOut from "./routes/users/signoutUser";

new App(
  [
    //Users
    new CreateUser(),
    new SignIn(),
    new CurrentUser(),
    new SignOut(),
    //fitness classes
  ],
  parseInt(process.env.PORT!)
);
