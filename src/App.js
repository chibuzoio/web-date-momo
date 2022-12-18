import React from 'react';
import axios from 'axios';
import './css/App.css';
import './css/header.css';
import Header from './component/header'
import Login from './webpage/login'

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


