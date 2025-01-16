import React from 'react';
import axios from 'axios';
import '../css/style.css';
import '../css/input.css';
import '../css/messenger.css';
import icon_empty_chat from '../image/icon_empty_chat.png';
import grey_placeholder from '../image/grey_placeholder.png';
import icon_waving_hand from '../image/icon_waving_hand.png';
import EmptyMessengerContent from './empty_messenger_content';

function EmptyMessenger(props) {
    var currentUser = {};
	var requestData = {};

    const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

    const wavingIconClicked = (homeDisplayResponse) => {
    	props.onClickWavingIcon(homeDisplayResponse);
    }

	const messengerLayoutClicked = (homeDisplayResponse) => {
		props.onClickMessengerLayout(homeDisplayResponse);
	}

    return (
        <div className="genericMessengerLayout">
            <div className="emptyMessengerDescription">
                <img className="emptyMessengerDescriptionIcon" src={icon_empty_chat} />
                <div className="emptyMessengerDescriptionText"> 
                    Your messenger list is empty! You might want to begin 
                    meeting people by waving at them!
                </div> 				
            </div>

            {
                userDataComposite.emptyMessengerResponse.homeDisplayResponses.map((homeDisplayUser) => ( 
                    <EmptyMessengerContent emptyMessengerContent={homeDisplayUser} 
                        onClickMessengerLayout={messengerLayoutClicked} 
                        onClickWavingIcon={wavingIconClicked} />
                ))
            }

            <div className="bottomPadding"><p></p></div>
        </div>
    );
}

export default EmptyMessenger;


