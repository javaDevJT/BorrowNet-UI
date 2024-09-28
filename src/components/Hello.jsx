import React from 'react'

const Hello = ({name = "World"}) => {
  return (
    <h1 className="text-red-500">Hello {name}!</h1>
  )
}

export default Hello