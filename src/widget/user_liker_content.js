import React from 'react';
import '../css/input.css';
import '../css/messenger.css';
import RoundPicture from '../component/round_picture';
import test_image from '../image/test_image.png';

function UserLikerContent(props) {
    return (
        <div className="notificationOuterLayout">
            <div className="roundPictureContainer">
                <RoundPicture pictureParts={props.userLikerData.roundPictureParts} />
            </div>
            <div className="notificationComponentLayout">
                <div className="notificationTitle">{props.userLikerData.userLikerNameAge}</div>
                <div className="chatLastMessage">{props.userLikerData.userLikerLocation}</div>
            </div>   
        </div>
    );
}

export default UserLikerContent;


