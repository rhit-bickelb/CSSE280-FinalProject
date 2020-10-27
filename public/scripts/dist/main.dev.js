"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rhit = rhit || {};

rhit.LoginPageController =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);

    document.querySelector("#signUpButton").onclick = function (event) {
      var inputEmailEl = document.querySelector("#createUsername");
      var inputPasswordEl = document.querySelector("#createPassword");
      console.log("create email ".concat(inputEmailEl.value, " create password ").concat(inputPasswordEl.value));
      firebase.auth().createUserWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value)["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Errors on account", errorCode, errorMessage);
      });
    };

    document.querySelector("#logInButton").onclick = function (event) {
      var usernameInput = document.querySelector("#usernameInput");
      var passwordInput = document.querySelector("#passwordInput");
      console.log("create email ".concat(usernameInput.value, " create password ").concat(passwordInput.value));
      firebase.auth().signInWithEmailAndPassword(usernameInput.value, passwordInput.value)["catch"](function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Login on account errors", errorCode, errorMessage);
      });
    };
  }

  return _class;
}();

rhit.HomePageController =
/*#__PURE__*/
function () {
  function _class2() {
    _classCallCheck(this, _class2);

    document.querySelector("#signOutButton").onclick = function (event) {
      firebase.auth().signOut().then(function () {
        console.log("sign out succesful");
      })["catch"](function (error) {
        console.log("sign out error");
      });
    };
  }

  _createClass(_class2, [{
    key: "updateList",
    value: function updateList() {}
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
  function _class4() {
    _classCallCheck(this, _class4);
  }

  _createClass(_class4, [{
    key: "add",
    value: function add() {}
  }, {
    key: "beginListening",
    value: function beginListening() {}
  }, {
    key: "stopListening",
    value: function stopListening() {}
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
  }

  return _class5;
}();

rhit.initalizePage = function () {};
/* Main */

/** function and class syntax examples */


rhit.main = function () {
  console.log("Ready");
  rhit.fbAuthManager = new rhit.FbAuthManager();
  fbAuthManager.beginListening(function () {
    rhit.initalizePage();
  });
};

rhit.main();