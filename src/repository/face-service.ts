const URL = 'https://api.worldcrater.com/face-service'

export interface star {
  id: number;
  image: string;
  name: string;
  detail: string;
}

export default async function getInfoByID(ID: string): Promise<star> {
  const response = await fetch(`${URL}/faces/face/${ID}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const responseJSON = (await response.json())[0]
  return {
    id: parseInt(ID),
    image: responseJSON.preview,
    name: responseJSON.name,
    detail: responseJSON.detail,
  } as star
}