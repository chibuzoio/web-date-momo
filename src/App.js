import React from 'react';
import axios from 'axios';
import './css/App.css';
import './css/header.css';
import Header from './component/header'
import Login from './component/login'

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // axios.get("http://datemomo.com/service/usernamecomposite.php")
      // .then(response => {
        // this.setState({
          // userNames : response.data
        // });
        // console.log("The response value from the server here is " + JSON.stringify(response.data));
      // }, error => {
        // console.log(error);
      // });
  }

  componentWillUnmount () {
    
  }

  render() {
    return (
      <Login />
    );
  }
}
              
export default App;


