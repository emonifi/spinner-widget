class Spinner {

	constructor(spinnerId, showButtons = true, showPercent = true, startButtonName = "Begin Download", endButtonName = "Cancel", spinTime = 10000) {
		this.svgns = 'http://www.w3.org/2000/svg'; //required to create svgs

		this.showButtons = showButtons;
		this.showPercent = showPercent;
		this.spinTime = spinTime;

		this.spinnerWidget = document.getElementById(spinnerId);
		if (!this.spinnerWidget)
			alert(spinnerId + " container doesnt exist");

		this.spinnerContainer = document.createElement("div");
		this.spinnerContainer.classList.add("spinner-container");
		this.spinnerWidget.appendChild(this.spinnerContainer);

		//create SVG element
		this.spinnerSVG = document.createElementNS(this.svgns, 'svg');
		this.spinnerSVG.setAttribute("viewBox", "0 0 100 100");

		//create static grey circle
		this.staticCircle = document.createElementNS(this.svgns, "circle");
		this.staticCircle.classList.add("spinner-static-circle");
		this.staticCircle.setAttribute("cx", "50%");
		this.staticCircle.setAttribute("cy", "50%");
		this.staticCircle.setAttribute("r", "40");
		this.spinnerSVG.appendChild(this.staticCircle);

		//create spinning blue circle
		this.spinningCircle = document.createElementNS(this.svgns, "circle");
		this.spinningCircle.classList.add("spinner-blue-dash");
		this.spinningCircle.setAttribute("cx", "50%");
		this.spinningCircle.setAttribute("cy", "50%");
		this.spinningCircle.setAttribute("r", "40");
		this.spinnerSVG.appendChild(this.spinningCircle);

		//add svg to container
		this.spinnerContainer.appendChild(this.spinnerSVG);
		
		if (this.showButtons) {
			this.createButtons(startButtonName, endButtonName);
		} else {
			this.startSpinner();
		}

		this.createPercent();
	}

	//allows for destruction of widget, if loading is complete
	endLoad() {
		this.spinnerContainer.remove();
		if (this.showButtons) {
			this.startButton.remove();
			this.endButton.remove();
		}
	}

	createPercent() {
		if (this.showPercent) {
			this.percent = document.createElement("div");
			this.percent.classList.add("spinner-percent");
			this.percent.textContent = "0%";
			this.spinnerContainer.appendChild(this.percent);
		}
	}

	updatePercent() {
		let elapsedTime = 0;

		//on first call, set the start time
		if (!this.startTime) {
			this.startTime = new Date().getTime();
		} else {
			//calculate how much time has passed
			elapsedTime = new Date().getTime() - this.startTime;
		}
		
		let percent = Math.floor(elapsedTime/this.spinTime * 100)
		
		//spinner is complete
		if (percent >= 100) {
			clearInterval(this.percentInterval);
			percent = 100; //shouldnt display more than 100

			//remove cancel button and stop spinning because we are done!
			if (this.showButtons) {
				this.endButton.classList.add("hide");
			}
			this.spinningCircle.classList.remove("spinning-dash");
		}

		if (this.showPercent)
			this.percent.textContent = percent + "%";


	}

	createButtons(startButtonName, endButtonName) {
		this.startButton = document.createElement("button");
		this.startButton.classList.add("spinner-button");
		this.startButton.textContent = startButtonName;
		this.startButton.onclick = this.startSpinner;
		this.spinnerWidget.appendChild(this.startButton);

		this.endButton = document.createElement("button");
		this.endButton.classList.add("spinner-button");
		this.endButton.classList.add("hide");
		this.endButton.textContent = endButtonName;
		this.endButton.onclick = this.endSpinner;
		this.spinnerWidget.appendChild(this.endButton);
	}

	startSpinner = () => { //ensure this is binded to class for onclick
		if (this.showButtons) {
			this.startButton.classList.add("hide");
			this.endButton.classList.remove("hide");
		}

		this.spinningCircle.classList.add("spinning-dash");
		this.percentInterval = setInterval(this.updatePercent.bind(this), 10);
	}

	endSpinner = () => { //ensure this is binded to class for onclick
		if (this.showButtons) {
			this.endButton.classList.add("hide");
			this.startButton.classList.remove("hide");
		}

		if (this.showPercent)
			this.percent.textContent = "0%";

		this.spinningCircle.classList.remove("spinning-dash");

		clearInterval(this.percentInterval);
		this.startTime = null;
	}
}