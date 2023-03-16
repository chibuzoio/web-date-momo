import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/profile.css';

function UserGalleryPicture(props) {
	var visiblePictureImage = "detailPictureImage";
	var hiddenPictureImage = visiblePictureImage + " hideComponent";

	const [pictureImageClass, setPictureImageClass] = useState(visiblePictureImage);

	useEffect(() => {
		if (props.galleryPictureParts.galleryPictureParts.imageName === "") {
			setPictureImageClass(hiddenPictureImage);
		} 
	}, []);

	const handlePictureClick = (event) => {
		props.onPictureClicked(props.galleryPictureParts.picturePosition);
	}

	return (
		<div className="detailPictureLayout" style={{
			height : props.dimension.detailPictureHeight,
			width : props.dimension.detailPictureWidth}} 
			onClick={handlePictureClick}>
			<div className="">
				<img className={pictureImageClass} style={{
					height : props.dimension.detailPictureHeight,
					width : props.dimension.detailPictureWidth}}
					alt="" src={"https://datemomo.com/client/image/" 
					+ props.galleryPictureParts.galleryPictureParts.imageName} />
			</div>
		</div>
	);
}

export default UserGalleryPicture;


