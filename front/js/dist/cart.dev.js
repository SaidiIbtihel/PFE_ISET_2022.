"use strict";

// pour différancier la page confirmation et panier
var page = document.location.href; //----------------------------------------------------------------
// Récupération des produits de l'api
//----------------------------------------------------------------
// appel de la ressource api product (voir script.js) si on est sur la page panier

if (page.match("cart")) {
  fetch("http://localhost:3000/api/products").then(function (res) {
    return res.json();
  }).then(function (objetProduits) {
    console.log(objetProduits); // appel de la fonction affichagePanier

    affichagePanier(objetProduits);
  })["catch"](function (err) {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
  });
} else {
  console.log("sur page confirmation");
} //--------------------------------------------------------------
// Fonction détermine les conditions d'affichage des produits du panier
//--------------------------------------------------------------


function affichagePanier(index) {
  // on récupère le panier converti
  var panier = JSON.parse(localStorage.getItem("panierStocké")); // si il y a un panier avec une taille differante de 0 (donc supérieure à 0)

  if (panier && panier.length != 0) {
    // zone de correspondance clef/valeur de l'api et du panier
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = panier[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var choix = _step.value;

        for (var g = 0, h = index.length; g < h; g++) {
          if (choix._id === index[g]._id) {
            // création de valeurs pour l'affichage
            choix.name = index[g].name;
            choix.prix = index[g].price;
            choix.image = index[g].imageUrl;
            choix.description = index[g].description;
            choix.alt = index[g].altTxt;
          }
        }
      } // créait l'affichage si les conditions sont présentes

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

    affiche(panier);
  } else {
    // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
  } // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage


  modifQuantité();
  suppression();
} //--------------------------------------------------------------
//Fonction d'affichage d'un panier (tableau)
//--------------------------------------------------------------


function affiche(indexé) {
  // on déclare et on pointe la zone d'affichage
  var zonePanier = document.querySelector("#cart__items"); // on créait les affichages des produits du panier via un map et introduction de dataset dans le code

  zonePanier.innerHTML += indexé.map(function (choix) {
    return "<article class=\"cart__item\" data-id=\"".concat(choix._id, "\" data-couleur=\"").concat(choix.couleur, "\" data-quantit\xE9=\"").concat(choix.quantité, "\"> \n    <div class=\"cart__item__img\">\n      <img src=\"").concat(choix.image, "\" alt=\"").concat(choix.alt, "\">\n    </div>\n    <div class=\"cart__item__content\">\n      <div class=\"cart__item__content__titlePrice\">\n        <h2>").concat(choix.name, "</h2>\n        <span>couleur : ").concat(choix.couleur, "</span>\n        <p data-prix=\"").concat(choix.prix, "\">").concat(choix.prix, " TND </p>\n      </div>\n      <div class=\"cart__item__content__settings\">\n        <div class=\"cart__item__content__settings__quantity\">\n          <p>Qt\xE9 : </p>\n          <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(choix.quantité, "\">\n        </div>\n        <div class=\"cart__item__content__settings__delete\">\n          <p class=\"deleteItem\" data-id=\"").concat(choix._id, "\" data-couleur=\"").concat(choix.couleur, "\">Supprimer</p>\n        </div>\n      </div>\n    </div>\n  </article>");
  }).join(""); //on remplace les virgules de jonctions des objets du tableau par un vide
  // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données

  totalProduit();
} //--------------------------------------------------------------
// fonction modifQuantité on modifie dynamiquement les quantités du panier
//--------------------------------------------------------------


