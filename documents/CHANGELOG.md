# Changelog QuickEsti

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [2.3.1] - 2025-01-22

### 🔧 **Corrections critiques**
- **FIX: Structure HTML des articles générés** - Résolution du problème des `<div>` indésirables
  - Remplacement de `TextEditorField` par `TextareaField` dans `BlogCrudController`
  - Préservation de la structure HTML sémantique (`<h2>`, `<p>`, `<ul>`, `<ol>`)
  - Suppression de la transformation automatique par l'éditeur WYSIWYG

### ✨ **Améliorations**
- **Prompt IA optimisé** - Instructions HTML simplifiées et plus efficaces
  - Règles de formatage placées en début de prompt
  - Suppression des instructions complexes qui distraient l'IA
  - Exemple concret fourni pour garantir la structure attendue
- **Interface d'édition améliorée** - Textarea 20 lignes avec aide contextuelle
- **Commande de test** - `GenerateBlogCommand` pour validation en console

### 📝 **Technique**
- Modification de `BlogGeneratorService::buildStructuredPrompt()`
- Ajout de `GenerateBlogCommand` pour tests
- Configuration `TextareaField` avec `setNumOfRows(20)` et aide

### 📄 **Pagination blog (V2.3.1)**
- **Système de pagination** : 8 articles par page avec Doctrine Paginator
- **Navigation complète** : Boutons Précédent/Suivant + numéros de pages
- **Template pagination** : Composant réutilisable `_pagination.html.twig`
- **Ordre chronologique** : Articles triés par ID croissant (ordre de création)
- **Filtrage** : Affichage des articles publiés uniquement

## [2.3.0] - 2025-01-21

### 🔐 Interface d'Administration EasyAdmin
- **EasyAdmin Bundle** : Installation et configuration complète d'EasyAdmin v4
- **Dashboard d'administration** : Interface moderne accessible sur `/admin`
- **CRUD complets** : Gestion de toutes les entités (Users, Blog, Plans, Subscriptions, Invoices)
- **Menu latéral organisé** : Sections logiques avec icônes FontAwesome
- **Sécurité renforcée** : Accès limité aux utilisateurs avec `ROLE_ADMIN`

### 🛡️ Sécurité et Contrôle d'Accès
- **Protection `/admin`** : Accessible uniquement aux `ROLE_ADMIN` connectés
- **Protection `/estimation`** : Accessible uniquement aux utilisateurs connectés (`ROLE_USER`)
- **Protection `/main`** : Dashboard utilisateur sécurisé
- **Redirection intelligente** : Retour automatique à la page cible après connexion
- **Commande admin** : `app:create-admin` pour créer des administrateurs

### 🔧 Améliorations Techniques
- **Résolution conflit assets** : EasyAdmin compatible avec Webpack Encore
- **Template surchargé** : Layout EasyAdmin personnalisé sans importmap
- **Assets CDN** : Bootstrap et FontAwesome via CDN pour éviter les conflits
- **Contrôleurs CRUD** : 5 contrôleurs avec champs configurés selon les entités

### 📝 Section Blog Ajoutée
- **Navigation mise à jour** : Remplacement du lien "FAQ" par "Blog" dans le header
- **Route blog** : Nouveau lien vers `app_blog` dans la navigation desktop et mobile
- **UX améliorée** : Préparation pour section contenu et articles

### 👤 Profil Utilisateur Complet
- **Section profil dans dashboard** : Affichage de toutes les informations utilisateur avec design moderne
- **Modal d'édition responsive** : Interface Flowbite avec 8 champs éditables
- **Champs disponibles** : Email, nom, prénom, entreprise, téléphone, adresse personnelle, adresse entreprise, ville, numéro TVA
- **Validation complète** : Contrôles côté client et serveur avec messages d'erreur détaillés
- **Persistance automatique** : Sauvegarde en base de données avec confirmation utilisateur

### 🔧 Améliorations Techniques
- **Formulaire Symfony** : `UserProfileFormType` avec validation et styling Tailwind CSS
- **Contrôleur sécurisé** : Vérification d'authentification et gestion des erreurs
- **Base de données étendue** : Nouveaux champs `adresse`, `ville`, `tvaNumber`, `addressCompagny`
- **Template optimisé** : Modal intégrée dans le dashboard existant sans conflits

### 🐛 Corrections
- **Structure formulaire** : Suppression des balises `<form>` dupliquées
- **Boutons fonctionnels** : Correction du mapping des champs de formulaire
- **Validation** : Gestion correcte des erreurs et messages flash

### 📁 Fichiers Modifiés
- `config/packages/easy_admin.yaml` - Configuration EasyAdmin avec assets CDN
- `config/packages/security.yaml` - Règles d'accès pour admin et estimation
- `src/Controller/Admin/DashboardController.php` - Dashboard principal avec menu
- `src/Controller/Admin/*CrudController.php` - 5 contrôleurs CRUD créés
- `src/Command/CreateAdminCommand.php` - Commande pour créer des administrateurs
- `templates/admin/dashboard.html.twig` - Template dashboard personnalisé
- `templates/bundles/EasyAdminBundle/layout.html.twig` - Layout surchargé
- `templates/header.html.twig` - Navigation mise à jour avec lien blog
- `src/Form/UserProfileFormType.php` - Formulaire de profil utilisateur
- `templates/main/dashboard.html.twig` - Section profil et modal d'édition

---

## [2.1.1] - 2025-01-20

