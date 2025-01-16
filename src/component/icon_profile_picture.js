import React from 'react';
import '../css/style.css';
import '../css/profile.css';
import icon_camera_blue from '../image/icon_camera_blue.png';

function IconProfilePicture(props) {
	const changeProfilePicture = (event) => {
		props.onClickPictureChange(true);
	}

    return (
        <div className={props.pictureParts.pictureLayoutClass}>
            <img className={props.pictureParts.profilePictureClass} 
                alt="" src={props.pictureParts.roundPicture} />
            <img className={props.pictureParts.pictureChangeClass} 
                onClick={changeProfilePicture} alt="" src={icon_camera_blue} />
        </div>
    );
}

export default IconProfilePicture;


