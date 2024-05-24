// import { userAuthTypes } from "../database/models/@Types/userAuth.interface";
// import { VerificationRepository } from "../database/repositories/verification-request.repo";
// import CustomError from "../errors/custom-erorrs";
// import { StatusCode } from "../utils/consts";
// import * as nodemailer from "nodemailer";
// import { generateEmailVerificationToken } from "../utils/verification-token";
// import VerificationModel from "../database/models/verification-request.model";
// import { UserAuthRpository } from "../database/repositories/auth-user.repo";
// import { emailConfig } from "../utils/config";

// export class VerificationService {
//   private verificationRepo: VerificationRepository;
//   private userRepo: UserAuthRpository;
//   private readonly emailConfig: { user: string; pass: string };
//   constructor() {
//     this.verificationRepo = new VerificationRepository();
//     this.userRepo = new UserAuthRpository();
//     this.emailConfig = emailConfig;
//   }
//   async sendVerificationEmail(user: userAuthTypes, verificationToken: string) {
//     try {
//       // Create transporter
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: this.emailConfig.user,
//           pass: this.emailConfig.pass,
//         },
//       });

//       // Construct email options
//       const mailOptions: nodemailer.SendMailOptions = {
//         from: process.env.USER,
//         to: user.email,
//         subject: "Verify Your Email",
//         html: `
//           <p>Hello ${user.username},</p>
//           <p>Please click the following link to verify your email:</p>
//           <p><a href="http://localhost:3000/auth/verify?token=${verificationToken}">Verify Email</a></p>
//         `,
//       };

//       // Send email
//       const info = await transporter.sendMail(mailOptions);
//       return info;
//     } catch (error) {
//       throw new CustomError(
//         "Failed to send verification email.",
//         StatusCode.BadRequest
//       );
//     }
//   }
//   async VerifyEmailToken(token: string) {
//     try {
//       // Find the account verification entry in the database using the token
//       const verification =
//         await this.verificationRepo.FindAccountVerificationToken({
//           token,
//         });

//       // Check if the token is not found
//       if (!verification) {
//         throw new CustomError(
//           "Verification token is invalid",
//           StatusCode.NotFound
//         );
//       }

//       const expirationDate = new Date(verification.expiredDate);
//       expirationDate.setMinutes(expirationDate.getMinutes() + 1); // Add 1 minute
//       const now = new Date();
//       if (now > expirationDate) {
//         // Token has expired - Update Logic:
//         await this.verificationRepo.deleteAccountVerificationToken({ token }); // Delete old entry
//         const newToken = generateEmailVerificationToken(); // Generate new token
//         // Get user information based on the account verification entry
//         const user = await this.userRepo.FindUserById({
//           id: verification.userId.toString(),
//         });
//         if (!user) {
//           throw new CustomError("User not found", StatusCode.NotFound);
//         }
//         // Create a new account verification entry
//         const newAccountVerification = new VerificationModel({
//           // Assuming you have an AccountVerification model
//           token: newToken,
//           userId: user.id, // Assuming your User object has an 'id' property
//           createdAt: new Date(),
//         });
//         await newAccountVerification.save();
//         // Resend verification email with the new token
//         await this.sendVerificationEmail(user, newToken);
//         throw new CustomError(
//           "Verification token has expired. A new verification email has been sent.",
//           StatusCode.BadRequest
//         );
//       }
//       // Convert the userId to string
//       const user = await this.userRepo.FindUserById({
//         id: verification.userId.toString(),
//       });
//       // Fetch the user using the converted userId
//       if (!user) {
//         throw new CustomError("User not found", StatusCode.NotFound);
//       }
//       // Update the user's isVerified status to true
//       user.isVerified = true;
//       await user.save();
//       // Delete the account verification entry
//       await this.verificationRepo.deleteAccountVerificationToken({
//         token: verification.token,
//       });

//       return user;
//     } catch (error: any) {
//       console.error("Error verifying token:", error);
//       throw error;
//     }
//   }
// }
