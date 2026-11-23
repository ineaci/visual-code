/* Mes projets */
/* Pour ajouter un projet : copie un bloc */
/* { ... }, colle-le à la suite (avec une */
/* virgule entre deux blocs) et change le texte */

/* Les deux origines possibles et leur nom affiché */
/* la clé (perso, fac) est utilisée dans les projets, le texte à droite est ce qui s'affiche sur le badge */
const ORIGINES = {
  perso: 'Projet perso',
  fac: 'Projet de fac'
};

/* la liste de tous mes projets : chaque projet est un bloc { ... } placé entre les crochets */
const PROJETS = [

  /* Projet 1 */
  {
    id: 'projet-1',                       /* identifiant unique, sans espace ni accent (il sert dans l'adresse : projet.html?id=projet-1) */
    titre: