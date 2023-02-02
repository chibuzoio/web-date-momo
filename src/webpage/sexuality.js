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
	    userLevel : "displayMatchedUsers",
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
	sexualityButtonSelect = {
	    bisexualCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    gayCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    lesbianCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    straightCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sugarDaddyCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sugarMommyCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    toyBoyCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    toyGirlCategory : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    bisexualInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    gayInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    lesbianInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    straightInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    friendshipInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sugarDaddyInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sugarMommyInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    relationshipInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    toyBoyInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    toyGirlInterest : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sixtyNineExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    analSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    givenHeadExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    missionaryExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    oneNightStandExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    orgySexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    poolSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    receivedHeadExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    carSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    publicSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    cameraSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    threesomeExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    sexToyExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"},
	    videoSexExperience : {basicButtonDisplay : "none", hollowButtonDisplay : "flex"}
	};

	constructor(props) {
		super(props);
		// localStorage.setItem("currentUser", "{}");
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		console.log("The value of currentUser in Sexuality class is " + JSON.stringify(this.currentUser));
		this.sexualityRequestData.memberId = this.currentUser.memberId; 
	}

	componentWillUnmount() {

	}
  
	render() { 
		var basicButton = {
			buttonTitle : "Submit",
			buttonClass : "basicButton customTopMargin fullWidth"
		}
                        
		var sexualCategoryButtons = [
			{
				basicButton : {
					buttonTitle : "Bisexual",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.bisexualCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Bisexual",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.bisexualCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Gay",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.gayCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Gay",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.gayCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Lesbian",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.lesbianCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Lesbian",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.lesbianCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Straight",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.straightCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Straight",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.straightCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sugar Daddy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarDaddyCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sugar Daddy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarDaddyCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sugar Mommy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarMommyCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sugar Mommy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarMommyCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Toy Boy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyBoyCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Toy Boy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyBoyCategory.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Toy Girl",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyGirlCategory.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Toy Girl",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyGirlCategory.hollowButtonDisplay
				}
			}
		];

		var sexualInterestButtons = [
			{
				basicButton : {
					buttonTitle : "Bisexual",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.bisexualInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Bisexual",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.bisexualInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Friendship",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.friendshipInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Friendship",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.friendshipInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Gay",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.gayInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Gay",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.gayInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Lesbian",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.lesbianInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Lesbian",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.lesbianInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Relationship",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.relationshipInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Relationship",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.relationshipInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Straight",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.straightInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Straight",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.straightInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sugar Daddy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarDaddyInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sugar Daddy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarDaddyInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sugar Mommy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarMommyInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sugar Mommy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sugarMommyInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Toy Boy",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyBoyInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Toy Boy",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyBoyInterest.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Toy Girl",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyGirlInterest.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Toy Girl",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.toyGirlInterest.hollowButtonDisplay
				}
			}
		];
    
		var sexualExperienceButtons = [
			{
				basicButton : {
					buttonTitle : "69",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sixtyNineExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "69",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sixtyNineExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Anal Sex",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.analSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Anal Sex",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.analSexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Given Head",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.givenHeadExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Given Head",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.givenHeadExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Missionary",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.missionaryExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Missionary",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.missionaryExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "One-night Stand",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.oneNightStandExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "One-night Stand",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.oneNightStandExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Orgy Sex",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.orgySexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Orgy Sex",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.orgySexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Pool Sex",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.poolSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Pool Sex",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.poolSexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Received Head",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.receivedHeadExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Received Head",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.receivedHeadExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sexed In Car",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.carSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sexed In Car",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.carSexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sexed In Public",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.publicSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sexed In Public",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.publicSexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Sexed With Camera",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.cameraSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Sexed With Camera",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.cameraSexExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Threesome",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.threesomeExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Threesome",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.threesomeExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Used Sex Toys",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sexToyExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Used Sex Toys",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.sexToyExperience.hollowButtonDisplay
				}
			},
			{
				basicButton : {
					buttonTitle : "Video Sex Chat",
					buttonClass : "basicButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.videoSexExperience.basicButtonDisplay
				},
				hollowButton : {
					buttonTitle : "Video Sex Chat",
					buttonClass : "hollowButton sexualityButton",
					buttonDisplay : this.sexualityButtonSelect.videoSexExperience.hollowButtonDisplay
				}
			}
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


