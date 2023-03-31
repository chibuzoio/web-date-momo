import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../css/style.css';
import '../css/header.css';
import '../css/profile.css';
import '../css/picture_upload.css';
import placeholder from '../image/placeholder.jpg'; 
import RoundPicture from '../component/round_picture';
import ActiveMessenger from '../widget/active_messenger';
import LeftMenuSection from '../widget/left_menu_section';
import ProgressAnimation from '../component/progress_animation';
import BottomMenuIcon from '../component/bottom_menu_icon';
import IconProfilePicture from '../component/icon_profile_picture';
import UserGalleryPicture from '../component/user_gallery_picture';
import RightIconFormField from '../component/right_icon_form_field';
import icon_heart_hollow from '../image/icon_heart_hollow.png';
import icon_heart_red from '../image/icon_heart_red.png';
import icon_search from '../image/icon_search.png';
import icon_message_blue from '../image/icon_message_blue.png';
import icon_close_picture from '../image/icon_close_picture.png';
import icon_previous from '../image/icon_previous.png';
import icon_next from '../image/icon_next.png';
import CloseLayoutIcon from '../component/close_layout_icon';
import SexualityBiometrics from '../widget/sexuality_biometrics';
import LeftIconHollowButton from '../component/left_icon_hollow_button';
import motion_placeholder from '../image/motion_placeholder.gif';
import icon_close_white from '../image/icon_close_white.png';
import icon_view_blue from '../image/icon_view_blue.png';
import color_loader from '../image/color_loader.gif';
import logo from '../image/datemomo.png';

