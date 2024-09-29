import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <Container
    sx={{ bgcolor: "secondary.main" , padding: 2 }}
    >
      <Outlet/>
    </Container>
  )
}

export default MainLayout