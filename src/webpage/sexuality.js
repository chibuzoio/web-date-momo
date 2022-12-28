import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';
import SexualityOptions from '../widget/sexuality_options';

class Sexuality extends React.Component {
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
		var basicButton = {
			buttonTitle : "Submit",
			buttonClass : "basicButton customTopMargin fullWidth"
		}
    
		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "sexualityButton"}
		];
           
		return (
			<div className="login">
				<div className="loginWidget">
					<div className="sexualCategoryHeader">Your Sexual Category</div>
					<SexualityOptions sexualityButtons={sexualCategoryButtons} />
					<div className="sexualCategoryHeader">You are interested in</div>
					<SexualityOptions sexualityButtons={sexualInterestButtons} />
					<div className="sexualCategoryHeader">Things you have tried or can do in sex</div>
					<SexualityOptions sexualityButtons={sexualExperienceButtons} />
					<BasicButton buttonParts={basicButton} />
				</div>
			</div>
		);
	}
}

export default Sexuality;


