import React from 'react';
import axios from 'axios';
import '../css/home_page.css';
import Timeline from '../widget/timeline';
import Header from '../widget/header';
import Footer from '../widget/footer'; 
import FloatingUserAccount from '../widget/floating_account';

class HomePage extends React.Component {
	state = {userNames : []};

	constructor(props) {
		super(props);
		this.state.userNames = props.userNames;
	}

	componentDidMount() {
	
	}

	componentWillUnmount() {

	}
  
	render() {  
		return (
			<div className="homePage">
				<Header />
				<Timeline /> 
				{/* <FloatingUserAccount /> */}
				<Footer />
			</div>
		);
	}
}

export default HomePage;


