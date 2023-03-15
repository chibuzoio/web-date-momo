import React from 'react';
import '../css/style.css';
import '../css/profile.css';

function UserGalleryPicture(props) {
	return (
		<div className="detailPictureLayout" style={{
			height : props.dimension.detailPictureHeight,
			width : props.dimension.detailPictureWidth}}>
			<div className="">
				<img className="detailPictureImage" style={{
					height : props.dimension.detailPictureHeight,
					width : props.dimension.detailPictureWidth}}
					alt="" src={"https://datemomo.com/client/image/" 
					+ props.galleryPictureParts.imageName} />
			</div>
		</div>
	);
}

export default UserGalleryPicture;


