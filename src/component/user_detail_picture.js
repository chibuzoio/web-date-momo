import React from 'react';
import '../css/style.css';
import '../css/profile.css';

function UserDetailPicture(props) {
    return (
        <div className="detailPictureLayout" style={{
            height : props.dimension.detailPictureHeight,
            width : props.dimension.detailPictureWidth}}>
            <div className={props.userDetailParts.innerPictureClass}>
                <img className="detailPictureImage" style={{
                    height : props.dimension.detailPictureHeight,
                    width : props.dimension.detailPictureWidth}}
                    alt="" src={"http://localhost:1337/image/" 
                    + props.userDetailParts.userDetails.profilePicture} />
                <div className="userNameLabel" style={{
                    marginTop : props.dimension.topUserNameMargin,
                    height : props.dimension.userNameLabelHeight}}>
                    {props.userDetailParts.userDetails.pictureUserName.charAt(0).toUpperCase() 
                    + props.userDetailParts.userDetails.pictureUserName.slice(1)},&nbsp;
                    {props.userDetailParts.userDetails.pictureAge}
                </div>
            </div>
        </div>
    );    
}

export default UserDetailPicture;


