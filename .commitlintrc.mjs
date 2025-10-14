export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',      // Nouvelle fonctionnalité
        'fix',       // Correction de bug
        'docs',      // Documentation
        'style',     // Formatage, indentation, espaces, etc.
        'refactor',  // Refactorisation sans ajout de fonctionnalité
        'perf',      // Amélioration de performance
        'test',      // Ajout/modif de tests
        'build',     // Changement lié au build (npm, webpack, etc.)
        'ci',        // Intégration continue
        'chore',     // Maintenance, tâches diverses
        'revert',    // Annulation de commit précédent
      ],
    ],
    // Longueur maximale du titre du commit
    'header-max-length': [2, 'always', 100],

    // Sujet (le texte après le type) ne doit pas être vide
    'subject-empty': [2, 'never'],

    // Type (feat, fix, etc.) ne doit pas être vide
    'type-empty': [2, 'never'],

    // Interdit les majuscules au début du sujet
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};
