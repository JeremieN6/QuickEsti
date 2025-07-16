# 🧪 Guide de test - QuickEsti Flux Entreprise

## 🎯 Objectif
Valider que toutes les sections du parcours entreprise fonctionnent correctement et que les données sont bien collectées.

## 🚀 Démarrage
1. Ouvrir http://localhost:8000 dans le navigateur
2. Vérifier que la page se charge sans erreur
3. Ouvrir les outils de développement (F12) pour surveiller la console

## ✅ Tests à effectuer

### 1. **Sélection du type d'utilisateur**
- [ ] Cliquer sur "Entreprise / Agence"
- [ ] Vérifier que la section se développe avec les détails
- [ ] Vérifier que les 6 sections entreprise apparaissent
- [ ] Tester le retour sur "Développeur / Freelance" (doit basculer vers le flux freelance)

### 2. **Section 1 : Informations de base entreprise**
- [ ] Sélectionner un type de projet (ex: "SaaS")
- [ ] Choisir "Autre" et saisir un type personnalisé
- [ ] Sélectionner "Nouveau projet" ou "Projet existant"
- [ ] Remplir les technologies par catégorie (Frontend, Backend, DB, Infra)
- [ ] Sélectionner une fourchette de pages (ex: "11-20 pages")
- [ ] Tester les 3 types de deadline : durée, date, flexible
- [ ] Sélectionner une raison de chiffrage (ex: "Facturer à un client")
- [ ] Tester "Autre raison" avec description personnalisée
- [ ] Vérifier que le résumé s'affiche en bas de section

### 3. **Section 2 : Structure & organisation**
- [ ] Sélectionner votre rôle (ex: "CTO")
- [ ] Tester "Autre" avec rôle personnalisé
- [ ] Cocher plusieurs types d'équipe (ex: Développeurs internes + Freelances)
- [ ] Ajouter plusieurs profils d'équipe avec nombres
- [ ] Supprimer un profil d'équipe
- [ ] Sélectionner une méthodologie (ex: "Agile")
- [ ] Vérifier le calcul du nombre total de personnes
- [ ] Vérifier que le résumé se met à jour

### 4. **Section 3 : Fonctionnalités et périmètre fonctionnel**
- [ ] Cocher plusieurs fonctionnalités (ex: Auth/SSO, Dashboard, API)
- [ ] Cocher "Phase 2" et décrire les fonctionnalités
- [ ] Sélectionner une priorité pour la phase 2
- [ ] Choisir une option de scalabilité
- [ ] Sélectionner un degré de complexité fonctionnelle
- [ ] Vérifier le calcul de complexité globale
- [ ] Vérifier l'affichage des badges de fonctionnalités

### 5. **Section 4 : Livrables attendus & périmètre**
- [ ] Sélectionner qui gère l'UI/UX (interne/externe/inclus)
- [ ] Choisir le statut des maquettes (disponibles/partielles/aucune)
- [ ] Indiquer le statut des spécifications
- [ ] Sélectionner le type de communication client
- [ ] Cocher plusieurs services techniques inclus
- [ ] Vérifier l'impact sur le projet dans le résumé

### 6. **Section 5 : Objectifs business**
- [ ] Sélectionner un objectif de projet (ex: "MVP pour tester")
- [ ] Tester le contexte budgétaire "Budget défini" avec montant et flexibilité
- [ ] Tester "Pas encore défini" et "Estimation seulement"
- [ ] Sélectionner une urgence (ex: "Moyen - Prioritaire")
- [ ] Ajouter des contraintes spécifiques (optionnel)
- [ ] Vérifier les recommandations stratégiques

### 7. **Section 6 : Coûts et tarification**
- [ ] Cocher "J'ai des estimations de coûts journaliers"
- [ ] Ajouter plusieurs profils avec coûts (ex: Dev Senior 600€, Designer 500€)
- [ ] Supprimer un profil de coût
- [ ] Cocher "Intégrer un taux de marge" avec pourcentage
- [ ] Tester les différents types de marge
- [ ] Sélectionner un modèle de facturation (Forfait/Régie/Mix)
- [ ] Choisir un contexte de facturation
- [ ] Vérifier le calcul du coût journalier moyen

