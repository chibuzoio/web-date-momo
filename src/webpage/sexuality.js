import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';
import SexualityOptions from '../widget/sexuality_options';

class Sexuality extends React.Component {
	currentUser = {};
	sexualityRequestData = {
	    memberId : 0,
	    userLevel : "",
	    bisexualCategory : 0,
	    gayCategory : 0,
	    lesbianCategory : 0,
	    straightCategory : 0,
	    sugarDaddyCategory : 0,
	    sugarMommyCategory : 0,
	    toyBoyCategory : 0,
	    toyGirlCategory : 0,
	    bisexualInterest : 0,
	    gayInterest : 0,
	    lesbianInterest : 0,
	    straightInterest : 0,
	    friendshipInterest : 0,
	    sugarDaddyInterest : 0,
	    sugarMommyInterest : 0,
	    relationshipInterest : 0,
	    toyBoyInterest : 0,
	    toyGirlInterest : 0,
	    sixtyNineExperience : 0,
	    analSexExperience : 0,
	    givenHeadExperience : 0,
	    missionaryExperience : 0,
	    oneNightStandExperience : 0,
	    orgySexExperience : 0,
	    poolSexExperience : 0,
	    receivedHeadExperience : 0,
	    carSexExperience : 0,
	    publicSexExperience : 0,
	    cameraSexExperience : 0,
	    threesomeExperience : 0,
	    sexToyExperience : 0,
	    videoSexExperience : 0
	};

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		console.log("The value of currentUser in Sexuality class is " + JSON.stringify(this.currentUser));
		this.sexualityRequestData.memberId = this.currentUser.memberId;
		this.sexualityRequestData.userLevel = this.currentUser.userLevel;
	}

	componentWillUnmount() {

	}
  
	render() { 
		var basicButton = {
			buttonTitle : "Submit",
			buttonClass : "basicButton customTopMargin fullWidth"
		}
    
		var sexualCategoryButtons = [
			{buttonTitle : "Bisexual", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "hollowButton sexualityButton"}
		];

		var sexualInterestButtons = [
			{buttonTitle : "Bisexual", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Friendship", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Gay", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Lesbian", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Relationship", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Straight", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Daddy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sugar Mommy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Boy", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Toy Girl", buttonClass : "hollowButton sexualityButton"}
		];
    
		var sexualExperienceButtons = [
			{buttonTitle : "69", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Anal Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Given Head", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Missionary", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "One-night Stand", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Orgy Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Pool Sex", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Received Head", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed In Car", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed In Public", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Sexed With Camera", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Threesome", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Used Sex Toys", buttonClass : "hollowButton sexualityButton"},
			{buttonTitle : "Video Sex Chat", buttonClass : "hollowButton sexualityButton"}
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


