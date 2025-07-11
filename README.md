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
- **Hébergement** : Netlify (prévu)
- **Backend** : Netlify Functions + OpenAI (à venir)
- **Stockage** : localStorage (temporaire)

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

### ✅ Implémenté
- [x] Structure HTML responsive avec Tailwind CSS
- [x] Sélecteur de type d'utilisateur (Freelance / Entreprise)
- [x] Affichage conditionnel des sections selon le profil
- [x] **Flux Freelance complet** (5 sections)
  - [x] Informations de base
  - [x] Contraintes du freelance
  - [x] Fonctionnalités additionnelles
  - [x] Livrables & périmètre
  - [x] Objectifs personnels
- [x] **Flux Entreprise complet** (6 sections)
  - [x] Informations de base entreprise
  - [x] Structure & organisation
  - [x] Fonctionnalités et périmètre fonctionnel
  - [x] Livrables attendus & périmètre
  - [x] Objectifs business
  - [x] Coûts et tarification
- [x] Barre de progression dynamique
- [x] Sauvegarde automatique en localStorage
- [x] Interface moderne avec Flowbite
- [x] Calculs dynamiques (complexité, coûts, progression)

### 🚧 En cours de développement
- [ ] Intégration OpenAI via Netlify Functions
- [ ] Génération d'estimations intelligentes
- [ ] Export PDF des estimations
- [ ] Système de pricing (gratuit/premium)
- [ ] Historique des estimations

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

## 📝 Notes de développement

- Pas d'outils de build (Webpack, Vite) - tout en HTML/CSS/JS simple
- Vue.js via CDN pour simplicité de déploiement
- Composants modulaires pour faciliter l'extension
- Code documenté et structure claire

## 🤝 Contribution

Ce projet est en développement actif. Les contributions sont les bienvenues !

---

**Version actuelle** : 1.0.0-MVP  
**Dernière mise à jour** : Juillet 2024
