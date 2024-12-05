import { useDispatch, useSelector } from "react-redux";
import { fitClassInter, Page, RootState } from "../types/index";
import { useEffect } from "react";
import { readClassesApi } from "../api/fitClasses";
import { message } from "antd";
export function useReadFitClasses(page: Page) {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector<RootState>(
    (state) => state.classes
  ) as fitClassInter;
  console.log(classes, loading, error);
  useEffect(() => {
    readClassesApi(page, dispatch);
  }, [page]);
  useEffect(() => {
    if (error && error.length > 0) {
      message.error(error);
    }
  }, [error]);
  return { classes, loading };
}
