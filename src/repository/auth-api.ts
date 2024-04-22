import { authAPIRepo } from "../domain/auth"
import { verifyCodeAPIResponse } from "../domain/auth"

const createAuthAPIRepo = (): authAPIRepo => {
  const baseURL = process.env.REACT_APP_API_URL

  return {
    // verifyLIFF: async (accessToken: string, liffid: string): Promise<verifyCodeAPIResponse> => {
    //   const response = await fetch(`${baseURL}/verifyLIFF`, {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ "accessToken": accessToken, "liffid": liffid }),
    //   })
    //   if (!response.ok) {
    //     throw new Error(response.statusText)
    //   }
    //   const responseJSON = await response.json()

    //   return {
    //     accessToken: responseJSON["access_token"]
    //   }
    // },
    verifyLineCode: async (code: string, redirectURI: string): Promise<verifyCodeAPIResponse> => {
      const response = await fetch(`${baseURL}/api/verifyLineCode`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "code": code, "redirect_uri": redirectURI }),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const responseJSON = await response.json()

      return {
        accessToken: responseJSON["access_token"]
      }
    },
    verifyDiscordCode: async (code: string): Promise<verifyCodeAPIResponse> => {
      const response = await fetch(`${baseURL}/verifyDiscordCode`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "code": code }),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const responseJSON = await response.json()

      return {
        accessToken: responseJSON["access_token"]
      }
    },
    verifyTelegramCode: async (code: string): Promise<verifyCodeAPIResponse> => {
      const response = await fetch(`${baseURL}/verifyTelegramCode`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "code": code }),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const responseJSON = await response.json()

      return {
        accessToken: responseJSON["access_token"]
      }
    }
  }
}

export default createAuthAPIRepo