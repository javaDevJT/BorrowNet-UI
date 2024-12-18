import {
    Route,
    Routes,
    BrowserRouter,
} from 'react-router-dom';
import React from 'react';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import MyProfilePage from './pages/MyProfilePage';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import RateUserPage from './pages/RateUserPage';
import ReportUserPage from './pages/ReportUserPage';
import CreatePostingPage from './pages/CreatePostingPage';
import UserProfileList from "./pages/UserProfileList.jsx";
import SettingsPage from './pages/SettingsPage.jsx';
import MyChatsPage from './pages/MyChatsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import IncomingRequestsPage from './pages/IncomingRequestsPage.jsx';
import MyRequestsPage from './pages/MyRequestsPage.jsx';

const App = () => {
    const store = createStore({
        authName: '_auth',
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'http:' || window.location.protocol === 'https:'
    });

    const BorrowNetRouter = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route element={<AuthOutlet fallbackPath={'/login'}/>}>
                    <Route path='/' element={<MainLayout/>}>
                    <Route path='/profile/:id' element={<ProfilePage/>}/>
                    <Route path='/profile/:profileId/rate' element={<RateUserPage/>}/>
                    <Route path='/profile/:profileId/report' element={<ReportUserPage/>}/>
                    <Route path='/edit-profile' element={<EditProfilePage/>}/>
                    <Route path='/my-profile' element={<MyProfilePage/>}/>
                    <Route path='/my-chats' element={<MyChatsPage/>}/>
                    <Route path='/chat/:profileId' element={<ChatPage/>}/>
                    <Route path='/new-post' element={<CreatePostingPage/>}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                    <Route path='/details/:id' element={<DetailsPage/>}/>
                    <Route path='/incoming-requests' element={<IncomingRequestsPage/>}/>
                    <Route path='/my-requests' element={<MyRequestsPage/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/profiles-public' element={<UserProfileList/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                    </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };

    return <AuthProvider store={store}>
        <BorrowNetRouter/>
    </AuthProvider>;
}

export default App