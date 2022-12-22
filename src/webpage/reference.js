class CartridgeShell extends React.Component {

   constructor(props) {
      super(props);
      this.state = {value : ""};

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
   } 
 
   handleChange(e) {
      this.setState({value : e.target.value});
   }

   keyPress(e){
      if(e.keyCode == 13){
         console.log('value', e.target.value);
         // put the login here
      }
   }

   render(){
      return(
         <input value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} fullWidth={true} />
      )
   }
}

ReactDOM.render(<CartridgeShell/>, document.getElementById('app'))


