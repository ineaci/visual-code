/* Mes projets */
/* Pour ajouter un projet : copie un bloc { ... }, colle-le à la suite */
/* (avec une virgule entre deux blocs) et change le texte */

/* Les deux origines possibles et leur nom affiché */
const ORIGINES = {
  perso: 'Projet perso',
  fac: 'Projet de fac'
};

/* la liste de tous mes projets : chaque projet est un bloc { ... } entre les crochets */
const PROJETS = [

  /* Projet 1 */
  {
    id: 'projet-1',                       /* identifiant unique, sans espace ni accent (utilisé dans l'adresse) */
    titre: 'Titre du projet 1',
    origine: 'perso',                     /* "perso" ou "fac" */
    type: 'Photographie',                 /* tu peux inventer : Mode, Communication, Design... */
    annee: '2026',
    image: 'images/projets/projet-1/couverture.jpg',
    resume: 'Une phrase pour donner envie, affichée sur l\'encart.',

    /* Texte d'introduction : un paragraphe par ligne, le premier est l'accroche */
    intro: [
      'Phrase d\'accroche du projet.',
      'Deuxième paragraphe : l\'idée de départ, ton rôle, le contexte.',
      'Troisième paragraphe : le résultat, ce que tu en retiens.'
    ],

    /* Galerie : une ligne par photo (la légende est facultative) */
    photos: [
      { src: 'images/projets/projet-1/photo1.jpg', legende: 'Légende 1' },
      { src: 'images/projets/projet-1/photo2.jpg', legende: 'Légende 2' },
      { src: 'images/projets/projet-1/photo3.jpg', legende: '' }
    ],

    /* Dossiers à télécharger : mets [] s'il n'y en a pas */
    dossiers: [
      { nom: 'Dossier de recherche', fichier: 'dossiers/projet-1-recherche.pdf', format: 'PDF' },
      { nom: 'Moodboard',            fichier: 'dossiers/projet-1-moodboard.pdf', format: 'PDF' }
    ]
  },

  /* Projet 2 */
  {
    id: 'projet-2',
    titre: 'Titre du projet 2',
    origine: 'fac',
    type: 'Communication',
    annee: '2026',
    image: 'images/projets/projet-2/couverture.jpg',
    resume: 'Un travail réalisé en L3 Culture et Communication.',
    intro: [
      'Phrase d\'accroche du projet.',
      'Consigne du cours, démarche, ce que tu as réalisé.'
    ],
    photos: [
      { src: 'images/projets/projet-2/photo1.jpg', legende: '' },
      { src: 'images/projets/projet-2/photo2.jpg', legende: '' }
    ],
    dossiers: [
      { nom: 'Rapport final', fichier: 'dossiers/projet-2-rapport.pdf', format: 'PDF' }
    ]
  },

  /* Projet 3 */
  {
    id: 'projet-3',
    titre: 'Titre du projet 3',
    origine: 'perso',
    type: 'Mode',
    annee: '2025',
    image: 'images/projets/projet-3/couverture.jpg',
    resume: 'Une série autour de la mode et du mouvement.',
    intro: [
      'Phrase d\'accroche du projet.',
      'Présentation du projet.'
    ],
    photos: [
      { src: 'images/projets/projet-3/photo1.jpg', legende: '' }
    ],
    dossiers: []
  },

  /* Projet 4 */
  {
    id: 'projet-4',
    titre: 'Titre du projet 4',
    origine: 'fac',
    type: 'Mode',
    annee: '2026',
    image: 'images/projets/projet-4/couverture.jpg',
    resume: 'Un projet de fac autour de l\'image de mode.',
    intro: [
      'Phrase d\'accroche du projet.',
      'Présentation du projet.'
    ],
    photos: [
      { src: 'images/projets/projet-4/photo1.jpg', legende: '' }
    ],
    dossiers: []
  }

];