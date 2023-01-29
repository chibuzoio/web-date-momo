import React from 'react';           
import axios from 'axios';
import './css/App.css';
import './css/header.css';
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
import PictureUpload from './webpage/picture_upload';
import ProfileEditor from './webpage/profile_editor';
import UserLikerList from './webpage/user_liker_list';
import UserInformation from './webpage/user_information';
import HomePage from './webpage/home_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// { BrowserRouter as Router, Route, Link }

class App extends React.Component {
  state = {currentUser : {}};

  /* Save basic user information in state: 
    memberId, userName, authenticated
  */
  
/*    
  You declare constructor explicitly because 
  you want to initialize state. You initialized 
  state because you want to set state somewhere
  in the class. If not, use data from props directly, 
  without initializing state with it and do not declare 
  the constructor because it's already declared implicitly.
*/    
  constructor(props) {
    super(props);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.displayPage = this.displayPage.bind(this);
  }

  componentDidMount() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser gotten here is " + JSON.stringify(currentUser));

    // update state here 
    this.updateCurrentUser(currentUser);
  }

  componentWillUnmount () {
    
  }

  updateCurrentUser(currentUser) {
    this.setState({currentUser : currentUser});
  }

  displayPage() {
    if (!this.state.currentUser) { 
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      );
    } else {
      if (this.state.currentUser.authenticated) {
        if (this.state.currentUser.userLevel === "uploadProfilePicture") { 
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PictureUpload />} />
                <Route path="picture_upload" element={<PictureUpload />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          );
        } else if (this.state.currentUser.userLevel === "selectSexualityInterest") { 
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Sexuality />} />
                <Route path="sexuality" element={<Sexuality />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          );
        } else if (this.state.currentUser.userLevel === "displayMatchedUsers") { 
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} >
                  <Route index element={<Timeline />} />
                  <Route path="account" element={<Account />} />
                  <Route path="messenger" element={<Messenger />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="user_information" element={<UserInformation />} />
                  <Route path="notification" element={<Notification />} />
                  {/*<Route path="*" element={<EmptyPage />} />*/}
                </Route>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          );
        }
      } else {  
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        );
      }
    } 
  }

  render() {
    return (
      <div> 
        {this.displayPage()}      
      </div>
    );
  }
}
              
export default App;


