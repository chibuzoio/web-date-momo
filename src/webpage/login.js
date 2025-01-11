import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import icon_person from '../image/icon_person.png';
import ProgressAnimation from '../component/progress_animation';
import InputErrorMessage from '../component/input_error_message';
import LeftIconFormField from '../component/left_icon_form_field';
import google_play_download from '../image/google_play_download.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import BasicButton from '../component/basic_button';
import Register from './register';
import logo from '../image/datemomo.png';

function Login() {
	var visibleErrorMessage = "inputErrorMessage ";
	var visibleButtonClass = "basicButton fullWidth";
	var visibleAnimationClass = "progressLoadingLayout";
	// var visibleErrorMessage = "inputErrorMessage userNameError";
	var hiddenButtonClass = visibleButtonClass + " hideComponent";
	var hiddenErrorMessage = visibleErrorMessage + " hideComponent";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var passwordEmptyError = "Password field is empty";
	var userNameEmptyError = "User name field is empty";
	var incorrectCredentialError = "User name or password is incorrect";

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
     
    const [loginRequestData, setLoginRequestData] = useState({
        userName : "",
        password : ""
    });
    
	const [loginButtonParts, setLoginButtonParts] = useState({
        buttonTitle : "Log In",
        buttonClass : visibleButtonClass
    });

	const [puzzleProgressAnimation, setPuzzleProgressAnimation] = useState({
        animationLayout : hiddenAnimationClass,
        animationImageClass : "progressLoadingIcon",
        animationMotionIcon : loading_puzzle
    });

	const [inputValidity, setInputValidity] = useState({
        userNameValidity : {
            userNameValid : false,
            messageLayout : hiddenErrorMessage,
            errorMessage : userNameEmptyError
        }, 
        passwordValidity : {
            passwordValid : false,
            messageLayout : hiddenErrorMessage,
            errorMessage : passwordEmptyError
        },
        credentialValidity : {
            messageLayout : hiddenErrorMessage,
            errorMessage : incorrectCredentialError
        }
    });

	const validatePassword = () => {
		var passwordValid = false;
		var passwordErrorStyle = hiddenErrorMessage; 
		var passwordValue = loginRequestData.password;
		
		if (!passwordValue) {
			passwordErrorStyle = visibleErrorMessage;
		} else {
			passwordValid = true;
		}		

        setInputValidity({
            userNameValidity : inputValidity.userNameValidity, 
            passwordValidity : {
                passwordValid : passwordValid,
                messageLayout : passwordErrorStyle,
                errorMessage : inputValidity.passwordValidity.errorMessage
            },
            credentialValidity : inputValidity.credentialValidity
        });
    
		return passwordValid;
	}
  
  	const validateUserName = () => {
		var userNameValid = false; 
		var userNameErrorStyle = hiddenErrorMessage; 
		var userNameValue = loginRequestData.userName;  		
		
		if (!userNameValue) {
			userNameErrorStyle = visibleErrorMessage;
		} else {
			userNameValid = true;
		}		
  
        setInputValidity({
            userNameValidity : {
                userNameValid : userNameValid,
                messageLayout : userNameErrorStyle,
                errorMessage : inputValidity.userNameValidity.errorMessage
            }, 
            passwordValidity : inputValidity.passwordValidity,
            credentialValidity : inputValidity.credentialValidity
        });

		return userNameValid;
  	}

  	const updateInputPassword = (passwordValue, isBlurred) => {
        setLoginRequestData({
			userName : loginRequestData.userName,
			password : passwordValue
        });

        setInputValidity({
            userNameValidity : {
                userNameValid : false,
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.userNameValidity.errorMessage
            }, 
            passwordValidity : {
                passwordValid : false,
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.passwordValidity.errorMessage
            },
            credentialValidity : {
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.credentialValidity.errorMessage
            }
        });

		if (isBlurred) {
			validateUserName();
			validatePassword();
		}
  	}

  	const updateInputUserName = (userNameValue, isBlurred) => {
        setLoginRequestData({
			userName : userNameValue.toLowerCase().trim(),
			password : loginRequestData.password					
        });

        setInputValidity({
            userNameValidity : {
                userNameValid : false,
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.userNameValidity.errorMessage
            }, 
            passwordValidity : {
                passwordValid : false,
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.passwordValidity.errorMessage
            },
            credentialValidity : {
                messageLayout : hiddenErrorMessage,
                errorMessage : inputValidity.credentialValidity.errorMessage
            }
        });
        
		if (isBlurred) {
			validateUserName();
		}
  	}

/*     const loadMessengerNotificationData = () => {
        axios.post("http://localhost:1337/usermessengersdata", messengerRequestData)
            .then(response => {
                var localMessengerResponses = checkNullInMessenger(response.data);
                setMessengerResponses(localMessengerResponses);
                setDisplayMessengerClass(visibleMessengerDisplay);
                setNotificationLoader(hiddenEmptyNotification);

                axios.post("http://localhost:1337/usernotifications", messengerRequestData) 
                .then(response => {
                    setNotificationResponses(response.data);
        
                    if (response.data.length <= 0) {
                        setEmptyNotificationLayout(visibleEmptyNotification);
                        setNotificationLoader(hiddenEmptyNotification);
                    }

                    axios.post("http://localhost:1337/alluserdata", messengerRequestData)
                    .then(response => {
                        setEmptyMessengerResponse(response.data);
                        setDisplayMessengerClass(visibleMessengerDisplay);
                        setNotificationLoader(hiddenEmptyNotification);
            
                        // use navigate here instead of location.replace
                        window.location.replace("/");
                    }, error => {
                        console.log(error);
                    });	        
                }, error => {
                    console.log(error);
                });		        
            }, error => {
                console.log(error);
            });
    }
 */
    const authenticateCurrentUser = (buttonClicked) => {
		if (buttonClicked) {
			var passwordValid = validatePassword();
			var userNameValid = validateUserName();
	          
			if (passwordValid && userNameValid) {
                setLoginButtonParts({
                    buttonTitle : "Log In",
                    buttonClass : hiddenButtonClass
                });
                setPuzzleProgressAnimation({
                    animationLayout : visibleAnimationClass,
                    animationImageClass : puzzleProgressAnimation.animationImageClass,
                    animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                });

				axios.post("http://localhost:1337/loginmember", loginRequestData)
			    	.then(response => {
                        setLoginButtonParts({
                            buttonTitle : "Log In",
                            buttonClass : visibleButtonClass
                        });
                        setPuzzleProgressAnimation({
                            animationLayout : hiddenAnimationClass,
                            animationImageClass : puzzleProgressAnimation.animationImageClass,
                            animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                        });
        
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
									// Use useLocation here and store page data in state 

									// loadMessengerNotificationData();
						        } 
						    }          
			    		} else {
			    			localStorage.setItem("currentUser", JSON.stringify({}));

                            setInputValidity({
                                userNameValidity : inputValidity.userNameValidity, 
                                passwordValidity : inputValidity.passwordValidity,
                                credentialValidity : {
                                    messageLayout : visibleErrorMessage,
                                    errorMessage : inputValidity.credentialValidity.errorMessage
                                }
                            });
			    		}
			        }, error => {		        	
                        setLoginButtonParts({
                            buttonTitle : "Log In",
                            buttonClass : visibleButtonClass
                        });

                        setPuzzleProgressAnimation({
                            animationLayout : hiddenAnimationClass,
                            animationImageClass : puzzleProgressAnimation.animationImageClass,
                            animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                        });

			        	console.log(error);
			        });
			}
		}
    }

    return (
        <div className="login"> 
            <div className="loginWidget">
                <img className="logo" alt="Logo" src={logo}/>
                <div className="registerInputLayout">
                    <LeftIconFormField onFormValueChange={updateInputUserName} formParts={firstFormPartsValue} />
                    <InputErrorMessage errorMessageData={inputValidity.userNameValidity} />
                    <LeftIconFormField onFormValueChange={updateInputPassword} formParts={secondFormPartsValue} />
                    <InputErrorMessage errorMessageData={inputValidity.passwordValidity} />
                    <BasicButton onButtonClicked={authenticateCurrentUser} buttonParts={loginButtonParts} />
                    <ProgressAnimation animationData={puzzleProgressAnimation} />
                    <Link to="/register">
                        <button className="hollowButton buttonTopMargin fullWidth" type="button">Sign Up</button>
                    </Link>
                    <InputErrorMessage errorMessageData={inputValidity.credentialValidity} />
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

export default Login;


