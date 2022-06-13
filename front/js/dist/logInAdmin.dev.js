"use strict";

var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  var username = loginForm.uname.value;
  var password = loginForm.psw.value;

  if (username === "admin" && password === "admin") {
    // alert("You have successfully logged in.");
    window.open("admin.html");
  } else {
    alert("Vérifier votre mot de passe ou votre mail.");
  }
});