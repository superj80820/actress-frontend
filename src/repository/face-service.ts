const URL = 'https://api.worldcrater.com/face-service'

interface star {
  image: string;
  name: string;
  detail: string;
}

export default async function getInfoByID(ID: string): Promise<star> {
  const response = await fetch(`${URL}/faces/${ID}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  // Workaround: 前端需更改成專用info的API並非使用face+info的API
  const responseJSON = (await response.json())[0]
  return {
    image: responseJSON.preview,
    name: responseJSON.name,
    detail: responseJSON.detail,
  } as star
}