# Changelog - QuickEsti

## [v2.2.1] - 21 janvier 2025

### ✨ Nouvelles fonctionnalités
- **Profil utilisateur complet** : Section dédiée dans le dashboard avec affichage de toutes les informations
- **Modal d'édition moderne** : Interface Flowbite responsive pour modifier le profil
- **8 champs éditables** : Email, nom, prénom, entreprise, téléphone, adresse personnelle, adresse entreprise, ville, numéro TVA
- **Validation complète** : Contrôles côté client et serveur avec messages d'erreur
- **Persistance automatique** : Sauvegarde en base de données avec messages de confirmation
- **Design responsive** : Compatible desktop/mobile avec dark mode

### 🔧 Améliorations techniques
- **Formulaire Symfony** : `UserProfileFormType` avec validation et styling Tailwind
- **Contrôleur sécurisé** : Vérification d'authentification et gestion des erreurs
- **Template optimisé** : Modal intégrée dans le dashboard existant
- **Base de données** : Nouveaux champs `adresse`, `ville`, `tvaNumber`, `addressCompagny`

### 🐛 Corrections
- **Structure formulaire** : Suppression des balises `<form>` dupliquées
- **Boutons fonctionnels** : Correction du mapping `profileForm.save`
- **Validation** : Gestion correcte des erreurs et messages flash

### 📁 Fichiers modifiés
- `src/Form/UserProfileFormType.php` - Nouveau formulaire de profil
- `src/Controller/HomeController.php` - Gestion du profil utilisateur
- `templates/main/dashboard.html.twig` - Section profil et modal d'édition
- `src/Entity/Users.php` - Nouveaux champs utilisateur
- `README.md` - Documentation mise à jour

---

## [v2.2.0] - 20 janvier 2025

### ✨ Nouvelles fonctionnalités
- **Navigation responsive corrigée** : Header fonctionnel desktop/mobile
- **Interface d'estimation V2** : Navigation par étapes avec barre de progression
- **Dark theme restauré** : Configuration Tailwind optimisée
- **Architecture améliorée** : Template dédié pour l'outil d'estimation
- **Route `/estimation-v2`** : Interface guidée avec validation conditionnelle

### 🔧 Améliorations techniques
- **Composants Vue.js** : Refactorisation complète des composants home
- **Tailwind CSS** : Configuration dark mode optimisée
- **Webpack Encore** : Build optimisé sans Chart.js (-415KB)

---

## [v2.1.1] - Versions précédentes

### Historique des développements
- Migration Symfony 7 + Vue.js 3 terminée le 15 juillet 2025
- Mode "Devis Client" ajouté le 15 juillet 2025
- Prompts OpenAI optimisés le 15 juillet 2025
- Structure projet restructurée le 16 juillet 2025
- Logique Forfait vs Régie implémentée le 16 juillet 2025
- Export PDF optimisé et suppression Chart.js le 18 juillet 2025

---

**Développé avec ❤️ par l'équipe QuickEsti**