### 🎯 Nouvelle Interface d'Estimation V2
- **Navigation par étapes** : Interface guidée avec barre de progression visuelle (4 étapes)
- **Route `/estimation-v2`** : Nouvelle version avec UX améliorée
- **Validation conditionnelle** : Impossible de passer à l'étape suivante sans compléter
- **Design moderne** : Cartes sélectionnables, animations fluides, responsive

### 🧭 Correction Navigation Complète
- **Header responsive** : Menu horizontal visible en desktop, hamburger fonctionnel en mobile
- **Liens fonctionnels** : Navigation entre toutes les pages (/estimation, /login, /register, etc.)
- **Menu adaptatif** : Boutons CTA qui changent selon l'état de connexion
- **JavaScript optimisé** : Gestion propre du menu mobile sans conflits

### 🎨 Système de Styles Optimisé
- **Dark mode restauré** : Configuration Tailwind avec `darkMode: 'class'`
- **Styles personnalisés préservés** : Gradients et classes custom maintenues
- **Résolution conflits** : CDN Tailwind configuré pour ne pas écraser le build local
- **Cohérence visuelle** : Tous les composants respectent le thème

### 🔧 Architecture Technique Améliorée
- **Template d'estimation dédié** : Chargement direct de l'app Vue.js sans conflits
- **Composant EstimationForm accessible** : Route `/estimation` fonctionnelle avec votre outil
- **Cache Symfony optimisé** : Mises à jour instantanées des templates
- **Webpack Encore configuré** : Build Vue.js + Tailwind opérationnel

### 🐛 Corrections Critiques
- **Boutons hero alignés** : Côte à côte en desktop, colonne en mobile (classes Tailwind corrigées)
- **Menu desktop visible** : Plus de hamburger affiché en large screen
- **Dark theme fonctionnel** : Toggle et persistance restaurés
- **Navigation responsive** : Tous les breakpoints fonctionnent correctement

## [2.1.0] - 2025-07-18

### 🎨 Interface Utilisateur Moderne
- **Design Flowbite** : Templates d'inscription, connexion et reset password avec design moderne
- **Formulaires centrés** : Layout responsive avec max-w-md et espacement adaptatif
- **Icônes personnalisées** : SVG éclair QuickEsti remplaçant les icônes Flowbite
- **Classes Tailwind optimisées** : Champs plus larges (p-3), transitions fluides (duration-200)

### 🌙 Dark Theme Complet
- **Système de basculement** : Toggle clair/sombre avec sauvegarde localStorage
- **Icônes dynamiques** : Lune/soleil qui changent selon le mode actuel
- **Script optimisé** : Chargement en premier pour éviter le flash de contenu
- **Persistance** : Thème sauvegardé entre les sessions utilisateur

### 📱 Responsive Design Amélioré
- **Mobile-first** : Layout adaptatif avec breakpoints sm/md/lg
- **Centrage parfait** : min-h-screen flex items-center justify-center
- **Espacement responsive** : py-12 px-4 sm:px-6 lg:px-8 pour tous les écrans
- **Navigation adaptative** : Masquage intelligent des éléments sur mobile

### ✨ Expérience Utilisateur
- **Messages flash** : Design Tailwind avec couleurs success/error/warning
- **Validation formulaires** : Messages d'erreur stylisés et en français
- **Labels traduits** : Tous les textes interface en français
- **Accessibilité** : Meta viewport, lang='fr', focus amélioré

### 🔧 Corrections Techniques
- **Fix label HTML** : Correction conditions d'utilisation sans |raw
- **Configuration .htaccess** : Masquage warnings PHP 8.2 pour UX propre
- **Espacement cohérent** : space-y-6 sur tous les formulaires
- **Base template** : Structure optimisée avec dark theme global

## [2.0.0] - 2025-07-18

### 🔐 Système d'Authentification Complet
- **Entité Users** : Création avec tous les champs (email, password, role, isVerified, resetToken, stripeId, createdAt)
- **Inscription/Connexion** : UsersAuthenticator avec Symfony Security Bundle
- **Vérification email** : Système JWT avec SendMailService et templates Twig
- **Réinitialisation mot de passe** : Tokens sécurisés avec formulaires dédiés
- **Repository Users** : Méthodes findOneByEmail et findOneByResetToken

### 💳 Intégration Stripe
- **Package Stripe PHP v17.4** : Installation et configuration
- **Entité Plan** : name, slug, stripeId, price, createdAt, paymentLink
- **Entité Subscription** : Relations avec Users et Plan, gestion périodes et statut
- **Entité Invoice** : Facturation liée aux subscriptions
- **Configuration API** : Clés Stripe dans .env.local et services.yaml

### 🗄️ Base de Données
- **Migrations complètes** : Toutes les entités créées et migrées
- **Relations Doctrine** : ManyToOne entre Users/Subscription/Plan
- **Champs nullable** : Structure flexible pour évolutions futures
- **Types Doctrine** : DateTimeInterface et Types::DATETIME_MUTABLE

### 📧 Services Email
- **SendMailService** : Service réutilisable avec TemplatedEmail
- **JWTService** : Génération et validation de tokens sécurisés
- **Templates email** : register.html.twig et password_reset.html.twig
- **Configuration messenger** : Envoi synchrone pour développement

### 🛠️ Configuration Technique
- **Services.yaml** : Paramètres JWT et Stripe configurés
- **Formulaires Tailwind** : ResetPasswordRequestFormType et ResetPasswordFormType
- **Routes sécurisées** : Vérification tokens et redirections appropriées
- **Correction PHPUnit** : Compatibilité PHP 8.2 (v10.5 au lieu de v12.2)

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
