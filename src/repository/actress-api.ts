import { actress, actressAPIRepo } from "../domain/actress"
import { ErrorToken, ErrorAlreadyDone } from "../domain/error"

const createActressAPIRepo = (): actressAPIRepo => {
  const baseURL = process.env.REACT_APP_API_URL

  return {
    getActressByID: async (actressID: string): Promise<actress> => {
      const response = await fetch(`${baseURL}/api/actress/${actressID}`)
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }

      const responseJSON = await response.json()

      return {
        id: responseJSON["id"],
        image: responseJSON["preview"],
        name: responseJSON["name"],
        detail: responseJSON["detail"],
      }
    },
    getFavorites: async (token: string): Promise<actress[]> => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(`${baseURL}/api/user/favorites`, {
        headers: headers,
        method: 'GET',
      })
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }

      const responseJSON = await response.json()

      if (!Array.isArray(responseJSON)) {
        throw new TypeError("provided input is not an array.");
      }

      const actresses: actress[] = []

      for (const item of responseJSON) {
        if ((typeof item.id === 'string' &&
          typeof item.preview === 'string' &&
          typeof item.name === 'string' &&
          typeof item.detail === 'string')) {
          actresses.push({
            id: item.id,
            image: item.preview,
            name: item.name,
            detail: item.detail,
          })
        } else {
          throw new TypeError("not all elements are actress")
        }
      }

      return actresses
    },
    addFavorite: async (actressID: string, token: string): Promise<void> => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(`${baseURL}/api/user/favorites`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          "actress_id": actressID,
        }),
      })
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status === 409) {
        throw new ErrorAlreadyDone("already insert favorite error")
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }
    },
    searchActressByFace: async (image_file: File, token: string): Promise<actress[]> => {
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${token}`)

      const formdata = new FormData();
      formdata.append("image_file", image_file, image_file.name);

      const requestOptions = {
        headers: headers,
        method: "POST",
        body: formdata,
      };

      const response = await fetch(`${baseURL}/api/user/searchActress`, requestOptions)

      const responseJSON = await response.json()

      if (!Array.isArray(responseJSON)) {
        throw new TypeError("provided input is not an array.");
      }

      const actresses: actress[] = []

      for (const item of responseJSON) {
        if ((typeof item.id === 'string' &&
          typeof item.preview === 'string' &&
          typeof item.name === 'string' &&
          typeof item.detail === 'string')) {
          actresses.push({
            id: item.id,
            image: item.preview,
            name: item.name,
            detail: item.detail,
          })
        } else {
          throw new TypeError("not all elements are actress")
        }
      }

      return actresses
    },
    removeFavorite: async (actressID: string, token: string): Promise<void> => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(`${baseURL}/api/user/favorites/${actressID}`, {
        headers: headers,
        method: 'DELETE',
      })
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }
    }
  }
}

export default createActressAPIRepo
