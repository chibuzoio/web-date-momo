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
    var pictureUploadRequest = {
		sex : "",
		memberId : 0,
		userAge : 0,
		imageWidth : 0,
		imageHeight : 0,
		userLevel : "selectSexualityInterest",
		base64Picture : ""
	};

    // userSex : "", // set this one in localStorage data
    // userAge : 0, // set this one in localStorage data

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
        },
        uploadBasicButton : {
            buttonTitle : "Next",
            buttonClass : visibleUploadButton
        }
    });
    
    const [puzzleProgressAnimation, setPuzzleProgressAnimation] = useState({
        animationLayout : hiddenAnimationClass,
        animationImageClass : "progressLoadingIcon",
        animationMotionIcon : loading_puzzle
    });

}

export default PictureUpload;


