import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/style.css';
import parse from 'html-react-parser';
import LeftIconFormField from '../component/left_icon_form_field';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import BasicButton from '../component/basic_button';
import icon_person from '../image/icon_person.png';
import logo from '../image/datemomo.png';

class Register extends React.Component {
	visibleRegisterWidget = "loginWidget";
	visibleButtonClass = "basicButton fullWidth";
	visibleTermsConditions = "termsAndConditionsLayout";
	hiddenButtonClass = this.visibleButtonClass + " hideComponent";
	hiddenRegisterWidget = this.visibleRegisterWidget + " hideComponent";
	hiddenTermsConditions = this.visibleTermsConditions + " hideComponent";
	passwordShortError = "Password is too short";
	passwordEmptyError = "Password field is empty";
	userNameShortError = "User name is too short";
	userNameEmptyError = "User name field is empty";
	userNameUsedError = "User name is already taken";
	userNameSpaceError = "User name must not contain space";
	state = {contextData : {
			userNames : [],
			registerRequestData : {
				userName : "",
				password : "",
				userLevel : "uploadProfilePicture",
				userStatus : "Hello dear! Welcome to my profile!"
			},
			userNameValidity : {
				userNameError : this.userNameEmptyError,
				userNameValid : false,
				errorDisplay : "none"
			}, 
			passwordValidity : {
				passwordError : this.passwordEmptyError,
				passwordValid : false,
				errorDisplay : "none"
			},
			registerButtonParts : {
				buttonTitle : "Sign Up",
				buttonClass : this.visibleButtonClass
			},
			toggleLayoutDisplay : {
				privacyConditionHtml : parse(""),
				privacyPolicyText : "",
				termsConditionsText : "",
				registerWidgetClass : this.visibleRegisterWidget,
				termsConditionsClass : this.hiddenTermsConditions
			},
			loadingPuzzleDisplay : "none"
		}
	};

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
		this.privacyClicked = this.privacyClicked.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateUserName = this.validateUserName.bind(this);
		this.conditionsClicked = this.conditionsClicked.bind(this);
		this.processRegistration = this.processRegistration.bind(this);
		this.updateInputUserName = this.updateInputUserName.bind(this);
		this.updateInputPassword = this.updateInputPassword.bind(this);
		this.closePrivacyCondition = this.closePrivacyCondition.bind(this);
	}

	componentDidMount() {
		axios.get("https://datemomo.com/service/usernamecomposite.php")
	      	.then(response => {
	        	this.setState(function(state) {
		        	return {contextData : {
			          	userNames : response.data,
			          	registerRequestData : state.contextData.registerRequestData,
			          	userNameValidity : state.contextData.userNameValidity,
			          	passwordValidity : state.contextData.passwordValidity,
			          	registerButtonParts : state.contextData.registerButtonParts,
			          	toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
			          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
		          	}
		        }});
	      	}, error => {
	        	console.log(error);
	      	});

		axios.get("https://datemomo.com/service/privacy_policy.php")
	      	.then(response => {
				this.setState(function(state) {
			    	return {contextData : {
			          	userNames : state.contextData.userNames,
			          	registerRequestData : state.contextData.registerRequestData,
			          	userNameValidity : state.contextData.userNameValidity,
			          	passwordValidity : state.contextData.passwordValidity,
			          	registerButtonParts : state.contextData.registerButtonParts,
						toggleLayoutDisplay : {
							privacyConditionHtml : state.contextData.toggleLayoutDisplay.privacyConditionHtml,
							privacyPolicyText : response.data,
							termsConditionsText : state.contextData.toggleLayoutDisplay.termsConditionsText,
							registerWidgetClass : state.contextData.toggleLayoutDisplay.registerWidgetClass,
							termsConditionsClass : state.contextData.toggleLayoutDisplay.termsConditionsClass
						},
			          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			      	}
			    }});
	      	}, error => {
	        	console.log(error);
	      	});

		axios.get("https://datemomo.com/service/terms_and_conditions.php")
	      	.then(response => {
				this.setState(function(state) {
			    	return {contextData : {
			          	userNames : state.contextData.userNames,
			          	registerRequestData : state.contextData.registerRequestData,
			          	userNameValidity : state.contextData.userNameValidity,
			          	passwordValidity : state.contextData.passwordValidity,
			          	registerButtonParts : state.contextData.registerButtonParts,
						toggleLayoutDisplay : {
							privacyConditionHtml : state.contextData.toggleLayoutDisplay.privacyConditionHtml,
							privacyPolicyText : state.contextData.toggleLayoutDisplay.privacyPolicyText,
							termsConditionsText : response.data,
							registerWidgetClass : state.contextData.toggleLayoutDisplay.registerWidgetClass,
							termsConditionsClass : state.contextData.toggleLayoutDisplay.termsConditionsClass
						},
			          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			      	}
			    }});
	      	}, error => {
	        	console.log(error);
	      	});
	}

	componentWillUnmount() {

	}
  
	validatePassword() {
		var passwordValid = false;
		var errorDisplayStyle = "none";
		var passwordErrorText = this.passwordShortError;
		var passwordValue = this.state.contextData.registerRequestData.password;

		if (passwordValue.length > 4) {
			passwordValid = true;	
		} else {
			errorDisplayStyle = "flex";

			if (!passwordValue) {
				passwordErrorText = this.passwordEmptyError;
			}
		}

		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : state.contextData.registerRequestData,
				userNameValidity : state.contextData.userNameValidity,
		      	passwordValidity : {
					passwordError : passwordErrorText,
					passwordValid : passwordValid,
					errorDisplay : errorDisplayStyle
				},
	          	registerButtonParts : state.contextData.registerButtonParts,
	          	toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
	          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return passwordValid;		
	}

	validateUserName() {
		var userNameValid = false;
		var userNameErrorText = "";
		var errorDisplayStyle = "none";
		var userNameArray = this.state.contextData.userNames;
		var userNameValue = this.state.contextData.registerRequestData.userName;

		if (userNameValue.length > 3) {
			userNameValid = true;

			if (userNameValue.indexOf(" ") > -1) {
				userNameErrorText = this.userNameSpaceError;
				errorDisplayStyle = "flex";
				userNameValid = false;
			} else {
				if (userNameArray.indexOf(userNameValue) > -1) {
					userNameErrorText = this.userNameUsedError;
					errorDisplayStyle = "flex";
					userNameValid = false;
				} 
			}
		} else {
			errorDisplayStyle = "flex";
			userNameValid = false;
		
			if (!userNameValue) {
				userNameErrorText = this.userNameEmptyError;
			} else {
				userNameErrorText = this.userNameShortError;
			}
		}

		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : state.contextData.registerRequestData,
				userNameValidity : {
					userNameError : userNameErrorText,
					userNameValid : userNameValid,
					errorDisplay : errorDisplayStyle
				},
		      	passwordValidity : state.contextData.passwordValidity,
	          	registerButtonParts : state.contextData.registerButtonParts,
	          	toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
	          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
			}
		}});

		return userNameValid;
	}

	updateInputUserName(userNameValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : {
					userName : userNameValue.toLowerCase().trim(),
					password : state.contextData.registerRequestData.password,
					userLevel : state.contextData.registerRequestData.userLevel,
					userStatus : state.contextData.registerRequestData.userStatus
				},
				userNameValidity : {
					userNameError : state.contextData.userNameValidity.userNameError,
					userNameValid : state.contextData.userNameValidity.userNameValid,
					errorDisplay : "none"
				}, 
				passwordValidity : {
					passwordError : state.contextData.passwordValidity.passwordError,
					passwordValid : state.contextData.passwordValidity.passwordValid,
					errorDisplay : "none"
				},
	          	registerButtonParts : {
					buttonTitle : "Sign Up",
					buttonClass : this.visibleButtonClass
				},
				toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
	          	loadingPuzzleDisplay : "none"
			}
		}});

		if (isBlurred) {
			this.validateUserName();
		}
	}

	updateInputPassword(passwordValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : {
					userName : state.contextData.registerRequestData.userName,
					password : passwordValue,
					userLevel : state.contextData.registerRequestData.userLevel,
					userStatus : state.contextData.registerRequestData.userStatus
				},
				userNameValidity : {
					userNameError : state.contextData.userNameValidity.userNameError,
					userNameValid : state.contextData.userNameValidity.userNameValid,
					errorDisplay : "none"
				}, 
				passwordValidity : {
					passwordError : state.contextData.passwordValidity.passwordError,
					passwordValid : state.contextData.passwordValidity.passwordValid,
					errorDisplay : "none"
				},
	          	registerButtonParts : {
					buttonTitle : "Sign Up",
					buttonClass : this.visibleButtonClass
				},
				toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
	          	loadingPuzzleDisplay : "none"
			}
		}});
       
		if (isBlurred) {
			this.validateUserName();
			this.validatePassword();
		}
	}

	processRegistration(buttonClicked) {
		if (buttonClicked) {
			var passwordValid = this.validatePassword();
			var userNameValid = this.validateUserName();

			if (passwordValid && userNameValid) {
        		this.setState(function(state) {
		        	return {contextData : {
			          	userNames : state.contextData.userNames,
			          	registerRequestData : state.contextData.registerRequestData,
			          	userNameValidity : state.contextData.userNameValidity,
			          	passwordValidity : state.contextData.passwordValidity,
			          	registerButtonParts : {
							buttonTitle : "Sign Up",
							buttonClass : this.hiddenButtonClass
						},
						toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
			          	loadingPuzzleDisplay : "flex"
		          	}
		        }});

				axios.post("https://datemomo.com/service/registermember.php", this.state.contextData.registerRequestData)
			    	.then(response => {   
		        		this.setState(function(state) {
				        	return {contextData : {
					          	userNames : state.contextData.userNames,
					          	registerRequestData : state.contextData.registerRequestData,
					          	userNameValidity : state.contextData.userNameValidity,
					          	passwordValidity : state.contextData.passwordValidity,
					          	registerButtonParts : {
									buttonTitle : "Sign Up",
									buttonClass : this.visibleButtonClass
								},
								toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
					          	loadingPuzzleDisplay : "none"
				          	}
				        }});

			    		if (response.data.authenticated) {
			    			localStorage.setItem("currentUser", JSON.stringify(response.data));
				    		window.location.replace("/picture_upload");
			    		} else {
			    			localStorage.setItem("currentUser", JSON.stringify({}));           
			    		}
			        }, error => {    
		        		this.setState(function(state) {
				        	return {contextData : {
					          	userNames : state.contextData.userNames,
					          	registerRequestData : state.contextData.registerRequestData,
					          	userNameValidity : state.contextData.userNameValidity,
					          	passwordValidity : state.contextData.passwordValidity,
					          	registerButtonParts : {
									buttonTitle : "Sign Up",
									buttonClass : this.visibleButtonClass
								},
								toggleLayoutDisplay : state.contextData.toggleLayoutDisplay,
					          	loadingPuzzleDisplay : "none"
				          	}
				        }});

			        	console.log(error);
			        });
			}
		}
	}

	conditionsClicked(event) {
		this.setState(function(state) {
	    	return {contextData : {
	          	userNames : state.contextData.userNames,
	          	registerRequestData : state.contextData.registerRequestData,
	          	userNameValidity : state.contextData.userNameValidity,
	          	passwordValidity : state.contextData.passwordValidity,
	          	registerButtonParts : state.contextData.registerButtonParts,
				toggleLayoutDisplay : {
					privacyConditionHtml : parse(state.contextData.toggleLayoutDisplay.termsConditionsText),
					privacyPolicyText : state.contextData.toggleLayoutDisplay.privacyPolicyText,
					termsConditionsText : state.contextData.toggleLayoutDisplay.termsConditionsText,
					registerWidgetClass : this.hiddenRegisterWidget,
					termsConditionsClass : this.visibleTermsConditions
				},
	          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
	      	}
	    }});
	}

	privacyClicked(event) {
		this.setState(function(state) {
	    	return {contextData : {
	          	userNames : state.contextData.userNames,
	          	registerRequestData : state.contextData.registerRequestData,
	          	userNameValidity : state.contextData.userNameValidity,
	          	passwordValidity : state.contextData.passwordValidity,
	          	registerButtonParts : state.contextData.registerButtonParts,
				toggleLayoutDisplay : {
					privacyConditionHtml : parse(state.contextData.toggleLayoutDisplay.privacyPolicyText),
					privacyPolicyText : state.contextData.toggleLayoutDisplay.privacyPolicyText,
					termsConditionsText : state.contextData.toggleLayoutDisplay.termsConditionsText,
					registerWidgetClass : this.hiddenRegisterWidget,
					termsConditionsClass : this.visibleTermsConditions
				},
	          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
	      	}
	    }});
	}

	closePrivacyCondition(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
		    	return {contextData : {
		          	userNames : state.contextData.userNames,
		          	registerRequestData : state.contextData.registerRequestData,
		          	userNameValidity : state.contextData.userNameValidity,
		          	passwordValidity : state.contextData.passwordValidity,
		          	registerButtonParts : state.contextData.registerButtonParts,
					toggleLayoutDisplay : {
						privacyConditionHtml : state.contextData.toggleLayoutDisplay.privacyConditionHtml,
						privacyPolicyText : state.contextData.toggleLayoutDisplay.privacyPolicyText,
						termsConditionsText : state.contextData.toggleLayoutDisplay.termsConditionsText,
						registerWidgetClass : this.visibleRegisterWidget,
						termsConditionsClass : this.hiddenTermsConditions
					},
		          	loadingPuzzleDisplay : state.contextData.loadingPuzzleDisplay
		      	}
		    }});			
		}
	}

	render() {
		var privacyConditionButton = {
			buttonTitle : "Done",
			buttonClass : "basicButton"
		};

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
				<div className={this.state.contextData.toggleLayoutDisplay.registerWidgetClass}>
					<div className="registerPageHeader">
						<div className="registerPageTitle">Create Your <br></br>Account</div>
						<img className="registerPageIcon" alt="Logo" src={logo}/>
					</div>
					<div className="registerInputLayout">
						<LeftIconFormField onFormValueChange={this.updateInputUserName} formParts={firstFormPartsValue} />
						<div className="inputErrorMessage userNameError" 
							style={{display: this.state.contextData.userNameValidity.errorDisplay}}>
							{this.state.contextData.userNameValidity.userNameError}
						</div>
						<LeftIconFormField onFormValueChange={this.updateInputPassword} formParts={secondFormPartsValue} />
						<div className="inputErrorMessage passwordError" 
							style={{display: this.state.contextData.passwordValidity.errorDisplay}}>
							{this.state.contextData.passwordValidity.passwordError}
						</div>
					</div>
					<BasicButton onButtonClicked={this.processRegistration} buttonParts={this.state.contextData.registerButtonParts} />
					<div className="progressLoadingLayout" 
						style={{display : this.state.contextData.loadingPuzzleDisplay}}>
						<img className="progressLoadingIcon" src={loading_puzzle} alt="" />
					</div>
					<div className="termsAndConditionsLabel">
						By creating account, you agree to our <span className="termsAndConditionsSpan" 
						onClick={this.conditionsClicked}>Terms and Conditions</span>, and <span className="termsAndConditionsSpan" 
						onClick={this.privacyClicked}>Privacy Policy</span>.
					</div>
				</div>
				<div className={this.state.contextData.toggleLayoutDisplay.termsConditionsClass}>
					<div className="privacyConditionHtml">{this.state.contextData.toggleLayoutDisplay.privacyConditionHtml}</div>
					<BasicButton onButtonClicked={this.closePrivacyCondition} buttonParts={privacyConditionButton} />
				</div>
			</div>
		);
	}
}

export default Register;  


