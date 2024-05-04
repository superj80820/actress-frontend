import Cookies from "js-cookie";
import { useState, useCallback } from 'react'

export interface Token {
  isSet: boolean
  rawData: string
}

export default function useToken() {
  const cookieToken = Cookies.get("token")
  const rawData = cookieToken ? cookieToken : ""
  const [token, setToken] = useState<Token>({
    isSet: false,
    rawData: rawData,
  })

  const setTokenWithCookie = useCallback((token: string) => {
    console.debug("set token: ", token)
    if (token !== "") {
      var now = new Date();
      now.setMinutes(now.getMinutes() + 30)
      Cookies.set("token", token, { expires: new Date(now), secure: true }) // TODO: httpOnly: true
    } else {
      Cookies.remove("token")
    }
    setToken({
      isSet: true,
      rawData: token,
    })
  }, [])

  return { token, setTokenWithCookie }
}
