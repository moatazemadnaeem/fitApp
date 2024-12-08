import { useDispatch, useSelector } from "react-redux";
import { fitClassInter, Page, Pages, RootState } from "../types/index";
import { useEffect } from "react";
import {
  readClassesApi,
  readBookedClassesApi,
  getCreatedClassesApi,
} from "../api/fitClasses";
import { message } from "antd";
export function useReadFitClasses(page: Page, type: Pages) {
  const dispatch = useDispatch();
  const { classes, loading, error, status, createdClasses, dashboard } =
    useSelector<RootState>((state) => state.classes) as fitClassInter;
  useEffect(() => {
    if (type === Pages.HOME) {
      readClassesApi(page, dispatch);
    }
    if (type === Pages.DASHBOARD) {
      readBookedClassesApi(page, dispatch);
    }
    if (type === Pages.CLASSES) {
      getCreatedClassesApi(page, dispatch);
    }
  }, [page, type]);
  useEffect(() => {
    if (type === Pages.HOME) {
      if (error && error.length > 0) {
        message.error(error);
      }
    }
    if (type === Pages.DASHBOARD) {
      if (createdClasses.error && createdClasses.error.length > 0) {
        message.error(createdClasses.error);
      }
    }
    if (type === Pages.CLASSES) {
      if (dashboard.error && dashboard.error.length > 0) {
        message.error(dashboard.error);
      }
    }
  }, [type, error, createdClasses.error, dashboard.error]);
  return { classes, loading, status, error, createdClasses, dashboard };
}