function modifQuantité() {
  var cart = document.querySelectorAll(".cart__item");
  /* manière de regarder ce que l'on a d'affiché dynamiquement grace au dataset
   cart.forEach((cart) => {console.log("item panier en dataset: " + " " + cart.dataset.id + " " + cart.dataset.couleur + " " + cart.dataset.quantité); }); */
  // On écoute ce qu'il se passe dans itemQuantity de l'article concerné

  cart.forEach(function (cart) {
    cart.addEventListener("change", function (eq) {
      // vérification d'information de la valeur du clic et son positionnement dans les articles
      var panier = JSON.parse(localStorage.getItem("panierStocké")); // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = panier[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          article = _step2.value;

          if (article._id === cart.dataset.id && cart.dataset.couleur === article.couleur) {
            article.quantité = eq.target.value;
            localStorage.panierStocké = JSON.stringify(panier); // on joue la fonction pour actualiser les données

            totalProduit();
          }
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
    });
  });
} //--------------------------------------------------------------
// fonction supression on supprime un article dynamiquement du panier et donc de l'affichage
//--------------------------------------------------------------


function suppression() {
  // déclaration de variables
  var cartdelete = document.querySelectorAll(".cart__item .deleteItem"); // pour chaque élément cartdelete

  cartdelete.forEach(function (cartdelete) {
    // On écoute s'il y a un clic dans l'article concerné
    cartdelete.addEventListener("click", function () {
      // appel de la ressource du local storage
      var panier = JSON.parse(localStorage.getItem("panierStocké"));

      for (var d = 0, c = panier.length; d < c; d++) {
        if (panier[d]._id === cartdelete.dataset.id && panier[d].couleur === cartdelete.dataset.couleur) {
          // déclaration de variable utile pour la suppression
          var num = [d]; // création d'un tableau miroir, voir mutation

          var nouveauPanier = JSON.parse(localStorage.getItem("panierStocké")); //suppression de 1 élément à l'indice num

          nouveauPanier.splice(num, 1); //affichage informatif

          if (nouveauPanier && nouveauPanier.length == 0) {
            // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
          } // on renvoit le nouveau panier converti dans le local storage et on joue la fonction


          localStorage.panierStocké = JSON.stringify(nouveauPanier);
          totalProduit(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
          // on recharge la page qui s'affiche sans le produit grace au nouveau panier

          return location.reload();
        }
      }
    });
  });
} //--------------------------------------------------------------
// fonction ajout nombre total produit et coût total
//--------------------------------------------------------------


function totalProduit() {
  var panier = JSON.parse(localStorage.getItem("panierStocké")); // déclaration variable en tant que nombre

  var totalArticle = 0; // déclaration variable en tant que nombre

  var prixCombiné = 0; // déclaration variable en tant que nombre

  var totalPrix = 0; // j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = panier[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _article = _step3.value;
      totalArticle += JSON.parse(_article.quantité);
      prixCombiné = JSON.parse(_article.quantité) * JSON.parse(_article.prix);
      totalPrix += prixCombiné;
    } // je pointe l'endroit d'affichage nombre d'article

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

  document.getElementById("totalQuantity").textContent = totalArticle; // je pointe l'endroit d'affichage du prix total

  document.getElementById("totalPrice").textContent = totalPrix;
} //--------------------------------------------------------------
//  formulaire
//--------------------------------------------------------------
// les données du client seront stockées dans ce tableau pour la commande sur page panier


if (page.match("cart")) {
  var contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient); // voir https://cheatography.com/davechild/cheat-sheets/regular-expressions/

  /* regex email stackoverflow (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]) */

  /* équivalent en javascript à  	
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */
  // équivalent pour w3c /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  // on pointe des éléments input, on attribut à certains la même classe, ils régiront pareil aux différantes regex
  // on pointe les input nom prénom et ville

  var prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  var nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  var ville = document.querySelector("#city");
  ville.classList.add("regex_texte"); // on pointe l'input adresse

  var adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse"); // on pointe l'input email

  var email = document.querySelector("#email");
  email.classList.add("regex_email"); // on pointe les élément qui ont la classe .regex_texte

  var regexTexte = document.querySelectorAll(".regex_texte"); // modification du type de l'input type email à text à cause d'un comportement de l'espace blanc non voulu vis à vis de la regex 

  document.querySelector("#email").setAttribute("type", "text");
} //--------------------------------------------------------------
//regex 
//--------------------------------------------------------------
// /^ début regex qui valide les caratères a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 31 caratères (nombre de caractère maximum sur carte identité) {1,31} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse


var regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i; // /^ début regex qui valide les caratères chiffre lettre et caratères spéciaux a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 60 caratères (nombre de caractère maximum sur carte identité) {1,60} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse

var regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
var regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
var regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i; //--------------------------------------------------------------
// Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
//--------------------------------------------------------------

if (page.match("cart")) {
  regexTexte.forEach(function (regexTexte) {
    return regexTexte.addEventListener("input", function (e) {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value; // regNormal sera la valeur de la réponse regex, 0 ou -1

      var regNormal = valeur.search(regexLettre);

      if (regNormal === 0) {
        contactClient.firstName = prenom.value;
        contactClient.lastName = nom.value;
        contactClient.city = ville.value;
      }

      if (contactClient.city !== "" && contactClient.lastName !== "" && contactClient.firstName !== "" && regNormal === 0) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }

      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regNormal, valeur, regexTexte);
      valideClic();
    });
  });
} //------------------------------------
// le champ écouté via la regex regexLettre fera réagir, grâce à texteInfo, la zone concernée
//------------------------------------


texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville); //--------------------------------------------------------------
// Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
//--------------------------------------------------------------

if (page.match("cart")) {
  var regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", function (e) {
    // valeur sera la valeur de l'input en dynamique
    valeur = e.target.value; // regNormal sera la valeur de la réponse regex, 0 ou -1

    var regAdresse = valeur.search(regexChiffreLettre);

    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }

    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }

    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regAdresse, valeur, regexAdresse);
    valideClic();
  });
} //------------------------------------
// le champ écouté via la regex regexChiffreLettre fera réagir, grâce à texteInfo, la zone concernée
//------------------------------------


texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse); //--------------------------------------------------------------
// Ecoute et attribution de point(pour sécurité du clic) si ce champ est ok d'après les regex
//--------------------------------------------------------------

if (page.match("cart")) {
  var regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", function (e) {
    // valeur sera la valeur de l'input en dynamique
    valeur = e.target.value; // https://webdevdesigner.com/q/what-characters-are-allowed-in-an-email-address-65767/ mon adresse doit avoir cette forme pour que je puisse la valider

    var regMatch = valeur.match(regMatchEmail); // quand le resultat sera correct, le console log affichera une autre réponse que null; regValide sera la valeur de la réponse regex, 0 ou -1

    var regValide = valeur.search(regValideEmail);

    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }

    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regValide, valeur, regexEmail);
    valideClic();
  });
} //------------------------------------
// texte sous champ email
//------------------------------------


if (page.match("cart")) {
  email.addEventListener("input", function (e) {
    // valeur sera la valeur de l'input en dynamique
    valeur = e.target.value;
    var regMatch = valeur.match(regMatchEmail);
    var regValide = valeur.search(regValideEmail); // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)

    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
      document.querySelector("#emailErrorMsg").style.color = "white"; // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
    } else if (regValide !== 0) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
      document.querySelector("#emailErrorMsg").style.color = "white"; // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
    } else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    }
  });
} //--------------------------------------------------------------
// fonction couleurRegex qui modifira la couleur de l'input par remplissage tapé, aide visuelle et accessibilité
//--------------------------------------------------------------
// on détermine une valeur de départ à valeur qui sera un string


var valeurEcoute = ""; // fonction à 3 arguments réutilisable, la regex, la valeur d'écoute, et la réponse à l'écoute

