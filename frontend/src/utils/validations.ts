import dayjs from "dayjs";
// User Validations
export const validateName = (_: unknown, value: string) => {
  if (!value || value.length < 3 || value.length > 255) {
    return Promise.reject(
      new Error("Name must be between 3 and 255 characters")
    );
  }
  return Promise.resolve();
};

export const validateEmail = (_: unknown, value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || !emailRegex.test(value)) {
    return Promise.reject(new Error("Invalid email address"));
  }
  return Promise.resolve();
};

export const validatePassword = (_: unknown, value: string) => {
  if (!value || value.length < 6 || value.length > 255) {
    return Promise.reject(
      new Error("Password must be between 6 and 255 characters")
    );
  }
  return Promise.resolve();
};
// Classes Validations
export const validateTitle = (_: unknown, value: string) => {
  if (!value || value.length < 3 || value.length > 255) {
    return Promise.reject(
      new Error("Title must be between 3 and 255 characters")
    );
  }
  return Promise.resolve();
};
export const validateDescription = (_: unknown, value: string) => {
  if (!value || value.length < 3) {
    return Promise.reject(
      new Error("Description must be at least 3 characters long")
    );
  }
  return Promise.resolve();
};
export const validateMaxAttendees = (_: unknown, value: number) => {
  if (!value || typeof value !== "number" || value < 1) {
    return Promise.reject(
      new Error("Max attendees must be valid number and not be less than one.")
    );
  }
  return Promise.resolve();
};
export const validateStartDate = (
  _: unknown,
  value: string,
  endDate: dayjs.Dayjs
) => {
  if (!value || !dayjs(value).isValid()) {
    return Promise.reject(
      new Error("Start Date must be a valid date ex: YYYY-MM-DD")
    );
  }
  if (dayjs(value).isBefore(dayjs(), "day")) {
    return Promise.reject(
      new Error("Start Date must be greater than or equal the current date")
    );
  }
  if (dayjs(value).isAfter(dayjs(endDate), "day")) {
    return Promise.reject(
      new Error("Start Date must be less than or equal the end date")
    );
  }
  return Promise.resolve();
};
export const validateEndDate = (
  _: unknown,
  value: string,
  startDate: dayjs.Dayjs
) => {
  if (!value || !dayjs(value).isValid()) {
    return Promise.reject(
      new Error("Start Date must be a valid date ex: YYYY-MM-DD")
    );
  }
  if (dayjs(value).isBefore(dayjs(startDate), "day")) {
    return Promise.reject(
      new Error("End Date must be greater than or equal the start date")
    );
  }
  return Promise.resolve();
};
