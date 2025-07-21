# 🔧 Décisions techniques - QuickEsti

## 🎯 Philosophie générale

### Principe directeur
**Architecture hybride Symfony + Vue.js** : Symfony au centre pour la logique métier et Vue.js pour l'interface utilisateur uniquement.

### Contraintes respectées (Phase MVP)
- ✅ **Vue.js via CDN** pour prototypage rapide
- ✅ **Composants modulaires** pour réutilisabilité et maintenance
- ✅ **Responsive first** pour accessibilité mobile
- ✅ **Préparation migration Symfony** avec structure compatible

## 🏗️ Architecture cible (Post-MVP)

### Architecture finale : Symfony + Vue.js intégré
**Décision** : Application Symfony avec Vue.js intégré via Webpack Encore

**Justification** :
- ✅ Symfony gère : authentification, base de données, API, services métier
- ✅ Vue.js gère : interface utilisateur, formulaires, interactions
- ✅ Intégration native via Webpack Encore
- ✅ Déploiement unifié

**Structure cible** :
```
symfony-project/
├── assets/js/components/   # Composants Vue.js
├── src/Controller/         # Contrôleurs Symfony
├── src/Service/            # Services (OpenAI, Stripe, etc.)
├── src/Entity/             # Entités Doctrine
└── templates/              # Templates Twig avec Vue.js
```

## 🔄 Phase de transition

### Vue.js via CDN (Actuel - Phase MVP)
**Décision temporaire** : Utiliser Vue.js 3 via CDN pour le prototypage

**Justification** :
- ✅ Développement rapide du MVP
- ✅ Test des concepts et UX
- ✅ Validation des flux utilisateur
- ✅ Composants facilement migrables vers Symfony

**Migration prévue** : Vers Symfony + Webpack Encore

### Structure des composants
**Décision** : Un composant Vue.js par section de formulaire

**Justification** :
- ✅ Séparation claire des responsabilités
- ✅ Réutilisabilité des composants
- ✅ Facilité de test et debug
- ✅ Évolutivité (ajout de nouvelles sections)

**Pattern adopté** :
```javascript
// Chaque composant suit cette structure
const ComponentName = {
    template: `...`,
    props: { formData: Object },
    emits: ['update:form-data'],
    data() { return { localFormData: {...} }},
    methods: { updateFormData() {...} }
}
```

### Gestion d'état
**Décision** : État centralisé dans EstimationForm.js

**Justification** :
- ✅ Single source of truth
- ✅ Facilité de sauvegarde localStorage
- ✅ Simplicité de debugging
- ✅ Évite la complexité Vuex/Pinia

**Structure** :
```javascript
data() {
    return {
        selectedUserType: null,
        freelanceData: { basics: {}, constraints: {}, ... },
        entrepriseData: { basics: {}, structure: {}, ... }
    }
}
```

## 🎨 Styling et UI

### Tailwind CSS
**Décision** : Tailwind CSS comme framework CSS principal

**Justification** :
- ✅ Utility-first approach
- ✅ Excellent pour prototypage rapide
- ✅ Responsive design intégré
- ✅ Customisation facile

**Alternative rejetée** : CSS custom ou Bootstrap
**Raison** : Tailwind plus moderne et flexible

### Flowbite
**Décision** : Flowbite pour les composants UI complexes

**Justification** :
- ✅ Composants pré-construits de qualité
- ✅ Compatible Tailwind CSS
- ✅ Gain de temps développement
- ✅ Design system cohérent

### Responsive design
**Décision** : Mobile-first avec breakpoints Tailwind

**Justification** :
- ✅ Majorité du trafic mobile
- ✅ Meilleure UX sur tous devices
- ✅ SEO favorable

**Breakpoints utilisés** :
- `sm:` (640px+) : Tablettes
- `md:` (768px+) : Desktop small
- `lg:` (1024px+) : Desktop large

## 💾 Persistance des données

### localStorage
**Décision** : Sauvegarde automatique en localStorage

**Justification** :
- ✅ Persistance côté client
- ✅ Pas de serveur requis
- ✅ Expérience utilisateur fluide
- ✅ Simplicité d'implémentation

**Alternative rejetée** : Base de données
**Raison** : Complexité non justifiée pour MVP

**Implémentation** :
```javascript
// Sauvegarde automatique via watcher
this.$watch(() => [this.freelanceData, this.entrepriseData], () => {
    this.saveToLocalStorage();
}, { deep: true });
```

## 🔄 Réactivité et calculs

### Computed properties
**Décision** : Utiliser computed properties pour calculs dynamiques

**Justification** :
- ✅ Recalcul automatique lors des changements
- ✅ Performance optimisée (cache)
- ✅ Code plus lisible
- ✅ Évite les bugs de synchronisation

**Exemples** :
- `completionPercentage` : Progression du formulaire
- `extractedTechnologies` : Technologies parsées
- `canSubmit` : Validation formulaire

### Watchers
**Décision** : Watchers pour effets de bord (sauvegarde, logs)

