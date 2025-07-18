# Changelog QuickEsti

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.5.0] - 2025-07-18

### ✨ Export PDF Optimisé
- **3 Templates PDF fonctionnels** : Entreprise, Freelance Forfait, Freelance Régie
- **Métriques avancées** : TJM effectif, efficacité, ROI, vélocité, planning prévisionnel
- **Tableaux analytiques** : Répartition par profil, analyses fiscales, distribution temporelle
- **Conditions spécifiques** : Adaptées par mode (forfait/régie)

### 🔧 Optimisations Performance
- **Suppression Chart.js et html2canvas** : -415KB (-43% build size)
- **Build optimisé** : 970KB → 555KB
- **Interface allégée** : Sans dépendances JS lourdes
- **Composant EstimationCharts.vue** : Supprimé (obsolète)

### 📊 Améliorations Techniques
- **Service DomPDFService** : Support formData, détection type freelance
- **Templates Twig** : Gestion variables robuste, structure nettoyée
- **Icônes standardisées** : Compatibilité PDF améliorée
- **Génération PDF** : Rapide et fiable (60-68KB par document)

## [1.4.1] - 2025-07-17

### Corrigé
- **Export PDF Entreprise** : Correction du bug userType "entreprise" vs "enterprise"
- **Template Entreprise** : Gestion des cas sans breakdown détaillé
- **Timeline PDF** : Barre verticale limitée à la section planning
- **Tableau PDF** : Proposition commerciale sur toute la largeur
- **Phases PDF** : Traduction automatique des phases (analysis → Analyse, etc.)

### Amélioré
- **Titres PDF** : "Récapitulatif d'Estimation" au lieu de "Devis Commercial"
- **Noms de fichiers** : Format standardisé "estimation-[type]-quickesti-[date].pdf"
- **Sous-titres** : "Export d'estimation pour entreprise/agence - Projet : [type]"
- **Branding** : Logo QuickEsti visible et couleurs cohérentes
- **Espacement** : Optimisation des marges et sauts de page

### Technique
- **Normalisation userType** : Accepte "entreprise" et "enterprise"
- **Traduction des phases** : Méthode `translatePhases()` automatique
- **CSS Timeline** : Limitation de la barre verticale avec `height: calc(100% - 10px)`
- **CSS Tableau** : Largeur étendue avec `width: calc(100% + 30px)`

## [1.4.0] - 2025-07-16

### Ajouté
- **Export PDF** : Génération de PDF pour freelances et entreprises
- **Templates PDF** : Templates spécialisés avec branding QuickEsti
- **Service DomPDF** : Intégration complète pour la génération de documents
- **Traduction des objectifs** : Objectifs en français dans les PDF
- **Gestion des types de projets** : Support des projets personnalisés

### Amélioré
- **Interface utilisateur** : Boutons d'export PDF dans les résultats
- **Gestion des erreurs** : Messages d'erreur plus informatifs
- **Structure des données** : Normalisation pour l'export PDF

### Technique
- **DomPDF** : Intégration avec templates Twig
- **Contrôleur** : Endpoint `/api/estimation/export-pdf`
- **Services** : Architecture modulaire pour l'export PDF

## [1.3.0] - 2025-07-15

### Ajouté
- **Mode Entreprise** : Formulaire spécialisé pour les entreprises/agences
- **Estimation IA** : Intégration OpenAI pour estimations intelligentes
- **Templates différenciés** : Freelance vs Entreprise

### Amélioré
- **Interface utilisateur** : Design moderne et responsive
- **Gestion des données** : Structure optimisée pour les deux modes

## [1.2.0] - 2025-07-14

### Ajouté
- **Mode Freelance** : Formulaire complet avec forfait/régie
- **Estimation basique** : Calculs automatiques
- **Interface responsive** : Design adaptatif

## [1.1.0] - 2025-07-13

### Ajouté
- **Architecture de base** : Symfony + Vue.js
- **Formulaires dynamiques** : Gestion des étapes
- **API REST** : Endpoints de base

## [1.0.0] - 2025-07-12

### Ajouté
- **Projet initial** : Structure de base QuickEsti
- **Configuration** : Environnement de développement
