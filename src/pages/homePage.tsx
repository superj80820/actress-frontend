import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import useToken from '../repository/auth-storage';
import createAuthAPIRepo from '../repository/auth-api';
import { verifyCodeAPIResponse } from '../domain/auth';

export default function HomePage() {
  const navigate = useNavigate()
  const { token, setTokenWithCookie } = useToken()
  const authAPIRepo = useMemo(() => createAuthAPIRepo(), [])

  useEffect(() => {
    const fetchToken = async (code: string, platform: string, redirectURI: string) => {
      let verifyCodeResponse: verifyCodeAPIResponse
      switch (platform) {
        case "line":
          verifyCodeResponse = await authAPIRepo.verifyLineCode(code, redirectURI)
          break
        case "discord":
          verifyCodeResponse = await authAPIRepo.verifyDiscordCode(code)
          break
        case "telegram":
          verifyCodeResponse = await authAPIRepo.verifyTelegramCode(code)
          break
        default:
          return
      }
      setTokenWithCookie(verifyCodeResponse.accessToken)
    }

    const query = new URLSearchParams(window.location.search)
    const code = query.get("code")
    let platform = query.get("platform")
    let actressID = query.get("actressID")
    const linePlatformArgsString = query.get("linePlatformArgs")
    if (linePlatformArgsString) {
      const linePlatformArgs = linePlatformArgsString.split(",")
      if (linePlatformArgs[0]) {
        platform = linePlatformArgs[0]
      }
      if (linePlatformArgs[1]) {
        actressID = linePlatformArgs[1]
      }
    }

    if (actressID && token) {
      navigate(`/search?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
    } else if (code && platform && linePlatformArgsString != null) {
      fetchToken(code, platform, "https://" + window.location.host + "?linePlatformArgs=" + linePlatformArgsString)
    } else if (code && platform) {
      fetchToken(code, platform, "https://" + window.location.host)
    } else if (!token) {
      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`, { replace: true })
    } else {
      navigate(`/favorite`, { replace: true })
    }
  }, [token, navigate, setTokenWithCookie, authAPIRepo])

  return (<></>)
}

