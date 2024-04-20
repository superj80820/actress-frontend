const AUTH_SERVICE_URL = 'https://api.worldcrater.com/auth-service'


export interface verifyTokenResponse {
  token: string;
}

export async function verifyLIFF(accessToken: string, liffid: string): Promise<verifyTokenResponse> {
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
    token: responseJSON.token
  } as verifyTokenResponse
}

export async function verifyLineCode(code: string): Promise<verifyTokenResponse> {
  return {
    token: "TODO token"
  }
  // const response = await fetch(`${AUTH_SERVICE_URL}/verifyLineCode`, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({"code":code,"redirectURI":redirectURI}),
  // })
  // if (!response.ok) {
  //   throw new Error(response.statusText)
  // }
  // const responseJSON = await response.json()

  // return {
  //   token: responseJSON.token
  // } as verifyTokenResponse
}

export async function verifyDiscordCode(code: string): Promise<verifyTokenResponse> {
  return {
    token: "TODO token"
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

export async function verifyTelegramCode(code: string): Promise<verifyTokenResponse> {
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
    token: responseJSON.token
  } as verifyTokenResponse
}