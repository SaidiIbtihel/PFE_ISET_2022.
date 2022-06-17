"use strict";

function ValidationForm() {
  var nom = document.forms["inscrireeeeee"]["nom"];
  var prenom = document.forms["inscrireeeeee"]["prenom"];
  var adresse = document.forms["inscrireeeeee"]["adresse"];
  var ville = document.forms["inscrireeeeee"]["ville"];
  var email = document.forms["inscrireeeeee"]["email"];
  var pass = document.forms["inscrireeeeee"]["psw"];

  if (nom.value == "") {
    alert("Ajouter votre nom.");
    nom.focus();
    return false;
  }

  if (prenom.value == "") {
    alert("Ajouter votre prenom.");
    prenom.focus();
    return false;
  }

  if (adresse.value == "") {
    alert("Ajouter votre adresse.");
    adresse.focus();
    return false;
  }

  if (ville.value == "") {
    alert("Ajouter votre ville.");
    ville.focus();
    return false;
  }

  if (email.value.indexOf("@", 0) < 0) {
    alert("Ajouter une adresse mail valide.");
    email.focus();
    return false;
  }

  if (psw.value.indexOf(".", 0) < 0) {
    alert("Ajouter votre mot de passe.");
    psw.focus();
    return false;
  } else return true;
}