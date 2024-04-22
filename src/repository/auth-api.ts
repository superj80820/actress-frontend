const AUTH_SERVICE_URL = 'http://localhost:9090/api'

export interface verifyCodeAPIResponse {
  accessToken: string;
}

export async function verifyLIFF(accessToken: string, liffid: string): Promise<verifyCodeAPIResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/verifyLIFF`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "accessToken": accessToken, "liffid": liffid }),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const responseJSON = await response.json()

  return {
    accessToken: responseJSON["access_token"]
  }
}

export async function verifyLineCode(code: string, redirectURI: string): Promise<verifyCodeAPIResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/verifyLineCode`, {
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

  console.log("yorkghujadf", responseJSON)

  return {
    accessToken: responseJSON["access_token"]
  }
}

export async function verifyDiscordCode(code: string): Promise<verifyCodeAPIResponse> {
  return {
    accessToken: "TODO token"
  }
  // const response = await fetch(`${AUTH_SERVICE_URL}/verifyDiscordCode`, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ "code": code, "redirectURI": redirectURI }),
  // })
  // if (!response.ok) {
  //   throw new Error(response.statusText)
  // }
  // const responseJSON = await response.json()

  // return {
  //   token: responseJSON.token
  // } as verifyTokenResponse
}

export async function verifyTelegramCode(code: string): Promise<verifyCodeAPIResponse> {
  const response = await fetch(`${AUTH_SERVICE_URL}/verifyTelegramCode`, {
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