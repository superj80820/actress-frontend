import React, { createContext, useEffect, useState, useContext, ReactNode, useMemo } from 'react';
import liff from '@line/liff';
import createAuthAPIRepo from '../repository/auth-api';
import useToken, { Token } from '../repository/auth-storage';
import { verifyCodeAPIResponse } from '../domain/auth';

export interface AuthContextInterface {
  actressID: string
  token: Token
  setActressID: (actressID: string) => void
}

let AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthContextProvider = (props: { children: ReactNode | ReactNode[] }) => {
  const liffID = "1655529572-bv0kM39q" // york TODO: set to config
  const authAPIRepo = useMemo(() => createAuthAPIRepo(), [])
  const [actressID, setActressID] = useState("");
  const { token, setTokenWithCookie } = useToken()

  useEffect(() => {
    if (token.isSet) {
      return
    }

    liff
      .init({
        liffId: liffID,
      })
      .then(() => {
        const liffToken = liff.getIDToken()

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
        if (liffToken) {
          platform = "liff"
        }

        let redirectURI = "https://" + window.location.host
        if (linePlatformArgsString) {
          redirectURI += "?linePlatformArgs=" + linePlatformArgsString
        }

        const initToken = async (code: string | null, platform: string | null, liffToken: string | null, redirectURI: string) => {
          let verifyCodeResponse: verifyCodeAPIResponse
          switch (platform) {
            case "line":
              if (!code) {
                throw Error("token init not has require arguments")
              }
              verifyCodeResponse = await authAPIRepo.verifyLineCode(code, redirectURI)
              setTokenWithCookie(verifyCodeResponse.accessToken)
              break
            case "discord":
              if (!code) {
                throw Error("token init not has require arguments")
              }
              verifyCodeResponse = await authAPIRepo.verifyDiscordCode(code)
              setTokenWithCookie(verifyCodeResponse.accessToken)
              break
            case "telegram":
              if (!code) {
                throw Error("token init not has require arguments")
              }
              verifyCodeResponse = await authAPIRepo.verifyTelegramCode(code)
              setTokenWithCookie(verifyCodeResponse.accessToken)
              break
            case "liff":
              if (!liffToken) {
                throw Error("token init not has require arguments")
              }
              verifyCodeResponse = await authAPIRepo.verifyLIFFToken(liffToken)
              setTokenWithCookie(verifyCodeResponse.accessToken)
              break
            default:
              if (token.rawData) {
                setTokenWithCookie(token.rawData)
              } else {
                setTokenWithCookie("")
              }
              break
          }
        }

        initToken(code, platform, liffToken, redirectURI)
      })
      .catch(err => {
        console.error('liff init failed', err);
      });
  }, [authAPIRepo, setTokenWithCookie, token]);

  return (
    <AuthContext.Provider value={{ actressID, token, setActressID }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextInterface | null => {
  return useContext(AuthContext)
}