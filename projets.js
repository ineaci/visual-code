/* Page projets : cartes et filtres */

/* 1. Les zones de la page */
/* la zone où seront affichées toutes les cartes de projets */
const listeProjets = document.getElementById('projets-liste');
/* la zone où seront créés les boutons de filtre par origine (perso / fac) */
const zoneOrigine = document.getElementById('filtres-origine');
/* la zone où seront créés les boutons de filtre par type (photographie, mode...) */
const zoneType = document.getElementById('filtres-type');

/* 2. Les filtres choisis (au départ : tout afficher) */
/* "tous" veut dire qu'aucun filtre n'est appliqué pour l'instant */
let choixOrigine = 'tous';
let choixType = 'tous';

/* 3. On fabrique une carte pour chaque projet du fichier projets-data.js */
/* pour chaque projet de la liste, on crée le bloc HTML d'une carte, puis on colle toutes les cartes dans la page */
listeProjets.innerHTML = PROJETS.map(function (p) {
  /* toute la carte est un lien qui mène à la page du projet (projet.html?id=...) */
  /* les data-origine et data-type servent à retrouver l'origine et le type de la carte pour les filtres */
  return `
    <a class="projet" href="projet.html?id=${p.id}" data-origine="${p.origine}" data-type="${p.type}">
      <div class="projet-image">
        <img src="${p.image}" alt="${p.titre}">
      </div>
      <div class="projet-infos">
        <div class="projet-meta">
          <span class="badge badge-${p.origine}">${ORIGINES[p.origine]}</span>
          <span class="projet-type">${p.type} · ${p.annee}</span>
        </div>
        <h3>${p.titre}</h3>
        <p>${p.resume}</p>
        <span class="projet-lien">Voir le projet →</span>
      </div>
    </a>`;
}).join('');

/* maintenant que les cartes existent dans la page, on les récupère toutes pour pouvoir les cacher ou les montrer */
const cartes = document.querySelectorAll('.projet');

/* 4. Cacher ou montrer les cartes selon les deux filtres */
function appliquerFiltres() {
  /* on regarde chaque carte l'une après l'autre */
  cartes.forEach(function (carte) {
    /* la carte a la bonne origine si aucun filtre n'est choisi, ou si son origine correspond au filtre */
    const bonneOrigine = (choixOrigine === 'tous' || carte.dataset.origine === choixOrigine);
    /* pareil pour le type */
    const bonType = (choixType === 'tous' || carte.dataset.type === choixType);
    /* si la carte ne respecte pas les deux filtres, on lui ajoute la classe "cache" (le CSS la fait disparaître), sinon on l'enlève */
    carte.classList.toggle('cache', !(bonneOrigine && bonType));
  });
}

/* 5. Créer une rangée de boutons de filtre
      zone : l'endroit où les mettre
      options : liste de [valeur, texte affiché]
      auChoix : ce qu'on fait quand on clique */
function creerFiltres(zone, options, auChoix) {
  /* on ajoute toujours le bouton "Tous" en premier, puis un bouton par option */
  /* le premier bouton (i === 0) reçoit la classe "actif" car c'est celui sélectionné au départ */
  zone.innerHTML = [['tous', 'Tous']].concat(options).map(function (opt, i) {
    return `<button class="filtre ${i === 0 ? 'actif' : ''}" data-valeur="${opt[0]}">${opt[1]}</button>`;
  }).join('');

  /* une fois les boutons créés, on s'occupe de chacun d'eux */
  zone.querySelectorAll('.filtre').forEach(function (bouton) {
    /* on surveille le clic sur le bouton */
    bouton.addEventListener('click', function () {
      /* Le bouton cliqué devient le seul « actif » (souligné) de sa rangée */
      /* d'abord on retire "actif" à tous les boutons de la rangée */
      zone.querySelectorAll('.filtre').forEach(function (b) { b.classList.remove('actif'); });
      /* puis on le remet uniquement sur celui qui vient d'être cliqué */
      bouton.classList.add('actif');
      /* on mémorise le choix (origine ou type, selon la rangée) grâce à la fonction donnée en paramètre */
      auChoix(bouton.dataset.valeur);
      /* et on met à jour l'affichage des cartes */
      appliquerFiltres();
    });
  });
}

/* 6. Rangée « Origine » : Perso / Fac */
/* on crée les boutons à partir des clés de ORIGINES (perso et fac), avec un texte plus court : "Perso" ou "Fac" */
creerFiltres(
  zoneOrigine,
  Object.keys(ORIGINES).map(function (cle) {
    return [cle, cle === 'perso' ? 'Perso' : 'Fac'];
  }),
  /* quand on clique, on retient l'origine choisie */
  function (valeur) { choixOrigine = valeur; }
);

/* 7. Rangée « Type » : créée à partir des types utilisés dans tes projets */
/* on récupère le type de chaque projet, puis "Set" supprime les doublons pour ne garder chaque type qu'une fois */
const typesUtilises = Array.from(new Set(PROJETS.map(function (p) { return p.type; })));

/* on crée un bouton par type, le texte affiché est le type lui-même */
creerFiltres(
  zoneType,
  typesUtilises.map(function (t) { return [t, t]; }),
  /* quand on clique, on retient le type choisi */
  function (valeur) { choixType = valeur; }
);