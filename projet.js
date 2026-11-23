/* Page projets : encarts et filtres */

/* 1. Les zones de la page */
const listeProjets = document.getElementById('projets-liste');
const zoneOrigine = document.getElementById('filtres-origine');
const zoneType = document.getElementById('filtres-type');

/* 2. Les filtres choisis (au départ : tout afficher) */
let choixOrigine = 'tous';
let choixType = 'tous';

/* 3. On fabrique un encart pour chaque projet du fichier projets-data.js */
/* "i" est la position du projet dans la liste (0, 1, 2...), on s'en sert pour le numéro */
listeProjets.innerHTML = PROJETS.map(function (p, i) {
  /* on transforme 0 en "01", 1 en "02", etc. */
  const numero = String(i + 1).padStart(2, '0');
  return `
    <a class="projet" href="projet.html?id=${p.id}" data-origine="${p.origine}" data-type="${p.type}">
      <div class="projet-image">
        <img src="${p.image}" alt="${p.titre}">
      </div>
      <div class="projet-infos">
        <span class="projet-numero">${numero}.</span>
        <div class="projet-meta">
          <span class="badge badge-${p.origine}">${ORIGINES[p.origine]}</span>
          <span class="projet-type">${p.type} · ${p.annee}</span>
        </div>
        <h3>${p.titre}</h3>
        <p>${p.resume}</p>
        <span class="projet-lien">Voir le projet</span>
      </div>
    </a>`;
}).join('');

/* les encarts existent maintenant : on les récupère pour pouvoir les cacher ou les montrer */
const cartes = document.querySelectorAll('.projet');

/* 4. Cacher ou montrer les encarts selon les deux filtres */
function appliquerFiltres() {
  cartes.forEach(function (carte) {
    const bonneOrigine = (choixOrigine === 'tous' || carte.dataset.origine === choixOrigine);
    const bonType = (choixType === 'tous' || carte.dataset.type === choixType);
    carte.classList.toggle('cache', !(bonneOrigine && bonType));
  });
}

/* 5. Créer une rangée de boutons de filtre */
function creerFiltres(zone, options, auChoix) {
  zone.innerHTML = [['tous', 'Tous']].concat(options).map(function (opt, i) {
    return `<button class="filtre ${i === 0 ? 'actif' : ''}" data-valeur="${opt[0]}">${opt[1]}</button>`;
  }).join('');

  zone.querySelectorAll('.filtre').forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      zone.querySelectorAll('.filtre').forEach(function (b) { b.classList.remove('actif'); });
      bouton.classList.add('actif');
      auChoix(bouton.dataset.valeur);
      appliquerFiltres();
    });
  });
}

/* 6. Rangée « Origine » : Perso / Fac */
creerFiltres(
  zoneOrigine,
  Object.keys(ORIGINES).map(function (cle) {
    return [cle, cle === 'perso' ? 'Perso' : 'Fac'];
  }),
  function (valeur) { choixOrigine = valeur; }
);

/* 7. Rangée « Type » : créée à partir des types utilisés dans tes projets */
const typesUtilises = Array.from(new Set(PROJETS.map(function (p) { return p.type; })));

creerFiltres(
  zoneType,
  typesUtilises.map(function (t) { return [t, t]; }),
  function (valeur) { choixType = valeur; }
);