import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import React from 'react'
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import MyProfilePage from './pages/MyProfilePage';


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/edit-profile' element={<EditProfilePage />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </>

    )
  );

  return <RouterProvider router={router} />;
}

export default App