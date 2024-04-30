import { actress, actressAPIRepo } from "../domain/actress"
import { ErrorExpired, ErrorAlreadyDone } from "../domain/error"

const createActressAPIRepo = (): actressAPIRepo => {
  const baseURL = process.env.REACT_APP_API_URL

  return {
    getActressByID: async (actressID: string): Promise<actress> => {
      const response = await fetch(`${baseURL}/api/actress/${actressID}`)
      if (response.status === 401) {
        const responseJSON = await response.json()
        if (responseJSON["code"] === 3) {
          throw new ErrorExpired(responseJSON["message"])
        }
        throw new Error("unknown unauthorized status")
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
      // const headers = new Headers()
      // headers.append("Content-Type", "application/json")
      // headers.append("Authorization", `Bearer ${token}`)
      // const response = await fetch(`${baseURL}/api/user/favorites`, {
      //   headers: headers,
      //   method: 'GET',
      // })
      // if (response.status === 401) {
      //   const responseJSON = await response.json()
      //   if (responseJSON["code"] === 3) {
      //     throw new ErrorExpired(responseJSON["message"])
      //   }
      //   throw new Error("unknown unauthorized status")
      // } else if (response.status !== 200) {
      //   throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      // }

      // const responseJSON = await response.json()

      // if (!Array.isArray(responseJSON)) {
      //   throw new TypeError("provided input is not an array.");
      // }

      const actresses: actress[] = []

      const a = [
        {
          "id": "10",
          "name": "ジェマ",
          "preview": "https://s3-ap-northeast-1.amazonaws.com/worldcrater.image/703a61fc-a75a-435a-9496-659114a4b2e1.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2019-10-18T00:02:31Z",
          "updated_at": "2022-02-01T21:12:28.126Z"
        },
        {
          "id": "53",
          "name": "佐倉絆",
          "preview": "https://s3-ap-northeast-1.amazonaws.com/worldcrater.image/7b2dea8f-9c4a-461f-9b03-dd4f28b3d3d6.jpg",
          "detail": "",
          "romanization": "null",
          "created_at": "2019-10-18T00:02:31Z",
          "updated_at": "2022-02-01T21:13:34.851Z"
        },
        {
          "id": "3301",
          "name": "速水怜",
          "preview": "https://s3-ap-northeast-1.amazonaws.com/worldcrater.image/72877499-d1c3-48b6-ae31-134851744e9a.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2020-07-03T15:45:37.055523Z",
          "updated_at": "2022-02-01T22:37:19.375Z"
        },
        {
          "id": "7241",
          "name": "長谷川モコ",
          "preview": "https://www.minnano-av.com/p_actress_125_125/020/244520.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2021-07-19T17:29:47.240061Z",
          "updated_at": "2022-02-02T00:11:41.164Z"
        },
        {
          "id": "8097",
          "name": "加賀美さら",
          "preview": "https://www.minnano-av.com/p_actress_125_125/020/158738.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2021-07-19T18:18:30.313432Z",
          "updated_at": "2022-02-02T00:35:50.37Z"
        },
        {
          "id": "9876",
          "name": "望月みはる",
          "preview": "https://www.minnano-av.com/p_actress_125_125/017/53988.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2021-07-20T19:54:46.566297Z",
          "updated_at": "2022-02-02T01:31:56.478Z"
        },
        {
          "id": "9982",
          "name": "森永ぴの",
          "preview": "https://www.minnano-av.com/p_actress_125_125/017/498441.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2021-07-20T19:59:51.946334Z",
          "updated_at": "2022-02-02T01:35:37.301Z"
        },
        {
          "id": "14562",
          "name": "児玉あむ",
          "preview": "https://www.minnano-av.com/p_actress_125_125/021/363396.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2022-01-30T20:04:49.14559Z",
          "updated_at": "2022-02-02T01:46:02.931Z"
        },
        {
          "id": "15241",
          "name": "深田えいみ",
          "preview": "https://www.minnano-av.com/p_actress_125_125/016/923562.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2022-01-31T21:17:06.514584Z",
          "updated_at": "2022-02-02T02:09:47.222Z"
        },
        {
          "id": "17780",
          "name": "若宮はずき",
          "preview": "https://www.minnano-av.com/p_actress_125_125/012/690259.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2022-02-01T02:11:11.521624Z",
          "updated_at": "2022-02-02T03:56:26.787Z"
        },
        {
          "id": "18062",
          "name": "穂波紫音",
          "preview": "https://www.minnano-av.com/p_actress_125_125/012/944640.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2022-02-01T02:57:08.318775Z",
          "updated_at": "2022-02-02T04:08:52.912Z"
        },
        {
          "id": "19792",
          "name": "里深沙奈",
          "preview": "https://s3-ap-northeast-1.amazonaws.com/worldcrater.image/5136397e-5dd3-4451-b00d-80aedb31e4e6.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2022-02-01T09:50:48.192688Z",
          "updated_at": "2022-02-02T05:29:08.711Z"
        },
        {
          "id": "24617",
          "name": "ナリ・パク",
          "preview": "https://www.minnano-av.com/p_actress_125_125/024/974025.jpg",
          "detail": "",
          "romanization": "",
          "created_at": "2024-04-29T22:07:18.397425Z",
          "updated_at": "2024-04-29T22:07:18.397426Z"
        }
      ]

      for (const item of a) {
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
        if (responseJSON["code"] === 3) {
          throw new ErrorExpired(responseJSON["message"])
        }
        throw new Error("unknown unauthorized status")
      } else if (response.status === 409) {
        throw new ErrorAlreadyDone("already insert favorite error")
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }
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
        if (responseJSON["code"] === 3) {
          throw new ErrorExpired(responseJSON["message"])
        }
        throw new Error("unknown unauthorized status")
      } else if (response.status !== 200) {
        throw new Error(`fetch failed. status ${response.status}, body: ${await response.text()}`)
      }
    }
  }
}

export default createActressAPIRepo
