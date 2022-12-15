import React from 'react';
import './css/App.css';
import './css/header.css';
import Header from './component/header'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    /* Store state values (That is JSON response data) here */
    this.state = this.getTime();
  }

  componentDidMount() {
    /* Fetch data here and save it in state */
    // let headerSub = new Header();
    this.setTimer();
  }

  componentDidUnmount () {
    
  }

  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    this.setState(this.getTime, this.setTimer);
  }

  getTime() {
    const currentTime = new Date();

    return {
      hours : currentTime.getHours(),
      minutes : currentTime.getMinutes(),
      seconds : currentTime.getSeconds(),
      ampm : currentTime.getHours() >= 12 ? "pm" : "am"
    }
  }

  render() {
    return (
      <Header {...this.state}/>
    );
  }
}
              
export default App;


