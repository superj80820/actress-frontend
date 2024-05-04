import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthContextInterface } from '../components/AuthContext';
import LoginCard from "../components/LoginCard";
import AdCard from "../components/AdCard";
import Bar from "../components/Bar";

export default function HomePage() {
  const navigate = useNavigate()
  const { actressID, token, platform } = useAuth() as AuthContextInterface

  useEffect(() => {
    if (!token.isSet) {
      return
    }

    console.log("token raw data: ", token.rawData, "platform: ", platform)

    if (token.rawData === "" && platform === "liff") {
      console.log("to login page")
      navigate("/login")
    } else if (token.rawData !== "" && actressID && platform === "liff") {
      console.log("to search page")
      navigate("/imageSearch")
    }
  }, [actressID, navigate, token, platform])

  return (
    <div className="grid-container">
      <div className="grid-item">
        <Bar />
      </div>
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
            {token.rawData === "" ?
              (<LoginCard />)
              :
              (<AdCard />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

