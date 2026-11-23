/* ---------- Visionneuse de photos ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxLegende = lightbox.querySelector('.lightbox-legende');

/* Au clic sur une photo de la galerie : on l'affiche en grand */
document.querySelectorAll('.galerie figure').forEach(function (figure) {
  figure.addEventListener('click', function () {
    const photo = figure.querySelector('img');
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightboxLegende.textContent = figure.querySelector('figcaption').textContent;
    lightbox.classList.add('ouverte');
  });
});

/* Fermer : clic n'importe où, ou touche Échap */
lightbox.addEventListener('click', function () {
  lightbox.classList.remove('ouverte');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    lightbox.classList.remove('ouverte');
  }
});

/* ============================================ */
/* APPARITION AU SCROLL                         */
/* Les éléments se dévoilent quand on descend   */
/* ============================================ */

/* 1. La liste des éléments qui vont apparaître en douceur */
const elementsReveal = document.querySelectorAll(
  '.galerie figure, .section-titre, .accroche, .texte p, .portrait, .contact > *:not(.bouton)'
);

/* 2. On leur donne la classe "reveal" (cachés au départ) */
elementsReveal.forEach(function (el) {
  el.classList.add('reveal');
});

/* 3. Le "guetteur" : il surveille quand un élément entre dans l'écran */
const observateur = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
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

