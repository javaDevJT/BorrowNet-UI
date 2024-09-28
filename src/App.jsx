import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import React from 'react'
import Hello from './components/Hello'


const App = () => {
  return (
    <>
      <Hello name="Marta and Riccardo"/>
      <Hello />
    </>

  )
}

export default App