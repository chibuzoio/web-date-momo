import React, { useEffect, useState } from 'react';
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

function Register() {
	var visibleRegisterWidget = "loginWidget";
	var visibleButtonClass = "basicButton fullWidth";
	var visibleTermsConditions = "termsAndConditionsLayout";
	var hiddenButtonClass = visibleButtonClass + " hideComponent";
	var hiddenRegisterWidget = visibleRegisterWidget + " hideComponent";
	var hiddenTermsConditions = visibleTermsConditions + " hideComponent";
	var passwordShortError = "Password is too short";
	var passwordEmptyError = "Password field is empty";
	var userNameShortError = "User name is too short";
	var userNameEmptyError = "User name field is empty";
	var userNameUsedError = "User name is already taken";
	var userNameSpaceError = "User name must not contain space";

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

    var userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

    const [loadingPuzzleDisplay, setLoadingPuzzleDisplay] = useState("none");

    const [registerRequestData, setRegisterRequestData] = useState({
        userName : "",
        password : "",
        userLevel : "uploadProfilePicture",
        userStatus : "Hello dear! Welcome to my profile!"
    });

    const [userNameValidity, setUserNameValidity] = useState({
        userNameError : userNameEmptyError,
        userNameValid : false,
        errorDisplay : "none"
    });

    const [passwordValidity, setPasswordValidity] = useState({
        passwordError : passwordEmptyError,
        passwordValid : false,
        errorDisplay : "none"
    });

    const [registerButtonParts, setRegisterButtonParts] = useState({
        buttonTitle : "Sign Up",
        buttonClass : visibleButtonClass
    });

    const [toggleLayoutDisplay, setToggleLayoutDisplay] = useState({
        registerWidgetClass : visibleRegisterWidget,
        termsConditionsClass : hiddenTermsConditions
    });

    const [privacyConditionHtml, setPrivacyConditionHtml] = useState(parse(""));

    const validatePassword = () => {
        var passwordValid = false;
        var errorDisplayStyle = "none";
        var passwordErrorText = passwordShortError;
        var passwordValue = registerRequestData.password;

        if (passwordValue.length > 4) {
            passwordValid = true;	
        } else {
            errorDisplayStyle = "flex";

            if (!passwordValue) {
                passwordErrorText = passwordEmptyError;
            }
        }

        setPasswordValidity({
            passwordError : passwordErrorText,
            passwordValid : passwordValid,
            errorDisplay : errorDisplayStyle
        });

        return passwordValid;		
    }
    
	const validateUserName = () => {
		var userNameValid = false;
		var userNameErrorText = "";
		var errorDisplayStyle = "none";

		if (registerRequestData.userName.length > 3) {
			userNameValid = true;

			if (registerRequestData.userName.indexOf(" ") > -1) {
				userNameErrorText = userNameSpaceError;
				errorDisplayStyle = "flex";
				userNameValid = false;
			} else {
				if (userDataComposite.registrationData.userNameComposite.indexOf(registerRequestData.userName) > -1) {
					userNameErrorText = userNameUsedError;
					errorDisplayStyle = "flex";
					userNameValid = false;
				} 
			}
		} else {
			errorDisplayStyle = "flex";
			userNameValid = false;
		
			if (!registerRequestData.userName) {
				userNameErrorText = userNameEmptyError;
			} else {
				userNameErrorText = userNameShortError;
			}
		}

        setUserNameValidity({
            userNameError : userNameErrorText,
            userNameValid : userNameValid,
            errorDisplay : errorDisplayStyle
        });

		return userNameValid;
	}

	const updateInputUserName = (userNameValue, isBlurred) => {
        setRegisterRequestData({
            userName : userNameValue.toLowerCase().trim(),
            password : registerRequestData.password,
            userLevel : registerRequestData.userLevel,
            userStatus : registerRequestData.userStatus
        });

        setUserNameValidity({
            userNameError : userNameValidity.userNameError,
            userNameValid : userNameValidity.userNameValid,
            errorDisplay : "none"
        });

        setPasswordValidity({
			passwordError : passwordValidity.passwordError,
            passwordValid : passwordValidity.passwordValid,
            errorDisplay : "none"
        });

        setRegisterButtonParts({
            buttonTitle : "Sign Up",
            buttonClass : visibleButtonClass
        });

        setLoadingPuzzleDisplay("none");
  
		if (isBlurred) {
			validateUserName();
		}
	}

	const updateInputPassword = (passwordValue, isBlurred) => {
        setRegisterRequestData({
            userName : registerRequestData.userName,
            password : passwordValue,
            userLevel : registerRequestData.userLevel,
            userStatus : registerRequestData.userStatus
        });

        setUserNameValidity({
            userNameError : userNameValidity.userNameError,
            userNameValid : userNameValidity.userNameValid,
            errorDisplay : "none"
        });

        setPasswordValidity({
            passwordError : passwordValidity.passwordError,
            passwordValid : passwordValidity.passwordValid,
            errorDisplay : "none"
        });

        setRegisterButtonParts({
            buttonTitle : "Sign Up",
            buttonClass : visibleButtonClass
        });

        setLoadingPuzzleDisplay("none");
       
		if (isBlurred) {
			validateUserName();
			validatePassword();
		}
	}

	const processRegistration = (buttonClicked) => {
		if (buttonClicked) {
			var passwordValid = validatePassword();
			var userNameValid = validateUserName();

			if (passwordValid && userNameValid) {
                setRegisterButtonParts({
                    buttonTitle : "Sign Up",
                    buttonClass : hiddenButtonClass
                });

                setLoadingPuzzleDisplay("flex");
            
				axios.post("http://localhost:1337/registermember", registerRequestData)
			    	.then(response => {   
                        setRegisterButtonParts({
                            buttonTitle : "Sign Up",
                            buttonClass : visibleButtonClass
                        });

                        setLoadingPuzzleDisplay("none");
     
			    		if (response.data.authenticated) {
                            userDataComposite.currentUserData = response.data;

			    			localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

				    		window.location.replace("/picture_upload");
			    		} 
			        }, error => {    
                        setRegisterButtonParts({
                            buttonTitle : "Sign Up",
                            buttonClass : visibleButtonClass
                        });

                        setLoadingPuzzleDisplay("none");

			        	console.log(error);
			        });
			}
		}
	}

	const conditionsClicked = (event) => {
        setPrivacyConditionHtml(parse(userDataComposite.registrationData.termsAndConditionsText));

        setToggleLayoutDisplay({
            registerWidgetClass : hiddenRegisterWidget,
            termsConditionsClass : visibleTermsConditions
        });
	}

	const privacyClicked = (event) => {
        setPrivacyConditionHtml(parse(userDataComposite.registrationData.privacyPolicyText));

        setToggleLayoutDisplay({
            registerWidgetClass : hiddenRegisterWidget,
            termsConditionsClass : visibleTermsConditions
        });
	}

	const closePrivacyCondition = (buttonClicked) => {
		if (buttonClicked) {
            setPrivacyConditionHtml(parse(""));
        
            setToggleLayoutDisplay({
                registerWidgetClass : visibleRegisterWidget,
                termsConditionsClass : hiddenTermsConditions
            });
		}
	}

    return (
        <div className="login">
            <div className={toggleLayoutDisplay.registerWidgetClass}>
                <div className="registerPageHeader">
                    <div className="registerPageTitle">Create Your <br></br>Account</div>
                    <img className="registerPageIcon" alt="Logo" src={logo}/>
                </div>
                <div className="registerInputLayout">
                    <LeftIconFormField onFormValueChange={updateInputUserName} formParts={firstFormPartsValue} />
                    <div className="inputErrorMessage userNameError" 
                        style={{display: userNameValidity.errorDisplay}}>
                        {userNameValidity.userNameError}
                    </div>
                    <LeftIconFormField onFormValueChange={updateInputPassword} formParts={secondFormPartsValue} />
                    <div className="inputErrorMessage passwordError" 
                        style={{display: passwordValidity.errorDisplay}}>
                        {passwordValidity.passwordError}
                    </div>
                </div>
                <BasicButton onButtonClicked={processRegistration} buttonParts={registerButtonParts} />
                <div className="progressLoadingLayout" 
                    style={{display : loadingPuzzleDisplay}}>
                    <img className="progressLoadingIcon" src={loading_puzzle} alt="" />
                </div>
                <div className="termsAndConditionsLabel">
                    By creating account, you agree to our <span className="termsAndConditionsSpan" 
                    onClick={conditionsClicked}>Terms and Conditions</span>, and <span className="termsAndConditionsSpan" 
                    onClick={privacyClicked}>Privacy Policy</span>.
                </div>
            </div>
            <div className={toggleLayoutDisplay.termsConditionsClass}>
                <div className="privacyConditionHtml">{privacyConditionHtml}</div>
                <BasicButton onButtonClicked={closePrivacyCondition} buttonParts={privacyConditionButton} />
            </div>
        </div>
    );
}

export default Register;


