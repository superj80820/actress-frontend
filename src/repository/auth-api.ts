import { authAPIRepo } from "../domain/auth"
import { verifyCodeAPIResponse } from "../domain/auth"
import { apiURL } from "../config"

const createAuthAPIRepo = (): authAPIRepo => {
  const baseURL = apiURL

  return {
    verifyLIFFToken: async (liffToken: string): Promise<verifyCodeAPIResponse> => {
      const response = await fetch(`${baseURL}/api/verifyLIFFToken`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "liff_token": liffToken }),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const responseJSON = await response.json()

      console.debug("fetch token from liff response: ", responseJSON)

      return {
        accessToken: responseJSON["access_token"]
      }
    },
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

      console.debug("fetch token from line response: ", responseJSON)

      return {
        accessToken: responseJSON["access_token"]
      }
    },
    verifyDiscordCode: async (code: string): Promise<verifyCodeAPIResponse> => {
      const response = await fetch(`${baseURL}/ew`, {
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