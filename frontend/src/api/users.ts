import * as userActions from "../store/features/users/createUserSlice";
import {
  UserSignInInter,
  AppDispatch,
  UserSignUpInter,
  UserEditInter,
} from "../types/index";
import { signInUser, signUpUser, editUser } from "../services/users";
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
export const editUserApi = async (reqBody: UserEditInter) => {
  try {
    const data = await editUser(reqBody);
    return data;
  } catch (error: any) {
    throw error;
  }
};
