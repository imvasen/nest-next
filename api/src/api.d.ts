export as namespace API;

export interface AppStatusResponse {
  status: string;
}

export interface AuthSignInResponse {
  jwt: string;
}
