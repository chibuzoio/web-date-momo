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
	passwordEmptyError = "Password field is empty";
	userNameEmptyError = "User name field is empty";
	state = {contextData : {
			loginRequestData : {
				userNameValue : "",
				passwordValue : ""
			},
			userNameValidity : {
				userNameValid : false,
				errorDisplay : "none"
			}, 
			passwordValidity : {
				passwordValid : false,
				errorDisplay : "none"
			},
			loginButtonDisplay : "flex",
			loadingPuzzleDisplay : "none"
		}
	};

	constructor(props) {
		super(props);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateUserName = this.validateUserName.bind(this);
		this.updateInputPassword = this.updateInputPassword.bind(this);
		this.updateInputUserName = this.updateInputUserName.bind(this);
		this.authenticateCurrentUser = this.authenticateCurrentUser.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	authenticateCurrentUser() {
		var passwordValid = this.validatePassword();
		var userNameValid = this.validateUserName();
          
		if (passwordValid && userNameValid) {
			this.setState(function(state) {
				return {contextData : {
					loginRequestData : state.contextData.loginRequestData,
					userNameValidity : state.contextData.userNameValidity,
					passwordValidity : state.contextData.passwordValidity,
					loginButtonDisplay : "none",
					loadingPuzzleDisplay : "flex"
				}
			}});

			axios.post("https://datemomo.com/service/loginmember.php", this.authenticationData)
		    	.then(response => {
		    		this.setState(function(state) {
		    			return {contextData : {
							loginRequestData : state.contextData.loginRequestData,
							userNameValidity : state.contextData.userNameValidity,
							passwordValidity : state.contextData.passwordValidity,
				 			loginButtonDisplay : "flex",
				 			loadingPuzzleDisplay : "none"
				   		}
				    }}); 

		    		if (response.data.authenticated) {
		    			localStorage.setItem("currentUser", JSON.stringify(response.data));
			    		window.location.reload(true);
		    		} else {
		    			localStorage.setItem("currentUser", JSON.stringify({}));
		    			// display userName or password incorrect error message 
		    		}
		        }, error => {		        	
					this.setState(function(state) {
		    			return {contextData : {
							loginRequestData : state.contextData.loginRequestData,
							userNameValidity : state.contextData.userNameValidity,
							passwordValidity : state.contextData.passwordValidity,
				 			loginButtonDisplay : "flex",
				 			loadingPuzzleDisplay : "none"
				   		}
				    }}); 

		        	console.log(error);
		        });
		}
	}

	validatePassword() {
		var passwordValid = false;
		var errorDisplayStyle = "none"; 
		var passwordValue = this.state.contextData.loginRequestData.passwordValue;
		
		if (!passwordValue) {
			errorDisplayStyle = "flex";
		} else {
			passwordValid = true;
		}		
   
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : state.contextData.loginRequestData,
				userNameValidity : state.contextData.userNameValidity,
				passwordValidity : {
					passwordValid : passwordValid,
					errorDisplay : errorDisplayStyle
				},
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return passwordValid;
	}
  
  	validateUserName() {
		var userNameValid = false; 
		var errorDisplayStyle = "none"; 
		var userNameValue = this.state.contextData.loginRequestData.userNameValue;  		
		
		if (!userNameValue) {
			errorDisplayStyle = "flex";
		} else {
			userNameValid = true;
		}		
  
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : state.contextData.loginRequestData,
				userNameValidity : {
					userNameValid : userNameValid,
					errorDisplay : errorDisplayStyle
				},
				passwordValidity : state.contextData.passwordValidity,
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return userNameValid;
  	}

  	updateInputPassword(event) {
  		this.setState(function(state) {
			return {contextData : {
				loginRequestData : {
					userNameValue : state.contextData.loginRequestData.userNameValue,
					passwordValue : event.target.value
				},
				userNameValidity : state.contextData.userNameValidity,
				passwordValidity : state.contextData.passwordValidity,
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});
  	}

  	updateInputUserName(event) {
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : {
					userNameValue : event.target.value.toLowerCase().trim(),
					passwordValue : state.contextData.loginRequestData.passwordValue					
				},
				userNameValidity : state.contextData.userNameValidity,
				passwordValidity : state.contextData.passwordValidity,
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});
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
						    <input type="text" name="name" onBlur={this.validateUserName} 
						    	onChange={this.updateInputUserName} placeholder="User Name" />
						</div>
						<div className="inputErrorMessage userNameError" 
							style={{display: this.state.contextData.userNameValidity.errorDisplay}}>
							{this.userNameEmptyError}
						</div>
						<label>Password</label>
						<div className="fieldLayout bottomMargin">
						    <img className="leftFieldIcon" alt="" src={icon_password} />
						    <input type="password" name="name" onBlur={this.validatePassword}
						    	onChange={this.updateInputPassword} placeholder="Password" />
						</div>
						<div className="inputErrorMessage passwordError" 
							style={{display: this.state.contextData.passwordValidity.errorDisplay}}>
							{this.passwordEmptyError}
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


