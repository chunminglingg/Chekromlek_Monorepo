import AuthUserSignInSchema from "../auth-user.schemas";

export type UserSignInSchemaType = ReturnType<
  typeof AuthUserSignInSchema.parse
>;
