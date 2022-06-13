"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------
//la variable params récupère l'url de la page   https://qastack.fr/programming/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
var params = new URLSearchParams(document.location.search); //console.log(document.location);  https://developer.mozilla.org/fr/docs/Web/API/Document/location
// la variable id va récupérer la valeur du paramètre _id

var id = params.get("_id");
console.log(id); //--------------------------------------------------------------------------
// Récupération des produits de l'api et traitement des données (voir script.js)
//--------------------------------------------------------------------------

fetch("http://localhost:3000/api/products").then(function (res) {
  return res.json();
}).then(function (objetProduits) {
  // execution de la fontion lesProduits
  lesProduits(objetProduits);
})["catch"](function (err) {
  document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404, sur ressource api: " + err);
}); //------------------------------------------------------------------------
// Création d'objet articleClient
//------------------------------------------------------------------------
// déclaration objet articleClient prêt à être modifiée par les fonctions suivantes d'évènements

var articleClient = {}; // id du procuit

articleClient._id = id; //------------------------------------------------------------------------
// fonction d'affichage du produit de l'api
//------------------------------------------------------------------------

function lesProduits(produit) {
  // déclaration des variables pointage des éléments
  var imageAlt = document.querySelector("article div.item__img");
  var titre = document.querySelector("#title");
  var prix = document.querySelector("#price");
  var description = document.querySelector("#description");
  var couleurOption = document.querySelector("#colors"); // boucle for pour chercher un indice

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = produit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var choix = _step.value;

      //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
      if (id === choix._id) {
        //ajout des éléments de manière dynamique
        imageAlt.innerHTML = "<img src=\"".concat(choix.imageUrl, "\" alt=\"").concat(choix.altTxt, "\">");
        titre.textContent = "".concat(choix.name);
        prix.textContent = "".concat(choix.price);
        description.textContent = "".concat(choix.description); // on ajoute le prix également dans le panier (ça servira pour le compteur total)

        articleClient.prix = "".concat(choix.price); // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = choix.colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var couleur = _step2.value;
            // ajout des balises d'option couleur avec leur valeur
            couleurOption.innerHTML += "<option value=\"".concat(couleur, "\">").concat(couleur, "</option>");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
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

  console.log("affichage effectué");
} //------------------------------------------------------------------------
// choix couleur dynamique
//------------------------------------------------------------------------
// définition des variables


var choixCouleur = document.querySelector("#colors"); // On écoute ce qu'il se passe dans #colors

choixCouleur.addEventListener("input", function (ec) {
  var couleurProduit; // on récupère la valeur de la cible de l'évenement dans couleur

  couleurProduit = ec.target.value; // on ajoute la couleur à l'objet panierClient

  articleClient.couleur = couleurProduit; //ça reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit

  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(couleurProduit);
}); //-------------------------------------------------------------------------
// choix quantité dynamique
//------------------------------------------------------------------------
// définition des variables

var choixQuantité = document.querySelector('input[id="quantity"]');
var quantitéProduit; // On écoute ce qu'il se passe dans input[name="itemQuantity"]

choixQuantité.addEventListener("input", function (eq) {
  // on récupère la valeur de la cible de l'évenement dans couleur
  quantitéProduit = eq.target.value; // on ajoute la quantité à l'objet panierClient

  articleClient.quantité = quantitéProduit; //ça reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit

  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
  console.log(quantitéProduit);
}); //------------------------------------------------------------------------
// conditions de validation du clic via le bouton ajouter au panier
//------------------------------------------------------------------------
// déclaration variable

var choixProduit = document.querySelector("#addToCart"); // On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action :

choixProduit.addEventListener("click", function () {
  //conditions de validation du bouton ajouter au panier
  if ( // les valeurs sont créées dynamiquement au click, et à l'arrivée sur la page, tant qu'il n'y a pas d'action sur la couleur et/ou la quantité, c'est 2 valeurs sont undefined.
  articleClient.quantité < 1 || articleClient.quantité > 100 || articleClient.quantité === undefined || articleClient.couleur === "" || articleClient.couleur === undefined) {
    // joue l'alerte
    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100"); // si ça passe le controle
  } else {
    // joue panier
    Panier();
    console.log("clic effectué"); //effet visuel d'ajout de produit

    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
}); //------------------------------------------------------------------------
// Déclaration de tableaux utiles (voir mutation)
//------------------------------------------------------------------------
// déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier

var choixProduitClient = []; // déclaration tableau qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on convertira en JSon (importance dans Panier())

var produitsEnregistrés = []; // déclaration tableau qui sera un choix d'article/couleur non effectué donc non présent dans le panierStocké

var produitsTemporaires = []; // déclaration tableau qui sera la concaténation des produitsEnregistrés et de produitsTemporaires

var produitsAPousser = []; //-------------------------------------------------------------------------
// fonction ajoutPremierProduit qui ajoute l'article choisi dans le tableau vierge
//-------------------------------------------------------------------------

function ajoutPremierProduit() {
  console.log(produitsEnregistrés); //si produitsEnregistrés est null c'est qu'il n'a pas été créé

  if (produitsEnregistrés === null) {
    // pousse le produit choisit dans choixProduitClient
    choixProduitClient.push(articleClient);
    console.log(articleClient); // dernière commande, envoit choixProduitClient dans le local storage sous le nom de panierStocké de manière JSON stringifié

    return localStorage.panierStocké = JSON.stringify(choixProduitClient);
  }
} //-------------------------------------------------------------------------
// fonction ajoutAutreProduit qui ajoute l'article dans le tableau non vierge et fait un tri
//------------------------------------------------------------------------- 


function ajoutAutreProduit() {
  // vide/initialise produitsAPousser pour recevoir les nouvelles données
  produitsAPousser = []; // pousse le produit choisit dans produitsTemporaires

  produitsTemporaires.push(articleClient); // combine produitsTemporaires et/dans produitsEnregistrés, ça s'appele produitsAPousser
  // autre manière de faire: produitsAPousser = produitsEnregistrés.concat(produitsTemporaires);

  produitsAPousser = [].concat(_toConsumableArray(produitsEnregistrés), _toConsumableArray(produitsTemporaires)); //fonction pour trier et classer les id puis les couleurs https://www.azur-web.com/astuces/javascript-trier-tableau-objet

  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;

    if (a._id = b._id) {
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }

    return 0;
  }); // vide/initialise produitsTemporaires maintenant qu'il a été utilisé

  produitsTemporaires = []; // dernière commande, envoit produitsAPousser dans le local storage sous le nom de panierStocké de manière JSON stringifié

  return localStorage.panierStocké = JSON.stringify(produitsAPousser);
} //--------------------------------------------------------------------
// fonction Panier qui ajuste la quantité si le produit est déja dans le tableau, sinon le rajoute si tableau il y a, ou créait le tableau avec un premier article choisi 
//--------------------------------------------------------------------


