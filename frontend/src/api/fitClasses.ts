import { AppDispatch, Page } from "../types";
import * as fitClassesActions from "../store/features/fitClasses/createFitClassesSlice";
import {
  readClasses,
  bookClass,
  getBookedClasses,
  cancelClass,
  getCreatedClasses,
} from "../services/fitClasses";
export const readClassesApi = async (reqBody: Page, dispatch: AppDispatch) => {
  try {
    dispatch(fitClassesActions.req_classes());
    const data = await readClasses(reqBody);
    dispatch(fitClassesActions.get_classes(data.fitclasses));
    return data;
  } catch (error: any) {
    dispatch(fitClassesActions.fail_get_classes(error));
  }
};
export const bookClassApi = async (classId: string) => {
  try {
    const data = await bookClass(classId);
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const cancelClassApi = async (classId: string) => {
  try {
    const data = await cancelClass(classId);
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const readBookedClassesApi = async (
  reqBody: Page,
  dispatch: AppDispatch
) => {
  try {
    dispatch(fitClassesActions.loading_dash());
    const data = await getBookedClasses(reqBody);
    dispatch(fitClassesActions.get_classes(data.fitclasses));
    return data;
  } catch (error: any) {
    dispatch(fitClassesActions.fail_get_classes(error));
  }
};
export const getCreatedClassesApi = async (
  reqBody: Page,
  dispatch: AppDispatch
) => {
  try {
    dispatch(fitClassesActions.loading_class());
    const data = await getCreatedClasses(reqBody);
    dispatch(fitClassesActions.get_classes(data.fitclasses));
    return data;
  } catch (error: any) {
    dispatch(fitClassesActions.fail_get_classes(error));
  }
};
