import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/profile.css';

function UserGalleryPicture(props) {
	var visiblePictureImage = "detailPictureImage";
	var hiddenPictureImage = visiblePictureImage + " hideComponent";

	const [pictureImageClass, setPictureImageClass] = useState(visiblePictureImage);

	useEffect(() => {
		if (props.galleryPictureParts.imageName === "") {
			setPictureImageClass(hiddenPictureImage);
		} 
	}, []);

	return (
		<div className="detailPictureLayout" style={{
			height : props.dimension.detailPictureHeight,
			width : props.dimension.detailPictureWidth}}>
			<div className="">
				<img className={pictureImageClass} style={{
					height : props.dimension.detailPictureHeight,
					width : props.dimension.detailPictureWidth}}
					alt="" src={"https://datemomo.com/client/image/" 
					+ props.galleryPictureParts.imageName} />
			</div>
		</div>
	);
}

export default UserGalleryPicture;


