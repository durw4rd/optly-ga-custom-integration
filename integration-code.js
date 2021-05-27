var logEnabled = extension.logEnabled;
var debugEvents = extension.debugEvents;
var timeoutInterval = 100;
var maxWait = extension.pollingTime;
var waited = 0;
var GoogleVariable = extension.GoogleVariable || window.ga;

function trackOptlyEvent(name, tags) {
    try {
        if (debugEvents) {
            tags = tags || {};
            window.optimizely.push({
                "type": "event",
                "eventName": name,
                "tags": tags
            });
        }
    } catch (error) {
        console.log(error);
    }
}

try {
    (function () {
        function integrationLog(msg) {
            if (logEnabled) {
                console.log(msg);
            }
        }

        function waitForGaEventApi(method) {            
            if (GoogleVariable && GoogleVariable.getAll) {
                method();
            } else {
                if (waited < maxWait) {
                    setTimeout(function () {
                        waited = waited + timeoutInterval;
                        waitForGaEventApi(method);
                    }, timeoutInterval);
                } else {
                    trackOptlyEvent("failed_to_find_ga");
                    integrationLog("Failed to find the GA object. Google variable used: " + GoogleVariable);
                }
            }
        }

        var decisionString = optimizely.get('state').getDecisionString({
            campaignId: campaignId,
            shouldCleanString: true,
            maxLength: 255
        });

        waitForGaEventApi(function () {
            if (!!decisionString) {
                integrationLog("Preparing to send the decision event to GA.");
                // send event to GA
                // edit the 'fieldObject' properties as needed
                var fieldsObject = { nonInteraction: true };
                fieldsObject[extension.customDimension] = decisionString;
                integrationLog(fieldsObject);

                // check the GA tracking ID associated with every tracker and select a tracker accordingly
                if (!!extension.trackingID) {
                    integrationLog("Tracking ID is set to: " + extension.trackingID);
                    var GAtrackers = GoogleVariable.getAll();
                    var trackerObjects = [];
                    for (i = 0; i < GAtrackers.length; i++) {
                        var trackerObject = {};
                        trackerObject['trackerName'] = GoogleVariable.getAll()[i].get('name');
                        trackerObject['trackingID'] = GoogleVariable.getAll()[i].get('trackingId');
                        trackerObjects.push(trackerObject);
                    }
                    var matchingTrackerObjects = trackerObjects.filter(function (trackerObject) {
                        return trackerObject.trackingID == extension.trackingID;
                    });
                    if (matchingTrackerObjects.length == 0) {
                        integrationLog("No tracker with associated to the selected GA Tracking ID found! NOT sending the GA event.");
                        return;
                    } else {
                        var prefix = extension.customTrackerName || matchingTrackerObjects[0].name;
                    }
                } else {
                  	// use any available tracker
                    var prefix = extension.customTrackerName || GoogleVariable.getAll()[0].get('name');
                }
                integrationLog("Name of the tracker used by the integration: " + prefix);

                GoogleVariable(prefix + '.set', extension.customDimension, decisionString);
                trackOptlyEvent("set_ga_event");
                GoogleVariable(prefix + '.send', "event", "Optimizely", "Campaign decided", fieldsObject);
                trackOptlyEvent("sent_ga_event", {
                    value: waited
                });
                integrationLog("GA event sent. Time waited: " + waited);
            }
        });
    })();
} catch (error) {
    trackOptlyEvent("ga_error", {
        errormessage: error.message
    });
    integrationLog("Error encountered when trying to send the GA event: " + error.message);
}