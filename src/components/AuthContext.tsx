import React, { createContext, useEffect, useContext, ReactNode, useState } from 'react';
import liff from '@line/liff';
import useToken from '../repository/auth-storage';
import { verifyCodeAPIResponse, authAPIRepo } from '../domain/auth';
import { LIFF_ID } from '../config';

export interface AuthContextInterface {
  authInformation: AuthInformation | null

  actressID: string | null

  logout: () => void
}

interface AuthInformation {
  platform: "liff" | "web"
  token: string | null
}

let AuthContext = createContext<AuthContextInterface | null>(null)

const createFetchToken = (authAPIRepo: authAPIRepo) => ({
  byLIFF: async (liffToken: string): Promise<string> => {
    console.log("fetch token by liff")

    const verifyCodeResponse = await authAPIRepo.verifyLIFFToken(liffToken)
    return verifyCodeResponse.accessToken
  },
  byCode: async (): Promise<string> => {
    console.log("fetch token by code")

    const query = new URLSearchParams(window.location.search)
    const code = query.get("code")
    let platform = query.get("platform")
    const linePlatformArgsString = query.get("linePlatformArgs")

    if (linePlatformArgsString) {
      const linePlatformArgs = linePlatformArgsString.split(",")
      if (linePlatformArgs[0]) {
        platform = linePlatformArgs[0]
      }
    }
    let redirectURI = "https://" + window.location.host
    if (linePlatformArgsString) {
      redirectURI += "?linePlatformArgs=" + linePlatformArgsString
    }

    if (!code ||
      !platform ||
      (platform !== "line" && platform !== "discord" && platform !== "telegram")) {
      throw Error("can not get token arguments")
    }

    let verifyCodeResponse: verifyCodeAPIResponse
    switch (platform) {
      case "line":
        if (!code) {
          throw Error("token init not has require arguments")
        }
        verifyCodeResponse = await authAPIRepo.verifyLineCode(code, redirectURI)
        return verifyCodeResponse.accessToken
      case "discord":
        if (!code) {
          throw Error("token init not has require arguments")
        }
        verifyCodeResponse = await authAPIRepo.verifyDiscordCode(code)
        return verifyCodeResponse.accessToken
      case "telegram":
        if (!code) {
          throw Error("token init not has require arguments")
        }
        verifyCodeResponse = await authAPIRepo.verifyTelegramCode(code)
        return verifyCodeResponse.accessToken
    }
  }
})

export const AuthContextProvider = (prop: {
  children: ReactNode | ReactNode[]
  authAPIRepo: authAPIRepo
  env: string
}) => {
  const [actressID, setActressID] = useState<string | null>(null);
  const [authInformation, setAuthInformation] = useState<AuthInformation | null>(null);
  const { token, setTokenWithCookie, removeTokenWithCookie } = useToken()
  const fetchToken = createFetchToken(prop.authAPIRepo)
  const logout = () => {
    setAuthInformation(null)
    removeTokenWithCookie()
  }

  useEffect(() => {
    const setActress = () => {
      console.log("set actress")

      if (actressID !== null) {
        return
      }

      const query = new URLSearchParams(window.location.search)
      let queryActressID = query.get("actressID")
      const linePlatformArgsString = query.get("linePlatformArgs")

      if (queryActressID) {
        setActressID(queryActressID)
      }
      if (linePlatformArgsString) {
        const linePlatformArgs = linePlatformArgsString.split(",")
        if (linePlatformArgs[1]) {
          setActressID(linePlatformArgs[1])
        }
      }
    }
    const setAuth = async () => {
      console.log("set auth")

      if (authInformation !== null) {
        return
      }

      await liff.init({ liffId: LIFF_ID }).catch(err => {
        console.error('liff init failed', err);
      })

      const liffToken = liff.getIDToken()
      const platform = liffToken ? "liff" : "web"

      if (token) {
        setAuthInformation({
          platform: platform,
          token: token
        })
      } else {
        if (liffToken) {
          fetchToken.byLIFF(liffToken)
            .then(token => {
              setTokenWithCookie(token)
              setAuthInformation({
                platform: platform,
                token: token,
              })
            })
            .catch(() => {
              setAuthInformation({
                platform: platform,
                token: null
              })
            })
        } else if (prop.env === "development") {
          setAuthInformation({
            platform: platform,
            token: "development",
          })
        } else {
          fetchToken.byCode()
            .then(token => {
              setTokenWithCookie(token)
              setAuthInformation({
                platform: platform,
                token: token,
              })
            })
            .catch(() => {
              setAuthInformation({
                platform: platform,
                token: null,
              })
            })
        }
      }
    }

    setActress()
    setAuth()
  }, [actressID, authInformation, fetchToken, prop.env, setTokenWithCookie, token]);

  return (
    <AuthContext.Provider value={{ actressID, authInformation, logout }}>
      {prop.children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextInterface | null => {
  return useContext(AuthContext)
}