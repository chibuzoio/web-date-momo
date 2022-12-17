import React from 'react';
import axios from 'axios';
import '../css/login.css';
import logo from '../image/datemomo.png';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {userNames : []};
	}

	componentDidMount() {
		axios.get("http://datemomo.com/service/usernamecomposite.php")
	    	.then(response => {
	    		this.setState({
	    			userNames : response.data
	    		});
	
				console.log("The value of userNames in Login class here is " + JSON.stringify(this.state.userNames));
	        }, error => {
	        	console.log(error);
	        });
	}

	render() {
		return (
			<div className="login">
				{JSON.stringify(this.state.userNames)}
			</div>
		);
	}
}

export default Login;  


