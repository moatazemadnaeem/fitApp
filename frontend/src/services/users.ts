import { AxiosInstance } from "../configs/AxiosConfig";
import { UserSignInInter, UserSignUpInter, userResInter } from "../types/index";

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
