import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/login.css';
import '../css/picture_upload.css';
import * as faceapi from 'face-api.js';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import InputErrorMessage from '../component/input_error_message';
import ProgressAnimation from '../component/progress_animation';
import BasicFormField from '../component/basic_form_field';
import BasicButton from '../component/basic_button';
import HollowButton from '../component/hollow_button';
import icon_picture_upload from '../image/icon_picture_upload.png';
import icon_gallery_blue from '../image/icon_gallery_blue.png';
import icon_camera_blue from '../image/icon_camera_blue.png';
import loading_puzzle from '../image/loading_puzzle.gif';
import placeholder from '../image/placeholder.jpg';
import logo from '../image/datemomo.png';

function PictureUpload() {
	var visibleBasicButton = "basicButton fullWidth";
	var visibleHollowButton = "hollowButton fullWidth";
	var visibleErrorMessage = "inputErrorMessage errorMessageAlt";
	var visibleUploadButton = "basicButton customTopMargin fullWidth";
	var visibleAnimationClass = "progressLoadingLayout customTopMargin";
	var visibleFemaleHollowButton = "hollowButton uploadPicture fullWidth";
	var visibleUserAgeError = "inputErrorMessage centerMessage errorMessageAlt";
	var hiddenBasicButton = visibleBasicButton + " hideComponent";
	var hiddenErrorMessage = visibleErrorMessage + " hideComponent";
	var hiddenHollowButton = visibleHollowButton + " hideComponent";
	var hiddenUploadButton = visibleUploadButton + " hideComponent";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var hiddenFemaleHollowButton = visibleFemaleHollowButton + " hideComponent";
	var userSexErrorMessage = "Select your sex";
	var ageRequiredError = "Your age is required";
	var pictureErrorMessage = "Choose picture to upload";
	var ageMaximumError = "Age cannot be greater than 80";
	var ageMinimumError = "You must be 18 years old or older";
	var noFaceInPictureErrorMessage = "The picture you are trying to upload has no human face in it or the face is not bold enough to be detected";

    var takePictureButton = {
        buttonTitle : "Take Picture",
        buttonIcon : icon_camera_blue,
        leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin",
        leftIconHollowButtonIcon : "hollowButtonLeftIcon",
        leftIconHollowButtonTitle : "leftHollowButtonTitle buttonTitleSize"
    }

    var uploadPictureButton = {
        buttonTitle : "Upload Picture",
        buttonIcon : icon_gallery_blue,
        leftIconHollowButtonLayout : "leftIconHollowButton buttonTopMargin uploadPicture",
        leftIconHollowButtonIcon : "hollowButtonLeftIcon",
        leftIconHollowButtonTitle : "leftHollowButtonTitle buttonTitleSize"
    }

    var ageFormField = {
        inputFieldClass : "ageFormField",
        placeholder : "Age",
        type : "number"
    }

	const MODEL_URL = process.env.PUBLIC_URL + '/models';

    const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

    const location = useLocation();
    const selectPictureButton = useRef();

    const [userAgeSexData, setUserAgeSexData] = useState({
        userSex : "", 
        userAge : 0 
    });

    const [faceCountInPicture, setFaceCountInPicture] = useState(0);

    const [pictureUploadData, setPictureUploadData] = useState({
        picture : icon_picture_upload,
        imageHeight : 0,
        imageWidth : 0
    });

    const [pictureValidity, setPictureValidity] = useState({
        errorMessage : pictureErrorMessage,
        messageLayout : hiddenErrorMessage,
        pictureValid : false
    });

    const [userSexValidity, setUserSexValidity] = useState({
        errorMessage : userSexErrorMessage,
        messageLayout : hiddenErrorMessage,
        userSexValid : false
    });

    const [userAgeValidity, setUserAgeValidity] = useState({
		errorMessage : ageRequiredError,
        messageLayout : hiddenErrorMessage,
        userAgeValid : false
    });

    const [pictureUploadRequest, setPictureUploadRequest] = useState({
		sex : "",
		memberId : 0,
		userAge : 0,
		imageWidth : 0,
		imageHeight : 0,
		userLevel : "selectSexualityInterest",
		base64Picture : ""
	});

    const [pictureUploadButtons, setPictureUploadButtons] = useState({
        maleBasicButton : {
            buttonTitle : "Male",
            buttonClass : hiddenBasicButton
        },
        femaleBasicButton : {
            buttonTitle : "Female",
            buttonClass : hiddenBasicButton
        },
        maleHollowButton : {
            buttonTitle : "Male",
            buttonClass : visibleHollowButton
        },
        femaleHollowButton : {
            buttonTitle : "Female",
            buttonClass : visibleFemaleHollowButton
        }
    });
    
    const [uploadBasicButton, setUploadBasicButton] = useState({
        buttonTitle : "Next",
        buttonClass : visibleUploadButton
    });

    const [puzzleProgressAnimation, setPuzzleProgressAnimation] = useState({
        animationLayout : hiddenAnimationClass,
        animationImageClass : "progressLoadingIcon",
        animationMotionIcon : loading_puzzle
    });

	useEffect(() => {
        setPictureUploadRequest({
            sex : pictureUploadRequest.sex,
            memberId : userDataComposite.currentUserData.userInformationData.memberId,
            userAge : pictureUploadRequest.userAge,
            imageWidth : pictureUploadRequest.imageWidth,
            imageHeight : pictureUploadRequest.imageHeight,
            userLevel : pictureUploadRequest.userLevel,
            base64Picture : pictureUploadRequest.base64Picture
        });
                       
		async function loadModels(modelUrl) {
		  	Promise.all([
		    	faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
		    	faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
		    	faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
		    	faceapi.nets.faceExpressionNet.loadFromUri(modelUrl),
		  	]).then(() => {
		  		console.log("Models have been loaded here!!!!");
		  	});
		};

		loadModels(MODEL_URL);
	}, []);

	const chooseMaleSex = (buttonClicked) => {
		if (buttonClicked) {
            var localAgeSexData = {
                userSex : "Male",
                userAge : userAgeSexData.userAge
            };

            setPictureUploadButtons({
                maleBasicButton : {
                    buttonTitle : "Male",
                    buttonClass : visibleBasicButton
                },
                femaleBasicButton : {
                    buttonTitle : "Female",
                    buttonClass : hiddenBasicButton
                },
                maleHollowButton : {
                    buttonTitle : "Male",
                    buttonClass : hiddenHollowButton
                },
                femaleHollowButton : {
                    buttonTitle : "Female",
                    buttonClass : visibleFemaleHollowButton
                }
            });
            
            setPictureUploadRequest({
                sex : "Male",
                memberId : pictureUploadRequest.memberId,
                userAge : pictureUploadRequest.userAge,
                imageWidth : pictureUploadRequest.imageWidth,
                imageHeight : pictureUploadRequest.imageHeight,
                userLevel : pictureUploadRequest.userLevel,
                base64Picture : pictureUploadRequest.base64Picture
            });    

			validateUploadPicture(pictureUploadData);
			validateUserSex(localAgeSexData);	
            validateFaceCountInPicture();
		}
	}
    
	const chooseFemaleSex = (buttonClicked) => {
		if (buttonClicked) {
            var localAgeSexData = {
                userSex : "Female",
                userAge : userAgeSexData.userAge
            };

            setPictureUploadButtons({
                maleBasicButton : {
                    buttonTitle : "Male",
                    buttonClass : hiddenBasicButton
                },
                femaleBasicButton : {
                    buttonTitle : "Female",
                    buttonClass : visibleBasicButton
                },
                maleHollowButton : {
                    buttonTitle : "Male",
                    buttonClass : visibleHollowButton
                },
                femaleHollowButton : {
                    buttonTitle : "Female",
                    buttonClass : hiddenFemaleHollowButton
                }
            });

            setPictureUploadRequest({
                sex : "Female",
                memberId : pictureUploadRequest.memberId,
                userAge : pictureUploadRequest.userAge,
                imageWidth : pictureUploadRequest.imageWidth,
                imageHeight : pictureUploadRequest.imageHeight,
                userLevel : pictureUploadRequest.userLevel,
                base64Picture : pictureUploadRequest.base64Picture
            });
        
			validateUploadPicture(pictureUploadData);
			validateUserSex(localAgeSexData);	
            validateFaceCountInPicture();
		}
	}

	const clickChosenMale = (buttonClicked) => {
		if (buttonClicked) {}
	}

	const clickChosenFemale = (buttonClicked) => {
		if (buttonClicked) {}
	}

	const openSystemGallery = (buttonClicked) => {
		if (buttonClicked) {
			selectPictureButton.current.click();
		}
	}

	const openDeviceCamera = (buttonClicked) => {
		if (buttonClicked) {

		}
	}

	const selectPictureFile = (event) => {
		selectPictureButton.current.click();
	}
  
	const handlePictureUpload = (buttonClicked) => {
		if (buttonClicked) {
			validateUploadPicture(pictureUploadData);
			validateUserSex(userAgeSexData);
			validateUserAge(userAgeSexData);
            validateFaceCountInPicture();
  
			if (pictureValidity.pictureValid && userSexValidity.userSexValid && 
				userAgeValidity.userAgeValid) {
                setUploadBasicButton({
                    buttonTitle : uploadBasicButton.buttonTitle,
                    buttonClass : hiddenUploadButton
                });

                setPuzzleProgressAnimation({
                    animationLayout : visibleAnimationClass,
                    animationImageClass : puzzleProgressAnimation.animationImageClass,
                    animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                });
     
				axios.post("http://localhost:1337/postpicture", pictureUploadRequest)
			    	.then(response => {     
                        setUploadBasicButton({
                            buttonTitle : uploadBasicButton.buttonTitle,
                            buttonClass : visibleUploadButton
                        });
        
                        setPuzzleProgressAnimation({
                            animationLayout : hiddenAnimationClass,
                            animationImageClass : puzzleProgressAnimation.animationImageClass,
                            animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                        });
        
						userDataComposite.currentUserData.userInformationData.userLevel = pictureUploadRequest.userLevel;
						userDataComposite.currentUserData.userInformationData.profilePicture = response.data.profilePicture;
						userDataComposite.currentUserData.userInformationData.age = response.data.age;

						localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));

						window.location.replace("/sexuality");
			        }, error => {    
                        setUploadBasicButton({
                            buttonTitle : uploadBasicButton.buttonTitle,
                            buttonClass : visibleUploadButton
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

	const handlePictureChange = (event) => {
		if (event.target.files[0] != null) {
			var imageReader = new FileReader();
			imageReader.readAsDataURL(event.target.files[0]);

			imageReader.onload = (event) => {
				var imageData = new Image();
				var base64String = event.target.result;

				// console.log("base64String gotten here is " + base64String.substring(5));

				imageData.src = base64String;

				processFaceDetection(imageData);

				imageData.onload = () => {
                    var localPictureUploadData = {
                        picture : base64String,
                        imageWidth : imageData.width,
                        imageHeight : imageData.height
                    };

                    setPictureUploadRequest({
                        sex : pictureUploadRequest.sex,
                        memberId : pictureUploadRequest.memberId,
                        userAge : pictureUploadRequest.userAge,
                        imageWidth : imageData.width,
                        imageHeight : imageData.height,
                        userLevel : pictureUploadRequest.userLevel,
                        base64Picture : base64String.substring(base64String.indexOf("base64,") + 7)
                    });
                       
					validateUploadPicture(localPictureUploadData);
				};
			};

			imageReader.onerror = (error) => {
				console.log("Error gotten here is: " + error);
			}
		}
	}

	async function processFaceDetection(imageData) {
        await faceapi.detectAllFaces(imageData, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        .then((response) => {     
            setFaceCountInPicture(response.length);
        });
    }

    const validateFaceCountInPicture = () => {
        if (faceCountInPicture <= 0) {
            setPictureValidity({
                errorMessage : noFaceInPictureErrorMessage,
                messageLayout : visibleErrorMessage,
                pictureValid : false
            });
        }
    }

	const validateUserAge = (localAgeSexData) => {
		var userAgeValidity = {
			errorMessage : ageRequiredError,
			messageLayout : visibleUserAgeError,
			userAgeValid : false
		};
    	
		if (localAgeSexData.userAge < 81 && localAgeSexData.userAge > 18) {
			userAgeValidity.messageLayout = hiddenErrorMessage;
			userAgeValidity.userAgeValid = true;
		}
    
		if (localAgeSexData.userAge < 18 && localAgeSexData.userAge > 0) {
			userAgeValidity.errorMessage = ageMinimumError;
		}

		if (localAgeSexData.userAge > 80) {
			userAgeValidity.errorMessage = ageMaximumError;
		}

        setUserAgeValidity(userAgeValidity);
        setUserAgeSexData(localAgeSexData);
	}

	const validateUserSex = (localAgeSexData) => {
		var localUserSexValidity = {
			errorMessage : userSexValidity.errorMessage,
			messageLayout : visibleErrorMessage,
			userSexValid : false
		}

		if (localAgeSexData.userSex !== "") {
			localUserSexValidity.messageLayout = hiddenErrorMessage;
			localUserSexValidity.userSexValid = true;
		}

        setUserSexValidity(localUserSexValidity);
        setUserAgeSexData(localAgeSexData);
	}

	const validateUploadPicture = (localPictureUploadData) => {
		var localPictureValidity = {
			errorMessage : pictureErrorMessage,
			messageLayout : visibleErrorMessage,
			pictureValid : false
		};

        if (localPictureUploadData.imageWidth > 0 && localPictureUploadData.imageHeight > 0) {
            localPictureValidity.messageLayout = hiddenErrorMessage;
            localPictureValidity.pictureValid = true;
            console.log("Execution entered the error free zone");
        } 

        setPictureUploadData(localPictureUploadData);
        setPictureValidity(localPictureValidity);
	}

	const updateInputUserAge = (userAgeValue, isBlurred) => {
        var localAgeSexData = {
            userSex : userAgeSexData.userSex,
            userAge : userAgeValue
        };

        setPictureUploadRequest({
            sex : pictureUploadRequest.sex,
            memberId : pictureUploadRequest.memberId,
            userAge : userAgeValue,
            imageWidth : pictureUploadRequest.imageWidth,
            imageHeight : pictureUploadRequest.imageHeight,
            userLevel : pictureUploadRequest.userLevel,
            base64Picture : pictureUploadRequest.base64Picture
        });
           
		if (isBlurred) {
			validateUploadPicture(pictureUploadData);
			validateUserSex(localAgeSexData);
			validateUserAge(localAgeSexData);
            validateFaceCountInPicture();
		}
	}

    return (
        <div className="login">
            <div className="loginWidget">
                <div className="registerPageHeader">
                    <div className="registerPageTitle">Upload Your <br></br>Profile Picture</div>
                    <img className="registerPageIcon" alt="Logo" src={logo}/>
                </div>
                <input type="file" onChange={handlePictureChange} className="uploadPictureButton"
                    ref={selectPictureButton} accept="image/*" />
                <img className="userPicture" onClick={selectPictureFile} alt="" src={pictureUploadData.picture} />
                <div className="pictureButtons customTopMargin">
                    <LeftIconHollowButton onButtonClicked={openDeviceCamera} buttonParts={takePictureButton} />
                    <LeftIconHollowButton onButtonClicked={openSystemGallery} buttonParts={uploadPictureButton} />
                </div>
                <InputErrorMessage errorMessageData={pictureValidity} />
                <div className="sexTitle">Sex</div>
                <div className="pictureButtons">
                    <div className="maleSexButtons">
                        <HollowButton onButtonClicked={chooseMaleSex} 
                            buttonParts={pictureUploadButtons.maleHollowButton} />
                        <BasicButton onButtonClicked={clickChosenMale} 
                            buttonParts={pictureUploadButtons.maleBasicButton} />
                    </div>
                    <div className="femaleSexButtons">
                        <HollowButton onButtonClicked={chooseFemaleSex} 
                            buttonParts={pictureUploadButtons.femaleHollowButton} />
                        <BasicButton onButtonClicked={clickChosenFemale} 
                            buttonParts={pictureUploadButtons.femaleBasicButton} />
                    </div>
                </div>
                <InputErrorMessage errorMessageData={userSexValidity} />
                <div className="ageFormLayout">
                    <div className="ageFormTitle">Age</div>
                    <BasicFormField onFormValueChange={updateInputUserAge} formParts={ageFormField} />
                </div>
                <InputErrorMessage errorMessageData={userAgeValidity} />
                <BasicButton onButtonClicked={handlePictureUpload} buttonParts={uploadBasicButton} />
                <ProgressAnimation animationData={puzzleProgressAnimation} />
            </div>
        </div>
    );
}

export default PictureUpload;


