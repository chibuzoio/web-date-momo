import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import { Link } from "react-router-dom";
import icon_person from '../image/icon_person.png';
import LeftIconFormField from '../component/left_icon_form_field';
import google_play_download from '../image/google_play_download.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import BasicButton from '../component/basic_button';
import Register from '../webpage/register';
import logo from '../image/datemomo.png';

class Login extends React.Component {
	passwordEmptyError = "Password field is empty";
	userNameEmptyError = "User name field is empty";
	incorrectCredentialError = "User name or password is incorrect";
	state = {contextData : {
			loginRequestData : {
				userName : "",
				password : ""
			},
			userNameValidity : {
				userNameValid : false,
				errorDisplay : "none"
			}, 
			passwordValidity : {
				passwordValid : false,
				errorDisplay : "none"
			},
			incorrectCredential : {
				errorDisplay : "none"
			},
			loginButtonDisplay : "flex",
			loadingPuzzleDisplay : "none"
		}
	};

	constructor(props) {
		super(props);
		this.authenticateCurrentUser = this.authenticateCurrentUser.bind(this);
		this.updateInputUserName = this.updateInputUserName.bind(this);		
		this.updateInputPassword = this.updateInputPassword.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateUserName = this.validateUserName.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	authenticateCurrentUser(buttonClicked) {
		if (buttonClicked) {
			var passwordValid = this.validatePassword();
			var userNameValid = this.validateUserName();
	          
			if (passwordValid && userNameValid) {
				this.setState(function(state) {
					return {contextData : {
						loginRequestData : state.contextData.loginRequestData,
						userNameValidity : state.contextData.userNameValidity,
						passwordValidity : state.contextData.passwordValidity,
						incorrectCredential : state.contextData.incorrectCredential,
						loginButtonDisplay : "none",
						loadingPuzzleDisplay : "flex"
					}
				}});

				axios.post("https://datemomo.com/service/loginmember.php", this.state.contextData.loginRequestData)
			    	.then(response => {
			    		this.setState(function(state) {
			    			return {contextData : {
								loginRequestData : state.contextData.loginRequestData,
								userNameValidity : state.contextData.userNameValidity,
								passwordValidity : state.contextData.passwordValidity,
								incorrectCredential : state.contextData.incorrectCredential,
					 			loginButtonDisplay : "flex",
					 			loadingPuzzleDisplay : "none"
					   		}
					    }}); 

			    		if (response.data.authenticated) {
			    			localStorage.setItem("currentUser", JSON.stringify(response.data));

			    			var currentUser = response.data;

			    			if (currentUser.authenticated) {
						        if (currentUser.userLevel === "uploadProfilePicture") { 
									window.location.replace("/picture_upload");
						        } else if (currentUser.userLevel === "selectSexualityInterest") { 
									window.location.replace("/sexuality");
						        } else if (currentUser.userLevel === "displayMatchedUsers") { 
						        	window.location.replace("/");
						        } 
						    }          
			    		} else {
			    			localStorage.setItem("currentUser", JSON.stringify({}));

			    			this.setState(function(state) {
				    			return {contextData : {
									loginRequestData : state.contextData.loginRequestData,
									userNameValidity : state.contextData.userNameValidity,
									passwordValidity : state.contextData.passwordValidity,
									incorrectCredential : {
										errorDisplay : "flex"
									},
						 			loginButtonDisplay : state.contextData.loginButtonDisplay,
						 			loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
						   		}
						    }}); 
			    		}
			        }, error => {		        	
						this.setState(function(state) {
			    			return {contextData : {
								loginRequestData : state.contextData.loginRequestData,
								userNameValidity : state.contextData.userNameValidity,
								passwordValidity : state.contextData.passwordValidity,
								incorrectCredential : state.contextData.incorrectCredential,
					 			loginButtonDisplay : "flex",
					 			loadingPuzzleDisplay : "none"
					   		}
					    }}); 

			        	console.log(error);
			        });
			}
		}
	}

	validatePassword() {
		var passwordValid = false;
		var errorDisplayStyle = "none"; 
		var passwordValue = this.state.contextData.loginRequestData.password;
		
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
				incorrectCredential : state.contextData.incorrectCredential,
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return passwordValid;
	}
  
  	validateUserName() {
		var userNameValid = false; 
		var errorDisplayStyle = "none"; 
		var userNameValue = this.state.contextData.loginRequestData.userName;  		
		
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
				incorrectCredential : state.contextData.incorrectCredential,
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return userNameValid;
  	}

  	updateInputPassword(passwordValue, isBlurred) {
  		this.setState(function(state) {
			return {contextData : {
				loginRequestData : {
					userName : state.contextData.loginRequestData.userName,
					password : passwordValue
				},
				userNameValidity : {
					userNameValid : state.contextData.userNameValidity.userNameValid,
					errorDisplay : "none"
				},
				passwordValidity : {
					passwordValid : state.contextData.passwordValidity.passwordValid,
					errorDisplay : "none"
				},
				incorrectCredential : {
					errorDisplay : "none"
				},
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		if (isBlurred) {
			this.validateUserName();
			this.validatePassword();
		}
  	}

  	updateInputUserName(userNameValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : {
					userName : userNameValue.toLowerCase().trim(),
					password : state.contextData.loginRequestData.password					
				},
				userNameValidity : {
					userNameValid : state.contextData.userNameValidity.userNameValid,
					errorDisplay : "none"
				},
				passwordValidity : {
					passwordValid : state.contextData.passwordValidity.passwordValid,
					errorDisplay : "none"
				},
				incorrectCredential : {
					errorDisplay : "none"
				},
				loginButtonDisplay : state.contextData.loginButtonDisplay,
				loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		if (isBlurred) {
			this.validateUserName();
		}
  	}

	render() {      
		var firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			type : "text",
			inputFieldClass : "inputFieldLocal",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var secondFormPartsValue = {
			fieldIcon : icon_password,
			placeholder : "Password",
			label : "Password",
			type : "password",
			inputFieldClass : "inputFieldLocal",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var basicButton = {
			buttonTitle : "Log In",
			buttonClass : "basicButton fullWidth",
			buttonDisplay : this.state.contextData.loginButtonDisplay
		}
     
		return (
			<div className="login"> 
				<div className="loginWidget">
					<img className="logo" alt="Logo" src={logo}/>
					<div className="registerInputLayout">
						<LeftIconFormField onFormValueChange={this.updateInputUserName} formParts={firstFormPartsValue} />
						<div className="inputErrorMessage userNameError" 
							style={{display: this.state.contextData.userNameValidity.errorDisplay}}>
							{this.userNameEmptyError}
						</div>
						<LeftIconFormField onFormValueChange={this.updateInputPassword} formParts={secondFormPartsValue} />
						<div className="inputErrorMessage loginPasswordError" 
							style={{display: this.state.contextData.passwordValidity.errorDisplay}}>
							{this.passwordEmptyError}
						</div>
						{/* If you click on this button, fetch data, store it in localStorage and reload */}
						<BasicButton onButtonClicked={this.authenticateCurrentUser} buttonParts={basicButton} />
						<div className="progressLoadingLayout" 
							style={{display : this.state.contextData.loadingPuzzleDisplay}}>
							<img className="progressLoadingIcon" src={loading_puzzle} alt="" />
						</div>
						<Link to="/register">
							<button className="hollowButton buttonTopMargin fullWidth" type="button">Sign Up</button>
						</Link>
						<div className="inputErrorMessage incorrectCredential"  
							style={{display: this.state.contextData.incorrectCredential.errorDisplay}}>
							{this.incorrectCredentialError}
						</div>
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


