import React from 'react';
import axios from 'axios';
import '../css/login.css';
import LeftIconFormField from '../component/left_icon_form_field'
import BasicButton from '../component/basic_button'
import icon_person from '../image/icon_person.png'
import icon_password from '../image/icon_password.png'
import logo from '../image/datemomo.png';

class Register extends React.Component {
	passwordShortError = "Password is too short";
	passwordEmptyError = "Password field is empty";
	userNameShortError = "User name is too short";
	userNameEmptyError = "User name field is empty";
	userNameUsedError = "User name is already taken";
	userNameSpaceError = "User name must not contain space";
	state = {contextData : {
			userNames : [],
			registerRequestData : {
				userNameValue : "",
				passwordValue : ""
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
			}
		}
	};

	constructor(props) {
		super(props);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateUserName = this.validateUserName.bind(this);
		this.processRegistration = this.processRegistration.bind(this);
		this.updateInputUserName = this.updateInputUserName.bind(this);
		this.updateInputPassword = this.updateInputPassword.bind(this);
	}

	componentDidMount() {
		axios.get("https://datemomo.com/service/usernamecomposite.php")
	      	.then(response => {
	        	this.setState(function(state) {
		        	return {contextData : {
			          	userNames : response.data,
			          	registerRequestData : state.contextData.registerRequestData,
			          	userNameValidity : state.contextData.userNameValidity,
			          	passwordValidity : state.contextData.passwordValidity
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
		var passwordValue = this.state.contextData.registerRequestData.passwordValue;
      
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
				}
			}
		}});

		return passwordValid;		
	}

	validateUserName() {
		var userNameValid = false;
		var userNameErrorText = "";
		var errorDisplayStyle = "none";
		var userNameArray = this.state.contextData.userNames;
		var userNameValue = this.state.contextData.registerRequestData.userNameValue;
    
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
		      	passwordValidity : state.contextData.passwordValidity
			}
		}});

		return userNameValid;
	}

	updateInputUserName(userNameValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : {
					userNameValue : userNameValue.toLowerCase().trim(),
					passwordValue : state.contextData.registerRequestData.passwordValue
				},
				userNameValidity : state.contextData.userNameValidity,
		      	passwordValidity : state.contextData.passwordValidity
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
					userNameValue : state.contextData.registerRequestData.userNameValue,
					passwordValue : passwordValue
				},
				userNameValidity : state.contextData.userNameValidity,
		      	passwordValidity : state.contextData.passwordValidity
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
				// post to the server

			}
		}
	}

	render() {
		var firstFormPartsValue = {
			fieldIcon : icon_person,
			placeholder : "User Name",
			label : "User Name",
			type : "text",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var secondFormPartsValue = {
			fieldIcon : icon_password,
			placeholder : "Password",
			label : "Password",
			type : "password",
			fieldLayoutClass : "fieldLayout",
			fieldIconClass : "leftFieldIcon"
		};

		var basicButton = {
			buttonTitle : "Sign Up",
			buttonClass : "basicButton fullWidth"
		}
 
		return (
			<div className="login">
				<div className="loginWidget">
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
					<BasicButton onButtonClicked={this.processRegistration} buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default Register;  


