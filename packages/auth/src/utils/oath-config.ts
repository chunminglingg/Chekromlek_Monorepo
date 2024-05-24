import axios, { AxiosError } from "axios";
import querystring from "querystring";
import {
  AccessInfo,
  ErrorResponse,
  RequestBody,
  TokenResponse,
} from "./@types/o-auth.types";
import CustomError from "../errors/custom-erorrs";
import dotenv from "dotenv";
dotenv.config();
export class OauthConfig {
  private static instance: OauthConfig;

  private constructor() {
    // Any initialization logic you want to perform
  }

  public static async getInstance(): Promise<OauthConfig> {
    if (!OauthConfig.instance) {
      OauthConfig.instance = new OauthConfig();
    }
    return OauthConfig.instance;
  }

  async getToken(
    requestBody: RequestBody,
    url: string
  ): Promise<TokenResponse> {
    try {
      const { data } = await axios.post<TokenResponse>(url, requestBody);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.errorDescription || axiosError.message;
        throw new CustomError(`Unable to configure user  API: ${errorMessage}`);
      } else {
        throw new CustomError(`Unknown error occurred: ${error}`);
      }
    }
  }

  async GoogleStrategy(code: string): Promise<TokenResponse> {
    const requestBody = {
      code,
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      redirectURI: process.env.CLIENT_URL as string,
      grantType: "authorization_code",
    };
    const url = "https://oauth2.googleapis.com/token";
    try {
      return await this.getToken(requestBody, url);
    } catch (error) {
      throw error;
    }
  }
  async FacebookStrategy(code: string): Promise<TokenResponse> {
    const requestBody = {
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      redirectURI: process.env.FACEBOOK_REDIRECT_URI as string,
      code,
    };
    console.log(requestBody);
    const url = "https://graph.facebook.com/v13.0/oauth/access_token";
    try {
      return await this.getToken(requestBody, url);
    } catch (error) {
      throw error;
    }
  }

  async AccessInfo({ accessToken, url }: AccessInfo) {
    try {
      const userInfoResponse = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          accessToken,
          fields: "username, email, googleId, isVerified, profile ",
        },
      });
      return userInfoResponse;
    } catch (error: unknown) {
      throw new CustomError(error as string);
    }
  }

  async GoogleAccessInfo(access_token: string) {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";
    try {
      return await this.AccessInfo({ accessToken: access_token, url: url });
    } catch (error: unknown) {
      throw error;
    }
  }
  async FacebookAccessInfo(accessToken: string) {
    const url = "https://graph.facebook.com/v13.0/me";
    try {
      return await this.AccessInfo({ accessToken, url });
    } catch (error: unknown) {
      throw error;
    }
  }

  async GoogleConfigUrl(clientId: string, redirectUri: string) {
    try {
      // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      //   redirectUri
      // )}&response_type=code&scope=email%20profile`;
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile email`;
      return url;
    } catch (error: unknown) {
      throw new CustomError("Unable to AuthConfigUrl in Google API");
    }
  }
  public async FacebookConfigUrl(
    clientId: string,
    redirectUri: string
  ): Promise<string> {
    try {
      const queryParams = {
        clientid: clientId,
        redirecturi: redirectUri,
        responsetype: "code",
      };

      // Convert the object to a URL-encoded query string
      const queryString = querystring.stringify(queryParams);

      // Construct the full URL with the query string
      const url = `https://www.facebook.com/v19.0/dialog/oauth?fields=email${queryString}`;

      return url;
    } catch (error: unknown) {
      throw new CustomError("Unable to AuthConfigUrl in facebook api");
    }
  }
}
