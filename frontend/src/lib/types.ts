export type UserRegisterPayload = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};

export type CreateLinkPayload = {
  linkName: string;
  url: string;
};
