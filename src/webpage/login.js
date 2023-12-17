import React from 'react';
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import { Link } from "react-router-dom";
import icon_person from '../image/icon_person.png';
import ProgressAnimation from '../component/progress_animation';
import InputErrorMessage from '../component/input_error_message';
import LeftIconFormField from '../component/left_icon_form_field';
import google_play_download from '../image/google_play_download.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import BasicButton from '../component/basic_button';
import Register from '../webpage/register';
import logo from '../image/datemomo.png';

class Login extends React.Component {
	visibleErrorMessage = "inputErrorMessage ";
	visibleButtonClass = "basicButton fullWidth";
	visibleAnimationClass = "progressLoadingLayout";
	// visibleErrorMessage = "inputErrorMessage userNameError";
	hiddenButtonClass = this.visibleButtonClass + " hideComponent";
	hiddenErrorMessage = this.visibleErrorMessage + " hideComponent";
	hiddenAnimationClass = this.visibleAnimationClass + " hideComponent";
	passwordEmptyError = "Password field is empty";
	userNameEmptyError = "User name field is empty";
	incorrectCredentialError = "User name or password is incorrect";
	state = {contextData : {
		loginRequestData : {
			userName : "",
			password : ""
		},
		loginButtonParts : {
			buttonTitle : "Log In",
			buttonClass : this.visibleButtonClass
		},
		puzzleProgressAnimation : {
			animationLayout : this.hiddenAnimationClass,
			animationImageClass : "progressLoadingIcon",
			animationMotionIcon : loading_puzzle
		},
		inputValidity : {
			userNameValidity : {
				userNameValid : false,
				messageLayout : this.hiddenErrorMessage,
				errorMessage : this.userNameEmptyError
			}, 
			passwordValidity : {
				passwordValid : false,
				messageLayout : this.hiddenErrorMessage,
				errorMessage : this.passwordEmptyError
			},
			credentialValidity : {
				messageLayout : this.hiddenErrorMessage,
				errorMessage : this.incorrectCredentialError
			}
		}
	}};

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
						loginButtonParts : {
							buttonTitle : "Log In",
							buttonClass : this.hiddenButtonClass
						},
						puzzleProgressAnimation : {
							animationLayout : this.visibleAnimationClass,
							animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
							animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
						},
						inputValidity : state.contextData.inputValidity		
					}
				}});

				axios.post("http://localhost:1337/loginmember", this.state.contextData.loginRequestData)
			    	.then(response => {
			    		this.setState(function(state) {
			    			return {contextData : {
								loginRequestData : state.contextData.loginRequestData,
					 			loginButtonParts : {
									buttonTitle : "Log In",
									buttonClass : this.visibleButtonClass
								},
								puzzleProgressAnimation : {
									animationLayout : this.hiddenAnimationClass,
									animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
									animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
								},
								inputValidity : state.contextData.inputValidity
					   		}
					    }}); 

						console.log("The userLevel value from the server here is " + JSON.stringify(response.data.userInformationData.userLevel));
						// console.log("The response value from the server here is " + JSON.stringify(response.data));

						response.data.authenticated = response.data.isPasswordValid;

			    		if (response.data.authenticated) {
			    			localStorage.setItem("currentUser", JSON.stringify(response.data));

			    			var currentUser = response.data;

			    			if (currentUser.authenticated) {
						        if (currentUser.userInformationData.userLevel === "uploadProfilePicture") { 
									window.location.replace("/picture_upload");
						        } else if (currentUser.userInformationData.userLevel === "selectSexualityInterest") { 
									window.location.replace("/sexuality");
						        } else if (currentUser.userInformationData.userLevel === "displayMatchedUsers") { 
									console.log("Execution entered here. So, location must be changed to /: that's homepage");
						        	window.location.replace("/");
						        } 
						    }          
			    		} else {
			    			localStorage.setItem("currentUser", JSON.stringify({}));

			    			this.setState(function(state) {
				    			return {contextData : {
									loginRequestData : state.contextData.loginRequestData,
						 			loginButtonParts : state.contextData.loginButtonParts,
						 			puzzleProgressAnimation : state.contextData.puzzleProgressAnimation,
									inputValidity : {
										userNameValidity : state.contextData.inputValidity.userNameValidity, 
										passwordValidity : state.contextData.inputValidity.passwordValidity,
										credentialValidity : {
											messageLayout : this.visibleErrorMessage,
											errorMessage : state.contextData.inputValidity.credentialValidity.errorMessage
										}
									}
						   		}
						    }}); 
			    		}
			        }, error => {		        	
						this.setState(function(state) {
			    			return {contextData : {
								loginRequestData : state.contextData.loginRequestData,
					 			loginButtonParts : {
									buttonTitle : "Log In",
									buttonClass : this.visibleButtonClass
								},
								puzzleProgressAnimation : {
									animationLayout : this.hiddenAnimationClass,
									animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
									animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
								},
								inputValidity : state.contextData.inputValidity				
					   		}
					    }}); 

			        	console.log(error);
			        });
			}
		}
	}

	validatePassword() {
		var passwordValid = false;
		var passwordErrorStyle = this.hiddenErrorMessage; 
		var passwordValue = this.state.contextData.loginRequestData.password;
		
		if (!passwordValue) {
			passwordErrorStyle = this.visibleErrorMessage;
		} else {
			passwordValid = true;
		}		
   
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : state.contextData.loginRequestData,
				loginButtonParts : state.contextData.loginButtonParts,
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation,
				inputValidity : {
					userNameValidity : state.contextData.inputValidity.userNameValidity, 
					passwordValidity : {
						passwordValid : passwordValid,
						messageLayout : passwordErrorStyle,
						errorMessage : state.contextData.inputValidity.passwordValidity.errorMessage
					},
					credentialValidity : state.contextData.inputValidity.credentialValidity
				}				
			}
		}});

		return passwordValid;
	}
  
  	validateUserName() {
		var userNameValid = false; 
		var userNameErrorStyle = this.hiddenErrorMessage; 
		var userNameValue = this.state.contextData.loginRequestData.userName;  		
		
		if (!userNameValue) {
			userNameErrorStyle = this.visibleErrorMessage;
		} else {
			userNameValid = true;
		}		
  
		this.setState(function(state) {
			return {contextData : {
				loginRequestData : state.contextData.loginRequestData,
				loginButtonParts : state.contextData.loginButtonParts,
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation,
				inputValidity : {
					userNameValidity : {
						userNameValid : userNameValid,
						messageLayout : userNameErrorStyle,
						errorMessage : state.contextData.inputValidity.userNameValidity.errorMessage
					}, 
					passwordValidity : state.contextData.inputValidity.passwordValidity,
					credentialValidity : state.contextData.inputValidity.credentialValidity
				}				
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
				loginButtonParts : state.contextData.loginButtonParts,
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation,
				inputValidity : {
					userNameValidity : {
						userNameValid : false,
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.userNameValidity.errorMessage
					}, 
					passwordValidity : {
						passwordValid : false,
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.passwordValidity.errorMessage
					},
					credentialValidity : {
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.credentialValidity.errorMessage
					}
				}
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
				loginButtonParts : state.contextData.loginButtonParts,
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation,
				inputValidity : {
					userNameValidity : {
						userNameValid : false,
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.userNameValidity.errorMessage
					}, 
					passwordValidity : {
						passwordValid : false,
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.passwordValidity.errorMessage
					},
					credentialValidity : {
						messageLayout : this.hiddenErrorMessage,
						errorMessage : state.contextData.inputValidity.credentialValidity.errorMessage
					}
				}				
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
         
		return (
			<div className="login"> 
				<div className="loginWidget">
					<img className="logo" alt="Logo" src={logo}/>
					<div className="registerInputLayout">
						<LeftIconFormField onFormValueChange={this.updateInputUserName} formParts={firstFormPartsValue} />
						<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.userNameValidity} />
						<LeftIconFormField onFormValueChange={this.updateInputPassword} formParts={secondFormPartsValue} />
						<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.passwordValidity} />
						<BasicButton onButtonClicked={this.authenticateCurrentUser} buttonParts={this.state.contextData.loginButtonParts} />
						<ProgressAnimation animationData={this.state.contextData.puzzleProgressAnimation} />
						<Link to="/register">
							<button className="hollowButton buttonTopMargin fullWidth" type="button">Sign Up</button>
						</Link>
						<InputErrorMessage errorMessageData={this.state.contextData.inputValidity.credentialValidity} />
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


