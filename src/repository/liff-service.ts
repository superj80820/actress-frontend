const URL = 'https://api.worldcrater.com/liff-service'




export interface verifyCodeResponse{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number,
    scope:string;
    id_token: string;
}

export interface favorite {
  id: number;
  name: string;
  preview: string;
  detail: string;
  romanization: string;
}


export async function getFavorites(token: string): Promise<favorite[]> {
  const response = await fetch(`${URL}/accounts/${token}/favorites`, {
    method: 'GET',
    headers: {
      "authorization": token
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const responseJSON = await response.json()

  return responseJSON.favoriteIds.map((item: favorite) => ({
    id : item.id,
    name :item.name,
    preview :item.preview,
    detail :item.detail,
    romanization :item.romanization,
  })) as favorite[]
}

export async function addFavorite(token: string, faceId: string): Promise<any> {
  let headers = new Headers();
  headers.append("Content-Type", "application/json")
  headers.append("authorization", token)

  const response = await fetch(`${URL}/accounts/${token}/favorites`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "faceId": parseInt(faceId),
    }),
  })
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText))
  }
  try {
    const responseJSON= await response.json()
    return Promise.resolve(responseJSON)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function removeFavorite(token: string, faceId: string): Promise<any> {
  const response = await fetch(`${URL}/accounts/${token}/favorites/${faceId}`, {
    headers: {
      "authorization": token
    },
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