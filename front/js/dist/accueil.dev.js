"use strict";

// Get the modal
var modal = document.getElementById('id01'); // When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  var username = loginForm.uname.value;
  var password = loginForm.psw.value;

  if (username === "sibtyhel@gmail.com" && password === "user1") {
    alert("You have successfully logged in.");
    window.open("./front/html/index.html");
  } else if (username === "user@gmail.com" && password === "user123") {
    alert("You have successfully logged in.");
    window.open("./front/html/index.html");
  } else if (username === "user144@gmail.com" && password === "azerty123") {
    alert("You have successfully logged in.");
    window.open("./front/html/index.html");
  } else if (username === "user" && password === "user") {
    alert("You have successfully logged in.");
    window.open("./front/html/index.html");
  } else if (username === "admin" && password === "admin") {
    alert("You have successfully logged in.");
    window.open("./front/html/admin.html");
  } else if (username === " myUserAdmin" && password === "admin") {
    alert("You have successfully logged in.");
    window.open("./front/html/admin.html");
  } else if (username === " myUserAdmin" && password === "abc123") {
    alert("You have successfully logged in.");
    window.open("./front/html/admin.html");
  } else {
    alert("Vérifier votre mot de passe ou votre mail.");
  }
});
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}