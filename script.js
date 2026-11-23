/* Visionneuse de photos (accueil et pages de détail des projets) */
/* la visionneuse : la grande boîte qui affiche la photo agrandie */
const lightbox = document.getElementById('lightbox');

/* On n'exécute ce code que si la visionneuse existe dans la page */
/* (si l'élément n'existe pas, lightbox vaut null et on ne fait rien, ce qui évite une erreur) */
if (lightbox) {
  /* l'image à l'intérieur de la visionneuse, qui sera remplie au clic */
  const lightboxImg = lightbox.querySelector('img');
  /* la zone de texte pour la légende de la photo agrandie */
  const lightboxLegende = lightbox.querySelector('.lightbox-legende');

  /* Au clic sur une photo (galerie d'accueil ou galerie d'un projet) : on l'affiche en grand */
  /* on récupère toutes les photos des deux galeries et on s'occupe de chacune */
  document.querySelectorAll('.galerie figure, .galerie-projet figure').forEach(function (figure) {
    /* on surveille le clic sur la photo */
    figure.addEventListener('click', function () {
      /* on retrouve l'image et la légende de la photo cliquée */
      const photo = figure.querySelector('img');
      const legende = figure.querySelector('figcaption');
      /* on copie l'image cliquée dans la visionneuse (source et texte alternatif) */
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt;
      /* on copie la légende, ou on met un texte vide si la photo n'en a pas */
      lightboxLegende.textContent = legende ? legende.textContent : '';
      /* la classe "ouverte" fait apparaître la visionneuse (le CSS s'occupe de l'affichage) */
      lightbox.classList.add('ouverte');
    });
  });

  /* Fermer : clic n'importe où */
  /* un clic sur la visionneuse enlève la classe "ouverte", donc elle disparaît */
  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('ouverte');
  });

  /* Fermer : touche Échap */
  /* on surveille le clavier sur toute la page */
  document.addEventListener('keydown', function (e) {
    /* si la touche appuyée est Échap, on ferme la visionneuse */
    if (e.key === 'Escape') {
      lightbox.classList.remove('ouverte');
    }
  });
}

/* Apparition au scroll : les éléments se dévoilent quand on descend */

/* 1. La liste des éléments qui vont apparaître en douceur */
/* on rassemble tous les éléments concernés : photos, titres, textes, portrait, contact, cartes de projets... */
/* le :not(.bouton) exclut les boutons de la section contact, qui restent toujours visibles */
const elementsReveal = document.querySelectorAll(
  '.galerie figure, .galerie-projet figure, .section-titre, .accroche, .texte p, .portrait, ' +
  '.contact > *:not(.bouton), .projet, .projets-intro, .detail-bloc'
);

/* 2. On leur donne la classe "reveal" (cachés au départ) */
/* le CSS rend invisible tout élément qui a la classe "reveal" tant qu'il n'a pas aussi "visible" */
elementsReveal.forEach(function (el) {
  el.classList.add('reveal');
});

/* 3. Le "guetteur" : il surveille quand un élément entre dans l'écran */
/* à chaque changement, il reçoit la liste des éléments dont la visibilité a changé */
const observateur = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
    /* si l'élément est entré dans l'écran */
    if (entree.isIntersecting) {
      entree.target.classList.add('visible');   /* on le fait apparaître */
      observateur.unobserve(entree.target);     /* une seule fois suffit */
    }
  });
}, { threshold: 0.15 });                        /* déclenché quand 15 % est visible */

/* 4. On demande au guetteur de surveiller chaque élément */
elementsReveal.forEach(function (el) {
  observateur.observe(el);
});