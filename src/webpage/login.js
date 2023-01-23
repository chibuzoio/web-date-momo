import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import { Link } from "react-router-dom";
import icon_person from '../image/icon_person.png';
import google_play_download from '../image/google_play_download.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import Register from '../webpage/register';
import logo from '../image/datemomo.png';

class Login extends React.Component {
	authenticationData = {userName : "",
		password : ""};
	state = {contextData : {
			currentUser : {},
			loginButtonDisplay : "flex",
			loadingPuzzleDisplay : "none"
		}
	};
   
	constructor(props) {
		super(props);
		this.authenticateCurrentUser = this.authenticateCurrentUser.bind(this);
		this.getValue = this.getValue.bind(this);
	}

	componentDidMount() {
/*		axios.get("https://datemomo.com/service/usernamecomposite.php")
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

			this.setState(function(state) {
    			return {contextData : {
		 			currentUser : state.contextData.currentUser,
		 			loginButtonDisplay : "none",
		 			loadingPuzzleDisplay : "flex"
		   		}
		    }}); 

			axios.post("https://datemomo.com/service/loginmember.php", this.authenticationData)
		    	.then(response => {
		    		this.setState(function(state) {
		    			return {contextData : {
				 			currentUser : response.data,
				 			loginButtonDisplay : "flex",
				 			loadingPuzzleDisplay : "none"
				   		}
				    }}); 

		    		if (response.data.authenticated) {
		    			localStorage.setItem("currentUser", JSON.stringify(response.data));
			    		window.location.reload(true);
		    		} else {
		    			localStorage.setItem("currentUser", JSON.stringify({}));
		    		}
		        }, error => {		        	
					this.setState(function(state) {
		    			return {contextData : {
				 			currentUser : state.contextData.currentUser,
				 			loginButtonDisplay : "flex",
				 			loadingPuzzleDisplay : "none"
				   		}
				    }}); 

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
						<div className="fieldLayout bottomMargin">
						    <img className="leftFieldIcon" alt="" src={icon_password} />
						    <input type="password" name="name" 
						    	ref={(passwordInput) => {this.passwordInput = passwordInput}} 
						    	placeholder="Password" />
						</div>
						{/* If you click on this button, fetch data, store it in localStorage and reload */}
						<button 
							className="basicButton fullWidth" 
							style={{display : this.state.contextData.loginButtonDisplay}} 
							onClick={this.authenticateCurrentUser} 
							type="button">Log In</button>
						<div className="progressLoadingLayout" 
							style={{display : this.state.contextData.loadingPuzzleDisplay}}>
							<img className="progressLoadingIcon" src={loading_puzzle} alt="" />
						</div>
						<Link to="register">
							<button className="hollowButton buttonTopMargin fullWidth" type="button">Sign Up</button>
						</Link>
						<a href="https://play.google.com/store/apps/details?id=com.chibuzo.datemomo"> 
							<div className="googlePlayLayout">
								<img className="googlePlayDownload" src={google_play_download} alt="Google Play Download" />
							</div>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;  


