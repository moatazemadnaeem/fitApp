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
