// import express, { Request, Response, NextFunction } from "express";
// import { UserAuthController } from "../../controllers/auth-user.controller";
// import { validate } from "../../middlewares/validate";
// import AuthUserSignInSchema, {
//   AuthUserSignUpSchema,
// } from "../../schemas/auth-user.schemas";
// import { StatusCode } from "../../utils/consts";
// import CustomError from "../../errors/custom-erorrs";
// import axios from "axios";
// import { UserAuthRpository } from "../../database/repositories/auth-user.repo";
// import { generateSignature } from "../../utils/jwt";
// import { VerificationRepository } from "../../database/repositories/verification-request.repo";

// export const userRouter = express.Router();
// const controllers = new UserAuthController();
// const auth = new UserAuthRpository();
// userRouter.post(
//   "/auth/signup",
//   validate(AuthUserSignUpSchema), // Validate request body against the schema
//   async (req: Request, res: Response, _next: NextFunction) => {
//     try {
//       const requestBody = req.body;

//       await controllers.SignUpUser(requestBody);

//       return res.status(StatusCode.Created).send({ message: "Create Success" });
//     } catch (error) {
//       res.status(StatusCode.Found).send({ message: error.message });
//     }
//   }
// );
// userRouter.get(
//   "/auth/verify",
//   async (req: Request, res: Response, _next: NextFunction) => {
//     try {
//       const token = req.query.token as string; // Assuming the token is passed as a query parameter
//       await controllers.VerifyEmail(token);
//       return res.status(StatusCode.Found).json("Successfully verifiy");
//     } catch (error: any) {
//       res.status(StatusCode.BadRequest).json({ message: error.message });
//     }
//   }
// );
// userRouter.post(
//   "/auth/login",
//   validate(AuthUserSignInSchema),
//   async (req, res) => {
//     try {
//       const requestBody = req.body;
//       await controllers.LoginWithEmail(requestBody);
//       return res.status(StatusCode.OK).json({ message: "Login Success" });
//     } catch (error: any) {
//       let statusCode = StatusCode.BadRequest; // Default status code for validation errors
//       if (error instanceof CustomError) {
//         statusCode = error.statusCode; // Use the status code from the CustomError if available
//       }
//       res.status(statusCode).json({ message: error.message });
//     }
//   }
// );
// const CLIENT_ID = process.env.CLIENT_ID as string;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.CLIENT_URL as string;

// userRouter.get("/auth/google", (_req, res) => {
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
//   res.redirect(url);
// });

// userRouter.get("/auth/google/callback", async (req, res) => {
//   const { code } = req.query;

//   try {
//     // Exchange authorization code for access token
//     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       code,
//       redirect_uri: REDIRECT_URI,
//       grant_type: "authorization_code",
//     });

//     const { id_token } = data;

//     // Use id_token to verify user's identity
//     const decodedToken = jwt.decode(id_token) as JwtPayload; // Type assertion here
//     if (!decodedToken) {
//       throw new Error("Failed to decode ID token");
//     }

//     // Extract user information from the ID token
//     const { email, name, sub: googleId } = decodedToken;

//     // Check if the user already exists in the database
//     let user = await auth.FindUser({ email });

//     if (user) {
//       throw new Error(
//         "Email already exists, please sign up with another account"
//       );
//     }

//     // Create a new user if not found
//     const newUser = await auth.CreateOauthUser({
//       username: name as string,
//       email: email as string,
//       googleId: googleId as string,
//       isVerified: true, // Assuming Google OAuth users are verified
//     });
//     await newUser.save();

//     // Generate JWT token
//     const _jwtToken = generateSignature({ payload: newUser.googleId });

//     // Respond with the JWT token
//     res.json({ username: name });
//   } catch (error: any) {
//     // console.error("Error:", error.response?.data?.error || error.message);
//     res.status(StatusCode.BadRequest).json({ message: error.message });
//   }
// });

// userRouter.get(
//   "/auth/google",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const googleConfig = await OauthConfig.getInstance();
//       const authUrl = await googleConfig.GoogleConfigUrl(
//         CLIENT_ID,
//         REDIRECT_URI
//       );
//       res.redirect(authUrl);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// userRouter.get(
//   "/auth/google/callback",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { code } = req.query;
//     try {
//       const queryCode = code as string;
//       const userInfoResponse = await controllers.GoogleOAuth(queryCode);

//       res.status(StatusCode.OK).json({
//         success: true,
//         user: userInfoResponse.newUser,
//         token: userInfoResponse.jwtToken,
//       });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );
