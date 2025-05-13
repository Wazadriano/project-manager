## Contexte client
Une petite agence web souhaite disposer d'un outil interne pour suivre les projets clients et répartir les tâches entre les membres de l'équipe. Ils ont besoin d'une application entièrement JavaScript qui fonctionnera sur leur intranet et qui permettra de:
- Gérer la liste des projets
- Suivre les tâches pour chaque projet
- Attribuer les tâches aux membres de l'équipe
- Suivre l'état d'avancement global des projets

## Cahier des charges
### Fonctionnalités principales
1. **Interface utilisateur**
    - Une page d'accueil avec la liste des projets
    - Une page de détail pour chaque projet avec ses tâches
    - Un formulaire pour créer/modifier des projets
    - Un formulaire pour créer/modifier des tâches
    - Un tableau de bord affichant des statistiques simples

2. **Gestion des projets**
    - Créer un nouveau projet avec titre, description, client, date limite
    - Modifier les informations d'un projet existant
    - Supprimer un projet
    - Afficher la progression globale d'un projet

3. **Gestion des tâches**
    - Créer des tâches avec titre, description, priorité, état, assignation
    - Modifier l'état d'une tâche (À faire, En cours, Terminée, Bloquée)
    - Assigner une tâche à un membre de l'équipe
    - Filtrer les tâches par état, priorité ou assignation

4. **Persistance des données**
    - Toutes les données seront stockées en localStorage
    - Possibilité d'exporter/importer les données au format JSON

### Contraintes techniques
- Utiliser uniquement JavaScript vanilla (sans framework)
- Adopter une architecture modulaire avec séparation des préoccupations
- S'appuyer sur les fonctions d'ordre supérieur pour le traitement des données
- Utiliser les closures pour encapsuler la logique métier
- Implémenter un système d'événements personnalisé pour maintenir l'interface à jour

## Architecture proposée
``` 
project-manager/
│
├── index.html            # Page principale de l'application
├── css/
│   └── styles.css        # Styles de l'application
├── js/
│   ├── app.js            # Point d'entrée de l'application
│   ├── models/           # Modules de gestion des données
│   │   ├── projectModel.js      # Gestion des projets
│   │   ├── taskModel.js         # Gestion des tâches
│   │   └── storageService.js    # Service de persistance localStorage
│   ├── views/            # Composants d'interface utilisateur
│   │   ├── projectList.js       # Liste des projets
│   │   ├── projectDetail.js     # Détail d'un projet
│   │   ├── taskList.js          # Liste des tâches
│   │   ├── forms.js             # Formulaires d'ajout/modification
│   │   └── dashboard.js         # Tableau de bord avec statistiques
│   └── utils/            # Fonctions utilitaires
│       ├── events.js            # Système d'événements personnalisé
│       └── helpers.js           # Fonctions auxiliaires diverses
└── assets/               # Images et icônes
```

## Livrables attendus
- Code source complet de l'application
- Documentation sur l'architecture et les choix techniques
- Guide d'utilisation pour les utilisateurs finaux

## Bonus (pour les plus avancés)
- Ajout d'un système de notifications pour les tâches en retard
- Implémentation d'un mode sombre/clair
- Création d'un système de tags pour les projets et les tâches
- Graphiques de progression pour le tableau de bord

## Exemple de structure de données
```javascript
// Exemple de structure pour un projet
const project = {
  id: "p1",
  title: "Refonte du site web client XYZ",
  description: "Modernisation complète du site vitrine",
  client: "Entreprise XYZ",
  deadline: "2023-12-31",
  createdAt: "2023-09-15",
  status: "en cours", // [en cours, terminé, en pause]
  // Statistiques calculées
  progress: 0.35, // Pourcentage de complétion (nombre de tâches terminées / total)
};

// Exemple de structure pour une tâche
const task = {
  id: "t1",
  projectId: "p1",
  title: "Maquette de la page d'accueil",
  description: "Création d'une maquette responsive",
  priority: "haute", // [basse, moyenne, haute]
  status: "terminée", // [à faire, en cours, terminée, bloquée]
  assignedTo: "Sophie",
  createdAt: "2023-09-16",
  dueDate: "2023-09-25",
};
```

