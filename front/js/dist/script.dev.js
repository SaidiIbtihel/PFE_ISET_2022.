"use strict";

//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products") // quand tu as la réponse donne le résultat en json.
.then(function (res) {
  return res.json();
}) // ce que l'on a reçu et qui a été traité en json sera appelé objetProduits
.then(function (objetProduits) {
  // donne moi des informations en console sur ce qui est récupéré sous forme tableau.
  console.table(objetProduits); // appel de la fonction d'affichage des produits

  lesKanaps(objetProduits);
}) // dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.
["catch"](function (err) {
  document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404, sur ressource api:" + err);
}); //----------------------------------------------------------------------
// fonction d'affichage des produits de l'api sur la page index
//----------------------------------------------------------------------

function lesKanaps(index) {
  // déclaration de variable de la zone d'article
  var zoneArticle1 = document.querySelector("#items1");
  var zoneArticle2 = document.querySelector("#items2");
  var zoneArticle3 = document.querySelector("#items3");
  var zoneArticle4 = document.querySelector("#items4");
  var zoneArticle5 = document.querySelector("#items5");
  var zoneArticle6 = document.querySelector("#items6");
  var zoneArticle7 = document.querySelector("#items7");
  var beaute = document.getElementById("beaute");
  var vetement = document.getElementById("vetement"); // boucle pour chaque indice(nommé 'article') dans index

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = index[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var article = _step.value;

      if (article._id >= 1 && article._id <= 4) {
        zoneArticle1.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 5 && article._id <= 8) {
        zoneArticle2.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 9 && article._id <= 12) {
        zoneArticle3.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 13 && article._id <= 16) {
        zoneArticle4.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 17 && article._id <= 20) {
        zoneArticle5.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 21 && article._id <= 24) {
        zoneArticle6.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      } else if (article._id >= 25 && article._id <= 36) {
        zoneArticle7.innerHTML += "<a href=\"./product.html?_id=".concat(article._id, "\">\n    <article>\n      <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n      <h3 class=\"productName\">").concat(article.name, "</h3>\n      <p class=\"productDescription\">").concat(article.description, "</p>\n    </article>\n  </a>");
      }
      /* création et ajout des zones d'articles, insertion de l'adresse produit via chemin produit + paramètres(son id);
          la page index est http://127.0.0.1:5500/front/html/index.html donc la page du produit sera http://127.0.0.1:5500/front/html/product.html 
          (d'ou le ./product.html) pour rajouter son paramètre on met ? puis la clé (ici _id) associé (=) à sa valeur dynamique ${article._id} */
      //     zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
      //     <article>
      //       <img src="${article.imageUrl}" alt="${article.altTxt}">
      //       <h3 class="productName">${article.name}</h3>
      //       <p class="productDescription">${article.description}</p>
      //     </article>
      //   </a>`;
      //   }

    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var logoutButton = document.getElementById("logout-form-submit");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("../../index.html");
});
var inscrireButton = document.getElementById("inscrire-form-submit");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("./inscrire.html");
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

function ValidationForm() {
  var prenom = document.forms["don"]["prenom"];
  var nom = document.forms["don"]["nom"];
  var email = document.forms["don"]["email"];
  var montant = document.forms["don"]["montant"];
  var numCarte = document.forms["don"]["numCarte"];

  if (nom.value == "") {
    alert("Ajouter votre nom.");
    nom.focus();
    return false;
  }

  if (prenom.value == "") {
    alert("Ajouter votre prenom.");
    email.focus();
    return false;
  }

  if (email.value.indexOf("@", 0) < 0) {
    alert("Ajouter une adresse mail valide.");
    email.focus();
    return false;
  }

  if (montant.value.indexOf(".", 0) < 0) {
    alert("Ajouter le montant à donner.");
    montant.focus();
    return false;
  }

  if (numCarte.value == "") {
    alert("Ajouter le num de carte.");
    numCarte.focus();
    return false;
  } else return true;
}

var confirmerButton = document.getElementById("don");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("./index.html");
});