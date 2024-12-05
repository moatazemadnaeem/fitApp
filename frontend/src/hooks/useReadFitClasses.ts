import { useDispatch, useSelector } from "react-redux";
import { fitClassInter, Page, Pages, RootState } from "../types/index";
import { useEffect } from "react";
import { readClassesApi, readBookedClassesApi } from "../api/fitClasses";
import { message } from "antd";
export function useReadFitClasses(page: Page, type: Pages) {
  const dispatch = useDispatch();
  const { classes, loading, error, status, loadingDash } =
    useSelector<RootState>((state) => state.classes) as fitClassInter;
  useEffect(() => {
    if (type === Pages.HOME) {
      readClassesApi(page, dispatch);
    } else {
      readBookedClassesApi(page, dispatch);
    }
  }, [page, type]);
  useEffect(() => {
    if (error && error.length > 0) {
      message.error(error);
    }
  }, [error]);
  return { classes, loading, status, error, loadingDash };
}
