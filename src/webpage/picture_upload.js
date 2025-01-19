import React, { useState, useEffect, useRef } from 'react';
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

    var pictureUploadRequest = {
		sex : "",
		memberId : 0,
		userAge : 0,
		imageWidth : 0,
		imageHeight : 0,
		userLevel : "selectSexualityInterest",
		base64Picture : ""
	};

	const MODEL_URL = process.env.PUBLIC_URL + '/models';

    const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

    pictureUploadRequest.memberId = userDataComposite.currentUserData.userInformationData.memberId;

    const selectPictureButton = useRef();

    const [userAgeSexData, setUserAgeSexData] = useState({
        userSex : "", 
        userAge : 0 
    });

    const [pictureUploadData, setPictureUploadData] = useState({
        picture : icon_picture_upload,
        faceCountInPicture : 0,
        imageWidth : 0,
        imageHeight : 0
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
            setUserAgeSexData({
                userSex : "Male",
                userAge : userAgeSexData.userAge
            });

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
            
			pictureUploadRequest.sex = "Male";
			
			validateUploadPicture();

			setTimeout(() => {
				validateUserSex();	
			}, 1000);
		}
	}
    
	const chooseFemaleSex = (buttonClicked) => {
		if (buttonClicked) {
            setUserAgeSexData({
                userSex : "Female",
                userAge : userAgeSexData.userAge
            });

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
            
			pictureUploadRequest.sex = "Female";

			validateUploadPicture();

			setTimeout(() => {
				validateUserSex();	
			}, 1000);
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
			validateUploadPicture();
			validateUserSex();
			validateUserAge();
  
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

                setPictureUploadData({
                    picture : base64String,
                    faceCountInPicture : pictureUploadData.faceCountInPicture,
                    imageWidth : pictureUploadData.imageWidth,
                    imageHeight : pictureUploadData.imageHeight
                });
            
				pictureUploadRequest.base64Picture = 
					base64String.substring(base64String.indexOf("base64,") + 7);
            
				imageData.src = base64String;

				processFaceDetection(imageData);

				imageData.onload = () => {
                    setPictureUploadData({
                        picture : pictureUploadData.picture,
                        faceCountInPicture : pictureUploadData.faceCountInPicture,
                        imageWidth : imageData.width,
                        imageHeight : imageData.height
                    });
                        
    				pictureUploadRequest.imageWidth = imageData.width;
    				pictureUploadRequest.imageHeight = imageData.height;

					setTimeout(() => {
						validateUploadPicture();
					}, 1000);
				};
			};

			imageReader.onerror = (error) => {
				console.log("Error gotten here is: " + error);
			}
		}
	}

	async function processFaceDetection(imageData) {
        var detections = await faceapi.detectAllFaces(imageData, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        .then((response) => {     

            setPictureUploadData({
                picture : pictureUploadData.picture,
                faceCountInPicture : response.length,
                imageWidth : pictureUploadData.imageWidth,
                imageHeight : pictureUploadData.imageHeight
            });
        });
    }

	const validateUserAge = () => {
		var userAgeValidity = {
			errorMessage : ageRequiredError,
			messageLayout : visibleUserAgeError,
			userAgeValid : false
		};
    	
		if (userAgeSexData.userAge < 81 && userAgeSexData.userAge > 18) {
			userAgeValidity.messageLayout = hiddenErrorMessage;
			userAgeValidity.userAgeValid = true;
		}
    
		if (userAgeSexData.userAge < 18 && userAgeSexData.userAge > 0) {
			userAgeValidity.errorMessage = ageMinimumError;
		}

		if (userAgeSexData.userAge > 80) {
			userAgeValidity.errorMessage = ageMaximumError;
		}

        setUserAgeValidity(userAgeValidity);
	}

	const validateUserSex = () => {
		var userSexValidity = {
			errorMessage : userSexValidity.errorMessage,
			messageLayout : visibleErrorMessage,
			userSexValid : false
		}

		if (userAgeSexData.userSex !== "") {
			userSexValidity.messageLayout = hiddenErrorMessage;
			userSexValidity.userSexValid = true;
		}

        setUserSexValidity(userSexValidity);
	}

	const validateUploadPicture = () => {
		var pictureValidity = {
			errorMessage : pictureErrorMessage,
			messageLayout : visibleErrorMessage,
			pictureValid : false
		};

		if (pictureUploadData.imageWidth > 0 && pictureUploadData.imageHeight > 0 
			&& pictureUploadData.faceCountInPicture > 0) {
			pictureValidity.messageLayout = hiddenErrorMessage;
			pictureValidity.pictureValid = true;
		} else {
			if (pictureUploadData.faceCountInPicture <= 0) {
				pictureValidity.errorMessage = noFaceInPictureErrorMessage;
			}      
		}

        setPictureValidity(pictureValidity);
	}

	const updateInputUserAge = (userAgeValue, isBlurred) => {
        setUserAgeSexData({
            userSex : userAgeSexData.userSex,
            userAge : userAgeValue
        });

		pictureUploadRequest.userAge = userAgeValue;

		if (isBlurred) {
			validateUploadPicture();
			validateUserSex();
			validateUserAge();
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


