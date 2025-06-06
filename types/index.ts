export enum SignInFields {
  EMAIL = "email",
  PASSWORD = "password",
}

export type SignInFormType = {
  [key in SignInFields]: string;
};

export enum SignUpFields {
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
}

export type SignUpFormType = {
  [key in SignUpFields]: string;
};
