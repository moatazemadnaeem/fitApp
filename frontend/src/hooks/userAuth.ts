import { useEffect } from "react";
import { AxiosInstance } from "../configs/AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  req_user,
  curr_user,
  fail_signin_user,
} from "../store/features/users/createUserSlice";
import { userInter, UserCurrInter, RootState } from "../types/index";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector<RootState>(
    (state) => state.user
  ) as userInter;
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        dispatch(req_user());
        const { data } = await AxiosInstance.get<UserCurrInter>(
          "users/current_user"
        );
        if (data) {
          dispatch(curr_user(data));
        }
      } catch (error: any) {
        dispatch(
          fail_signin_user(
            error?.response?.data[0]?.msg ||
              "Something went wrong please try again!"
          )
        );
      }
    };
    getCurrentUser();
  }, []);

  return { user, loading, error };
}
