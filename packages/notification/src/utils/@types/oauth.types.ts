export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  id_token?: string;
}

export interface ErrorResponse {
  error: string;
  error_description: string;
}

export interface RequestBody {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type?: string;
  fields?: string;
}

export interface AccessInfo {
  access_token: string;
  url: string;
}
