import React from 'react';
import '../css/messenger.css';
import icon_empty_chat from '../image/icon_empty_chat.png';
import EmptyMessengerContent from '../widget/empty_messenger_content';

class EmptyMessenger extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {  
		return (
			<div className="emptyMessengerLayout">
				<div className="emptyMessengerDescription">
					<img className="emptyMessengerDescriptionIcon" src={icon_empty_chat} />
					<div className="emptyMessengerDescriptionText"> 
						Your messenger list is empty! You might want to begin 
						meeting people by waving at them!
					</div> 				
				</div>
				<EmptyMessengerContent />
			</div>
		);
	}
}

export default EmptyMessenger;   


