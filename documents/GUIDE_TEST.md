# 🧪 Guide de test - QuickEsti

## 🎯 Objectif
Valider que toutes les sections du parcours freelance fonctionnent correctement et que les données sont bien collectées.

## 🚀 Démarrage
1. Ouvrir http://localhost:8000 dans le navigateur
2. Vérifier que la page se charge sans erreur
3. Ouvrir les outils de développement (F12) pour surveiller la console

## ✅ Tests à effectuer

### 1. **Sélection du type d'utilisateur**
- [ ] Cliquer sur "Développeur / Freelance"
- [ ] Vérifier que la section se développe avec les détails
- [ ] Vérifier que les sections freelance apparaissent
- [ ] Tester le clic sur "Entreprise / Agence" (doit afficher le message placeholder)

### 2. **Section 1 : Informations de base**
- [ ] Sélectionner un type de projet (ex: "SaaS")
- [ ] Choisir "Autre" et saisir un type personnalisé
- [ ] Sélectionner une fourchette de pages (ex: "6-10 pages")
- [ ] Saisir des technologies (ex: "React, Node.js, PostgreSQL")
- [ ] Choisir "Nouveau projet" ou "Projet existant"
- [ ] Saisir une deadline (ex: 30 jours)
- [ ] Vérifier que le résumé s'affiche en bas de section

### 3. **Section 2 : Contraintes du freelance**
- [ ] Vérifier que les technologies saisies apparaissent pour évaluation
- [ ] Sélectionner des niveaux de compétence pour chaque techno
- [ ] Choisir "Temps plein" ou "Temps partiel"
- [ ] Cocher "TJM cible" et saisir une valeur (ex: 500€)
- [ ] Sélectionner une marge de sécurité (ex: 20%)
- [ ] Vérifier le calcul d'exemple de la marge
- [ ] Vérifier que le résumé se met à jour

### 4. **Section 3 : Fonctionnalités additionnelles**
- [ ] Cocher plusieurs fonctionnalités (ex: Authentification, API, Paiement)
- [ ] Ajouter une fonctionnalité personnalisée avec complexité
- [ ] Supprimer une fonctionnalité personnalisée
- [ ] Vérifier le calcul de complexité globale
- [ ] Vérifier l'affichage des badges de fonctionnalités sélectionnées

### 5. **Section 4 : Livrables & périmètre**
- [ ] Sélectionner un périmètre (ex: "Développement + UI")
- [ ] Choisir si les maquettes sont fournies ou à créer
- [ ] Indiquer si les specs sont fournies ou à définir
- [ ] Sélectionner le type de communication (fréquente/minimale)
- [ ] Cocher des services additionnels (hébergement, déploiement, maintenance)
- [ ] Vérifier le résumé du périmètre

### 6. **Section 5 : Objectifs personnels**
- [ ] Sélectionner plusieurs objectifs (ex: Rentabilité, Portfolio)
- [ ] Choisir un objectif prioritaire
- [ ] Sélectionner un type de client et une situation
- [ ] Tester l'objectif "Autre" avec description personnalisée
- [ ] Vérifier le message d'impact sur le TJM

### 7. **Barre de progression et validation**
- [ ] Vérifier que la barre de progression se met à jour
- [ ] Remplir suffisamment de champs pour atteindre 100%
- [ ] Vérifier que le bouton "Générer l'estimation" devient actif
- [ ] Cliquer sur le bouton (doit afficher le message "à venir")

### 8. **Sauvegarde automatique**
- [ ] Remplir quelques champs
- [ ] Rafraîchir la page (F5)
- [ ] Vérifier que les données sont restaurées depuis localStorage
- [ ] Ouvrir les outils de développement > Application > Local Storage
- [ ] Vérifier la présence de la clé "quickesti_data"

### 9. **Responsive design**
- [ ] Tester sur mobile (mode responsive des outils dev)
- [ ] Vérifier que les grilles s'adaptent (2 colonnes → 1 colonne)
- [ ] Vérifier la lisibilité sur petit écran

### 10. **Console et erreurs**
- [ ] Vérifier qu'aucune erreur JavaScript n'apparaît dans la console
- [ ] Vérifier les logs de mise à jour des données
- [ ] Tester les interactions sans erreur

## 🐛 Problèmes potentiels à surveiller

### Erreurs JavaScript
- Erreurs de composants non définis
- Problèmes de réactivité Vue.js
- Erreurs de binding des événements

### Problèmes d'affichage
- Sections qui ne s'affichent pas
- Styles Tailwind manquants
- Problèmes de responsive

### Logique métier
- Données non sauvegardées
- Calculs incorrects (marge, progression)
- Technologies non transmises entre sections

## ✅ Critères de validation

### Fonctionnel
- [x] Toutes les sections s'affichent
- [x] Les données sont collectées et sauvegardées
- [x] La barre de progression fonctionne
- [x] L'affichage conditionnel fonctionne

### Technique
- [x] Aucune erreur JavaScript
- [x] Composants Vue.js bien intégrés
- [x] Sauvegarde localStorage opérationnelle

### UX/UI
- [x] Interface claire et intuitive
- [x] Responsive design fonctionnel
- [x] Feedback visuel approprié

## 🎉 Résultat attendu

À la fin du test, vous devriez avoir :
1. Un formulaire complet avec toutes les sections remplies
2. Une barre de progression à 100%
3. Un bouton d'estimation actif
4. Toutes les données sauvegardées en localStorage
5. Aucune erreur dans la console

## 📝 Notes pour les développeurs

- Les données sont stockées dans `localStorage` sous la clé `quickesti_data`
- La structure des données suit le format défini dans `EstimationForm.js`
- Les technologies sont automatiquement extraites et passées à la section contraintes
- Le calcul de progression est basé sur les champs essentiels de chaque section

---

**Version du guide** : 1.0  
**Dernière mise à jour** : Juillet 2024
