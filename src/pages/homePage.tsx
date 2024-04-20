import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useToken from '../repository/auth-storage'
import { verifyLineCode, verifyDiscordCode, verifyTelegramCode } from '../repository/auth-api'

export default function HomePage() {
  const navigate = useNavigate()
  const { token, setTokenWithCookie } = useToken()


  useEffect(() => {
    const fetchToken = async (code: string, platform: string) => {
      const verifyLineCodeResponse = await {
        "line": verifyLineCode(code),
        "discord": verifyDiscordCode(code),
        "telegram": verifyTelegramCode(code),
      }[platform]
      if (!verifyLineCodeResponse) {
        return
      }
      setTokenWithCookie(verifyLineCodeResponse.token)
    }

    const query = new URLSearchParams(window.location.search)
    const code = query.get("code")
    let platform = query.get("platform")
    let actressID = query.get("actressID")
    const linePlatformArgs = query.get("linePlatformArgs")
    if (linePlatformArgs) {
      [platform, actressID] = linePlatformArgs.split(",")
    }

    if (!token) {
      if (code && platform) {
        fetchToken(code, platform)
        return
      }
      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
    } else {
      if (actressID) {
        navigate(`/search?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
      } else {
        navigate(`/favorite`, { replace: true })
      }
    }
  }, [navigate, token])

  return (<></>)
}
