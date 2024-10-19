import React from 'react'
import useAuthUser from "react-auth-kit/hooks/useAuthUser";



const HomePage = () => {
  const authUser = useAuthUser()
  console.log(authUser.firstName)
  return (
    <div>Hello, {authUser.firstName}</div>
  )
}

export default HomePage