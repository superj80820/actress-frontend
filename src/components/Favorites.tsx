import React, { useEffect, useState } from 'react'
import GridActresses from "../components/GridActresses";
import Button from "@material-ui/core/Button";
import ActressCard from "../components/ActressCard";
import { useNavigate } from 'react-router-dom';
import { actress, actressAPIRepo } from "../domain/actress";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from '../components/AuthContext';

export const Favorites = (prop: { actressAPIRepo: actressAPIRepo }) => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<actress[]>([])
  const { actressID, authInformation } = useAuth() as AuthContextInterface

  useEffect(() => {
    if (!authInformation || authInformation.token === null) {
      return
    }
    const token = authInformation.token

    console.debug("favorite page actressID:" + actressID);

    (async () => {
      const favorites = await prop.actressAPIRepo.getFavorites(token)
        .catch(err => {
          if (err instanceof ErrorToken) {
            navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
          }
        })
      if (!favorites) {
        setFavorites([])
        return
      }
      setFavorites(favorites)
    })()
  }, [actressID, authInformation, navigate, prop.actressAPIRepo])

  return (
    authInformation ? <GridActresses>
      {
        favorites.length !== 0 ? favorites.map((item) => (<ActressCard
          key={item.id}
          actressID={item.id}
          name={item.name}
          image={item.image}
          romanization={item.romanization}
          children={
            <Button
              onClick={async () => {
                if (!authInformation.token) {
                  return
                }
                await prop.actressAPIRepo.removeFavorite(item.id, authInformation.token)
                  .catch(err => {
                    if (err instanceof ErrorToken) {
                      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
                    }
                  })
                alert("移除成功")
                const favorites = await prop.actressAPIRepo.getFavorites(authInformation.token)
                  .catch(err => {
                    if (err instanceof ErrorToken) {
                      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
                    }
                  })
                if (!favorites) {
                  setFavorites([])
                  return
                }
                setFavorites(favorites);
              }}
              fullWidth={true}
              variant="outlined"
            >
              移除我心愛的女孩
            </Button>
          }
        />)) : []
      }
    </GridActresses> : <></>
  )
}