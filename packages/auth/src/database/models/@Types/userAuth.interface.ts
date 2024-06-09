export interface userAuthTypes extends AuthUserTypeDoc {
  username: string;
  email?: string;
  isVerified?: boolean;
  facebookId?: string;
  googleId?: string;
  profile?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthUserTypeDoc {
  username?: string;
  email?: string;
  password?: string;
}
