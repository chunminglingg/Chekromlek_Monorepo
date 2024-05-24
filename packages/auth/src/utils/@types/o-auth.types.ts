export interface TokenResponse {
  accessToken: string;
  expiredIn: number;
  tokenType: string;
  refreshToken?: string;
  tokenid: string;
}

export interface ErrorResponse {
  error: string;
  errorDescription: string;
}

export interface RequestBody {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectURI: string;
  grantType?: string;
}

export interface AccessInfo {
  accessToken: string;
  url: string;
}
