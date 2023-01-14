import React from 'react';
import '../css/style.css';
import '../css/messenger.css';
import Header from '../widget/header';
import Footer from '../widget/footer';
import ActiveMessenger from '../widget/active_messenger';
import EmptyMessenger from '../widget/empty_messenger';

class Messenger extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}; 
	}

	render() {             
		return (
			<div>
			{/*<div className="dateMomoOuterLayout">
				<Header />*/}
				<div className="dateMomoMessengerLayout">
					<EmptyMessenger />
				</div>
				{/*<Footer />
			</div>*/}
			</div>
		);
	}
}

export default Messenger;   


