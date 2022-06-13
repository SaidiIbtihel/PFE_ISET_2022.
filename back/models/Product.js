const products = [
  {
    "colors": ["orangé", "fuchsia" , "bordeaux" , "corail", "rose" , "bronze" ],
    "_id": "1",
    "name": "Rouge à levre ",
    "price": 12,
    "imageUrl": "rouge2.jpg",
    "description": " Rouges a levre matte ",
    "altTxt": "produit"
  },
  {
    "colors": ["aucun couleur"],
    "_id": "2",
    "name": "Parfum femme",
    "price": 120 ,
    "imageUrl": "parfum1.jpg",
    "description": " Pafum femme Coco chanel ",
    "altTxt": "produit"
  },
  {
    "colors": ["Blanc", "Noir"],
    "_id": "3",
    "name": "Pinceaux",
    "price": 25,
    "imageUrl": "pinc1.jpg",
    "description": "Un paquet de 12 pinceaux  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rouge", "Bleu", "Violet", "Rose", "Vert", "Blanc"],
    "_id": "4",
    "name": "Manicure",
    "price": 12 ,
    "imageUrl": "manic1.jpg",
    "description": " Manicure permanent ",
    "altTxt": "produit"
  },
  {
    "colors": ["Gris", "Bleu", "Marron", "Noir"],
    "_id": "5",
    "name": "Monteau",
    "price": 103 ,
    "imageUrl": "monteauG1.jpg",
    "description": " Monteau imperméable pour garçon ",
    "altTxt": "produit"
  },
  {
    "colors": ["Noir", "Rose", "Bleu", "Blanc"],
    "_id": "6",
    "name": "Pantalon",
    "price": 57 ,
    "imageUrl": "pantalonF1.jpg",
    "description": " Pantalon femme large ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Blanc", "Vert"],
    "_id": "7",
    "name": "Hudie",
    "price":53 ,
    "imageUrl": "hudieFi1.jpg",
    "description": "Hudie pour les petite fille  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Bleu", "Caramel", "Noir"],
    "_id": "8",
    "name": "T-shirt",
    "price": 32,
    "imageUrl": "TchirtH1.jpg",
    "description": " T-chirt demi manche pour homme ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Blanc"],
    "_id": "9",
    "name": "Montre intelligente",
    "price": 250 ,
    "imageUrl": "montreF1.jpg",
    "description": "Montre intelligente pour femme  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Noir"],
    "_id": "10",
    "name": "Montre",
    "price": 78,
    "imageUrl": "montreH1.jpg",
    "description": " Montre homme  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Bleu", "Blanc"],
    "_id": "11",
    "name": "Boucle d'oreille",
    "price": 8 ,
    "imageUrl": "boucles.jpg",
    "description": " Boucle d'oreille  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Doré"],
    "_id": "12",
    "name": "Lunettes",
    "price":280 ,
    "imageUrl": "lunetF1.jpg",
    "description": " Lunettes chic pour femme ",
    "altTxt": "produit"
  },
  {
    "colors": ["Gris", "Noir", "Marron", "Blanc"],
    "_id": "13",
    "name": "Botte ",
    "price": 54 ,
    "imageUrl": "ChH1.jpg",
    "description": " Botte pour Hommes en dain ",
    "altTxt": "produit"
  },
  {
    "colors": ["Noir", "Nude", "Rose", "Bleu"],
    "_id": "14",
    "name": "Talon",
    "price": 75 ,
    "imageUrl": "CHF1.jpg",
    "description": " Talon chic ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Blanc", "Rouge", "Vert"],
    "_id": "15",
    "name": "Chausseure",
    "price":45 ,
    "imageUrl": "ChFi1.jpg",
    "description": " Un chaussure pour les petite fille ",
    "altTxt": "produit"
  },
  {
    "colors": ["Noir", "Marron", "Bleu"],
    "_id": "16",
    "name": "Espadrille",
    "price": 63 ,
    "imageUrl": "ChG1.jpg",
    "description": " Espadrille pour les garçon ",
    "altTxt": "produit"
  },
   {
    "colors": ["Blanc"],
    "_id": "17",
    "name": "Machine à laver",
    "price": 750 ,
    "imageUrl": "malv.jpg",
    "description": " Machine à laver LG ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Blanc", "Noir"],
    "_id": "18",
    "name": "Ordinateur portable",
    "price": 1839,
    "imageUrl": "pc.jpg",
    "description": " Ordinateur portable apple ",
    "altTxt": "produit"
  },
  {
    "colors": ["Noir"],
    "_id": "19",
    "name": "TV",
    "price": 847,
    "imageUrl": "tv.jpg",
    "description": " Television Condore 45 pouces ",
    "altTxt": "produit"
  },
  {
    "colors": ["Gris", "Noir"],
    "_id": "20",
    "name": "Haut parleur",
    "price": 56 ,
    "imageUrl": "hp.jpg",
    "description": " Haut parleur rechargeable  ",
    "altTxt": "produit"
  },
   {
    "colors": ["Blanc", "Rose", "Noir"],
    "_id": "21",
    "name": "Egg chair",
    "price": 250,
    "imageUrl": "egg chair.jpg",
    "description": " Egg chair ",
    "altTxt": "produit"
  },
  {
    "colors": ["Jaune et Gris", "Rose et move"],
    "_id": "22",
    "name": "Salon",
    "price": 1250,
    "imageUrl": "salon.jpg",
    "description": " Salon   ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Blanc"],
    "_id": "23",
    "name": "Chambre enfants",
    "price": 1137 ,
    "imageUrl": "chambreenf.jpg",
    "description": "Chambre enfants avec dressing  ",
    "altTxt": "produit"
  },
  {
    "colors": ["Blanc", "Gris"],
    "_id": "24,",
    "name": "Chambre parent",
    "price": 1754 ,
    "imageUrl": "chambrepar.jpg",
    "description": " Chambre parents ",
    "altTxt": "produit"
  },
  {
    "colors": ["Rose", "Marron", "Jaune", "Blanc"],
    "_id": "25",
    "name": "Espadrille Femme",
    "price": 77,
    "imageUrl": "EF1.jpg",
    "description": "Espadrille femme  ",
    "altTxt": "Photo d'un espadrille"
  },
  {
    "colors": ["Argent"],
    "_id": "26",
    "name": "Bague en argent",
    "price": 25,
    "imageUrl": "B1.jpg",
    "description": "Bague femme en argent ",
    "altTxt": "Photo d'une bague"
  },
  {
    "colors": ["Rose", "Marron", "Jaune", "Blanc"],
    "_id": "27",
    "name": "Robe fille",
    "price": 39,
    "imageUrl": "R1.jpg",
    "description": " Robe courte pour jeune fille.",
    "altTxt": "robe"
  },
  {
    "colors": ["Rose", "Marron", "Jaune", "Blanc"],
    "_id": "28",
    "name": "Rouge à levre  ",
    "price": 19,
    "imageUrl": "rouge1.jpg",
    "description": "Un cofferet des rouges à levres nude .",
    "altTxt": "rouge"
  },
  {
    "colors": [ "Noir", "Blanc"],
    "_id": "29",
    "name": "Climatiseur",
    "price": 3999,
    "imageUrl": "clim1.jpg",
    "description": "Un climatiseur samsung .",
    "altTxt": "climatiseur"
  },
  
  {
    "colors": ["Blanc", "Marron", "Rouge", "Blanc"],
    "_id": "30",
    "name": "Monteau",
    "price": 120,
    "imageUrl": "MH1.jpg",
    "description": "Monteau Homme .",
    "altTxt": "mont"
  },
  {
    "colors": ["Blanc", "Noir", "Rouge", "Mauve"],
    "_id": "31",
    "name": "Lunettes",
    "price": 99,
    "imageUrl": "lun.jpg",
    "description": "Lunettes solaire femme .",
    "altTxt": "lunette"
  },
  {
    "colors": ["Noir", "Blanc"],
    "_id": "32",
    "name": "Ordinateur portable",
    "price": 2359,
    "imageUrl": "pc1.jpg",
    "description": "Ordinateur portable HP 250 - i3 4Go/500Go - .",
    "altTxt": "pc"
  },{
    "colors": ["Doré","Argent"],
    "_id": "33",
    "name": "Montre",
    "price": 383,
    "imageUrl": "MF1.jpg",
    "description": "Montre pour femme water proof .",
    "altTxt": "montre"
  },{
    "colors": ["Blanc", "Marron", "Rouge", "Vert","Bleu"],
    "_id": "34",
    "name": "Ensemble",
    "price": 170,
    "imageUrl": "MF.jpg",
    "description": "Ensemble pour femme : une blazer et un pantalon large  .",
    "altTxt": "mont"
  },{
    "colors": ["Noir","Bleu","Marron"],
    "_id": "35",
    "name": "Pantalon",
    "price": 3999,
    "imageUrl": "ME.jpg",
    "description": "Pantalon jeans pour garcon  .",
    "altTxt": "pant"
  },{
    "colors": ["Blanc", "Marron", "Rouge"],
    "_id": "36",
    "name": "Mule",
    "price": 3999,
    "imageUrl": "ballF.jpg",
    "description": "Mule femme en talon .",
    "altTxt": "mule"
  },
  
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(products))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(products)).find(product =>
      product._id == id)
    )
  );
}




