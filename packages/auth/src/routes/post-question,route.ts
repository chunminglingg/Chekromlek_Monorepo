// import express, { Request, Response } from "express";
// import { PostQuestionControllers } from "../controllers/post-question.controller";
// import { StatusCode } from "../utils/consts";
// import { postSchema } from "../schemas/post-question.schema";
// import { validate } from "../middlewares/validate";

// export const postRouter = express.Router();
// const controllers = new PostQuestionControllers();

// postRouter.post(
//   "/createpost",
//   validate(postSchema),
//   async (req: Request, res, _next) => {
//     try {
//       const requestBody = req.body;
//       const response = await controllers.createPost(requestBody);
//       return res
//         .status(StatusCode.Created)
//         .send({ message: "Create Success", data: response });
//     } catch (err) {
//       _next(err);
//     }
//   }
// );
