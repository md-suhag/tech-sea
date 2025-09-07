export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isVerified: boolean;
  auths: TAuth[];
  createdAt: Date;
  updatedAt: Date;
};

export type TAuth = {
  provider: string;
  providerId: string;
};