**Justification** :
- ✅ Séparation logique métier / effets de bord
- ✅ Debugging facilité
- ✅ Maintenance simplifiée

## 📊 Validation et UX

### Validation progressive
**Décision** : Validation en temps réel avec feedback visuel

**Justification** :
- ✅ Meilleure UX (feedback immédiat)
- ✅ Réduction erreurs utilisateur
- ✅ Guidage naturel du parcours

**Implémentation** :
- Barre de progression dynamique
- Résumés en bas de section
- Activation conditionnelle du bouton

### Affichage conditionnel
**Décision** : Sections différentes selon le profil utilisateur

**Justification** :
- ✅ Personnalisation de l'expérience
- ✅ Vocabulaire adapté (freelance vs entreprise)
- ✅ Questions pertinentes selon le contexte

## 🔧 Patterns de développement

### Composition over inheritance
**Décision** : Privilégier la composition de composants

**Justification** :
- ✅ Flexibilité maximale
- ✅ Réutilisabilité
- ✅ Testabilité

### Convention de nommage
**Décision** : Nommage explicite et cohérent

**Patterns adoptés** :
- Composants : `PascalCase` (ex: `FreelanceBasics`)
- Méthodes : `camelCase` (ex: `updateFormData`)
- Données : `camelCase` (ex: `selectedUserType`)
- Fichiers : `PascalCase.js` (ex: `EstimationForm.js`)

### Structure des props
**Décision** : Props typées avec defaults

**Pattern** :
```javascript
props: {
    formData: {
        type: Object,
        default: () => ({})
    }
}
```

## 🚀 Performance

### Lazy loading
**Décision** : Pas de lazy loading pour l'instant

**Justification** :
- ✅ Application de taille raisonnable
- ✅ Simplicité d'implémentation
- ✅ UX fluide (pas de loading)

**Note** : À reconsidérer si l'app grandit significativement

### Optimisations appliquées
- ✅ Computed properties pour éviter recalculs
- ✅ v-if plutôt que v-show pour sections lourdes
- ✅ Debouncing implicite via Vue reactivity

## 🔮 Décisions pour l'avenir

### Migration vers Symfony
**Décision planifiée** : Intégration dans application Symfony complète

**Justification** :
- ✅ Symfony pour toute la logique métier
- ✅ Authentification gérée par Symfony Security
- ✅ Base de données avec Doctrine
- ✅ Services métier centralisés
- ✅ Vue.js uniquement pour l'UI

**Étapes de migration** :
1. Créer projet Symfony avec Webpack Encore
2. Migrer composants Vue.js dans `assets/js/`
3. Créer contrôleurs et services Symfony

### Intégration OpenAI
**Décision préparée** : Service Symfony pour OpenAI

**Justification** :
- ✅ Sécurité (clés API côté serveur)
- ✅ Réutilisabilité du service
- ✅ Logs et monitoring centralisés
- ✅ Cache et optimisations possibles

### Export PDF
**Décision préparée** : Service Symfony avec TCPDF ou Puppeteer

**Justification** :
- ✅ Génération côté serveur
- ✅ Meilleure qualité d'impression
- ✅ Sécurité des données

### Monétisation
**Décision préparée** : Symfony + Stripe Bundle

**Justification** :
- ✅ Intégration native Symfony
- ✅ Sécurité des paiements
- ✅ Webhooks gérés par Symfony

## ❌ Décisions rejetées

### SPA Vue.js séparée
**Rejeté** : Application Vue.js SPA avec API Symfony séparée
**Raison** : Complexité de déploiement et authentification

### Authentification côté Vue.js
**Rejeté** : Gestion JWT et auth dans Vue.js
**Raison** : Sécurité et logique métier doivent rester côté Symfony

### Netlify Functions pour production
**Rejeté** : Serverless pour logique métier
**Raison** : Symfony plus adapté pour application complexe avec auth/DB

### CSS-in-JS
**Rejeté** : Styled-components, Emotion
**Raison** : Tailwind plus adapté et compatible Symfony

## 📝 Lessons learned

### Ce qui fonctionne bien
- ✅ Vue.js pour UI = développement rapide
- ✅ Tailwind = design system cohérent
- ✅ Composants modulaires = maintenance facile
- ✅ localStorage = prototype fonctionnel

### Prochaines étapes concrètes
- 🔄 Migration vers Symfony + Webpack Encore
- 🔄 Création des services Symfony (OpenAI, PDF, etc.)
- 🔄 Mise en place authentification Symfony Security
- 🔄 Intégration Stripe via Symfony bundle

### Architecture finale visée
- 🏗️ **Backend** : Symfony 6+ (contrôleurs, services, entités)
- 🎨 **Frontend** : Vue.js intégré via Webpack Encore
- 🔐 **Auth** : Symfony Security Bundle
- 💾 **DB** : Doctrine ORM + MySQL/PostgreSQL
- 💳 **Paiement** : Symfony Stripe Bundle
- 🤖 **IA** : Service Symfony pour OpenAI

---

