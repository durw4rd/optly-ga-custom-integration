## Google Universal Analytics (Debugger) Integration

This analytics integration expands on the functionality of the default integration. It can attach the integration string to any GA tracker it finds on the page so it works well also i.e. if GTM is used and the tracker name is not fixed. 

The integration allows you to enable troubleshooting custom events in order to identify potential reasons for discrepencies between Optimizely and Universal analytics.

Custom GA integration featuring: 
 -   200 selectable custom dimensions 
 -   Option to provide custom tracker name
 -   Option to specify GA tracking ID
 -   Option to specify GA variable name
 -   Measuring the time difference between Optimizely & GA tracking events
 -   Customizable polling period
 -   Debug events & debug logs


## Setup

1.	Use config.json to import this custom analytics integration.

2.	Create 5 custom events within your project using the folowing API names:
	-	ga_object_found
    -   failed_to_find_ga
    -   set_ga_event
    -   sent_ga_event
    -   ga_error

3. Use the above custom events to define the troubleshooting metrics within your metrics builder for the experiment you want to troubleshoot. 
    -   For each event, I recommend setting up a metric measuring total & unique conversions. 
    -   For the the 'sent_ga_event' also create a metric measuring 'total value' per 'conversion'. This will track the difference between the time Optimizely bucketed a user into the experiment and sending the tracking event to GA.

4. Enable this integration for the experiment you would like to troubleshoot.

## Settings

* **Custom Dimension**: GA Custom Dimension Slot.
* **Custom Tracker Name** (Optional): Define the tracker name to be used by the integration. Can be left empty if you don't have a preference. The integration will then pick any available GA tracker.
* **GA Tracking ID** (Optional): You can provide a GA Tracking ID to which the selected GA tracker should be associated. Applicable if you have multiple GA tracking IDs on your website.
* **Google variable** (Optional): By default, the integration expects to be able to find the GA object variable at `window.ga`. If you are using a different GA variable name, provide it here.
* **Polling Time**: How long do you want to wait for the GA object. Default is 10s - similar the the out-of-the-box GA integration.
* **Debug events**: Set to TRUE if you wish to fire the debug events.
* **Debug logs**: Set to TRUE if you wish to see the additional logs printed by the integration in the browser console.