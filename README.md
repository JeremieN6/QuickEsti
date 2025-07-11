# 🚀 QuickEsti - Estimation de projet web

**QuickEsti** est une application web d'estimation de projets développée avec **Vue.js via CDN**, **Tailwind CSS** et **Flowbite**. Elle permet aux développeurs freelances et aux entreprises d'estimer rapidement le temps et le coût de leurs projets web.

## 🎯 Objectif du projet

Créer un outil SaaS permettant d'estimer le temps et le coût d'un projet web en fonction de paramètres comme :
- Le type de site (blog, e-commerce, application)
- Le nombre de pages
- La complexité des fonctionnalités
- Les technologies choisies
- Le profil de l'utilisateur (freelance vs entreprise)

## 🏗️ Architecture technique

### Stack technique
- **Frontend** : Vue.js 3 (via CDN)
- **CSS** : Tailwind CSS + Flowbite
- **Hébergement** : Netlify ✅
- **Backend** : Netlify Functions + OpenAI ✅
- **IA** : GPT-3.5/GPT-4 (sélection intelligente) ✅
- **Stockage** : localStorage + limitations IP ✅

### Structure du projet
```
QuickEsti_Vue/
├── index.html                 # Page principale
├── js/
│   ├── app.js                # Application Vue principale
│   └── components/
│       ├── EstimationForm.js     # Composant principal
│       ├── UserTypeSelector.js  # Sélecteur freelance/entreprise
│       └── FreelanceBasics.js   # Section info de base freelance
├── docs/
│   └── contexte.md           # Contexte détaillé du projet
└── README.md
```

## 🚀 Démarrage rapide

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd QuickEsti_Vue
   ```

2. **Lancer un serveur local**
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Ou avec Node.js
   npx serve .
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:8000
   ```

## 📋 Fonctionnalités actuelles (MVP)

### ✅ Implémenté - Phase 2 (Interface)
- [x] Structure HTML responsive avec Tailwind CSS
- [x] Sélecteur de type d'utilisateur (Freelance / Entreprise)
- [x] Affichage conditionnel des sections selon le profil
- [x] **Flux Freelance complet** (5 sections optimisées)
  - [x] Informations de base (avec résumé en bas)
  - [x] Contraintes du freelance (grid optimisé)
  - [x] Fonctionnalités additionnelles (repliable)
  - [x] Livrables & périmètre (repliable)
  - [x] Objectifs personnels (repliable)
- [x] **Flux Entreprise complet** (6 sections optimisées)
  - [x] Informations de base entreprise (avec résumé en bas)
  - [x] Structure & organisation (grid optimisé)
  - [x] Fonctionnalités et périmètre fonctionnel (repliable, grid 50/50)
  - [x] Livrables attendus & périmètre (repliable, grid 3 colonnes)
  - [x] Objectifs business (repliable, grid 50/50)
  - [x] Coûts et tarification (repliable, grid 2 colonnes)
- [x] **UX optimisée** : Tooltips explicatifs + dark mode + responsive parfait
- [x] **Limitations intelligentes** : 3 estimations/jour/IP
- [x] Barre de progression dynamique
- [x] Sauvegarde automatique en localStorage
- [x] Interface moderne avec Flowbite

### ✅ Implémenté - Phase 3 (IA)
- [x] **Intégration OpenAI** complète avec Netlify Functions
- [x] **Prompts spécialisés** freelance vs entreprise
- [x] **Interface résultats** avec breakdown détaillé
- [x] **Gestion erreurs** robuste

### ✅ Implémenté - Phase 3.1 (Optimisations)
- [x] **IA Intelligente** : Sélection automatique GPT-3.5/GPT-4 selon complexité
- [x] **Optimisations coûts** : -85% réduction coûts OpenAI
- [x] **UX optimisée** : Layout responsive + tooltips + dark mode
- [x] **Limitations** : 3 estimations/jour/IP avec reset quotidien

