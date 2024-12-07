import { AxiosInstance } from "../configs/AxiosConfig";
import {
  fitClassReadInter,
  BookResInter,
  CancelClassResInter,
  fitClassCreateInter,
  fitClassEditInter,
  fitClassUpdateInter,
  fitClassCreateResInter,
  DeleteClassResInter,
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
export const getCreatedClasses = async (page: Page) => {
  try {
    const { data } = await AxiosInstance.post<fitClassReadInter>(
      `fitclasses/get_created_classes`,
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
export const editCreatedClasses = async (reqBody: fitClassEditInter) => {
  try {
    const { data } = await AxiosInstance.patch<fitClassUpdateInter>(
      `fitclasses/edit_class`,
      {
        ...reqBody,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const createClasses = async (reqBody: fitClassCreateInter) => {
  try {
    const { data } = await AxiosInstance.post<fitClassCreateResInter>(
      `fitclasses/create_class`,
      {
        ...reqBody,
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
export const deleteClass = async (classId: string) => {
  try {
    const { data } = await AxiosInstance.delete<DeleteClassResInter>(
      `fitclasses/delete_class`,
      {
        data: { classId },
      }
    );
    return data;
  } catch (error: any) {
    throw (
      error?.response?.data[0]?.msg || "Something went wrong please try again."
    );
  }
};
