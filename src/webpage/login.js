import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import { Link } from "react-router-dom";
import icon_person from '../image/icon_person.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_password from '../image/icon_password.png';
import Register from '../webpage/register';
import logo from '../image/datemomo.png';

class Login extends React.Component {
	authenticationData = {userName : "",
		password : ""};
	state = {loginData : {
			currentUser : {}
		}
	};

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
		
		// The binding below is necessary so as to attach 
		// testMethod to the context of this class and for 
		// the method not to appear undefined when called		
		this.authenticateCurrentUser = this.authenticateCurrentUser.bind(this);
		this.getValue = this.getValue.bind(this);
	}

	componentDidMount() {
/*		axios.get("http://datemomo.com/service/usernamecomposite.php")
	    	.then(response => {
	    		this.setState({loginData : {
		    			userNames : response.data,
		    			currentUser : {}
		    		}
	    		});
	        }, error => {
	        	console.log(error);
	        });*/
	}

	componentWillUnmount() {

	}

	authenticateCurrentUser() {
		var localUserName = this.userNameInput.value.trim();
		var localPassword = this.passwordInput.value.trim();
          
		if (localPassword !== "" && localUserName !== "") {
			this.authenticationData = {
				userName : localUserName,
				password : localPassword
			};

			axios.post("http://datemomo.com/service/loginmember.php", this.authenticationData)
		    	.then(response => {
		    		this.setState(function(state) {
		    			return {loginData : {
				 			currentUser : response.data
				   		}
				    }}); 

		    		if (response.data.authenticated) {
		    			localStorage.setItem("currentUser", JSON.stringify(response.data));
			    		window.location.reload(true);
		    		} else {
		    			localStorage.setItem("currentUser", JSON.stringify({}));
		    		}
		        }, error => {
		        	console.log(error);
		        });
		}
	}

	getValue() {

	}
 
	render() {          
		return (
			<div className="login"> 
				<div className="loginWidget">
					<img className="logo" alt="Logo" src={logo}/>
					<div>
						<label>User Name</label>
						<div className="fieldLayout iconMargin">
						    <img className="leftFieldIcon" alt="" src={icon_person} />
						    <input type="text" name="name" 
						    	ref={(userNameInput) => {this.userNameInput = userNameInput}} 
						    	placeholder="User Name" />
						</div>
						<label>Password</label>
						<div className="fieldLayout">
						    <img className="leftFieldIcon" alt="" src={icon_password} />
						    <input type="password" name="name" 
						    	ref={(passwordInput) => {this.passwordInput = passwordInput}} 
						    	placeholder="Password" />
						</div>
						{/* If you click on this button, fetch data, store it in localStorage and reload */}
						<button 
							className="basicButton fullWidth" 
							onClick={this.authenticateCurrentUser} 
							type="button">Log In</button>
						<Link to="register">
							<button className="hollowButton buttonTopMargin fullWidth" type="button">Sign Up</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;  


