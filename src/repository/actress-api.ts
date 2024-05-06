import { actress, actressAPIRepo, actressesWithPagination } from "../domain/actress"
import { ErrorToken, ErrorAlreadyDone } from "../domain/error"
import { apiURL } from "../config"

const createActressAPIRepo = (): actressAPIRepo => {
  const baseURL = apiURL

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
    getFavorites: async (page: number, limit: number, token: string): Promise<actressesWithPagination> => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(`${baseURL}/api/user/favorites?page=${page}&limit=${limit}`, {
        headers: headers,
        method: 'GET',
      })
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }

      const responseJSON = await response.json() as {
        is_end: boolean
        total: number
        page: number
        limit: number
        actresses: {
          id: string
          preview: string
          name: string
          detail: string
        }[]
      }

      let actressesWithPagination: actressesWithPagination = {
        isEnd: responseJSON.is_end,
        total: responseJSON.total,
        page: responseJSON.page,
        limit: responseJSON.limit,
        actresses: [],
      }

      for (const item of responseJSON.actresses) {
        actressesWithPagination.actresses.push({
          id: item.id,
          image: item.preview,
          name: item.name,
          detail: item.detail,
        })
      }

      return actressesWithPagination
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
          typeof item.detail === 'string' &&
          typeof item.romanization === 'string')) {
          actresses.push({
            id: item.id,
            image: item.preview,
            name: item.name,
            detail: item.detail,
            romanization: item.romanization,
          })
        } else {
          throw new TypeError("not all elements are actress")
        }
      }

      return actresses
    },
    searchActressByName: async (name: string, page: number, limit: number, token: string): Promise<actressesWithPagination> => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(`${baseURL}/api/user/searchActressByName/${name}?page=${page}&limit=${limit}`, {
        headers: headers,
        method: 'GET',
      })
      if (response.status === 401) {
        const responseJSON = await response.json()
        throw new ErrorToken(responseJSON["code"], responseJSON["message"])
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }

      const responseJSON = await response.json() as {
        is_end: boolean
        total: number
        page: number
        limit: number
        actresses: {
          id: string
          preview: string
          name: string
          detail: string
        }[]
      }

      let actressesWithPagination: actressesWithPagination = {
        isEnd: responseJSON.is_end,
        total: responseJSON.total,
        page: responseJSON.page,
        limit: responseJSON.limit,
        actresses: [],
      }

      for (const item of responseJSON.actresses) {
        actressesWithPagination.actresses.push({
          id: item.id,
          image: item.preview,
          name: item.name,
          detail: item.detail,
        })
      }

      return actressesWithPagination
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

export const createMockActressAPIRepo = (): actressAPIRepo => {
  return {
    getActressByID: async (actressID: string): Promise<actress> => {
      return {
        "id": "19056",
        "name": "上原亜衣",
        "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
        "detail": ""
      }
    },
    getFavorites: async (page: number, limit: number, token: string): Promise<actressesWithPagination> => {
      return {
        isEnd: false,
        total: 110,
        limit: limit,
        page: page,
        actresses: Array(10).fill(0).map(() => ({
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
        }))
      }
    },
    addFavorite: async (actressID: string, token: string): Promise<void> => {
      return
    },
    searchActressByFace: async (image_file: File, token: string): Promise<actress[]> => {
      return [
        {
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
          "romanization": "10%",
        },
        {
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
          "romanization": "10%",
        },
        {
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
          "romanization": "10%",
        },
        {
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
          "romanization": "10%",
        }
      ]
    },
    searchActressByName: async (name: string, page: number, limit: number, token: string): Promise<actressesWithPagination> => {
      return {
        isEnd: false,
        total: 110,
        limit: limit,
        page: page,
        actresses: Array(10).fill(0).map(() => ({
          "id": "19056",
          "name": "上原亜衣",
          "image": "https://www.minnano-av.com/p_actress_125_125/010/159817.jpg",
          "detail": "",
        }))
      }
    },
    removeFavorite: async (actressID: string, token: string): Promise<void> => {
      return
    }
  }
}

export default createActressAPIRepo
