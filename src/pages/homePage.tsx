import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';
import LoginCard from "../components/LoginCard";
import AdCard from "../components/AdCard";
import Bar from "../components/Bar";

export default function HomePage() {
  const navigate = useNavigate()
  const { actressID, authInformation } = useAuth() as AuthContextInterface

  useEffect(() => {
    if (authInformation === null) {
      return
    }

    console.log("platform: ", authInformation.platform, "token:", authInformation.token)

    if (authInformation.token === null && authInformation.platform !== "liff") {
      console.log("to login page")
      navigate("/login")
    } else if (authInformation.token !== null && actressID) {
      console.log("to search page")
      navigate("/imageSearch")
    }
  }, [actressID, authInformation, navigate])

  return (
    <>
      <Bar />
      <div className="grid-container">
        <div className="grid-item">
          <div className="home-page-container">
            <div className="home-page-content">
              <span>真心為您！</span>
              <h1>
                髒沙發！全面的女星人臉辨識庫！努力為您找到心愛的女孩
              </h1>
              <p>
                上傳圖片即可人臉辨識獲取女星資訊
              </p>
            </div>
            <div className="home-page">
              {authInformation?.token === null ?
                (<LoginCard />)
                :
                (<AdCard />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

