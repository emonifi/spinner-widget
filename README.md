## Wetransfer Spinner Widget
this is my implementation of a basic spinner that replicates the look and feel of the wetransfer spinner. I implemented it in vanilla JS

## How to use
The widget is relatively easy to put onto any page. Just import the css and js
<script src="spinner.js" ></script>
<link rel="stylesheet" href="spinner.css">

from there you can call the constructor using the element ID that you want to add the widget to

new Spinner("spinner-widget");

Optional Params:
constructor(spinnerId, showButtons = true, showPercent = true, startButtonName = "Begin Download", endButtonName = "Cancel", spinTime = 10000)

showButtons: whether or not you want to show the start/stop button. if this is false, then the spinner will automatically start when created. 
			Default: true
showPercent: whether or not to show the percent in the middle of the download wheel. (by removing both the percent and the buttons, this can function like a normal page spinner!)
			Default: true
startButtonName: the name for the start button. 
			Default: "Begin Download"
endButtonName: the name for the start button. 
			Default: "Begin Download"
spinTime: amount of time it should take for % to reach 100%. Unit is ms
			Default: 10000


## Where you can play with it
Download the source code, double click reusable-spinner.html  
You can modify the constructor in the html file if you would like to change the behavior


## Areas for improvement
Allow for unlimited spinning. This would make this more useful as a page spinner. You could get it to spin indefinitely until you are ready and call the endLoad() method

Allow for an external source to define the % value in the spinner dynamically. A fixed time and % isnt super useful, but fine for a first implementation.

Dynamic sizing. Currently the spinner has a single size. It would be useful to allow the spinner to automatically adjust it's size based on either passed parameters or auto sizing based on the container

Add Testing! I was told to not take too much time on this project so i did skimp out on testing. Sorry!
