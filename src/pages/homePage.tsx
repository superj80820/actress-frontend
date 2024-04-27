import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';

export default function HomePage() {
  const navigate = useNavigate()
  const { actressID, token } = useAuth() as AuthContextInterface

  useEffect(() => {
    if (!token.isSet) {
      return
    }

    console.debug("token raw data: ", token.rawData)

    if (!token.rawData) {
      console.log("to login page")
      navigate("/login", { replace: true })
    } else if (actressID) {
      console.log("to search page")
      navigate("/search", { replace: true })
    } else {
      console.log("to favorite page")
      navigate(`/favorite`, { replace: true })
    }
  }, [actressID, navigate, token])

  return (<></>)
}

