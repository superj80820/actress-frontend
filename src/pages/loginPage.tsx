import * as React from 'react'
import LoginCard from "../components/LoginCard";
import { useAuth, AuthContextInterface } from '../components/AuthContext';

export default function LoginPage() {
  const { actressID } = useAuth() as AuthContextInterface

  return (
    <div className="grid-container">
      <div className="grid-item">
        <LoginCard ActressID={actressID} />
      </div>
    </div>
  )
}
