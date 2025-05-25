export enum SignInFields {
  EMAIL = "email",
  PASSWORD = "password",
}

export type SignInForm = {
  [key in SignInFields]: string;
};