function Gallery() {
	var visibleAnimationClass = "colorLoaderLayout";
	var visiblePictureDisplay = "pictureDisplayLayout";
	var visiblePictureBackground = "pictureDisplayBackground";
	var portraitGalleryPicture = "pictureDisplayImage portraitLayout";
	var landscapeGalleryPicture = "pictureDisplayImage landscapeLayout";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var hiddenPictureDisplay = visiblePictureDisplay + " hideComponent";
	var hiddenPictureBackground = visiblePictureBackground + " hideComponent";
	
	var colorLoaderData = {
		animationLayout : "colorLoaderLayout",
		animationImageClass : "colorLoader",
		animationMotionIcon : color_loader
	}

	const params = useParams();
	const userGalleryLayout = useRef();
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const [galleryPictureClass, setGalleryPictureClass] = useState(landscapeGalleryPicture);
	const [pictureDisplayImage, setPictureDisplayImage] = useState({
		pictureDisplayImage : "",
		pictureDisplayLayout : hiddenPictureDisplay,
		pictureDisplayBackground : hiddenPictureBackground,
		picturePosition : -1
	});
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
      
	useEffect(() => {
		setPictureDisplayLayout();
		calculatePictureDimensions();
		window.addEventListener('resize', windowResizeEvents);

		loadGalleryComposite();

		return () => {
			window.removeEventListener('resize', windowResizeEvents);
		};
	}, []);

	const windowResizeEvents = () => {
		calculatePictureDimensions();
		setPictureDisplayLayout();
	}

	const loadGalleryComposite = () => {
		axios.post("https://datemomo.com/service/userpicture.php", requestData)
			.then(response => {
				setUserPictureResponse(response.data);

	            var fourPictureContainer = [];
	            var localGalleryComposite = [];

	            for (var i = 0; i < response.data.length; i++) {
	            	fourPictureContainer.push({
	            		galleryPictureParts : response.data[i],
	            		picturePosition : i
	            	});

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

	const setPictureDisplayLayout = () => {
		if (window.innerWidth > window.innerHeight) {
			setGalleryPictureClass(landscapeGalleryPicture);
		} else {
			setGalleryPictureClass(portraitGalleryPicture);
		}
	}

	const calculatePictureDimensions = () => {
		var browserWidth = userGalleryLayout.current.clientWidth;  
		var sumOfPictureMargins = (8 / 100) * browserWidth;
		var totalPictureWidth = browserWidth - sumOfPictureMargins;
		var eachPictureWidth = totalPictureWidth / 4;
		var eachPictureHeight = 1.1 * eachPictureWidth;

		setUserPictureDimension({
			detailPictureHeight : eachPictureHeight + "px",
			detailPictureWidth : eachPictureWidth + "px"
		});
	}

	const displayGalleryPicture = (picturePosition) => {
		if (picturePosition > -1) {
			setPictureDisplayImage({
				pictureDisplayImage : userPictureResponse[picturePosition].imageName,
				pictureDisplayLayout : visiblePictureDisplay,
				pictureDisplayBackground : visiblePictureBackground,
				picturePosition : picturePosition
			});
		}
	}

	const readPicturePart = (fourPicturePart, index) => {
		var dummyData = {
			galleryPictureParts : {
				imageId : 0,
				imageName : "", 
				imageWidth : 0, 
				imageHeight : 0
			},
			picturePosition : -1
		};

		if (fourPicturePart.length === 1) {
			return (
				<>
					<div className={(index === 0) ? "upperGalleryPadding" : "hideComponent"}></div>
					<div className="firstThreeLikerUsers">
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[0]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
					</div>
				</>
			);
		}

		if (fourPicturePart.length === 2) {
			return (
				<>
					<div className={(index === 0) ? "upperGalleryPadding" : "hideComponent"}></div>
					<div className="firstThreeLikerUsers">
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[0]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[1]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
					</div>
				</>
			);
		}

		if (fourPicturePart.length === 3) {
			return (
				<>
					<div className={(index === 0) ? "upperGalleryPadding" : "hideComponent"}></div>
					<div className="firstThreeLikerUsers">
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[0]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[1]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[2]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={dummyData} dimension={userPictureDimension} />
					</div>
				</>
			);
		}

		if (fourPicturePart.length === 4) {
			return (
				<>
					<div className={(index === 0) ? "upperGalleryPadding" : "hideComponent"}></div>
					<div className="firstThreeLikerUsers">
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[0]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[1]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[2]} dimension={userPictureDimension} />
						<UserGalleryPicture onPictureClicked={displayGalleryPicture} 
							galleryPictureParts={fourPicturePart[3]} dimension={userPictureDimension} />
					</div>
				</>
			);
		}
	}

	const handlePictureClick = (event) => {
		event.stopPropagation();
	}

	const handleLeftSpanClick = (event) => {
		event.stopPropagation();

		if (pictureDisplayImage.picturePosition > 0) {
			setPictureDisplayImage({
				pictureDisplayImage : userPictureResponse[pictureDisplayImage.picturePosition - 1].imageName,
				pictureDisplayLayout : visiblePictureDisplay,
				pictureDisplayBackground : visiblePictureBackground,
				picturePosition : pictureDisplayImage.picturePosition - 1
			});			
		}
	}

	const handleRightSpanClick = (event) => {
		event.stopPropagation();

		if (pictureDisplayImage.picturePosition < (userPictureResponse.length - 1)) {
			setPictureDisplayImage({
				pictureDisplayImage : userPictureResponse[pictureDisplayImage.picturePosition + 1].imageName,
				pictureDisplayLayout : visiblePictureDisplay,
				pictureDisplayBackground : visiblePictureBackground,
				picturePosition : pictureDisplayImage.picturePosition + 1
			});			
		}
	}

	const closePictureLayout = (event) => {
		event.stopPropagation();

		setPictureDisplayImage({
			pictureDisplayImage : pictureDisplayImage.pictureDisplayImage,
			pictureDisplayLayout : hiddenPictureDisplay,
			pictureDisplayBackground : hiddenPictureBackground,
			picturePosition : pictureDisplayImage.picturePosition
		});
	}
 
	return (
		<div className="scrollView outerGalleryLayout" ref={userGalleryLayout}>
			<div className="userGalleryLayout">
				{ 
					userGalleryComposite.map((fourPicturePart, index) => ( 
						readPicturePart(fourPicturePart, index)
					))
				}
			</div>
			<div className={pictureDisplayImage.pictureDisplayBackground}></div>
			<div className={pictureDisplayImage.pictureDisplayLayout} onClick={closePictureLayout}>
				<img className="pictureLayoutIcon pictureLayoutCloser" alt="" src={icon_close_picture} onClick={closePictureLayout} />
				<img className="pictureLayoutIcon previousPictureSelector" alt="" src={icon_previous} onClick={handleLeftSpanClick} />
				<img className="pictureLayoutIcon nextPictureSelector" alt="" src={icon_next} onClick={handleRightSpanClick} />
				<div className="pictureLayoutIcon leftClickableSpan" onClick={handleLeftSpanClick}></div>
				<div className="pictureLayoutIcon rightClickableSpan" onClick={handleRightSpanClick}></div>
				<img className={galleryPictureClass} alt="" src={"https://datemomo.com/client/image/" 
					+ pictureDisplayImage.pictureDisplayImage} onClick={handlePictureClick} />
			</div>
		</div>
	);
}

export default Gallery;   