function couleurRegex(regSearch, valeurEcoute, inputAction) {
  // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
  if (valeurEcoute === "" && regSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black"; // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
  } else if (valeurEcoute !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white"; // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
} //--------------------------------------------------------------
// fonction d'affichage individuel des paragraphes sous input sauf pour l'input email
//--------------------------------------------------------------


function texteInfo(regex, pointage, zoneEcoute) {
  if (page.match("cart")) {
    zoneEcoute.addEventListener("input", function (e) {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      index = valeur.search(regex); // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)

      if (valeur === "" && index != 0) {
        document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(pointage).style.color = "white"; // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
      } else if (valeur !== "" && index != 0) {
        document.querySelector(pointage).innerHTML = "Reformulez cette donnée";
        document.querySelector(pointage).style.color = "white"; // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
      } else {
        document.querySelector(pointage).innerHTML = "Caratères acceptés pour ce champ.";
        document.querySelector(pointage).style.color = "white";
      }
    });
  }
} //--------------------------------------------------------------
// Fonction de validation/d'accés au clic du bouton du formulaire
//--------------------------------------------------------------


var commande = document.querySelector("#order"); // la fonction sert à valider le clic de commande de manière interactive

function valideClic() {
  var contactRef = JSON.parse(localStorage.getItem("contactClient"));
  var somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;

  if (somme === 5) {
    commande.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    commande.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
} //----------------------------------------------------------------
// Envoi de la commande
//----------------------------------------------------------------


if (page.match("cart")) {
  commande.addEventListener("click", function (e) {
    // empeche de recharger la page on prévient le reload du bouton
    e.preventDefault();
    valideClic();
    envoiPaquet();
  });
} //----------------------------------------------------------------
// fonction récupérations des id puis mis dans un tableau
//----------------------------------------------------------------
// définition du panier quine comportera que les id des produits choisi du local storage


var panierId = [];

function tableauId() {
  // appel des ressources
  var panier = JSON.parse(localStorage.getItem("panierStocké")); // récupération des id produit dans panierId

  if (panier && panier.length > 0) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = panier[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var indice = _step4.value;
        panierId.push(indice._id);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  } else {
    console.log("le panier est vide");
    document.querySelector("#order").setAttribute("value", "Panier vide!");
  }
} //----------------------------------------------------------------
// fonction récupération des donnée client et panier avant transformation
//----------------------------------------------------------------


var contactRef;
var commandeFinale;

function paquet() {
  contactRef = JSON.parse(localStorage.getItem("contactClient")); // définition de l'objet commande

  commandeFinale = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email
    },
    products: panierId
  };
} //----------------------------------------------------------------
// fonction sur la validation de l'envoi
//----------------------------------------------------------------


function envoiPaquet() {
  tableauId();
  paquet(); // vision sur le paquet que l'on veut envoyer

  console.log(commandeFinale);
  var somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail; // si le panierId contient des articles et que le clic est autorisé

  if (panierId.length != 0 && somme === 5) {
    // envoi à la ressource api
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commandeFinale)
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      // envoyé à la page confirmation, autre écriture de la valeur "./confirmation.html?commande=${data.orderId}"
      window.location.href = "/front/html/confirmation.html?commande=".concat(data.orderId);
    })["catch"](function (err) {
      console.log(err);
      alert("erreur");
    });
  }
} //------------------------------------------------------------
// fonction affichage autoinvoquée du numéro de commande et vide du storage lorsque l'on est sur la page confirmation
//------------------------------------------------------------


(function Commande() {
  if (page.match("confirmation")) {
    sessionStorage.clear();
    localStorage.clear(); // valeur du numero de commande

    var numCom = new URLSearchParams(document.location.search).get("commande"); // merci et mise en page

    document.querySelector("#orderId").innerHTML = "<br>".concat(numCom, "<br>Merci pour votre achat");
    console.log("valeur de l'orderId venant de l'url: " + numCom); //réinitialisation du numero de commande

    numCom = undefined;
  } else {
    console.log("sur page cart");
  }
})();

var logoutButton = document.getElementById("logout-form-submit");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.open("../../index.html");
});