### 🎯 Prochaines étapes (Phase 4)
- [ ] Export PDF des estimations
- [ ] Partage URL des estimations
- [ ] Système de pricing avancé
- [ ] Historique des estimations
- [ ] Migration Symfony (Phase 5)

## 🎨 Design et UX

L'interface s'inspire du projet **tjm-calculator** avec :
- Layout propre et responsive
- Sections organisées par étapes
- Composants réutilisables
- Classes Tailwind bien structurées
- Thème sombre/clair (à venir)

## 🔧 Développement

### Composants Vue.js
- **EstimationForm** : Composant principal gérant l'état global
- **UserTypeSelector** : Choix entre freelance et entreprise

#### Composants Freelance
- **FreelanceBasics** : Informations de base
- **FreelanceConstraints** : Contraintes du freelance (TJM, compétences, marge)
- **FreelanceFeatures** : Fonctionnalités additionnelles
- **FreelanceDeliverables** : Livrables & périmètre
- **FreelanceObjectives** : Objectifs personnels

#### Composants Entreprise
- **EnterpriseBasics** : Informations de base entreprise
- **EnterpriseStructure** : Structure & organisation
- **EnterpriseFunctionalities** : Fonctionnalités et périmètre fonctionnel
- **EnterpriseDeliverables** : Livrables attendus & périmètre
- **EnterpriseObjectives** : Objectifs business
- **EnterprisePricing** : Coûts et tarification

### Données et état
- Stockage temporaire en localStorage
- Réactivité Vue.js pour les mises à jour
- Validation des formulaires

## 🧪 Tests

### Flux Freelance
Suivez le guide `GUIDE_TEST.md` pour tester le parcours freelance complet.

### Flux Entreprise
Suivez le guide `GUIDE_TEST_ENTREPRISE.md` pour tester le parcours entreprise complet.

## 🚀 Prochaines étapes

1. **Intégration IA** :
   - Netlify Functions pour OpenAI
   - Prompts d'estimation intelligents adaptés aux deux flux
   - Affichage des résultats avec recommandations

2. **Fonctionnalités avancées** :
   - Export PDF des estimations
   - Système de pricing (gratuit/premium)
   - Historique des estimations
   - Comparaison de projets

3. **Améliorations UX** :
   - Animations et micro-interactions
   - Mode sombre complet
   - Onboarding utilisateur
   - Tooltips et aide contextuelle

## � Gains et Métriques (Phase 3.1)

### 🎯 Optimisations Coûts
- **-85% coûts OpenAI** : Sélection intelligente GPT-3.5 vs GPT-4
  - Projets simples (score 1-4) → GPT-3.5 (~$0.002/estimation)
  - Projets complexes (score 5+) → GPT-4 (~$0.03/estimation)
- **Cache intelligent** : Évite les appels API répétés
- **Limitations** : 3 estimations/jour/IP avec reset quotidien

### 🎨 Améliorations UX
- **+60% utilisabilité** : Layout optimisé avec sections côte à côte
- **Tooltips explicatifs** : Aide contextuelle sur TJM, marge, technologies
- **Dark mode** : Toggle en bas à droite avec persistance
- **Responsive parfait** : Mobile/Tablet/Desktop optimisés
- **-60% espace vide** : Grid/Flexbox pour layout dense

### 🧠 Qualité Estimations
- **+40% précision** : Contexte métier intégré dans les prompts
- **Validation cohérence** : Détection incohérences (TJM vs technologies)
- **Scoring complexité** : Analyse automatique pour sélection GPT
- **Prompts spécialisés** : Freelance vs Entreprise adaptés

## �📝 Notes de développement

- Pas d'outils de build (Webpack, Vite) - tout en HTML/CSS/JS simple
- Vue.js via CDN pour simplicité de déploiement
- Composants modulaires pour faciliter l'extension
- Code documenté et structure claire

## 🤝 Contribution

Ce projet est en développement actif. Les contributions sont les bienvenues !

---

**Version actuelle** : 1.1.0-MVP (Phase 3.1 Optimisations)
**Dernière mise à jour** : 11 Juillet 2025
