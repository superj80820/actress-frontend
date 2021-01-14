const URL = 'https://api.worldcrater.com/liff-service'

interface getProfileResponse {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

export default async function getProfile(accessToken: string, liffid: string): Promise<getProfileResponse> {
  const response = await fetch(`${URL}/profile`, {
    method: 'POST',
    body: JSON.stringify({"access_token":accessToken,"liffid":liffid}),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const responseJSON = await response.json()
  return {
    userId: responseJSON.userId,
    displayName: responseJSON.displayName,
    pictureUrl: responseJSON.pictureUrl,
  } as getProfileResponse
}