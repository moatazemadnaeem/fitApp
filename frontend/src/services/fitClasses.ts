import { AxiosInstance } from "../configs/AxiosConfig";
import {
  BodyIdInter,
  fitClassReadInter,
  BookResInter,
  CancelClassResInter,
} from "../types/index";
import { Page } from "../types/index";
export const readClasses = async (page: Page) => {
  try {
    const { data } = await AxiosInstance.post<fitClassReadInter>(
      `fitclasses/get_classes`,
      {
        page,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};

export const bookClass = async (classId: string) => {
  try {
    const { data } = await AxiosInstance.post<BookResInter>(
      `fitclasses/book_class`,
      {
        classId,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const cancelClass = async (classId: string) => {
  try {
    const { data } = await AxiosInstance.post<CancelClassResInter>(
      `fitclasses/cancel_class`,
      {
        classId,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const getBookedClasses = async (page: Page) => {
  try {
    const { data } = await AxiosInstance.post<fitClassReadInter>(
      `fitclasses/get_booked_classes`,
      {
        page,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
