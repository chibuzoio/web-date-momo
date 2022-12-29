import React from 'react';
import '../css/messenger.css';
import EmptyMessenger from '../widget/empty_messenger';

class Messenger extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {             
		return (
			<div className="dateMomoMessengerLayout">
				<EmptyMessenger />
			</div>			
		);
	}
}

export default Messenger;   


