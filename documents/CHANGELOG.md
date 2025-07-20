# Changelog QuickEsti

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

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
