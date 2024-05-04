import React, { useEffect, useState } from 'react'
import Scroll from "../components/Scroll";
import Button from "@material-ui/core/Button";
import ActressCard from "../components/ActressCard";
import { useNavigate } from 'react-router-dom';
import { actress, actressAPIRepo } from "../domain/actress";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from '../components/AuthContext';

export const Favorites = (prop: { actressAPIRepo: actressAPIRepo }) => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<actress[]>([])
  const { actressID, token } = useAuth() as AuthContextInterface

  useEffect(() => {
    console.debug("favorite page actressID:" + actressID);

    (async (token) => {
      const favorites = await prop.actressAPIRepo.getFavorites(token.rawData)
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
    })(token)
  }, [actressID, token, navigate, prop.actressAPIRepo])

  return (
    <Scroll>
      {
        favorites.length !== 0 ? favorites.map((item) => (<ActressCard
          key={item.id}
          actressID={item.id}
          name={item.name}
          image={item.image}
          children={
            <Button
              onClick={async () => {
                if (!token) {
                  return
                }
                await prop.actressAPIRepo.removeFavorite(item.id, token.rawData)
                  .catch(err => {
                    if (err instanceof ErrorToken) {
                      navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
                    }
                  })
                alert("移除成功")
                const favorites = await prop.actressAPIRepo.getFavorites(token.rawData)
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
    </Scroll>
  )
}