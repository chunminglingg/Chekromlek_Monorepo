import { userAuthTypes } from "../../models/@Types/userAuth.interface";

export interface AuthCreateUserRepository {
  username: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  googleId?: string;
  profile?: string;
}
export interface UserSignUp extends userAuthTypes {}

export interface AuthUpdateUserRepository {
  username?: string;
  password?: string;
  googleId?: string;
}
