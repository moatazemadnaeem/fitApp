import { AxiosInstance } from "../configs/AxiosConfig";
import {
  UserSignInInter,
  UserSignUpInter,
  userResInter,
  UserEditInter,
  UserEditResInter,
  UserSignOutResInter,
} from "../types/index";

export const signInUser = async (requestBody: UserSignInInter) => {
  try {
    const { data } = await AxiosInstance.post<userResInter>(`users/signin`, {
      ...requestBody,
    });
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const signUpUser = async (requestBody: UserSignUpInter) => {
  try {
    const { data } = await AxiosInstance.post<{ status: boolean }>(
      `users/create_user`,
      {
        ...requestBody,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const editUser = async (requestBody: UserEditInter) => {
  try {
    const { data } = await AxiosInstance.patch<UserEditResInter>(
      `users/edit_user`,
      {
        ...requestBody,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const signOutUser = async () => {
  try {
    const { data } = await AxiosInstance.get<UserSignOutResInter>(
      `users/signout`
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
