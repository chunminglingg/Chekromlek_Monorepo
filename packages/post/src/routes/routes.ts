/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostController } from './../controllers/post.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "mongoose.Types.ObjectId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAnswer": {
        "dataType": "refObject",
        "properties": {
            "answer": {"dataType":"string"},
            "likeCounts": {"dataType":"double"},
            "answerlikedBy": {"dataType":"array","array":{"dataType":"refAlias","ref":"mongoose.Types.ObjectId"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPost": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "userId": {"ref":"mongoose.Types.ObjectId"},
            "username": {"ref":"mongoose.Types.ObjectId"},
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "postImage": {"dataType":"string"},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["General Knowledge"]},{"dataType":"enum","enums":["Mental Consultant"]},{"dataType":"enum","enums":["Technology"]},{"dataType":"enum","enums":["Mathematic"]},{"dataType":"enum","enums":["Physical"]},{"dataType":"enum","enums":["Biology"]},{"dataType":"enum","enums":["Chemistry"]},{"dataType":"enum","enums":["Writing"]},{"dataType":"enum","enums":["History"]},{"dataType":"enum","enums":["English"]}]},
            "isSave": {"dataType":"boolean"},
            "likeCounts": {"dataType":"double"},
            "postlikedBy": {"dataType":"array","array":{"dataType":"refAlias","ref":"mongoose.Types.ObjectId"}},
            "answer": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "answers": {"dataType":"array","array":{"dataType":"refObject","ref":"IAnswer"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QueryParams": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "username": {"dataType":"string"},
            "category": {"dataType":"string"},
            "title": {"dataType":"string"},
            "page": {"dataType":"string","required":true},
            "limit": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/v1/post',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.CreatePost)),

            async function PostController_CreatePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPost"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'CreatePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/post',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.FindPostByQueries)),

            async function PostController_FindPostByQueries(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    queryParam: {"in":"queries","name":"queryParam","required":true,"ref":"QueryParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'FindPostByQueries',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/post/getpost/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.GetPostById)),

            async function PostController_GetPostById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'GetPostById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/post/getpost',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.GetPostAllPost)),

            async function PostController_GetPostAllPost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'GetPostAllPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/v1/post/:id',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.UpdatePost)),

            async function PostController_UpdatePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IPost"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'UpdatePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:id/answer',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.createAnswer)),

            async function PostController_createAnswer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    answer: {"in":"body","name":"answer","required":true,"ref":"IAnswer"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'createAnswer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/post/:postId/answers/:userId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getUserAnswersOnPost)),

            async function PostController_getUserAnswersOnPost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'getUserAnswersOnPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:postId/:answerId/like',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.LikeAnswer)),

            async function PostController_LikeAnswer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    answerId: {"in":"path","name":"answerId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'LikeAnswer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:postId/:answerId/unlike',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.UnlikeAnswer)),

            async function PostController_UnlikeAnswer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    answerId: {"in":"path","name":"answerId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'UnlikeAnswer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:postId/likepost',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.LikePost)),

            async function PostController_LikePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'LikePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:postId/unlikepost',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.UnLikePost)),

            async function PostController_UnLikePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'UnLikePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/post/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.DeletePost)),

            async function PostController_DeletePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'DeletePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/post/:postId/save',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.FindFavorite)),

            async function PostController_FindFavorite(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'FindFavorite',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
