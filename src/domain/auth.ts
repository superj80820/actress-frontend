export interface verifyCodeAPIResponse {
  accessToken: string;
}

export interface authAPIRepo {
  verifyLineCode(code: string, redirectURI: string): Promise<verifyCodeAPIResponse>
  verifyDiscordCode(code: string): Promise<verifyCodeAPIResponse>
  verifyTelegramCode(code: string): Promise<verifyCodeAPIResponse>
  verifyLIFFToken(liffToken: string): Promise<verifyCodeAPIResponse>
}
