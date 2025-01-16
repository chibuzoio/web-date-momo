import React from 'react';
import '../css/style.css';
import '../css/profile.css';

function ProfilePicture(props) {
    return (
        <div className="profilePictureLayout">
            <img className="profilePictureImage" 
            alt="" src={props.pictureParts.roundPicture} />
        </div>
    );    
}

export default ProfilePicture;


