import { useDispatch, useSelector } from "react-redux";
import { fitClassInter, Page, RootState } from "../types/index";
import { useEffect } from "react";
import { readClassesApi } from "../api/fitClasses";
export function useReadFitClasses(page: Page) {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector<RootState>(
    (state) => state.classes
  ) as fitClassInter;
  useEffect(() => {
    readClassesApi(page, dispatch);
  }, [page]);
  return { classes, loading, error };
}
