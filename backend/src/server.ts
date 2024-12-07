import * as dotenv from "dotenv";
import { resolve } from "path";
const envPath = resolve("./src/.env");
dotenv.config({ path: envPath });
import App from "./app";
//Auth
import CreateUser from "./routes/users/createUser";
import SignIn from "./routes/users/signInUser";
import CurrentUser from "./routes/users/currentUser";
import SignOut from "./routes/users/signoutUser";
import UpdateUser from "./routes/users/updateUser";
//Fitness
import CreateFitClass from "./routes/fit_classes/createFitClass";
import GetFitClasses from "./routes/fit_classes/getFitClasses";
import EditFitClass from "./routes/fit_classes/editFitClass";
import DeleteFitClass from "./routes/fit_classes/deleteFitClass";
import BookFitClass from "./routes/fit_classes/bookFitClass";
import CancelFitClass from "./routes/fit_classes/cancelFitClass";
import GetBookedFitClasses from "./routes/fit_classes/getBookedFitClasses";
import GetCreatedFitClasses from "./routes/fit_classes/getCreatedClasses";
new App(
  [
    //Users
    new CreateUser(),
    new SignIn(),
    new CurrentUser(),
    new SignOut(),
    new UpdateUser(),
    //fitness classes
    new CreateFitClass(),
    new GetFitClasses(),
    new EditFitClass(),
    new DeleteFitClass(),
    new BookFitClass(),
    new CancelFitClass(),
    new GetBookedFitClasses(),
    new GetCreatedFitClasses(),
  ],
  parseInt(process.env.PORT!)
);