### 8. **Barre de progression et validation**
- [ ] Vérifier que la barre de progression se met à jour
- [ ] Remplir suffisamment de champs pour atteindre 100%
- [ ] Vérifier que le bouton "Générer l'estimation" devient actif
- [ ] Cliquer sur le bouton (doit afficher le message "à venir")

### 9. **Sauvegarde automatique**
- [ ] Remplir quelques champs dans plusieurs sections
- [ ] Rafraîchir la page (F5)
- [ ] Vérifier que les données sont restaurées depuis localStorage
- [ ] Ouvrir les outils de développement > Application > Local Storage
- [ ] Vérifier la structure des données entreprise dans "quickesti_data"

### 10. **Responsive design**
- [ ] Tester sur mobile (mode responsive des outils dev)
- [ ] Vérifier que les grilles s'adaptent
- [ ] Vérifier la lisibilité des sections complexes sur petit écran

### 11. **Console et erreurs**
- [ ] Vérifier qu'aucune erreur JavaScript n'apparaît dans la console
- [ ] Vérifier les logs de mise à jour des données entreprise
- [ ] Tester les interactions sans erreur

## 🔄 **Test de basculement Freelance ↔ Entreprise**
- [ ] Remplir quelques champs en mode Entreprise
- [ ] Basculer vers Freelance
- [ ] Vérifier que les sections changent
- [ ] Revenir en mode Entreprise
- [ ] Vérifier que les données entreprise sont conservées

## 🐛 Problèmes potentiels à surveiller

### Erreurs JavaScript spécifiques
- Erreurs de composants entreprise non définis
- Problèmes de réactivité dans les sections complexes
- Erreurs de binding des événements

### Problèmes d'affichage entreprise
- Sections qui ne s'affichent pas
- Grilles complexes mal alignées
- Problèmes de responsive sur les tableaux

### Logique métier entreprise
- Calculs incorrects (coûts, progression, complexité)
- Données non sauvegardées entre sections
- Problèmes de validation des champs obligatoires

## ✅ Critères de validation

### Fonctionnel
- [x] Toutes les 6 sections entreprise s'affichent
- [x] Les données sont collectées et sauvegardées
- [x] La barre de progression fonctionne pour les entreprises
- [x] L'affichage conditionnel fonctionne

### Technique
- [x] Aucune erreur JavaScript
- [x] Composants Vue.js bien intégrés
- [x] Sauvegarde localStorage opérationnelle pour les deux flux

### UX/UI Entreprise
- [x] Interface adaptée au vocabulaire entreprise
- [x] Sections logiquement organisées
- [x] Feedback visuel approprié pour les calculs

## 🎉 Résultat attendu

À la fin du test, vous devriez avoir :
1. Un formulaire entreprise complet avec toutes les 6 sections remplies
2. Une barre de progression à 100%
3. Un bouton d'estimation actif
4. Toutes les données sauvegardées en localStorage
5. Aucune erreur dans la console
6. Possibilité de basculer entre freelance et entreprise sans perte de données

## 📊 **Données de test suggérées**

### Exemple de projet entreprise
- **Type** : SaaS
- **Technologies** : React, Node.js, PostgreSQL, AWS
- **Pages** : 21-50 pages
- **Deadline** : 6 mois
- **Raison** : Facturation client
- **Équipe** : 3 Dev Senior, 1 Designer, 1 Chef de projet
- **Fonctionnalités** : Auth/SSO, Dashboard, API, Notifications
- **Budget** : 150 000€ HT (flexible)
- **Urgence** : Prioritaire
- **Coûts** : Dev Senior 600€/jour, Designer 500€/jour
- **Marge** : 20% commerciale
- **Modèle** : Forfait

## 📝 Notes pour les développeurs

- Les données entreprise sont stockées dans `localStorage` sous `entrepriseData`
- La structure suit le format défini dans `EstimationForm.js`
- Chaque section a sa propre logique de validation
- Les calculs de complexité et coûts sont dynamiques
- Le système supporte le basculement entre les deux flux

---

**Version du guide** : 1.0  
**Dernière mise à jour** : Juillet 2024
