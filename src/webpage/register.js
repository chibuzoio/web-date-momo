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
				userNameValid : false
			}, 
			passwordValidity : {
				passwordError : this.passwordEmptyError,
				passwordValid : false
			}
		}
	};

	constructor(props) {
		super(props);
		this.validateUserName = this.validateUserName.bind(this);
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
  
	validateUserName() {
		var userNameArray = this.state.contextData.userNames;
		var userNameValue = this.state.contextData.registerRequestData.userNameValue;

		if (userNameArray.indexOf(userNameValue) > -1) {
			// display error message due to userName already existence

		}
	}

	updateInputUserName(userNameValue, isBlurred) {
		this.setState(function(state) {
			return {contextData : {
				userNames : state.contextData.userNames,
				registerRequestData : {
					userNameValue : userNameValue,
					passwordValue : state.contextData.registerRequestData.passwordValue
				}
			}
		}});

		if (isBlurred) {
			// validate userName input			
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
			// validate password input 
		}
	}

	processRegistration(buttonClicked) {
		if (buttonClicked) {
			// check if input fields are filled 
			// check if userName is contained in userNames array in state 			

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
						<LeftIconFormField onFormValueChange={this.updateInputPassword} formParts={secondFormPartsValue} />
					</div>
					<BasicButton onButtonClicked={this.processRegistration} buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default Register;  


