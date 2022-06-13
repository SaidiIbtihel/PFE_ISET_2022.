"use strict";

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab");

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");

  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-pink", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-pink";
}

var formBtn1 = document.querySelector("#btn-1");
var formBtnPrev2 = document.querySelector("#btn-2-prev");
var formBtnNext2 = document.querySelector("#btn-2-next");
var formBtn3 = document.querySelector("#btn-3"); // Button listener of form 1

formBtn1.addEventListener("click", function (e) {
  gotoNextForm(formBtn1, formBtnNext2, 1, 2);
  e.preventDefault();
}); // Next button listener of form 2

formBtnNext2.addEventListener("click", function (e) {
  gotoNextForm(formBtnNext2, formBtn3, 2, 3);
  e.preventDefault();
}); // Previous button listener of form 2

formBtnPrev2.addEventListener("click", function (e) {
  gotoNextForm(formBtnNext2, formBtn1, 2, 1);
  e.preventDefault();
}); // Button listener of form 3

formBtn3.addEventListener("click", function (e) {
  document.querySelector(".step--3").classList.remove("step-active");
  document.querySelector(".step--4").classList.add("step-active");
  formBtn3.parentElement.style.display = "none";
  document.querySelector(".form--message").innerHTML = "\n     <h1 class=\"form--message-text\">Your account is successfully created </h1>\n     ";
  e.preventDefault();
});

var gotoNextForm = function gotoNextForm(prev, next, stepPrev, stepNext) {
  // Get form through the button
  var prevForm = prev.parentElement;
  var nextForm = next.parentElement;
  var nextStep = document.querySelector(".step--".concat(stepNext));
  var prevStep = document.querySelector(".step--".concat(stepPrev)); // Add active/inactive classes to both previous and next form

  nextForm.classList.add("form-active");
  nextForm.classList.add("form-active-animate");
  prevForm.classList.add("form-inactive"); // Change the active step element

  prevStep.classList.remove("step-active");
  nextStep.classList.add("step-active"); // Remove active/inactive classes to both previous an next form

  setTimeout(function () {
    prevForm.classList.remove("form-active");
    prevForm.classList.remove("form-inactive");
    nextForm.classList.remove("form-active-animate");
  }, 1000);
};

var logoutButton = document.getElementById("logout-form-submit");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("../../index.html");
});