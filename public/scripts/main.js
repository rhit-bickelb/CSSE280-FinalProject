var rhit = rhit || {};

rhit.fbAuthManager = null;
rhit.fbDeviceManager = null;

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
			// rhit.fbDeviceManager.add();

			// console.log(roomName);
			// console.log(MACAddress);
			// console.log(redValue);
			// console.log(greenValue);
			// console.log(blueValue);
			// console.log(brightValue);
		}

		//handle device buttons
		document.querySelector("#onOffButton").onclick = (event) =>{
			const button = document.querySelector("#onOffButton");
			if(button.value == 1)
			{
				button.value = 0;
				button.innerHTML = "OFF";
				button.style.background = 'gray'; 
				return;
			}
			if(button.value == 0)
			{
				button.value = 1;
				button.innerHTML = "ON";
				button.style.background = '#FFF743';
				return; 
			}
		}


		document.querySelector("#flashButton").onclick = (event) =>{
			this.handalButtons(0);			
		}
		document.querySelector("#fadeButton").onclick = (event) =>{
			this.handalButtons(1);	
		}
		document.querySelector("#crazyButton").onclick = (event) =>{
			this.handalButtons(2);				
		}
		document.querySelector("#noneButton").onclick = (event) =>{
			this.handalButtons(3);				
		}

		//handle modal buttons
		document.querySelector("#onOffButtonModal").onclick = (event) =>{
			const button = document.querySelector("#onOffButtonModal");
			if(button.value == 1)
			{
				button.value = 0;
				button.innerHTML = "OFF";
				button.style.background = 'gray'; 
				return;
			}
			if(button.value == 0)
			{
				button.value = 1;
				button.innerHTML = "ON";
				button.style.background = '#FFF743';
				return; 
			}
		}


		document.querySelector("#flashButtonModal").onclick = (event) =>{
			this.handalModalButtons(0);			
		}
		document.querySelector("#fadeButtonModal").onclick = (event) =>{
			this.handalModalButtons(1);	
		}
		document.querySelector("#crazyButtonModal").onclick = (event) =>{
			this.handalModalButtons(2);				
		}
		document.querySelector("#noneButtonModal").onclick = (event) =>{
			this.handalModalButtons(3);				
		}

		

		rhit.fbDeviceManager.beginListening(this.updateList.bind(this));
	}
	updateList() {

	}

	handalButtons(modalPressed){
		let effectButtons = [document.querySelector("#flashButton"),
		document.querySelector("#fadeButton"),
		document.querySelector("#crazyButton"),
		document.querySelector("#noneButton")]; 
		
		for(let i =0; i<effectButtons.length; i++)
		{
			effectButtons[i].style.background = "none";
		}


		switch(modalPressed){
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

	 handalModalButtons(modalPressed){
		let effectButtons = [document.querySelector("#flashButtonModal"),
		document.querySelector("#fadeButtonModal"),
		document.querySelector("#crazyButtonModal"),
		document.querySelector("#noneButtonModal")]; 
		
		for(let i =0; i<effectButtons.length; i++)
		{
			effectButtons[i].style.background = "none";
		}


		switch(modalPressed){
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
}


rhit.Device = class {
	constructor() {

	}
}


rhit.FBDeviceManager = class {
	constructor(uid) {

		this._uid = uid;
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(`/${this._uid}`);
		this._ref.add({ "intialValueToCreateDoc": "Should Be removed after one device is added" })
		console.log(this._ref);
		this._unsubscribed = null;

	}
	add() {

	}
	beginListening(changeListener) {
		let query = this._ref;
		this._unsubscribed = query.onSnapshot((querySnapshot) => {


			this._documentSnapshots = querySnapshot.docs;

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
	updateName() {

	}
	updateSettings() {

	}
	delete() {

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
