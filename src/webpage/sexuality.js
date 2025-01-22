import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import '../css/sexuality.css';
import BasicButton from '../component/basic_button';
import loading_puzzle from '../image/loading_puzzle.gif';
import SexualityOptions from '../widget/sexuality_options';
import ProgressAnimation from '../component/progress_animation';
import { checkNullInMessenger, selectChosenSticker } from '../utility/utility';

function Sexuality() {
	var visibleSexualBasicButton = "basicButton sexualityButton";  
	var visibleSexualHollowButton = "hollowButton sexualityButton";  
	var visibleButtonClass = "basicButton customTopMargin fullWidth";
	var visibleAnimationClass = "progressLoadingLayout customTopMargin";
	var hiddenButtonClass = visibleButtonClass + " hideComponent";
	var hiddenAnimationClass = visibleAnimationClass + " hideComponent";
	var hiddenSexualBasicButton = visibleSexualBasicButton + " hideComponent";
	var hiddenSexualHollowButton = visibleSexualHollowButton + " hideComponent";
    
	var timelineRequestData = {
		memberId : 0,
		age : 0,
		sex : "",
		registrationDate : "",
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

    var sexualityRequestData = {
	    memberId : 0,
	    userLevel : "displayMatchedUsers",
	    // userLevel : "selectSexualityInterest",
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

	const userDataComposite = JSON.parse(localStorage.getItem("userDataComposite"));

    sexualityRequestData.memberId = userDataComposite.currentUserData.userInformationData.memberId; 

	var messengerRequestData = {
        memberId : userDataComposite.currentUserData.userInformationData.memberId
    };

	const [sexualCategoryButtons, setSexualCategoryButtons] = useState([
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Category",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : visibleSexualHollowButton
			}
		}
	]);

	const [sexualInterestButtons, setSexualInterestButtons] = useState([
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Bisexual",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Bisexual",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Friendship",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Friendship",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Gay",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Gay",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Lesbian",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Lesbian",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Relationship",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Relationship",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Straight",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Straight",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Daddy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sugar Mommy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Boy",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Boy",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Interest",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Toy Girl",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Toy Girl",
				buttonClass : visibleSexualHollowButton
			}
		}
	]);

	const [sexualExperienceButtons, setSexualExperienceButtons] = useState([
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "69",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "69",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Anal Sex",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Anal Sex",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Given Head",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Given Head",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Missionary",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Missionary",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "One-night Stand",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "One-night Stand",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Orgy Sex",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Pool Sex",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Pool Sex",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Received Head",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Received Head",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed In Car",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed In Public",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Sexed With Camera",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Threesome",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Threesome",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Used Sex Toys",
				buttonClass : visibleSexualHollowButton
			}
		},
		{
			sexualityType : "Experience",
			sexualitySelected : 0,
			basicButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : hiddenSexualBasicButton
			},
			hollowButton : {
				buttonTitle : "Video Sex Chat",
				buttonClass : visibleSexualHollowButton
			}
		}
	]); 

    const [sexualityButtonParts, setSexualityButtonParts] = useState({
        buttonTitle : "Submit",
        buttonClass : visibleButtonClass
    });

    const [puzzleProgressAnimation, setPuzzleProgressAnimation] = useState({
        animationLayout : hiddenAnimationClass,
        animationImageClass : "progressLoadingIcon",
        animationMotionIcon : loading_puzzle
    }); 

	const updateSexualityCollection = (sexualityButtonData) => {
		if (sexualityButtonData[0].sexualityType === "Category") {
			setSexualCategoryButtons(sexualityButtonData);
		} else if (sexualityButtonData[0].sexualityType === "Interest") {
			setSexualInterestButtons(sexualityButtonData);
		} else if (sexualityButtonData[0].sexualityType === "Experience") {
			setSexualExperienceButtons(sexualityButtonData);
		}

		setSexualityButtonParts({
			buttonTitle : sexualityButtonParts.buttonTitle,
			buttonClass : visibleButtonClass			
		});
	}

    const loadMessengerNotificationData = () => {
        axios.post("http://localhost:1337/usermessengersdata", messengerRequestData)
            .then(response => {
                userDataComposite.messengerResponses = checkNullInMessenger(response.data);
                
                axios.post("http://localhost:1337/usernotifications", messengerRequestData) 
                    .then(response => {
                        userDataComposite.notificationResponses = response.data;
                
                        axios.post("http://localhost:1337/alluserdata", messengerRequestData)
                            .then(response => {
                                userDataComposite.emptyMessengerResponse = response.data;
                
                                axios.post("http://localhost:1337/matcheduserdata", timelineRequestData)
                                    .then(response => {
                                        userDataComposite.timelineDataComposite = response.data;
                
                                        localStorage.setItem("userDataComposite", JSON.stringify(userDataComposite));
							
										setSexualityButtonParts({
											buttonTitle : sexualityButtonParts.buttonTitle,
											buttonClass : visibleButtonClass
										});
							
                                        setPuzzleProgressAnimation({
                                            animationLayout : hiddenAnimationClass,
                                            animationImageClass : puzzleProgressAnimation.animationImageClass,
                                            animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                                        });
                                        
                                        window.location.replace("/");
                                    }, error => {
                                        console.log(error);
                                    });
                            }, error => {
                                console.log(error);
                            });	        
                        }, error => {
                            console.log(error);
                        });		        
                    }, error => {
                        console.log(error);
                    });
    }

    const submitSexualitySelections = (buttonClicked) => {
		if (buttonClicked) {
            setSexualityButtonParts({
                buttonTitle : sexualityButtonParts.buttonTitle,
                buttonClass : hiddenButtonClass
            });

            setPuzzleProgressAnimation({
                animationLayout : visibleAnimationClass,
                animationImageClass : puzzleProgressAnimation.animationImageClass,
                animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
            });

		    sexualityRequestData.bisexualCategory = sexualCategoryButtons[0].sexualitySelected;
		    sexualityRequestData.gayCategory = sexualCategoryButtons[1].sexualitySelected;
		    sexualityRequestData.lesbianCategory = sexualCategoryButtons[2].sexualitySelected;
		    sexualityRequestData.straightCategory = sexualCategoryButtons[3].sexualitySelected;
		    sexualityRequestData.sugarDaddyCategory = sexualCategoryButtons[4].sexualitySelected;
		    sexualityRequestData.sugarMommyCategory = sexualCategoryButtons[5].sexualitySelected;
		    sexualityRequestData.toyBoyCategory = sexualCategoryButtons[6].sexualitySelected;
		    sexualityRequestData.toyGirlCategory = sexualCategoryButtons[7].sexualitySelected;
		    sexualityRequestData.bisexualInterest = sexualInterestButtons[0].sexualitySelected;
		    sexualityRequestData.gayInterest = sexualInterestButtons[1].sexualitySelected;
		    sexualityRequestData.lesbianInterest = sexualInterestButtons[2].sexualitySelected;
		    sexualityRequestData.straightInterest = sexualInterestButtons[3].sexualitySelected;
		    sexualityRequestData.friendshipInterest = sexualInterestButtons[4].sexualitySelected;
		    sexualityRequestData.sugarDaddyInterest = sexualInterestButtons[5].sexualitySelected;
		    sexualityRequestData.sugarMommyInterest = sexualInterestButtons[6].sexualitySelected;
		    sexualityRequestData.relationshipInterest = sexualInterestButtons[7].sexualitySelected;
		    sexualityRequestData.toyBoyInterest = sexualInterestButtons[8].sexualitySelected;
		    sexualityRequestData.toyGirlInterest = sexualInterestButtons[9].sexualitySelected;
		    sexualityRequestData.sixtyNineExperience = sexualExperienceButtons[0].sexualitySelected;
		    sexualityRequestData.analSexExperience = sexualExperienceButtons[1].sexualitySelected;
		    sexualityRequestData.givenHeadExperience = sexualExperienceButtons[2].sexualitySelected;
		    sexualityRequestData.missionaryExperience = sexualExperienceButtons[3].sexualitySelected;
		    sexualityRequestData.oneNightStandExperience = sexualExperienceButtons[4].sexualitySelected;
		    sexualityRequestData.orgySexExperience = sexualExperienceButtons[5].sexualitySelected;
		    sexualityRequestData.poolSexExperience = sexualExperienceButtons[6].sexualitySelected;
		    sexualityRequestData.receivedHeadExperience = sexualExperienceButtons[7].sexualitySelected;
		    sexualityRequestData.carSexExperience = sexualExperienceButtons[8].sexualitySelected;
		    sexualityRequestData.publicSexExperience = sexualExperienceButtons[9].sexualitySelected;
		    sexualityRequestData.cameraSexExperience = sexualExperienceButtons[10].sexualitySelected;
		    sexualityRequestData.threesomeExperience = sexualExperienceButtons[11].sexualitySelected;
		    sexualityRequestData.sexToyExperience = sexualExperienceButtons[12].sexualitySelected;
		    sexualityRequestData.videoSexExperience = sexualExperienceButtons[13].sexualitySelected;

			axios.post("http://localhost:1337/userbiometrics", sexualityRequestData)
		    	.then(async response => { 
					let localUserData = {
						userInformationData : {
							registrationDate : userDataComposite.currentUserData.userInformationData.registrationDate,
							profilePicture : userDataComposite.currentUserData.userInformationData.profilePicture,
							passwordHash : userDataComposite.currentUserData.userInformationData.passwordHash,
							impactCount : userDataComposite.currentUserData.userInformationData.impactCount,
							userStatus : userDataComposite.currentUserData.userInformationData.userStatus,
							userRole : userDataComposite.currentUserData.userInformationData.userRole,
							userName : userDataComposite.currentUserData.userInformationData.userName,
							memberId : userDataComposite.currentUserData.userInformationData.memberId,
							age : userDataComposite.currentUserData.userInformationData.age,
							userLevel : response.data.userLevel,
							currentLocation : "",
							deleteAccount : 0,
							emailAddress : 0,
							phoneNumber : "",
							fullName : "",
							sex : ""
						},
						userExperienceData : response.data.userExperienceData,
						userSexualityData : response.data.userSexualityData,
						userInterestData : response.data.userInterestData,
						userBlockingTableName : userDataComposite.currentUserData.userBlockingTableName,
						notificationTableName : userDataComposite.currentUserData.notificationTableName,
						messengerTableName : userDataComposite.currentUserData.messengerTableName,
						likedUserTableName : userDataComposite.currentUserData.likedUserTableName,
						likeTableName : userDataComposite.currentUserData.likeTableName,
						authenticated : userDataComposite.currentUserData.authenticated
					};
					
					userDataComposite.currentUserData = localUserData;

					var props = Object.getOwnPropertyNames(userDataComposite.registrationData);
					
					for (var i = 0; i < props.length; i++) {
						delete userDataComposite.registrationData[props[i]];
					}

					timelineRequestData.memberId = localUserData.userInformationData.memberId;
					timelineRequestData.age = localUserData.userInformationData.age;
					timelineRequestData.sex = localUserData.userInformationData.sex;
					timelineRequestData.registrationDate = localUserData.userInformationData.registrationDate;
					timelineRequestData.bisexualCategory = localUserData.userSexualityData.bisexualCategory;
					timelineRequestData.gayCategory = localUserData.userSexualityData.gayCategory;
					timelineRequestData.lesbianCategory = localUserData.userSexualityData.lesbianCategory;
					timelineRequestData.straightCategory = localUserData.userSexualityData.straightCategory;
					timelineRequestData.sugarDaddyCategory = localUserData.userSexualityData.sugarDaddyCategory;
					timelineRequestData.sugarMommyCategory = localUserData.userSexualityData.sugarMommyCategory;
					timelineRequestData.toyBoyCategory = localUserData.userSexualityData.toyBoyCategory;
					timelineRequestData.toyGirlCategory = localUserData.userSexualityData.toyGirlCategory;
					timelineRequestData.bisexualInterest = localUserData.userInterestData.bisexualInterest;
					timelineRequestData.gayInterest = localUserData.userInterestData.gayInterest;
					timelineRequestData.lesbianInterest = localUserData.userInterestData.lesbianInterest;
					timelineRequestData.straightInterest = localUserData.userInterestData.straightInterest;
					timelineRequestData.friendshipInterest = localUserData.userInterestData.friendshipInterest;
					timelineRequestData.sugarDaddyInterest = localUserData.userInterestData.sugarDaddyInterest;
					timelineRequestData.sugarMommyInterest = localUserData.userInterestData.sugarMommyInterest;
					timelineRequestData.relationshipInterest = localUserData.userInterestData.relationshipInterest;
					timelineRequestData.toyBoyInterest = localUserData.userInterestData.toyBoyInterest;
					timelineRequestData.toyGirlInterest = localUserData.userInterestData.toyGirlInterest;
					timelineRequestData.sixtyNineExperience = localUserData.userExperienceData.sixtyNineExperience;
					timelineRequestData.analSexExperience = localUserData.userExperienceData.analSexExperience;
					timelineRequestData.givenHeadExperience = localUserData.userExperienceData.givenHeadExperience;
					timelineRequestData.missionaryExperience = localUserData.userExperienceData.missionaryExperience;
					timelineRequestData.oneNightStandExperience = localUserData.userExperienceData.oneNightStandExperience;
					timelineRequestData.orgySexExperience = localUserData.userExperienceData.orgySexExperience;
					timelineRequestData.poolSexExperience = localUserData.userExperienceData.poolSexExperience;
					timelineRequestData.receivedHeadExperience = localUserData.userExperienceData.receivedHeadExperience;
					timelineRequestData.carSexExperience = localUserData.userExperienceData.carSexExperience;
					timelineRequestData.publicSexExperience = localUserData.userExperienceData.publicSexExperience;
					timelineRequestData.cameraSexExperience = localUserData.userExperienceData.cameraSexExperience;
					timelineRequestData.threesomeExperience = localUserData.userExperienceData.threesomeExperience;
					timelineRequestData.sexToyExperience = localUserData.userExperienceData.sexToyExperience;
					timelineRequestData.videoSexExperience = localUserData.userExperienceData.videoSexExperience;

					loadMessengerNotificationData();
		        }, error => {     
                    setSexualityButtonParts({
                        buttonTitle : sexualityButtonParts.buttonTitle,
                        buttonClass : visibleButtonClass
                    });
        
                    setPuzzleProgressAnimation({
                        animationLayout : hiddenAnimationClass,
                        animationImageClass : puzzleProgressAnimation.animationImageClass,
                        animationMotionIcon : puzzleProgressAnimation.animationMotionIcon
                    });
 
		        	console.log(error);
		        });
		}
	}
    
	return (
        <div className="login">
            <div className="loginWidget">
                <div className="sexualCategoryHeader">Your Sexual Category</div>
                <SexualityOptions onSexualityChange={updateSexualityCollection} sexualityButtons={sexualCategoryButtons} />
                <div className="sexualCategoryHeader">You are interested in</div>
                <SexualityOptions onSexualityChange={updateSexualityCollection} sexualityButtons={sexualInterestButtons} />
                <div className="sexualCategoryHeader">Things you have tried or can do in sex</div>
                <SexualityOptions onSexualityChange={updateSexualityCollection} sexualityButtons={sexualExperienceButtons} />
                <BasicButton onButtonClicked={submitSexualitySelections} buttonParts={sexualityButtonParts} />
                <ProgressAnimation animationData={puzzleProgressAnimation} />
            </div>
        </div>
    );
}

export default Sexuality;


