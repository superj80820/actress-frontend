import * as React from 'react'
import LoginCard from "../components/LoginCard";
import { useSearchParams } from 'react-router-dom';


export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const actressID = searchParams.get("actressID")

  return (
    <div className="grid-container">
      <div className="grid-item">
        <LoginCard ActressID={actressID} />
      </div>
    </div>
  )
}
