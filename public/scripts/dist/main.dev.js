"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rhit = rhit || {};
rhit.fbAuthManager = null;
rhit.fbDeviceManager = null;

convertToHex = function convertToHex(number) {
  intValue = parseInt(number, 10);
  return intValue.toString(16);
};

rhit.LoginPageController =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    document.querySelector("#signUpModalButton").onclick = function (event) {
      var inputEmailEl = document.querySelector("#createEmail").value;
      var inputPasswordEl = document.querySelector("#createPassword").value;
      console.log("create email ".concat(inputEmailEl.value, " create password ").concat(inputPasswordEl.value));
      rhit.fbAuthManager.signUp(inputEmailEl, inputPasswordEl);
    };

    document.querySelector("#loginButton").onclick = function (event) {
      var emailInput = document.querySelector("#emailInput").value;
      var passwordInput = document.querySelector("#passwordInput").value;
      console.log(" email ".concat(emailInput, " create password ").concat(passwordInput));
      rhit.fbAuthManager.signIn(emailInput, passwordInput);
    };
  }

  return _class;
}();

rhit.HomePageController =
/*#__PURE__*/
function () {
  function _class2() {
    var _this = this;

    _classCallCheck(this, _class2);

    document.querySelector("#signOutButton").onclick = function (event) {
      rhit.fbAuthManager.signOut();
    };

    document.querySelector("#submitAdd").onclick = function (event) {
      var roomName = document.querySelector("#roomNameModal").value;
      var MACAddress = document.querySelector("#MACAddresModal").value;
      var redValue = document.querySelector("#colorRedModal").value;
      var greenValue = document.querySelector("#colorGreenModal").value;
      var blueValue = document.querySelector("#colorBlueModal").value;
      var brightValue = document.querySelector("#brightValueModal").value;
      var onOffvalue = document.querySelector("#onOffButtonModal").value;
      var buttonEffect = document.querySelector("#flashButtonModal").value; //flashButton stores the state of all the buttons
      // rhit.fbDeviceManager.add();
      // console.log(roomName);
      // console.log(MACAddress);
      // console.log(redValue);
      // console.log(greenValue);
      // console.log(blueValue);
      // console.log(brightValue);
    }; //handel slider colors


    document.querySelector("#colorRed").onclick = function (event) {
      _this.handelColors();
    };

    document.querySelector("#colorGreen").onclick = function (event) {
      _this.handelColors();
    };

    document.querySelector("#colorBlue").onclick = function (event) {
      _this.handelColors();
    };

    document.querySelector("#brightValue").onclick = function (event) {
      _this.handelColors();
    }; //handle device buttons


    document.querySelector("#onOffButton").onclick = function (event) {
      var button = document.querySelector("#onOffButton");

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
    };

    document.querySelector("#flashButton").onclick = function (event) {
      _this.handalButtons(0);
    };

    document.querySelector("#fadeButton").onclick = function (event) {
      _this.handalButtons(1);
    };

    document.querySelector("#crazyButton").onclick = function (event) {
      _this.handalButtons(2);
    };

    document.querySelector("#noneButton").onclick = function (event) {
      _this.handalButtons(3);
    }; //handle modal buttons


    document.querySelector("#onOffButtonModal").onclick = function (event) {
      var button = document.querySelector("#onOffButtonModal");

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
    };

    document.querySelector("#flashButtonModal").onclick = function (event) {
      _this.handalModalButtons(0);
    };

    document.querySelector("#fadeButtonModal").onclick = function (event) {
      _this.handalModalButtons(1);
    };

    document.querySelector("#crazyButtonModal").onclick = function (event) {
      _this.handalModalButtons(2);
    };

    document.querySelector("#noneButtonModal").onclick = function (event) {
      _this.handalModalButtons(3);
    };

    rhit.fbDeviceManager.beginListening(this.updateList.bind(this));
  }

  _createClass(_class2, [{
    key: "updateList",
    value: function updateList() {}
  }, {
    key: "handalButtons",
    value: function handalButtons(modalPressed) {
      var effectButtons = [document.querySelector("#flashButton"), document.querySelector("#fadeButton"), document.querySelector("#crazyButton"), document.querySelector("#noneButton")];

      for (var i = 0; i < effectButtons.length; i++) {
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
  }, {
    key: "handalModalButtons",
    value: function handalModalButtons(modalPressed) {
      var effectButtons = [document.querySelector("#flashButtonModal"), document.querySelector("#fadeButtonModal"), document.querySelector("#crazyButtonModal"), document.querySelector("#noneButtonModal")];

      for (var i = 0; i < effectButtons.length; i++) {
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
  }, {
    key: "handelColors",
    value: function handelColors() {
      var redVal = convertToHex(document.querySelector("#colorRed").value);
      var greenVal = convertToHex(document.querySelector("#colorGreen").value);
      var blueVal = convertToHex(document.querySelector("#colorBlue").value);
      var brightVal = convertToHex(100 * document.querySelector("#brightValue").value);
      document.querySelector("#headingOne").color = "#".concat(redVal).concat(greenVal).concat(blueVal).concat(brightVal);
      document.querySelector("#headingOne").style.backgroundColor = "#".concat(redVal).concat(greenVal).concat(blueVal).concat(brightVal);
      console.log(redVal);
      console.log(greenVal);
      console.log(blueVal);
      console.log(brightVal);
      console.log(document.querySelector("#headingOne").color);
    }
  }]);

  return _class2;
}();

rhit.Device =
/*#__PURE__*/
function () {
  function _class3() {
    _classCallCheck(this, _class3);
  }

  return _class3;
}();

rhit.FBDeviceManager =
/*#__PURE__*/
function () {
  function _class4(uid) {
    _classCallCheck(this, _class4);

    this._uid = uid;
    this._documentSnapshots = [];
    this._ref = firebase.firestore().collection("/".concat(this._uid));

    this._ref.add({
      "intialValueToCreateDoc": "Should Be removed after one device is added"
    });

    console.log(this._ref);
    this._unsubscribed = null;
  }

  _createClass(_class4, [{
    key: "add",
    value: function add() {}
  }, {
    key: "beginListening",
    value: function beginListening(changeListener) {
      var _this2 = this;

      var query = this._ref;
      this._unsubscribed = query.onSnapshot(function (querySnapshot) {
        _this2._documentSnapshots = querySnapshot.docs;
        changeListener(); //prints updates
        // querySnapshot.forEach( (doc) =>{
        // 	console.log(doc.data()); 
        // });
      });
    }
  }, {
    key: "stopListening",
    value: function stopListening() {
      this._unsubscribed();
    }
  }, {
    key: "updateName",
    value: function updateName() {}
  }, {
    key: "updateSettings",
    value: function updateSettings() {}
  }, {
    key: "delete",
    value: function _delete() {}
  }]);

  return _class4;
}();

rhit.FbAuthManager =
/*#__PURE__*/
function () {
  function _class5() {
    _classCallCheck(this, _class5);

    this._user = null;
  }

  _createClass(_class5, [{
    key: "beginListening",
    value: function beginListening(changeListener) {
      var _this3 = this;

      firebase.auth().onAuthStateChanged(function (user) {
        _this3._user = user;
        changeListener();
      });
    }
  }, {
    key: "signUp",
    value: function signUp(email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Errors on account", errorCode, errorMessage, email);
        return;
      });
    }
  }, {
    key: "signIn",
    value: function signIn(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Login on account errors", errorCode, errorMessage);
      });
    }
  }, {
    key: "signOut",
    value: function signOut() {
      firebase.auth().signOut()["catch"](function (error) {
        console.log("sign out error");
      });
    }
  }, {
    key: "isSignedIn",
    get: function get() {
      return !!this._user;
    }
  }, {
    key: "uid",
    get: function get() {
      return this._user.uid;
    }
  }]);

  return _class5;
}();

rhit.checkForRedirects = function () {
  if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
    window.location.href = "/homePage.html?uid=".concat(rhit.fbAuthManager.uid);
  }

  if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
    window.location.href = "/";
  }
};

rhit.initalizePage = function () {
  var urlParams = new URLSearchParams(window.location.search);

  if (document.querySelector("#loginPage")) {
    new rhit.LoginPageController();
  }

  if (document.querySelector("#homePage")) {
    var uid = urlParams.get("uid");
    console.log("url param", uid);
    rhit.fbDeviceManager = new rhit.FBDeviceManager(uid);
    new rhit.HomePageController();
  }
};
/* Main */

/** function and class syntax examples */


rhit.main = function () {
  console.log("Ready");
  rhit.fbAuthManager = new rhit.FbAuthManager();
  rhit.fbAuthManager.beginListening(function () {
    rhit.initalizePage();
    rhit.checkForRedirects();
  });
};

rhit.main();