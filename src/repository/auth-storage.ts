import Cookies from "js-cookie";
import { useState, useCallback } from 'react'

export default function useToken() {
  const [token, setToken] = useState(Cookies.get("token"))

  const setTokenWithCookie = useCallback((token: string) => {
    Cookies.set("token", token, { expires: 7, secure: true }) // TODO: httpOnly: true
    setToken(token)
  }, [])

  return { token, setTokenWithCookie }
}

export function getToken() {
  return Cookies.get("token")
}
