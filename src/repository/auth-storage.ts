import Cookies from "js-cookie";
import { useState, useCallback } from 'react'

export default function useToken() {
  const cookieToken = (item => item ? item : null)(Cookies.get("token"))
  const [token, setToken] = useState<string | null>(cookieToken)

  const setTokenWithCookie = useCallback((token: string) => {
    console.debug("set token: ", token)
    let now = new Date();
    now.setMinutes(now.getMinutes() + 30)
    Cookies.set("token", token, { expires: new Date(now), secure: true }) // TODO: httpOnly: true
    setToken(token)
  }, [])

  const removeTokenWithCookie = useCallback(() => {
    console.debug("remove token")
    Cookies.remove("token")
    setToken(null)
  }, [])

  return { token, setTokenWithCookie, removeTokenWithCookie }
}
