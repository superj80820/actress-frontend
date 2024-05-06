import React, { useCallback, useEffect, useState } from 'react'
import GridActresses from "../components/GridActresses";
import Button from "@material-ui/core/Button";
import ActressCard from "../components/ActressCard";
import { useNavigate } from 'react-router-dom';
import { actress, actressAPIRepo } from "../domain/actress";
import { ErrorToken } from '../domain/error';
import { useAuth, AuthContextInterface } from '../components/AuthContext';
import Pagination from '@material-ui/lab/Pagination';

export const Favorites = (prop: { actressAPIRepo: actressAPIRepo }) => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<actress[]>([])
  const { actressID, authInformation } = useAuth() as AuthContextInterface
  const limit = 30
  let page = 1
  const [pageCount, setPageCount] = useState(1)

  const fetchFavorites = useCallback((page: number, limit: number) => {
    if (!authInformation || authInformation.token === null) {
      return
    }
    const token = authInformation.token

    prop.actressAPIRepo.getFavorites(page, limit, token)
      .then(favoriteWithPagination => {
        if (favoriteWithPagination.actresses.length === 0) {
          setFavorites([])
        } else {
          setFavorites(favoriteWithPagination.actresses)
        }
        setPageCount(Math.floor(favoriteWithPagination.total / favoriteWithPagination.limit) + 1)
      })
      .catch(err => {
        if (err instanceof ErrorToken) {
          navigate(`/login?${actressID ? `actressID=${actressID}` : ""}`)
        }
      })
  }, [actressID, authInformation, navigate, prop.actressAPIRepo])

  const onChangePagination = (page: number) => {
    fetchFavorites(page, limit)
  }

  useEffect(() => {
    console.debug("favorite page actressID:" + actressID)

    fetchFavorites(page, limit)
  }, [actressID, fetchFavorites, limit, page])

  return (
    authInformation ? <>
      <GridActresses>
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
                  fetchFavorites(page, limit)
                }}
                fullWidth={true}
                variant="outlined"
              >
                移除我心愛的女孩
              </Button>
            }
          />)) : []
        }
      </GridActresses>
      {pageCount ?
        <div className="grid-item-full-center">
          <Pagination onChange={(_, page) => onChangePagination(page)} count={pageCount} color="secondary" />
        </div>
        :
        <></>
      }
    </>
      :
      <></>
  )
}