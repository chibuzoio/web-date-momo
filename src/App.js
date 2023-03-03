import React from 'react';           
import './css/App.css';
import Login from './webpage/login';
import Header from './widget/header';
import Account from './webpage/account';
import Message from './webpage/message';
import Profile from './webpage/profile';
import Timeline from './widget/timeline';
import Register from './webpage/register';
import Messenger from './webpage/messenger';
import Sexuality from './webpage/sexuality';
import Notification from './webpage/notification';
import FaceDetector from './webpage/face_detector';
import PictureUpload from './webpage/picture_upload';
import ProfileEditor from './webpage/profile_editor';
import UserLikerList from './webpage/user_liker_list';
import UserInformation from './webpage/user_information';
import HomePage from './webpage/home_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// { BrowserRouter as Router, Route, Link }

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} >
            <Route index element={<Timeline />} />
            <Route path="account" element={<Account />} />
            <Route path="message" element={<Message />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="user_information" element={<UserInformation />} />
            <Route path="notification" element={<Notification />} />
            <Route path="face_detector" element={<FaceDetector />} />
            {/*<Route path="*" element={<EmptyPage />} />*/}
          </Route>
          <Route path="picture_upload" element={<PictureUpload />} />
          <Route path="sexuality" element={<Sexuality />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
              
export default App;


