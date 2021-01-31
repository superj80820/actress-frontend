const URL = 'https://api.worldcrater.com/liff-service'

export interface verifyProfileResponse {
  accountId: string;
  userId: string;
  displayName: string;
  pictureUrl: string;
}

export interface favorite {
  id: number;
  name: string;
  preview: string;
  detail: string;
  romanization: string;
}

export async function verifyProfile(accessToken: string, liffid: string): Promise<verifyProfileResponse> {
  const response = await fetch(`${URL}/profile`, {
    method: 'POST',
    body: JSON.stringify({"access_token":accessToken,"liffid":liffid}),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const responseJSON = await response.json()
  return {
    accountId: responseJSON.accountId,
    userId: responseJSON.userId,
    displayName: responseJSON.displayName,
    pictureUrl: responseJSON.pictureUrl,
  } as verifyProfileResponse
}

export async function getFavorites(accountId: string): Promise<favorite[]> {
  const response = await fetch(`${URL}/accounts/${accountId}/favorites`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const responseJSON = await response.json()
  //yorktodo思考這邊是否可以用Try monad
  return responseJSON.favoriteIds.map((item: favorite) => ({
    id : item.id,
    name :item.name,
    preview :item.preview,
    detail :item.detail,
    romanization :item.romanization,
  })) as favorite[]
}

export async function addFavorite(accountId: string, faceId: string): Promise<any> {
  let headers = new Headers();
  headers.append("Content-Type", "application/json")

  const response = await fetch(`${URL}/accounts/${accountId}/favorites`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "faceId": parseInt(faceId),
    }),
  })
  if (!response.ok) {
    //yorkworkaround
    console.error(new Error(response.statusText))
    return
  }
  try {
    const responseJSON= await response.json()
    return Promise.resolve(responseJSON)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function removeFavorite(accountId: string, faceId: string): Promise<any> {
  const response = await fetch(`${URL}/accounts/${accountId}/favorites/${faceId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  try {
    const responseText= await response.text()
    return Promise.resolve(responseText)
  } catch (err) {
    return Promise.reject(err)
  }
}