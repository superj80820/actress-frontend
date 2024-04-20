export interface actress {
  id: string;
  image: string;
  name: string;
  detail: string;
}


export interface verifyCodeResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number,
  scope: string;
  id_token: string;
}

export async function getInfoByID(ID: string): Promise<actress> {
  return {
    id: "3",
    image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
    name: "TOTOTODOyork",
    detail: "TODOyork",
  } as actress
  // const response = await fetch(`${URL}/faces/face/${ID}`)
  // if (!response.ok) {
  //   throw new Error(response.statusText)
  // }

  // const responseJSON = (await response.json())[0]
  // return {
  //   id: parseInt(ID),
  //   image: responseJSON.preview,
  //   name: responseJSON.name,
  //   detail: responseJSON.detail,
  // } as star
}

export async function getFavorites(): Promise<actress[]> {
  return [
    {
      id: "3",
      name: "YOTODOYOrk",
      image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
      detail: "string",
    },
    {
      id: "33",
      name: "YOTODOYOrk",
      image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
      detail: "string",
    },
    {
      id: "333",
      name: "YOTODOYOrk",
      image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
      detail: "string",
    },
    {
      id: "3333",
      name: "YOTODOYOrk",
      image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
      detail: "string",
    },
    {
      id: "33333",
      name: "YOTODOYOrk",
      image: "https://cdn2.ettoday.net/images/6269/d6269133.jpg",
      detail: "string",
    }
  ]
  // const response = await fetch(`${URL}/accounts/${token}/favorites`, {
  //   method: 'GET',
  //   headers: {
  //     "authorization": token
  //   }
  // })
  // if (!response.ok) {
  //   throw new Error(response.statusText)
  // }
  // const responseJSON = await response.json()

  // return responseJSON.favoriteIds.map((item: favorite) => ({
  //   id: item.id,
  //   name: item.name,
  //   preview: item.preview,
  //   detail: item.detail,
  //   romanization: item.romanization,
  // })) as favorite[]
}

export async function addFavorite(actressID: string): Promise<any> {
  // let headers = new Headers();
  // headers.append("Content-Type", "application/json")
  // headers.append("authorization", token)

  // const response = await fetch(`${URL}/accounts/${token}/favorites`, {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify({
  //     "faceId": parseInt(faceId),
  //   }),
  // })
  // if (!response.ok) {
  //   return Promise.reject(new Error(response.statusText))
  // }
  // try {
  //   const responseJSON = await response.json()
  //   return Promise.resolve(responseJSON)
  // } catch (err) {
  //   return Promise.reject(err)
  // }
}

export async function removeFavorite(actressID: string): Promise<any> {
  // const response = await fetch(`${URL}/accounts/${token}/favorites/${faceId}`, {
  //   headers: {
  //     "authorization": token
  //   },
  //   method: 'DELETE',
  // })
  // if (!response.ok) {
  //   throw new Error(response.statusText)
  // }
  // try {
  //   const responseText = await response.text()
  //   return Promise.resolve(responseText)
  // } catch (err) {
  //   return Promise.reject(err)
  // }
}