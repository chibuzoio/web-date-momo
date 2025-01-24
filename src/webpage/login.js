import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/input.css';
import '../css/login.css';
import '../css/style.css';
import icon_person from '../image/icon_person.png';
import { checkNullInMessenger, selectChosenSticker } from '../utility/utility';
import ProgressAnimation from '../component/progress_animation';
import InputErrorMessage from '../component/input_error_message';
import LeftIconFormField from '../component/left_icon_form_field';
import google_play_download from '../image/google_play_download.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import icon_password from '../image/icon_password.png';
import HollowButton from '../component/hollow_button';
import BasicButton from '../component/basic_button';
import Register from './register';
import logo from '../image/datemomo.png';

function Login() {
    var messengerRequestData = {
        memberId : 0
    };
	var visibleErrorMessage = "inputErrorMessage ";
	var visibleButtonClass = "basicButton fullWidth";
    var visibleHollowButton = "hollowButton fullWidth";
	var visibleAnimationClass = "progressLoadingLayout";
	// var visibleErrorMessage = "inputErrorMessage userNameError";
	var hiddenButtonClass = visibleButtonClass + " hideComponent";
	var hiddenErrorMessage = visibleErrorMessage + " hideComponent";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var passwordEmptyError = "Password field is empty";
	var userNameEmptyError = "User name field is empty";
	var incorrectCredentialError = "User name or password is incorrect";
           
    var userDataComposite = {
        currentUserData : {},
        likedUserComposite : [],
        messengerResponses : [],
        userProfileResponse : {},
        notificationResponses : [],
        timelineDataComposite : {
            homeDisplayResponses : [],
            thousandRandomCounter : []
        },
        emptyMessengerResponse : {
            homeDisplayResponses : [],
		    thousandRandomCounter : []
        },
        registrationData : {
            userNameComposite : [],
            privacyPolicyText : "",
            termsAndConditionsText : ""            
        }       
    };

	var timelineRequestData = {
		memberId : 0,
		age : 0,
		sex : "",
		registrationDate : "",
    	bisexualCategory : 0,
    	gayCategory : 0,
    	lesbianCategory : 0,
    	straightCategory : 0,
    	sugarDaddyCategory : 0,
    	sugarMommyCategory : 0,
    	toyBoyCategory : 0,
    	toyGirlCategory : 0,
    	bisexualInterest : 0,
    	gayInterest : 0,
    	lesbianInterest : 0,
    	straightInterest : 0,
    	friendshipInterest : 0,
    	sugarDaddyInterest : 0,
    	sugarMommyInterest : 0,
    	relationshipInterest : 0,
    	toyBoyInterest : 0,
    	toyGirlInterest : 0,
    	sixtyNineExperience : 0,
    	analSexExperience : 0,
    	givenHeadExperience : 0,
    	missionaryExperience : 0,
    	oneNightStandExperience : 0,
    	orgySexExperience : 0,
    	poolSexExperience : 0,
    	receivedHeadExperience : 0,
    	carSexExperience : 0,
    	publicSexExperience : 0,
    	cameraSexExperience : 0,
    	threesomeExperience : 0,
    	sexToyExperience : 0,
    	videoSexExperience : 0
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

    var signUpHollowButton = {
        buttonTitle : "Sign Up",
        buttonClass : visibleHollowButton
    }

    const navigate = useNavigate();
    
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

    const loadUserNamePrivacyData = () => {
        axios.get("http://localhost:1337/usernamecomposite")
            .then(response => {
                userDataComposite.registrationData.userNameComposite = response.data;

                axios.get("http://localhost:1337/documents/privacy_policy.txt")
                    .then(response => {
                        userDataComposite.registrationData.privacyPolicyText = response.data;

                        axios.get("http://localhost:1337/documents/terms_and_conditions.txt")            
                            .then(response => {
                                userDataComposite.registrationData.termsAndConditionsText = response.data;

                                localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

                                navigate("/register");
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

    const loadMessengerNotificationData = () => {
        axios.post("http://localhost:1337/usermessengersdata", messengerRequestData)
            .then(response => {
                userDataComposite.messengerResponses = checkNullInMessenger(response.data);
                
                axios.post("http://localhost:1337/usernotifications", messengerRequestData) 
                    .then(response => {
                        userDataComposite.notificationResponses = response.data;
                
                        axios.post("http://localhost:1337/alluserdata", messengerRequestData)
                            .then(response => {
                                userDataComposite.emptyMessengerResponse = response.data;
                
                                axios.post("http://localhost:1337/matcheduserdata", timelineRequestData)
                                    .then(response => {
                                        userDataComposite.timelineDataComposite = response.data;
                
                                        localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

                                        setLoginButtonParts({
                                            buttonTitle : "Log In",
                                            buttonClass : visibleButtonClass
                                        });
        
                                        setPuzzleProgressAnimation({
                                            animationLayout : hiddenAnimationClass,
                                            animationImageClass : puzzleProgressAnimation.animationImageClass,
                                            animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                                        });
                                        
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
                    }, error => {
                        console.log(error);
                    });
    }

    const openRegistrationPage = (event) => {
        loadUserNamePrivacyData();
    }

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
			    		if (response.data.authenticated) {
                            userDataComposite.currentUserData = response.data;
                            userDataComposite.currentUserData.authenticated = response.data.authenticated;

                            messengerRequestData.memberId = userDataComposite.currentUserData.userInformationData.memberId;

                            timelineRequestData.memberId = userDataComposite.currentUserData.userInformationData.memberId;
                            timelineRequestData.age = userDataComposite.currentUserData.userInformationData.age;
                            timelineRequestData.sex = userDataComposite.currentUserData.userInformationData.sex;
                            timelineRequestData.registrationDate = userDataComposite.currentUserData.userInformationData.registrationDate;
                            timelineRequestData.bisexualCategory = userDataComposite.currentUserData.userSexualityData.bisexualCategory;
                            timelineRequestData.gayCategory = userDataComposite.currentUserData.userSexualityData.gayCategory;
                            timelineRequestData.lesbianCategory = userDataComposite.currentUserData.userSexualityData.lesbianCategory;
                            timelineRequestData.straightCategory = userDataComposite.currentUserData.userSexualityData.straightCategory;
                            timelineRequestData.sugarDaddyCategory = userDataComposite.currentUserData.userSexualityData.sugarDaddyCategory;
                            timelineRequestData.sugarMommyCategory = userDataComposite.currentUserData.userSexualityData.sugarMommyCategory;
                            timelineRequestData.toyBoyCategory = userDataComposite.currentUserData.userSexualityData.toyBoyCategory;
                            timelineRequestData.toyGirlCategory = userDataComposite.currentUserData.userSexualityData.toyGirlCategory;
                            timelineRequestData.bisexualInterest = userDataComposite.currentUserData.userInterestData.bisexualInterest;
                            timelineRequestData.gayInterest = userDataComposite.currentUserData.userInterestData.gayInterest;
                            timelineRequestData.lesbianInterest = userDataComposite.currentUserData.userInterestData.lesbianInterest;
                            timelineRequestData.straightInterest = userDataComposite.currentUserData.userInterestData.straightInterest;
                            timelineRequestData.friendshipInterest = userDataComposite.currentUserData.userInterestData.friendshipInterest;
                            timelineRequestData.sugarDaddyInterest = userDataComposite.currentUserData.userInterestData.sugarDaddyInterest;
                            timelineRequestData.sugarMommyInterest = userDataComposite.currentUserData.userInterestData.sugarMommyInterest;
                            timelineRequestData.relationshipInterest = userDataComposite.currentUserData.userInterestData.relationshipInterest;
                            timelineRequestData.toyBoyInterest = userDataComposite.currentUserData.userInterestData.toyBoyInterest;
                            timelineRequestData.toyGirlInterest = userDataComposite.currentUserData.userInterestData.toyGirlInterest;
                            timelineRequestData.sixtyNineExperience = userDataComposite.currentUserData.userExperienceData.sixtyNineExperience;
                            timelineRequestData.analSexExperience = userDataComposite.currentUserData.userExperienceData.analSexExperience;
                            timelineRequestData.givenHeadExperience = userDataComposite.currentUserData.userExperienceData.givenHeadExperience;
                            timelineRequestData.missionaryExperience = userDataComposite.currentUserData.userExperienceData.missionaryExperience;
                            timelineRequestData.oneNightStandExperience = userDataComposite.currentUserData.userExperienceData.oneNightStandExperience;
                            timelineRequestData.orgySexExperience = userDataComposite.currentUserData.userExperienceData.orgySexExperience;
                            timelineRequestData.poolSexExperience = userDataComposite.currentUserData.userExperienceData.poolSexExperience;
                            timelineRequestData.receivedHeadExperience = userDataComposite.currentUserData.userExperienceData.receivedHeadExperience;
                            timelineRequestData.carSexExperience = userDataComposite.currentUserData.userExperienceData.carSexExperience;
                            timelineRequestData.publicSexExperience = userDataComposite.currentUserData.userExperienceData.publicSexExperience;
                            timelineRequestData.cameraSexExperience = userDataComposite.currentUserData.userExperienceData.cameraSexExperience;
                            timelineRequestData.threesomeExperience = userDataComposite.currentUserData.userExperienceData.threesomeExperience;
                            timelineRequestData.sexToyExperience = userDataComposite.currentUserData.userExperienceData.sexToyExperience;
                            timelineRequestData.videoSexExperience = userDataComposite.currentUserData.userExperienceData.videoSexExperience;
                            
			    			if (userDataComposite.currentUserData.authenticated) {
						        if (userDataComposite.currentUserData.userInformationData.userLevel === "uploadProfilePicture") { 
									window.location.replace("/picture_upload");
						        } else if (userDataComposite.currentUserData.userInformationData.userLevel === "selectSexualityInterest") { 
									window.location.replace("/sexuality");
						        } else if (userDataComposite.currentUserData.userInformationData.userLevel === "displayMatchedUsers") { 
									loadMessengerNotificationData();
						        } 
						    }          
			    		} else {
                            setInputValidity({
                                userNameValidity : inputValidity.userNameValidity, 
                                passwordValidity : inputValidity.passwordValidity,
                                credentialValidity : {
                                    messageLayout : visibleErrorMessage,
                                    errorMessage : inputValidity.credentialValidity.errorMessage
                                }
                            });

                            setPuzzleProgressAnimation({
                                animationLayout : hiddenAnimationClass,
                                animationImageClass : puzzleProgressAnimation.animationImageClass,
                                animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                            });

                            setLoginButtonParts({
                                buttonTitle : "Log In",
                                buttonClass : visibleButtonClass
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
                    <HollowButton onButtonClicked={openRegistrationPage} buttonParts={signUpHollowButton} />
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


