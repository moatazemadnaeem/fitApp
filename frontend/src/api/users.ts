import * as userActions from "../store/features/users/createUserSlice";
import { UserSignInInter, AppDispatch, UserSignUpInter } from "../types/index";
import { signInUser, signUpUser } from "../services/users";
export const signInApi = async (
  reqBody: UserSignInInter,
  dispatch: AppDispatch
) => {
  try {
    dispatch(userActions.req_user());
    const data = await signInUser(reqBody);
    dispatch(userActions.signin_user(data));

    return data;
  } catch (error: any) {
    dispatch(userActions.fail_signin_user(error));
    throw error;
  }
};
export const signUpUserApi = async (reqBody: UserSignUpInter) => {
  try {
    const data = await signUpUser(reqBody);
    return data;
  } catch (error: any) {
    throw error;
  }
};
