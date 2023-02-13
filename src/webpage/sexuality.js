import React from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';
import loading_puzzle from '../image/loading_puzzle.gif';
import SexualityOptions from '../widget/sexuality_options';
import ProgressAnimation from '../component/progress_animation';

class Sexuality extends React.Component {
	visibleButtonClass = "basicButton customTopMargin fullWidth";
	visibleAnimationClass = "progressLoadingLayout customTopMargin";
	hiddenButtonClass = this.visibleButtonClass + " hideComponent";
	hiddenAnimationClass = this.visibleAnimationClass + " hideComponent";
	sexualCategoryButtons = [
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Category",
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		}
	];

	sexualInterestButtons = [
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Friendship",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Friendship",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Relationship",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Relationship",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Interest",
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		}
	];

	sexualExperienceButtons = [
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "69",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "69",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Anal Sex",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Anal Sex",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Given Head",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Given Head",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Missionary",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Missionary",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "One-night Stand",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "One-night Stand",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Pool Sex",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Pool Sex",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Received Head",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Received Head",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Threesome",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Threesome",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		},
		{
			sexualityType : "Experience",
			basicButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : "basicButton sexualityButton",
				buttonDisplay : "none"
			},
			hollowButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : "hollowButton sexualityButton",
				buttonDisplay : "flex"
			}
		}
	]; 
	state = {contextData : {
		sexualCategoryButtons : this.sexualCategoryButtons,
		sexualInterestButtons : this.sexualInterestButtons,
		sexualExperienceButtons : this.sexualExperienceButtons,
		sexualityButtonParts : {
			buttonTitle : "Submit",
			buttonClass : this.visibleButtonClass
		},
		puzzleProgressAnimation : {
			animationLayout : this.hiddenAnimationClass,
			animationImageClass : "progressLoadingIcon",
			animationMotionIcon : loading_puzzle
		}
	}};
	currentUser = {};
	sexualityRequestData = {
	    memberId : 0,
	    // userLevel : "displayMatchedUsers",
	    userLevel : "selectSexualityInterest",
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
		this.submitSexualitySelections = this.submitSexualitySelections.bind(this);
		this.updateSexualityCollection = this.updateSexualityCollection.bind(this);
	}

	componentDidMount() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.sexualityRequestData.memberId = this.currentUser.memberId; 
	}

	componentWillUnmount() {

	}

	updateSexualityCollection(sexualityButtonData) {
		if (sexualityButtonData[0].sexualityType === "Category") {
			this.sexualCategoryButtons = sexualityButtonData;
			this.sexualInterestButtons = this.state.contextData.sexualInterestButtons;
			this.sexualExperienceButtons = this.state.contextData.sexualExperienceButtons;
		} else if (sexualityButtonData[0].sexualityType === "Interest") {
			this.sexualCategoryButtons = this.state.contextData.sexualCategoryButtons;
			this.sexualInterestButtons = sexualityButtonData;
			this.sexualExperienceButtons = this.state.contextData.sexualExperienceButtons;
		} else if (sexualityButtonData[0].sexualityType === "Experience") {
			this.sexualCategoryButtons = this.state.contextData.sexualCategoryButtons;
			this.sexualInterestButtons = this.state.contextData.sexualInterestButtons;
			this.sexualExperienceButtons = sexualityButtonData;
		}

		this.setState(function(state) {
			return {contextData : {
				sexualCategoryButtons : this.sexualCategoryButtons,
				sexualInterestButtons : this.sexualInterestButtons,
				sexualExperienceButtons : this.sexualExperienceButtons,
				sexualityButtonParts : {
					buttonTitle : "Submit",
					buttonClass : this.visibleButtonClass
				},
				puzzleProgressAnimation : state.contextData.puzzleProgressAnimation
			}
		}});       
	}

	submitSexualitySelections(buttonClicked) {
		if (buttonClicked) {
			this.setState(function(state) {
				return {contextData : {
					sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
					sexualInterestButtons : this.state.contextData.sexualInterestButtons,
					sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
					sexualityButtonParts : {
						buttonTitle : "Submit",
						buttonClass : this.hiddenButtonClass
					},
					puzzleProgressAnimation : {
						animationLayout : this.visibleAnimationClass,
						animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
						animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
					}
				}
			}});       

		    this.sexualityRequestData.bisexualCategory = (this.state.contextData.sexualCategoryButtons[0].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.gayCategory = (this.state.contextData.sexualCategoryButtons[1].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.lesbianCategory = (this.state.contextData.sexualCategoryButtons[2].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.straightCategory = (this.state.contextData.sexualCategoryButtons[3].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sugarDaddyCategory = (this.state.contextData.sexualCategoryButtons[4].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sugarMommyCategory = (this.state.contextData.sexualCategoryButtons[5].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.toyBoyCategory = (this.state.contextData.sexualCategoryButtons[6].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.toyGirlCategory = (this.state.contextData.sexualCategoryButtons[7].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.bisexualInterest = (this.state.contextData.sexualInterestButtons[0].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.gayInterest = (this.state.contextData.sexualInterestButtons[1].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.lesbianInterest = (this.state.contextData.sexualInterestButtons[2].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.straightInterest = (this.state.contextData.sexualInterestButtons[3].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.friendshipInterest = (this.state.contextData.sexualInterestButtons[4].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sugarDaddyInterest = (this.state.contextData.sexualInterestButtons[5].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sugarMommyInterest = (this.state.contextData.sexualInterestButtons[6].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.relationshipInterest = (this.state.contextData.sexualInterestButtons[7].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.toyBoyInterest = (this.state.contextData.sexualInterestButtons[8].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.toyGirlInterest = (this.state.contextData.sexualInterestButtons[9].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sixtyNineExperience = (this.state.contextData.sexualExperienceButtons[0].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.analSexExperience = (this.state.contextData.sexualExperienceButtons[1].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.givenHeadExperience = (this.state.contextData.sexualExperienceButtons[2].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.missionaryExperience = (this.state.contextData.sexualExperienceButtons[3].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.oneNightStandExperience = (this.state.contextData.sexualExperienceButtons[4].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.orgySexExperience = (this.state.contextData.sexualExperienceButtons[5].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.poolSexExperience = (this.state.contextData.sexualExperienceButtons[6].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.receivedHeadExperience = (this.state.contextData.sexualExperienceButtons[7].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.carSexExperience = (this.state.contextData.sexualExperienceButtons[8].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.publicSexExperience = (this.state.contextData.sexualExperienceButtons[9].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.cameraSexExperience = (this.state.contextData.sexualExperienceButtons[10].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.threesomeExperience = (this.state.contextData.sexualExperienceButtons[11].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.sexToyExperience = (this.state.contextData.sexualExperienceButtons[12].basicButton.buttonDisplay === "none") ? 0 : 1;
		    this.sexualityRequestData.videoSexExperience = (this.state.contextData.sexualExperienceButtons[13].basicButton.buttonDisplay === "none") ? 0 : 1;
      
			axios.post("https://datemomo.com/service/userbiometrics.php", this.sexualityRequestData)
		    	.then(response => { 
					this.setState(function(state) {
						return {contextData : {
							sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
							sexualInterestButtons : this.state.contextData.sexualInterestButtons,
							sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
							sexualityButtonParts : {
								buttonTitle : "Submit",
								buttonClass : this.visibleButtonClass
							},
							puzzleProgressAnimation : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
								animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
							}
						}
					}});       

					this.currentUser.userLevel = response.data.userLevel;
					localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
					window.location.replace("/");
		        }, error => {     
					this.setState(function(state) {
						return {contextData : {
							sexualCategoryButtons : this.state.contextData.sexualCategoryButtons,
							sexualInterestButtons : this.state.contextData.sexualInterestButtons,
							sexualExperienceButtons : this.state.contextData.sexualExperienceButtons,
							sexualityButtonParts : {
								buttonTitle : "Submit",
								buttonClass : this.visibleButtonClass
							},
							puzzleProgressAnimation : {
								animationLayout : this.hiddenAnimationClass,
								animationImageClass : state.contextData.puzzleProgressAnimation.animationImageClass,
								animationMotionIcon : state.contextData.puzzleProgressAnimation.animationMotionIcon
							}
						}
					}});       

		        	console.log(error);
		        });
		}
	}

	render() {    
		return (
			<div className="login">
				<div className="loginWidget">
					<div className="sexualCategoryHeader">Your Sexual Category</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualCategoryButtons} />
					<div className="sexualCategoryHeader">You are interested in</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualInterestButtons} />
					<div className="sexualCategoryHeader">Things you have tried or can do in sex</div>
					<SexualityOptions onSexualityChange={this.updateSexualityCollection} sexualityButtons={this.sexualExperienceButtons} />
					<BasicButton onButtonClicked={this.submitSexualitySelections} buttonParts={this.state.contextData.sexualityButtonParts} />
					<ProgressAnimation animationData={this.state.contextData.puzzleProgressAnimation} />
				</div>
			</div>
		);
	}
}

export default Sexuality;


