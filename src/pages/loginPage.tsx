import * as React from 'react'
import LoginCard from "../components/LoginCard";
import Bar from "../components/Bar";

export default function LoginPage() {
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
              <LoginCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