function Panier() {
  // variable qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on a convertit en JSon
  produitsEnregistrés = JSON.parse(localStorage.getItem("panierStocké")); // si produitEnregistrés existe (si des articles ont déja été choisis et enregistrés par le client)

  if (produitsEnregistrés) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = produitsEnregistrés[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var choix = _step3.value;

        //comparateur d'égalité des articles actuellement choisis et ceux déja choisis
        if (choix._id === id && choix.couleur === articleClient.couleur) {
          //information client
          alert("RAPPEL: Vous aviez déja choisit cet article."); // on modifie la quantité d'un produit existant dans le panier du localstorage
          //définition de additionQuantité qui est la valeur de l'addition de l'ancienne quantité parsée et de la nouvelle parsée pour le même produit

          var additionQuantité = parseInt(choix.quantité) + parseInt(quantitéProduit); // on convertit en JSON le résultat précédent dans la zone voulue

          choix.quantité = JSON.stringify(additionQuantité); // dernière commande, on renvoit un nouveau panierStocké dans le localStorage

          return localStorage.panierStocké = JSON.stringify(produitsEnregistrés);
        }
      } // appel fonction ajoutAutreProduit si la boucle au dessus ne retourne rien donc n'a pas d'égalité

    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return ajoutAutreProduit();
  } // appel fonction ajoutPremierProduit si produitsEnregistrés n'existe pas


  return ajoutPremierProduit();
} //--------------------------------------------------------------------------------------------------


var logoutButton = document.getElementById("logout-form-submit");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("../../index.html");
});