
var rhit = rhit || {};

rhit.LoginPageController = class {
	constructor() {

  


	document.querySelector("#signUpButton").onclick = (event) =>{
		const inputEmailEl = document.querySelector("#createUsername");
		const inputPasswordEl = document.querySelector("#createPassword");
		console.log(`create email ${inputEmailEl.value} create password ${inputPasswordEl.value}`)
		firebase.auth().createUserWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Errors on account", errorCode, errorMessage);
		  });

	}

	document.querySelector("#logInButton").onclick = (event) =>{
		const usernameInput = document.querySelector("#usernameInput");
		const passwordInput = document.querySelector("#passwordInput"); 
		console.log(`create email ${usernameInput.value} create password ${passwordInput.value}`)
		firebase.auth().signInWithEmailAndPassword(usernameInput.value, passwordInput.value).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Login on account errors", errorCode, errorMessage);
		  });
	}

	}
}

rhit.HomePageController = class {
	constructor() {
		document.querySelector("#signOutButton").onclick = (event) =>{
		
			firebase.auth().signOut().then(function() {
				console.log("sign out succesful")
			  }).catch(function(error) {
				console.log("sign out error")
			  });
		}

	}
	updateList(){

	}
}


rhit.Device = class {
	constructor() {

	}
}


rhit.FBDeviceManager = class {
	constructor() {

	}
	add(){

	}
	beginListening(){

	}
	stopListening(){

	}
	updateName(){

	}
	updateSettings(){

	}
	delete(){
		
	}
}

rhit.FbAuthManager = class{
	constructor(){

	}


}


rhit.initalizePage = function(){

}


/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	rhit.fbAuthManager = new rhit.FbAuthManager();
	fbAuthManager.beginListening(()=>{
		rhit.initalizePage(); 
	});
};

rhit.main();
