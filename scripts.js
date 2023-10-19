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

// Fonction pour avancer ou reculer dans les diapositives
var slideIndex = 1;
var slideTimeout;

var slideInterval;

function startSlideShow() {
    slideInterval = setInterval(function() {
        showSlides(slideIndex + 1);
    }, 5000);
}

function plusSlides(n) {
    clearInterval(slideInterval);  // stopper le défilement automatique
    showSlides(slideIndex += n);
    startSlideShow();  // redémarrer le défilement automatique
}

function showSlides(n) {
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    else if (n < 1) {slideIndex = slides.length}

    for (var i = 0; i < slides.length; i++) {
        if (slides[i]) {
            slides[i].style.display = "none";
        }
    }
    
    for (var i = 0; i < dots.length; i++) {
        if (dots[i]) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }

    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
    }
    if (dots[slideIndex-1]) {
        dots[slideIndex-1].className += " active";
    }
}

startSlideShow();

let lacurrentSlide = 0;

function moveSlide(direction) {
    const slides = [
        { img: 'images/la_fete_du_musee.jpg', title: 'La fête du la ville', date: '4 mai 2024 - 9 h 00 - 18 h 00' },
        { img: 'images/a_venir_enluminure.jpg', title: 'La fête du musée', date: '4 - 18 h 00' },
        { img: 'images/a_venir_enluminure.jpg', title: 'La fête du musée', date: '4 mai 2024 - 18 h 00' },
    ];

    const imageElement = document.querySelector('.container_animations img');

    // Avant de changer le slide, appliquez l'animation
    if (direction === -1) {
        imageElement.classList.add('slide-left');
    } else {
        imageElement.classList.add('slide-right');
    }

    // Attendre la fin de l'animation avant de changer le slide
    imageElement.addEventListener('transitionend', function() {
        imageElement.classList.remove('slide-left', 'slide-right');

        lacurrentSlide += direction;
        if (lacurrentSlide >= slides.length) lacurrentSlide = 0;
        if (lacurrentSlide < 0) lacurrentSlide = slides.length - 1;

        const slide = slides[lacurrentSlide];
        const titleElement = document.querySelector('.container_animations .Animations_texte h2');
        const dateElement = document.querySelector('.container_animations .Animations_texte p');

        imageElement.src = slide.img;
        titleElement.textContent = slide.title;
        dateElement.textContent = slide.date;
    }, { once: true });  // L'événement sera automatiquement supprimé après avoir été déclenché
}

document.getElementById('left-arrow').addEventListener('click', function() {
    moveSlide(-1);
});
document.getElementById('right-arrow').addEventListener('click', function() {
    moveSlide(1);
});



