export type TComment = {
  _id: string;
  blog: string;
  user: TUser;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TUser = {
  _id: string;
  name: string;
};
