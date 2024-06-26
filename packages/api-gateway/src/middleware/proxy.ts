import express, { Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ROUTE_PATHS } from "../route-defs";
import { logger } from "../utils/logger";
import { ClientRequest, IncomingMessage } from "http";
import getConfig from "../utils/createConfig";
import { StatusCode } from "../utils/consts";
interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>;
}
declare module "express-session" {
  interface Session {
    jwt?: string;
  }
}
interface NetworkError extends Error {
  code?: string;
}

const config = getConfig();

// Define the proxy rules and targets
const proxyConfigs: ProxyConfig = {
  [ROUTE_PATHS.AUTH_SERVICE]: {
    target: getConfig().authServiceUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => `${ROUTE_PATHS.AUTH_SERVICE}${path}`,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const expressReq = req as Request;

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        console.log(originalBody);
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            token?: string;
            errors?: Array<object>;
            url?: string;
            status?: string;
            verify_token?: string;
            isLogout?: boolean;
          };

          try {
            responseBody = JSON.parse(bodyString);
            console.log(responseBody);
            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }

            // Store JWT in session
            if (responseBody.token) {
              console.log(responseBody.token);
              (req as Request).session!.jwt = responseBody.token;
            }

            if (responseBody.url) {
              console.log(responseBody.url);
              return res.redirect(responseBody.url);
            }

            if (responseBody.verify_token) {
              return res.json(responseBody);
            }
            if (responseBody.status) {
              return res.json(responseBody.status);
            }

            if (responseBody.isLogout) {
              res.clearCookie("session");
              res.clearCookie("session.sig");
            }

            // Modify response to send only the message to the client
            res.json({ message: responseBody.message });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },

  [ROUTE_PATHS.USER_SERVICE]: {
    target: config.userServiceUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => `${ROUTE_PATHS.USER_SERVICE}${path}`,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);

        const expresReq = req as Request;
        // Extract JWT token from session
        const token = expresReq.session!.jwt;

        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, _req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");

          // Log the received response body for debugging
          console.log("Received response body:", bodyString);

          // Handle empty response
          if (!bodyString.trim()) {
            return res
              .status(proxyRes.statusCode!)
              .json({ message: "Empty response received." });
          }

          try {
            const responseBody = JSON.parse(bodyString);

            // Check if response contains errors
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }

            // Handle successful response
            return res.status(proxyRes.statusCode!).json(responseBody);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return res
              .status(500)
              .json({ message: "Failed to parse server response." });
          }
        });
      },

      error: (err: NetworkError, _req, res) => {
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  [ROUTE_PATHS.POST_SERVICE]: {
    target: config.postServiceUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => `${ROUTE_PATHS.POST_SERVICE}${path}`,
    on: {
      proxyReq: (proxyReq, req, _res) => {
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
        const token = (req as Request).session!.jwt;
        console.log(`Token sent: ${token}`);
        // Extract JWT token from session
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
      },
      proxyRes: (proxyRes, _req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", (chunk: Buffer) => {
          originalBody.push(chunk);
        });
        proxyRes.on("end", () => {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          logger.info(`Response status code: ${proxyRes.statusCode}`);
          logger.info(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
          logger.info(`Response body: ${bodyString}`);

          try {
            if (!bodyString) {
              logger.warn("Empty response body received from backend.");
              return res
                .status(proxyRes.statusCode || 500)
                .json({ message: "Empty response body" });
            }

            let responseBody;
            try {
              responseBody = JSON.parse(bodyString);
            } catch (jsonError) {
              logger.error(
                "JSON Parsing Error:",
                jsonError,
                "Response Body:",
                bodyString
              );
              return res.status(500).json({
                message: "Invalid JSON response received from backend",
              });
            }

            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }

            res.setHeader("Cache-Control", "no-store");

            return res.status(proxyRes.statusCode!).json(responseBody);
          } catch (error) {
            logger.error("Unhandled Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
};

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
