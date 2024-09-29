import React from 'react'

const ProfileComponent = ({ user }) => {
  return (
    <>
        <h2>{user.first_name} {user.second_name}, {user.age}</h2>
        <p>{user.description}</p>
    </>
  )
}

export default ProfileComponent