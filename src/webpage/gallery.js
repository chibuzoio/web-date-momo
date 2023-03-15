import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/timeline.css';
import '../css/picture_upload.css';
import placeholder from '../image/placeholder.jpg'; 
import RoundPicture from '../component/round_picture';
import ActiveMessenger from '../widget/active_messenger';
import LeftMenuSection from '../widget/left_menu_section';
import ProgressAnimation from '../component/progress_animation';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_search from '../image/icon_search.png';
import icon_message_blue from '../image/icon_message_blue.png';
import CloseLayoutIcon from '../component/close_layout_icon';
import SexualityBiometrics from '../widget/sexuality_biometrics';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import motion_placeholder from '../image/motion_placeholder.gif';
import icon_close_white from '../image/icon_close_white.png';
import icon_view_blue from '../image/icon_view_blue.png';
import color_loader from '../image/color_loader.gif';
import logo from '../image/datemomo.png';

/*
// send data to another page like this: 
const navigate = useNavigate();
navigate('/other-page', { state: { id: 7, color: 'green' } });

// Receive data from another page like this:  
const {state} = useLocation();
const { id, color } = state; // Read values passed on state
*/

function Gallery() {
	var visibleAnimationClass = "colorLoaderLayout";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	
	var colorLoaderData = {
		animationLayout : "colorLoaderLayout",
		animationImageClass : "colorLoader",
		animationMotionIcon : color_loader
	}

	// If useParams does not work with 
	// gallery's router construct, use useLocation
	const params = useParams();
	const userGalleryLayout = useRef();
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [userPictureResponse, setUserPictureResponse] = useState([]);
	const [userGalleryComposite, setUserGalleryComposite] = useState([]);
	const [userPictureDimension, setUserPictureDimension] = useState({
		detailPictureHeight : "0px",
		detailPictureWidth : "0px"
	});

	var requestData = {
        memberId : params.memberId,
        currentPosition : params.position
	};

	console.log("Parameter values gotten in gallery page are memberId = " 
		+ params.memberId + " and currentPosition = " + params.position);
      
	useEffect(() => {
		calculatePictureDimensions();
		window.addEventListener('resize', calculatePictureDimensions);

		loadGalleryComposite();

		return () => {
			window.removeEventListener('resize', calculatePictureDimensions);
		};
	}, []);

	const loadGalleryComposite = () => {
		axios.post("https://datemomo.com/service/userpicture.php", requestData)
			.then(response => {
				setUserPictureResponse(response.data);
/*
				var imageId: Int,
	            var imageWidth: Int,
	            var imageHeight: Int,
	            var imageName: String
*/
	            var fourPictureContainer = [];
	            var localGalleryComposite = [];

	            for (var i = 0; i < response.data.length; i++) {
	            	fourPictureContainer.push(response.data[i]);

	            	if (fourPictureContainer.length > 3) {
	            		localGalleryComposite.push(fourPictureContainer);
	            		fourPictureContainer = [];
	            	}
	            }

	            if (fourPictureContainer.length > 0) {
	            	localGalleryComposite.push(fourPictureContainer);
	            }

				setUserGalleryComposite(localGalleryComposite);
		    }, error => {
		    	console.log(error);
		    });		
	}

	const calculatePictureDimensions = () => {
		var browserWidth = userGalleryLayout.current.clientWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
		var eachPictureHeight = 1.1 * eachPictureWidth;

		// console.log("Execution entered here with browserWidth = " + browserWidth);

		setUserPictureDimension({
			detailPictureHeight : eachPictureHeight + "px",
			detailPictureWidth : eachPictureWidth + "px"
		});
	}

	const readPicturePart = (fourPicturePart) => {
		console.log("The value of fourPicturePart here is " + JSON.stringify(fourPicturePart));
	}

	return (
		<div className="scrollView" ref={userGalleryLayout}>
			{ 
				userGalleryComposite.map((fourPicturePart) => ( 
					readPicturePart(fourPicturePart)
				))
			}
		</div>
	);
}

export default Gallery;   


