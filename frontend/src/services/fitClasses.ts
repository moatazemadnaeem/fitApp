import { AxiosInstance } from "../configs/AxiosConfig";
import { BodyIdInter, fitClassReadInter, BookResInter } from "../types/index";
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

export const bookClass = async (reqBody: BodyIdInter) => {
  try {
    const { data } = await AxiosInstance.post<BookResInter>(
      `fitclasses/book_class`,
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