## 🎨 Interface Utilisateur Moderne (18/07/2025)

### Design System Flowbite
**Décision** : Adaptation Flowbite avec personnalisation QuickEsti

**Justification** :
- ✅ Composants modernes et accessibles
- ✅ Compatible Tailwind CSS natif
- ✅ Templates auth prêts à l'emploi
- ✅ Personnalisation facile (icônes, couleurs)

**Personnalisations appliquées** :
- Icône éclair QuickEsti au lieu des icônes Flowbite
- Palette de couleurs adaptée
- Espacement optimisé pour mobile

### Dark Theme Implementation
**Décision** : Système natif Tailwind avec localStorage

**Justification** :
- ✅ Performance optimale (pas de framework externe)
- ✅ Persistance utilisateur via localStorage
- ✅ Support natif Tailwind dark: classes
- ✅ Script optimisé pour éviter le flash

**Implémentation** :
```javascript
// Script en premier dans <head> pour éviter le flash
if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}
```

### Responsive Strategy
**Décision** : Mobile-first avec formulaires centrés

**Justification** :
- ✅ Majorité du trafic mobile pour les formulaires
- ✅ UX optimisée sur tous les devices
- ✅ Formulaires centrés plus professionnels

**Breakpoints appliqués** :
- Base : Mobile (320px+)
- `sm:` (640px+) : Tablettes avec padding augmenté
- `md:` (768px+) : Desktop avec max-width
- `lg:` (1024px+) : Large desktop

### UX Optimizations
**Décision** : Transitions fluides et feedback visuel

**Justification** :
- ✅ Perception de performance améliorée
- ✅ Interface plus moderne et professionnelle
- ✅ Feedback utilisateur immédiat

**Implémentations** :
- `transition duration-200` sur tous les éléments interactifs
- Messages flash avec couleurs sémantiques
- Focus states améliorés avec ring-blue-600
- Hover states cohérents

### Corrections Techniques
**Décision** : Fix warnings PHP et HTML propre

**Justifications** :
- ✅ UX propre sans messages d'erreur
- ✅ HTML sémantique et accessible
- ✅ Performance optimisée

**Solutions appliquées** :
- Configuration .htaccess pour masquer warnings PHP 8.2
- Labels HTML natifs au lieu de form_label avec |raw
- Meta viewport et lang='fr' pour accessibilité

## 🆕 Décisions V2.1.1 - Navigation & Interface Guidée (Janvier 2025)

### 🧭 Architecture Navigation Responsive
**Décision** : Header unifié avec JavaScript vanilla pour le responsive

**Justification** :
- ✅ Simplicité : Pas de dépendance Flowbite complexe
- ✅ Performance : JavaScript minimal et optimisé
- ✅ Maintenance : Code compréhensible et modifiable
- ✅ Compatibilité : Fonctionne avec tous les breakpoints

**Implémentation** :
- Classes Tailwind `md:flex` et `md:hidden` pour le responsive
- Script JavaScript pour toggle du menu mobile
- Boutons CTA adaptatifs selon l'état de connexion

### 🎨 Gestion des Styles CSS
**Décision** : Tailwind CSS local + CDN temporaire avec configuration

**Justification** :
- ✅ Flexibilité : CDN pour développement rapide
- ✅ Performance : Build local pour production
- ✅ Dark mode : Configuration `darkMode: 'class'` préservée
- ✅ Styles custom : Gradients et classes personnalisées maintenues

**Configuration** :
```javascript
tailwind.config = {
    darkMode: 'class',
    theme: { extend: { colors: { primary: {...} } } }
}
```

### 🎯 Interface d'Estimation par Étapes
**Décision** : Nouvelle route `/estimation-v2` avec navigation guidée

**Justification** :
- ✅ UX améliorée : Progression claire et validation conditionnelle
- ✅ Réduction cognitive : Une étape à la fois
- ✅ Conversion : Moins d'abandon grâce au guidage
- ✅ Flexibilité : Coexistence avec l'outil existant

**Architecture** :
- 4 étapes : Type projet → Infos de base → Fonctionnalités → Résultats
- Barre de progression visuelle avec pourcentage
- Validation avant passage à l'étape suivante
- Navigation Précédent/Suivant intelligente

### 🔧 Intégration Vue.js Optimisée
**Décision** : Template dédié pour l'estimation sans header Symfony

**Justification** :
- ✅ Séparation des responsabilités : Landing page vs Outil
- ✅ Performance : Chargement direct de l'app Vue.js
- ✅ Maintenance : Pas de conflit entre headers
- ✅ Évolutivité : Facilite les futures améliorations

**Implémentation** :
- `/estimation` : Template dédié avec `<div id="app"></div>`
- Chargement direct du composant `EstimationForm.vue`
- Assets Webpack Encore optimisés

**Créé le** : Juillet 2024
**Dernière révision** : 21 janvier 2025
**Status** : ✅ Navigation corrigée - Interface V2 implémentée - Architecture optimisée

---

**Version actuelle : 2.1.1**
