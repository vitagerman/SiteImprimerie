
window.onload = function() {
    var dateActuelle = new Date();
    var heureActuelle = dateActuelle.getHours();
    var minutesActuelles = dateActuelle.getMinutes();
    var jourActuel = dateActuelle.getDay();

    var estOuvert = false;

    // Vérifier si aujourd'hui n'est pas dimanche
    if (jourActuel !== 0) {
        // Vérifier les horaires du matin
        if ((heureActuelle >= 10 && heureActuelle < 12) || 
            // Vérifier les horaires de l'après-midi
            (heureActuelle >= 14 && (heureActuelle < 17 || (heureActuelle == 17 && minutesActuelles <= 30)))) {
            estOuvert = true;
        }
    }

    var etatOuvertureElement = document.getElementById('etatOuverture');

    if (estOuvert) {
        etatOuvertureElement.innerHTML = '<img src="images/cercle_vert_en_ligne.png" alt="Cercle en Vert pour indiquer si le musée est ouvert ou non"> Ouvert en ce moment';
    } else {
        etatOuvertureElement.innerHTML = '<img src="images/cercle_rouge.png" alt="Cercle en Rouge pour indiquer que le musée est fermé"> Le musée est fermé';
    }
}

let index = 0;
displayImages();

function displayImages() {
  const images = document.getElementsByClassName("image");

  // Masquer toutes les images
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }

  // Incrémenter l'index et boucler si nécessaire
  index++;
  if (index > images.length) {
    index = 1;
  }

  // Afficher la prochaine image immédiatement après avoir masqué les autres
  images[index-1].style.display = "block";

  setTimeout(displayImages, 6000); // Change l'image toutes les 6 secondes
}
var slideIndex = 1;
showSlides(slideIndex);

// Fonction pour avancer ou reculer dans les diapositives
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Fonction pour afficher une diapositive spécifique
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change l'image toutes les 2 secondes
}

