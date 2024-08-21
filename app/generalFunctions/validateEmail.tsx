export const validateEmail = (email: string) => {
  console.log({ email });

  if (email.length > 0) {
    return true;
  } else {
    return false;
  }
};
