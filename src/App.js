import React from 'react';
import axios from 'axios';
import './css/App.css';
import './css/header.css';
import Header from './widget/header';
import Login from './webpage/login';
import Account from './webpage/account';
import Message from './webpage/message';
import Profile from './webpage/profile';
import Register from './webpage/register';
import Messenger from './webpage/messenger';
import Sexuality from './webpage/sexuality';
import Notification from './webpage/notification';
import PictureUpload from './webpage/picture_upload';
import ProfileEditor from './webpage/profile_editor';
import UserLikerList from './webpage/user_liker_list';
import UserInformation from './webpage/user_information';
import HomePage from './webpage/home_page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// { BrowserRouter as Router, Route, Link }

class App extends React.Component {
  
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
  }

  componentDidMount() {
/*    axios.get("http://datemomo.com/service/usernamecomposite.php")
      .then(response => {
        this.setState({
          userNames : response.data
        });
        console.log("The response value from the server here is " + JSON.stringify(response.data));
      }, error => {
        console.log(error);
      });
*/  }

  componentWillUnmount () {
    
  }

  render() {
    /* USE localStorage FOR STORAGE OF PERSISTENT DATA ON THE BROWSER */

    return (
      <div>
        {/* <HomePage /> */}
        {/*<Messenger /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route index element={<HomePage />} />
              {/*<Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />*/}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
              
export default App;


