export const getTimeDifference = (timeGottenInSeconds, timeFullText) => {
    var timeInSeconds = (Date.now() / 1000) - timeGottenInSeconds;

    if (timeInSeconds > 59) {
        var timeInMinutes = Math.floor(timeInSeconds / 60);
        if (timeInMinutes > 59) {
            var timeInHours = Math.floor(timeInMinutes / 60);
            if (timeInHours > 23) {
                var timeInDays = Math.floor(timeInHours / 24);
                if (timeInDays > 6) {
                    var timeInWeeks = timeInDays / 7;
                    if (timeInWeeks > 3) {
                        return Math.trunc(timeInWeeks) + (timeFullText ? " weeks ago" : " wks");
                    } else {
                        if (timeInWeeks > 1) {
                            return Math.trunc(timeInWeeks) + (timeFullText ? " weeks ago" : " wks");
                        } else {
                            return Math.trunc(timeInWeeks) + (timeFullText ? " week ago" : " wk");
                        }
                    }
                } else {
                    if (timeInDays > 1) {
                        return Math.trunc(timeInDays) + (timeFullText ? " days ago" : " days");
                    } else {
                        return Math.trunc(timeInDays) + (timeFullText ? " day ago" : " day");
                    }
                }
            } else {
                if (timeInHours > 1) {
                    return Math.trunc(timeInHours) + (timeFullText ? " hours ago" : " hrs");
                } else {
                    return Math.trunc(timeInHours) + (timeFullText ? " hour ago" : " hr");
                }
            }
        } else {
            if (timeInMinutes > 1) {
                return Math.trunc(timeInHours) + (timeFullText ? " minutes ago" : " mins");
            } else {
                return Math.trunc(timeInHours) + (timeFullText ? " minute ago" : " min");
            }
        }
    } else {
        if (timeInSeconds <= 1) {
            return (timeFullText ? "Just Now" : "Now");
        } else {
            return Math.trunc(timeInSeconds) + (timeFullText ? " seconds ago" : " secs");
        }
    }    
}

export const appendScript = (scriptToAppend) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
}

export const removeScript = (scriptToRemove) => {
    let allSuspects = document.getElementsByTagName("script");

    for (let i = allSuspects.length; i >= 0; i--){
        if (allSuspects[i] && (allSuspects[i].getAttribute("src") !== null) 
            && (allSuspects[i].getAttribute("src").indexOf(`${scriptToRemove}`) !== -1)) {  
            allSuspects[i].parentNode.removeChild(allSuspects[i]);
        }    
    }
}


