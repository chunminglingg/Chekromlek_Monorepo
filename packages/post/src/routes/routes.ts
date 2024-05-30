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
            "userId": {"ref":"mongoose.Types.ObjectId"},
            "postId": {"ref":"mongoose.Types.ObjectId"},
            "username": {"ref":"mongoose.Types.ObjectId"},
            "answer": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "postDetail": {
        "dataType": "refObject",
        "properties": {
            "_id": {"dataType":"string"},
            "userId": {"ref":"mongoose.Types.ObjectId"},
            "username": {"ref":"mongoose.Types.ObjectId"},
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "postImage": {"dataType":"string"},
            "category": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["General Knowledge"]},{"dataType":"enum","enums":["Mental Consultant"]},{"dataType":"enum","enums":["Technology"]},{"dataType":"enum","enums":["Mathematic"]},{"dataType":"enum","enums":["Physical"]},{"dataType":"enum","enums":["Biology"]},{"dataType":"enum","enums":["Chemistry"]},{"dataType":"enum","enums":["Writing"]},{"dataType":"enum","enums":["History"]},{"dataType":"enum","enums":["English"]}]},
            "like": {"dataType":"double"},
            "isSave": {"dataType":"boolean"},
            "answer": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "answers": {"dataType":"array","array":{"dataType":"refObject","ref":"IAnswer"},"required":true},
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
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"postDetail"},
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
        app.get('/v1/post/:id',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.GetPostById)),

            async function PostController_GetPostById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
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
                successStatus: 302,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/post/:id',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.UpdatePost)),

            async function PostController_UpdatePost(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"postDetail"},
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
