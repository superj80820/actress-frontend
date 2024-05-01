import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';
import LoginCard from "../components/LoginCard";
import AdCard from "../components/AdCard";
import Bar from "../components/Bar";

export default function HomePage() {
  const navigate = useNavigate()
  const { actressID, token } = useAuth() as AuthContextInterface

  useEffect(() => {
    if (!token.isSet) {
      return
    }

    console.debug("token raw data: ", token.rawData)

    // if (!token.rawData) {
    //   console.log("to login page")
    //   navigate("/login", { replace: true })
    // } else if (actressID) {
    //   console.log("to search page")
    //   navigate("/search", { replace: true })
    // } else {
    //   console.log("to favorite page")
    //   navigate(`/favorite`, { replace: true })
    // }
  }, [actressID, navigate, token])

  return (
    <div className="grid-container">
      <div className="grid-item">
        <Bar />
      </div>
      <div className="grid-item">
        <div className="home-page-container">
          <div className="home-page-content">
            <span>髒沙發！</span>
            <h1>
              全面的女星辨識庫！全心全力幫您找到心愛的女孩
            </h1>
            <p>
              上傳圖片即可辨識獲取女星資訊
            </p>
          </div>
          <div className="home-page">
            {token.rawData === "" ?
              (<LoginCard ActressID={actressID} />)
              :
              (<AdCard />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

