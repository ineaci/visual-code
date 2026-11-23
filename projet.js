

/* 1. On lit quel projet est demandé dans l'adresse */
/* on récupère la partie de l'adresse après le "?" (ici : id=projet-1) */
const parametres = new URLSearchParams(window.location.search);
/* on extrait juste la valeur de "id", par exemple "projet-1" */
const idDemande = parametres.get('id');
/* on cherche à quelle place se trouve ce projet dans la liste PROJETS (renvoie -1 s'il n'existe pas) */
const position = PROJETS.findIndex(function (p) { return p.id === idDemande; });
/* on repère la zone vide de la page (le <main> du HTML) pour pouvoir la remplir plus tard */
const zoneDetail = document.getElementById('projet-detail');

/* 2. Si le projet n'existe pas : message + retour */
/* -1 veut dire que l'id de l'adresse ne correspond à aucun projet */
if (position === -1) {
  /* on affiche un message d'erreur et un lien pour revenir à la liste des projets */
  zoneDetail.innerHTML = `
    <p class="projets-intro">Ce projet est introuvable.</p>
    <p><a class="detail-retour" href="projets.html">← Tous les projets</a></p>`;
} else {

  /* sinon, le projet existe : on récupère toutes ses infos (titre, photos, texte...) dans "p" */
  const p = PROJETS[position];
  /* on change le titre de l'onglet du navigateur avec le nom du projet */
  document.title = `${p.titre} — Inea Civaux`;

  /* 3. Texte d'introduction : un <p> par paragraphe */
  /* pour chaque paragraphe du texte, on crée une balise <p>, puis on colle le tout ensemble */
  const intro = p.intro.map(function (texte) { return `<p>${texte}</p>`; }).join('');

  /* 4. Petite fonction pour fabriquer un titre de section numéroté (01, 02...) */
  /* le compteur démarre à 0 et augmente à chaque titre créé */
  let compteur = 0;
  function titreSection(texte) {
    /* on ajoute 1 pour passer au numéro suivant */
    compteur++;
    /* on renvoie le bloc HTML du titre, avec le numéro (01, 02...) et le texte donné */
    return `
      <div class="section-titre detail-bloc">
        <span class="numero">0${compteur}</span>
        <h2>${texte}</h2>
      </div>`;
  }

  /* 5. Galerie de photos (seulement s'il y en a) */
  /* la galerie est vide par défaut, on la remplit seulement si le projet a des photos */
  let galerie = '';
  if (p.photos && p.photos.length > 0) {
    /* on ajoute d'abord le titre "Galerie" numéroté, puis les photos juste après */
    galerie = titreSection('Galerie') + `
      <div class="galerie-projet">
        ${p.photos.map(function (ph) {
          /* pour chaque photo, on crée une <figure> avec l'image et sa légende */
          /* si la photo n'a pas de légende, on met le titre du projet comme texte alternatif */
          return `<figure>
                    <img src="${ph.src}" alt="${ph.legende || p.titre}">
                    <figcaption>${ph.legende || ''}</figcaption>
                  </figure>`;
        }).join('')}
      </div>`;
  }

  /* 6. Dossiers à télécharger (seulement s'il y en a) */
  /* même principe que la galerie : vide par défaut, rempli seulement si le projet a des dossiers */
  let dossiers = '';
  if (p.dossiers && p.dossiers.length > 0) {
    /* on ajoute le titre "Dossiers" numéroté, puis la liste des fichiers */
    dossiers = titreSection('Dossiers') + `
      <ul class="dossiers-liste detail-bloc">
        ${p.dossiers.map(function (d) {
          /* pour chaque dossier, on crée un lien qui ouvre le fichier dans un nouvel onglet */
          /* on affiche le nom du dossier et son format (PDF, etc.) */
          return `<li>
                    <a href="${d.fichier}" target="_blank">
                      <span>${d.nom}</span>
                      <span class="dossier-format">${d.format} ↗</span>
                    </a>
                  </li>`;
        }).join('')}
      </ul>`;
  }

  /* 7. Projet précédent / suivant (on boucle : après le dernier, retour au premier) */
  /* le "% PROJETS.length" permet de boucler : le précédent du premier est le dernier, et inversement */
  const precedent = PROJETS[(position - 1 + PROJETS.length) % PROJETS.length];
  const suivant = PROJETS[(position + 1) % PROJETS.length];
  let navigation = '';
  /* s'il n'y a qu'un seul projet, ça ne sert à rien d'afficher la navigation */
  if (PROJETS.length > 1) {
    /* deux liens : un vers le projet d'avant, un vers le projet d'après */
    navigation = `
      <nav class="detail-nav detail-bloc">
        <a href="projet.html?id=${precedent.id}">← ${precedent.titre}</a>
        <a href="projet.html?id=${suivant.id}">${suivant.titre} →</a>
      </nav>`;
  }

  /* 8. On assemble toute la page */
  /* on remplit la zone vide avec tous les morceaux fabriqués plus haut : */
  /* d'abord le lien de retour vers la liste des projets, */
  /* puis l'en-tête (badge d'origine, type, année et titre), */
  /* puis la grande image de couverture, */
  /* puis le texte d'introduction fabriqué à l'étape 3, */
  /* et enfin la galerie, les dossiers et la navigation (vides si le projet n'en a pas) */
  zoneDetail.innerHTML = `
    <a class="detail-retour" href="projets.html">← Tous les projets</a>

    <header class="detail-entete detail-bloc">
      <div class="projet-meta">
        <span class="badge badge-${p.origine}">${ORIGINES[p.origine]}</span>
        <span class="projet-type">${p.type} · ${p.annee}</span>
      </div>
      <h1>${p.titre}</h1>
    </header>

    <img class="detail-couverture detail-bloc" src="${p.image}" alt="${p.titre}">

    <div class="detail-intro detail-bloc">${intro}</div>

    ${galerie}
    ${dossiers}
    ${navigation}`;
}