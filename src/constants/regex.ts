export const ACCOUNT_REGEX = /\s+/g;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
export const PHONE_REGEX = /^[\d]{10}$/g;
export const FULL_NAME_REGEX = /^[\D\s]+$/g;
