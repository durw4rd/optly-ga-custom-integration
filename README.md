## Google Universal Analytics (Debugger) Integration

This analytics integration expands on the functionality of the default integration. It can attach the integration string to any GA tracker it finds on the page so it works well also i.e. if GTM is used and the tracker name is not fixed. 

The integration allows you to enable troubleshooting custom events in order to identify potential reasons for discrepencies between Optimizely and Universal analytics.

Custom GA integration featuring: 
    -   200 selectable custom dimensions 
    -   Option to provide custom tracker name
    -   Option to specifi GA tracking ID
    -   Tracking of the time difference between when Optimizely & GA load
    -   Customizable polling period
    -   Debug events & debug logs


## Setup

1.	Use config.json to import this custom analytics integration.

2.	Create 4 custom events within your project using the folowing API names:
	-	failed_to_find_ga
    -   set_ga_event
    -   sent_ga_event
    -   ga_error


4. Use the above custom events to define the troubleshooting metrics within your metrics builder for the experiment you want to troubleshoot. For each event, I recommend setting up a metric measuring total & unique conversions. For the the 'sent_ga_event' also create a metric measuring 'total value' per 'conversion'. This will track the difference between the time Optimizely bucketed a user into the experiment and sending the tracking event to GA.

5. Enable this integration for the experiment you would like to troubleshoot.

## Settings

* **Custom Dimension**: GA Custom Dimension Slot.
* **Custom Tracker Name**: GA tracker name if you are not using the default GA tracker name. Also fine to leave empty if you don't have preference regarding the tracker that will be used by the integration.
* **Polling Time**: How long do you want to wait for the GA object. Default is 10s - similar the the out-of-the-box GA integration.
* **Debug events**: Set to TRUE if you wish to fire the debug events.
* **Debug logs**: Set to TRUE if you wish to see the additional logs printed by the integration.