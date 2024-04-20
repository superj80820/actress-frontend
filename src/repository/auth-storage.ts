import Cookies from "js-cookie";
import { useState } from 'react'


function useToken() {
  const [token, setToken] = useState(Cookies.get("token"))

  const setTokenWithCookie = (token: string) => {
    Cookies.set("token", token, { expires: 60 * 60 * 6, secure: true, httpOnly: true })
    setToken(token)
  }

  return { token, setTokenWithCookie }
}

export default useToken