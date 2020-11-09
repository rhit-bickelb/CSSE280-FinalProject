var rhit = rhit || {};

rhit.FB_KEY_DEV_NAME   = "deviceName";
rhit.FB_KEY_MAC        = "macAddress";
rhit.FB_KEY_ON         = "isOn";
rhit.FB_KEY_RED        = "red";
rhit.FB_KEY_GREEN      = "green";
rhit.FB_KEY_BLUE       = "blue";
rhit.FB_KEY_BRIGHTNESS = "brightness";
rhit.FB_KEY_EFFECT     = "effect";

rhit.fbAuthManager = null;
rhit.fbDeviceManager = null;

convertToHex = function (number) {
	intValue = parseInt(number, 10);
	return intValue.toString(16);

}

// From stackoverflow
function htmlToElement(html) {
	var template = document.createElement("template");
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.LoginPageController = class {
	constructor() {
		document.querySelector("#signUpModalButton").onclick = (event) => {
			const inputEmailEl = document.querySelector("#createEmail").value;
			const inputPasswordEl = document.querySelector("#createPassword").value;

			console.log(`create email ${inputEmailEl.value} create password ${inputPasswordEl.value}`)

			rhit.fbAuthManager.signUp(inputEmailEl, inputPasswordEl);
		}

		document.querySelector("#loginButton").onclick = (event) => {
			const emailInput = document.querySelector("#emailInput").value;
			const passwordInput = document.querySelector("#passwordInput").value;
			console.log(` email ${emailInput} create password ${passwordInput}`);

			rhit.fbAuthManager.signIn(emailInput, passwordInput);

		}

	}
}

rhit.HomePageController = class {
	constructor() {
		document.querySelector("#signOutButton").onclick = (event) => {

			rhit.fbAuthManager.signOut();
		}

		document.querySelector("#submitAdd").onclick = (event) => {
			const roomName = document.querySelector("#roomNameModal").value;
			const MACAddress = document.querySelector("#MACAddresModal").value;
			const redValue = document.querySelector("#colorRedModal").value;
			const greenValue = document.querySelector("#colorGreenModal").value;
			const blueValue = document.querySelector("#colorBlueModal").value;
			const brightValue = document.querySelector("#brightValueModal").value;
			const onOffvalue = document.querySelector("#onOffButtonModal").value;
			const buttonEffect = document.querySelector("#flashButtonModal").value; //flashButton stores the state of all the buttons
			rhit.fbDeviceManager.add(roomName, MACAddress, onOffvalue, redValue, greenValue, blueValue, brightValue, buttonEffect);

			console.log(roomName);
			console.log(MACAddress);
			console.log(redValue);
			console.log(greenValue);
			console.log(blueValue);
			console.log(brightValue);
			console.log(onOffvalue);
			console.log(buttonEffect);
		}

		//handel slider colors
		document.querySelector("#colorRed").onclick = (event) => {
			this.handleColors();
		}
		document.querySelector("#colorGreen").onclick = (event) => {
			this.handleColors();
		}
		document.querySelector("#colorBlue").onclick = (event) => {
			this.handleColors();
		}
		document.querySelector("#brightValue").onclick = (event) => {
			this.handleColors();
		}




		//handle device buttons
		document.querySelector("#onOffButton").onclick = (event) => {
			const button = document.querySelector("#onOffButton");
			console.log("Pressed ON/OFF Button");
			if (button.value == 1) {
				button.value = 0;
				button.innerHTML = "OFF";
				button.style.background = 'gray';
				return;
			}
			if (button.value == 0) {
				button.value = 1;
				button.innerHTML = "ON";
				button.style.background = '#FFF743';
				return;
			}
		}


		document.querySelector("#flashButton").onclick = (event) => {
			this.handleButtons(0);
		}
		document.querySelector("#fadeButton").onclick = (event) => {
			this.handleButtons(1);
		}
		document.querySelector("#crazyButton").onclick = (event) => {
			this.handleButtons(2);
		}
		document.querySelector("#noneButton").onclick = (event) => {
			this.handleButtons(3);
		}

		//handle modal buttons
		document.querySelector("#onOffButtonModal").onclick = (event) => {
			const button = document.querySelector("#onOffButtonModal");
			if (button.value == 1) {
				button.value = 0;
				button.innerHTML = "OFF";
				button.style.background = 'gray';
				return;
			}
			if (button.value == 0) {
				button.value = 1;
				button.innerHTML = "ON";
				button.style.background = '#FFF743';
				return;
			}
		}


		document.querySelector("#flashButtonModal").onclick = (event) => {
			this.handleModalButtons(0);
		}
		document.querySelector("#fadeButtonModal").onclick = (event) => {
			this.handleModalButtons(1);
		}
		document.querySelector("#crazyButtonModal").onclick = (event) => {
			this.handleModalButtons(2);
		}
		document.querySelector("#noneButtonModal").onclick = (event) => {
			this.handleModalButtons(3);
		}



		rhit.fbDeviceManager.beginListening(this.updateList.bind(this));
	}
	updateList() {
		const newList = htmlToElement('<div id="accordion2" class="pr-3 pl-3 pb-3">');

		console.log(rhit.fbDeviceManager.length);
		for (let i = 0; i < rhit.fbDeviceManager.length; i++) {
			const dev = rhit.fbDeviceManager.getDeviceAtIndex(i);
			const newCard = this._createCard(dev);
			console.log(dev);

			newList.appendChild(newCard);
		}

		const addNewChild = htmlToElement('<div class="card"><button id="headingOne" class="btn btn-link mb-0 card-header" data-toggle="modal"data-target="#addNewDeviceDialog" type="submit">Add New Device</button></div>');
		newList.appendChild(addNewChild);

		const oldList = document.querySelector("#accordion2");
		// oldList.removeAttribute("id");
		// oldList.hidden = true;

		oldList.parentElement.appendChild(newList);

		oldList.parentElement.removeChild(oldList);


		for (let i = 0; i < rhit.fbDeviceManager.length; i++) {
			const dev = rhit.fbDeviceManager.getDeviceAtIndex(i);
			this.handleColors(dev.id);
			const button = document.querySelector("#onOffButton" + dev.id);
			if (button.value == "0") {
				button.innerHTML = "OFF";
				button.style.background = 'gray';
			}
			else if (button.value == "1") {
				button.innerHTML = "ON";
				button.style.background = '#FFF743';
			}

			document.querySelector("#colorRed" + dev.id).onclick = (event) => {
				this.handleColors(dev.id);
				rhit.fbDeviceManager.updateSettings(dev.id,
					document.querySelector("#onOffButton" + dev.id).value,
					document.querySelector("#colorRed" + dev.id).value,
					document.querySelector("#colorGreen" + dev.id).value,
					document.querySelector("#colorBlue" + dev.id).value,
					document.querySelector("#brightValue" + dev.id).value,
					"3");
			}
			document.querySelector("#colorGreen" + dev.id).onclick = (event) => {
				this.handleColors(dev.id);
				rhit.fbDeviceManager.updateSettings(dev.id,
					document.querySelector("#onOffButton" + dev.id).value,
					document.querySelector("#colorRed" + dev.id).value,
					document.querySelector("#colorGreen" + dev.id).value,
					document.querySelector("#colorBlue" + dev.id).value,
					document.querySelector("#brightValue" + dev.id).value,
					"3");
			}
			document.querySelector("#colorBlue" + dev.id).onclick = (event) => {
				this.handleColors(dev.id);
				rhit.fbDeviceManager.updateSettings(dev.id,
					document.querySelector("#onOffButton" + dev.id).value,
					document.querySelector("#colorRed" + dev.id).value,
					document.querySelector("#colorGreen" + dev.id).value,
					document.querySelector("#colorBlue" + dev.id).value,
					document.querySelector("#brightValue" + dev.id).value,
					"3");
			}
			document.querySelector("#onOffButton" + dev.id).onclick = (event) => {
				const button = document.querySelector("#onOffButton" + dev.id);
				console.log("Pressed ON/OFF Button");
				if (button.value == "1") {
					console.log("Turned Off");
					button.value = "0";
					button.innerHTML = "OFF";
					button.style.background = 'gray';
				}
				else if (button.value == "0") {
					console.log("Turned On");
					button.value = "1";
					button.innerHTML = "ON";
					button.style.background = '#FFF743';
				}
				rhit.fbDeviceManager.updateSettings(dev.id,
					document.querySelector("#onOffButton" + dev.id).value,
					document.querySelector("#colorRed" + dev.id).value,
					document.querySelector("#colorGreen" + dev.id).value,
					document.querySelector("#colorBlue" + dev.id).value,
					document.querySelector("#brightValue" + dev.id).value,
					"3");
			}
			document.querySelector("#deleteButton" + dev.id).onclick = (event) => {
				rhit.fbDeviceManager.delete(dev.id);
			}
			document.querySelector("#flashButton" + dev.id).onclick = (event) => {
				// this.handleButtons(dev.id, 0)
			}
			document.querySelector("#fadeButton" + dev.id).onclick = (event) => {
				// this.handleButtons(dev.id, 1)
			}
			document.querySelector("#crazyButton" + dev.id).onclick = (event) => {
				// this.handleButtons(dev.id, 2)
			}
			document.querySelector("#noneButton" + dev.id).onclick = (event) => {
				// this.handleButtons(dev.id, 3)
			}
			document.querySelector("#brightValue" + dev.id).onclick = (event) => {
				rhit.fbDeviceManager.updateSettings(dev.id,
					document.querySelector("#onOffButton" + dev.id).value,
					document.querySelector("#colorRed" + dev.id).value,
					document.querySelector("#colorGreen" + dev.id).value,
					document.querySelector("#colorBlue" + dev.id).value,
					document.querySelector("#brightValue" + dev.id).value,
					"3");
			}
		}
	}

	// handleButtons(modalPressed) {
	// 	let effectButtons = [document.querySelector("#flashButton"),
	// 		document.querySelector("#fadeButton"),
	// 		document.querySelector("#crazyButton"),
	// 		document.querySelector("#noneButton")
	// 	];

	// 	for (let i = 0; i < effectButtons.length; i++) {
	// 		effectButtons[i].style.background = "none";
	// 	}


	// 	switch (modalPressed) {
	// 		case 0:
	// 			effectButtons[0].style.background = "gray";
	// 			effectButtons[0].value = 0;
	// 			break;
	// 		case 1:
	// 			effectButtons[1].style.background = "gray";
	// 			effectButtons[0].value = 1;
	// 			break;
	// 		case 2:
	// 			effectButtons[2].style.background = "gray";
	// 			effectButtons[0].value = 2;
	// 			break;
	// 		case 3:
	// 			effectButtons[3].style.background = "gray";
	// 			effectButtons[0].value = 3;
	// 			break;
	// 	}

	// }

	handleColors(deviceID) {
		let redVal = convertToHex(document.querySelector("#colorRed" + deviceID).value);
		let greenVal = convertToHex(document.querySelector("#colorGreen" + deviceID).value);
		let blueVal = convertToHex(document.querySelector("#colorBlue" + deviceID).value);
		// let brightVal = convertToHex(100 * document.querySelector("#brightValue" + deviceID).value);

		if (redVal.length == 1) {
			redVal = "0" + redVal;
		}
		if (greenVal.length == 1) {
			greenVal = "0" + greenVal;
		}
		if (blueVal.length == 1) {
			blueVal = "0" + blueVal;
		}

		document.querySelector("#headingOne" + deviceID).style.backgroundColor = `#${redVal}${greenVal}${blueVal}`;
	}

	_createCard(dev) {
		return htmlToElement(`<div class="card">
        <div class="card-header" id="headingOne${dev.id}" color="#00000000">
          <h5 id="dropdownHeader" class="mb-0">
            <div>${dev.deviceName}</div>
            <button class="btn btn-link mb-0" data-toggle="collapse" data-target="#${dev.id}" aria-expanded="true"
              aria-controls="${dev.id}">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </h5>
        </div>

        <div id="${dev.id}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
          <div id="sliderWrapper">
            <div id="sliderR">
              <div class="slider-wrapper" id="redSlider">
                <input id="colorRed${dev.id}" type="range" min="0" max="255" value="${dev.red}" step="1">
              </div>
              <div id="sliderName">R</div>
            </div>
            <div id="sliderG">
              <div class="slider-wrapper" id="greenSlider">
                <input id="colorGreen${dev.id}" type="range" min="0" max="255" value="${dev.green}" step="1">
              </div>
              <div id="sliderName">G</div>
            </div>
            <div id="sliderB">
              <div class="slider-wrapper" id="blueSlider">
                <input id="colorBlue${dev.id}" type="range" min="0" max="255" value="${dev.blue}" step="1">
              </div>
              <div id="sliderName">B</div>
            </div>
            <div id="sliderBright">
              <div class="slider-wrapper" id="brightnessSlider">
                <input id="brightValue${dev.id}" type="range" min="0" max="1" value="${dev.brightness}" step="0.01">
              </div>
              <div id="sliderName"><i class="material-icons">wb_sunny</i></div>
            </div>
            <div id="buttonDiv">
              <button id="onOffButton${dev.id}" class="btn btn-link mb-0 mr-2" value=${dev.isOn}>
                ON
              </button>
            </div>
          </div>
          <div class="pt-3">Effect:</div>
          <div id="buttonWrapper">
            <button id="flashButton${dev.id}" class="btn btn-link mb-0 p-1">
              FLASH
            </button>
            <button id="fadeButton${dev.id}" class="btn btn-link mb-0 p-1">
              FADE
            </button>
            <button id="crazyButton${dev.id}" class="btn btn-link mb-0 p-1">
              CRAZY
            </button>
            <button id="noneButton${dev.id}" class="btn btn-link mb-0 p-1">
              NONE
            </button>
            <button id="deleteButton${dev.id}" class="btn btn-link m-0 p-1 deleteButtonClass">
              DELETE
            </button>
          </div>
        </div>
      </div>`);
	}

	// handleButtons(modalPressed) {
	// 	let effectButtons = [document.querySelector("#flashButton"),
	// 		document.querySelector("#fadeButton"),
	// 		document.querySelector("#crazyButton"),
	// 		document.querySelector("#noneButton")
	// 	];

	// 	for (let i = 0; i < effectButtons.length; i++) {
	// 		effectButtons[i].style.background = "none";
	// 	}


	// 	switch (modalPressed) {
	// 		case 0:
	// 			effectButtons[0].style.background = "gray";
	// 			effectButtons[0].value = 0;
	// 			break;
	// 		case 1:
	// 			effectButtons[1].style.background = "gray";
	// 			effectButtons[0].value = 1;
	// 			break;
	// 		case 2:
	// 			effectButtons[2].style.background = "gray";
	// 			effectButtons[0].value = 2;
	// 			break;
	// 		case 3:
	// 			effectButtons[3].style.background = "gray";
	// 			effectButtons[0].value = 3;
	// 			break;
	// 	}

	// }

	handleModalButtons(modalPressed) {
		let effectButtons = [document.querySelector("#flashButtonModal"),
			document.querySelector("#fadeButtonModal"),
			document.querySelector("#crazyButtonModal"),
			document.querySelector("#noneButtonModal")
		];

		for (let i = 0; i < effectButtons.length; i++) {
			effectButtons[i].style.background = "none";
		}


		switch (modalPressed) {
			case 0:
				effectButtons[0].style.background = "gray";
				effectButtons[0].value = 0;
				break;
			case 1:
				effectButtons[1].style.background = "gray";
				effectButtons[0].value = 1;
				break;
			case 2:
				effectButtons[2].style.background = "gray";
				effectButtons[0].value = 2;
				break;
			case 3:
				effectButtons[3].style.background = "gray";
				effectButtons[0].value = 3;
				break;
		}

	}

	handleColorsOLD() {
		// let redVal = convertToHex(document.querySelector("#colorRed").value);
		let redVal = "255";
		let greenVal = convertToHex(document.querySelector("#colorGreen").value);
		let blueVal = convertToHex(document.querySelector("#colorBlue").value);
		let brightVal = convertToHex(100 * document.querySelector("#brightValue").value);

		console.log("Here");

		if (redVal.length == 1) {
			redVal = "0" + redVal;
		}
		if (greenVal.length == 1) {
			greenVal = "0" + greenVal;
		}
		if (blueVal.length == 1) {
			blueVal = "0" + blueVal;
		}

		document.querySelector("#headingOne").color = `#${redVal}${greenVal}${blueVal}${brightVal}`;
		// document.querySelector("#headingOne").style.backgroundColor = `#${redVal}${greenVal}${blueVal}${brightVal}`; // I don't think brightness should have an affect on the visuals
		document.querySelector("#headingOne").style.backgroundColor = `#${redVal}${greenVal}${blueVal}`;

	}
}


rhit.Device = class {
	constructor(id, deviceName, isOn, red, green, blue, brightness, effect) {
		this.id = id;
		this.deviceName = deviceName;
		this.isOn = isOn;
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.brightness = brightness;
		this.effect = effect;
	}
}


rhit.FBDeviceManager = class {
	constructor(uid) {

		this._uid = uid;
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(`/${this._uid}`);
		// this._ref.add({
		// 	"MACaddress": "00:0a:95:9d:68:16"
		// })
		this._unsubscribed = null;

	}
	add(name, macAddress, isOn, red, green, blue, brightness, effect) {
		this._ref.add({
				[rhit.FB_KEY_DEV_NAME]: name,
				[rhit.FB_KEY_MAC]: macAddress,
				[rhit.FB_KEY_ON]: isOn,
				[rhit.FB_KEY_RED]: red,
				[rhit.FB_KEY_GREEN]: green,
				[rhit.FB_KEY_BLUE]: blue,
				[rhit.FB_KEY_BRIGHTNESS]: brightness,
				[rhit.FB_KEY_EFFECT]: effect,
			})
			.then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
	}
	beginListening(changeListener) {
		let query = this._ref;
		console.log(this._ref);
		this._unsubscribed = query.onSnapshot((querySnapshot) => {


			this._documentSnapshots = querySnapshot.docs;
			console.log(querySnapshot.docs);

			changeListener();
			//prints updates
			// querySnapshot.forEach( (doc) =>{
			// 	console.log(doc.data()); 
			// });

		});


	}
	stopListening() {
		this._unsubscribed();
	}
	updateName(name) {
		this._ref.update({
			[rhit.FB_KEY_DEV_NAME]: name,
		})
		.then(() => {
			console.log("Document successfully updated! ");
		})
		.catch(function(error) {
			console.error("Error updating document: ", error);
		});
	}
	updateSettings(uid, isOn, red, green, blue, brightness, effect) {
		this._ref.doc(uid).update({
			[rhit.FB_KEY_ON]: isOn,
			[rhit.FB_KEY_RED]: red,
			[rhit.FB_KEY_GREEN]: green,
			[rhit.FB_KEY_BLUE]: blue,
			[rhit.FB_KEY_BRIGHTNESS]: brightness,
			[rhit.FB_KEY_EFFECT]: effect,
		})
		.then(() => {
			console.log("Document successfully updated! ");
		})
		.catch(function(error) {
			console.error("Error updating document: ", error);
		});
	}
	delete(uid) {
		return this._ref.doc(uid).delete();
	}
	get length() {
		return this._documentSnapshots.length;
	}
	// id, deviceName, isOn, red, green, blue, brightness, effect
	getDeviceAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const dev = new rhit.Device(
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_DEV_NAME),
			docSnapshot.get(rhit.FB_KEY_ON),
			docSnapshot.get(rhit.FB_KEY_RED),
			docSnapshot.get(rhit.FB_KEY_GREEN),
			docSnapshot.get(rhit.FB_KEY_BLUE),
			docSnapshot.get(rhit.FB_KEY_BRIGHTNESS),
			docSnapshot.get(rhit.FB_KEY_EFFECT),
		);
		return dev;
	}
}

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;

	}

	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
			this._user = user;
			changeListener();
		});
	}

	signUp(email, password) {

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Errors on account", errorCode, errorMessage, email);
			return;
		});

	}

	signIn(email, password) {

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Login on account errors", errorCode, errorMessage);
		});

	}

	signOut() {
		firebase.auth().signOut().catch((error) => {
			console.log("sign out error")
		});
	}

	get isSignedIn() {
		return !!this._user;
	}
	get uid() {
		return this._user.uid;
	}

}

rhit.checkForRedirects = function () {
	if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
		window.location.href = `/homePage.html?uid=${rhit.fbAuthManager.uid}`;

	}

	if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
		window.location.href = `/`;

	}

}


rhit.initalizePage = function () {
	const urlParams = new URLSearchParams(window.location.search);
	if (document.querySelector("#loginPage")) {
		new rhit.LoginPageController();
	}
	if (document.querySelector("#homePage")) {
		const uid = urlParams.get("uid");
		console.log("url param", uid)
		rhit.fbDeviceManager = new rhit.FBDeviceManager(uid);
		new rhit.HomePageController();
	}
}


/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbAuthManager.beginListening(() => {
		rhit.initalizePage();
		rhit.checkForRedirects();
	});
};

rhit.main();