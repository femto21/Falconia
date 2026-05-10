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

export type UserLink = {
  id?: string;
  userId?: string;
  linkName: string;
  url: string;
};

export type PublicProfile = {
  username: string;
  firstName: string;
  lastName: string;
  links: UserLink[];
};
