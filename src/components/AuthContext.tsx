import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import liff from '@line/liff';
import useToken, { Token } from '../repository/auth-storage';
import { verifyCodeAPIResponse, authAPIRepo } from '../domain/auth';
import { LIFF_ID } from '../config';

export interface AuthContextInterface {
  actressID: string
  platform: string | null
  token: Token
  setTokenWithCookie: (token: string) => void
  setActressID: (actressID: string) => void
}

let AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthContextProvider = (prop: {
  children: ReactNode | ReactNode[]
  authAPIRepo: authAPIRepo
  env: string
}) => {
  const [actressID, setActressID] = useState("");
  const [liffToken, setLiffToken] = useState("");
  const [platform, setPlatform] = useState<string | null>("");
  const { token, setTokenWithCookie } = useToken()

  useEffect(() => {
    if (token.isSet) {
      return
    }

    const query = new URLSearchParams(window.location.search)
    const code = query.get("code")
    let platform = query.get("platform")
    let actressID = query.get("actressID")
    if (actressID) {
      setActressID(actressID)
    }
    const linePlatformArgsString = query.get("linePlatformArgs")
    if (linePlatformArgsString) {
      const linePlatformArgs = linePlatformArgsString.split(",")
      if (linePlatformArgs[0]) {
        platform = linePlatformArgs[0]
      }
      if (linePlatformArgs[1]) {
        setActressID(linePlatformArgs[1])
      }
    }
    if (platform !== "") {
      setPlatform(platform)
    }

    let redirectURI = "https://" + window.location.host
    if (linePlatformArgsString) {
      redirectURI += "?linePlatformArgs=" + linePlatformArgsString
    }

    liff
      .init({
        liffId: LIFF_ID,
      })
      .then(() => {
        const liffToken = liff.getIDToken()
        if (liffToken) {
          platform = "liff"
          setLiffToken(liffToken)
        }
        setPlatform(platform)
      })
      .catch(err => {
        console.error('liff init failed', err);
      });

    const initToken = async (code: string | null, platform: string | null, liffToken: string | null, redirectURI: string) => {
      let verifyCodeResponse: verifyCodeAPIResponse
      switch (platform) {
        case "line":
          if (!code) {
            throw Error("token init not has require arguments")
          }
          verifyCodeResponse = await prop.authAPIRepo.verifyLineCode(code, redirectURI)
          setTokenWithCookie(verifyCodeResponse.accessToken)
          break
        case "discord":
          if (!code) {
            throw Error("token init not has require arguments")
          }
          verifyCodeResponse = await prop.authAPIRepo.verifyDiscordCode(code)
          setTokenWithCookie(verifyCodeResponse.accessToken)
          break
        case "telegram":
          if (!code) {
            throw Error("token init not has require arguments")
          }
          verifyCodeResponse = await prop.authAPIRepo.verifyTelegramCode(code)
          setTokenWithCookie(verifyCodeResponse.accessToken)
          break
        case "liff":
          if (!liffToken) {
            throw Error("token init not has require arguments")
          }
          verifyCodeResponse = await prop.authAPIRepo.verifyLIFFToken(liffToken)
          setTokenWithCookie(verifyCodeResponse.accessToken)
          break
        default:
          if (token.rawData) {
            setTokenWithCookie(token.rawData)
          } else if (prop.env === "development") {
            setTokenWithCookie("development_token")
          } else {
            setTokenWithCookie("")
          }
          break
      }
    }

    initToken(code, platform, liffToken, redirectURI)
  }, [prop.authAPIRepo, setTokenWithCookie, liffToken, token, prop.env]);

  return (
    <AuthContext.Provider value={{ actressID, token, platform, setActressID, setTokenWithCookie }}>
      {prop.children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextInterface | null => {
  return useContext(AuthContext)
}