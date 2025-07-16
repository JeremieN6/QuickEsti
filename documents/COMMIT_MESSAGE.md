# Message de commit pour la logique Forfait vs Régie

```bash
git add .
git commit -m "feat: Implémentation logique Forfait vs Régie pour freelances

🎯 LOGIQUE MÉTIER FREELANCE - Forfait vs Régie

✨ RESTRUCTURATION INTERFACE
- Section 2: 'Type de freelance' au lieu de 'Type d'estimation'
- Forfait: Payé au temps → TJM visible, estimation coût interne
- Régie: Payé au résultat → Infos client, prix de vente marché
- Section 6: Conditionnelle (seulement en régie)
- TJM: Conditionnel (seulement en forfait)

🔧 MODIFICATIONS TECHNIQUES
- FreelanceConstraints.vue: Suppression champs client, TJM conditionnel
- FreelanceClientInfo.vue: Nouveau composant conditionnel
- EstimationForm.vue: Gestion freelanceType + clientInfo
- OpenAIService.php: Adaptation freelanceType vs estimationMode
- Prompts différenciés selon mode de travail

📊 EXPÉRIENCE UTILISATEUR AMÉLIORÉE
- Parcours Forfait: TJM visible, section 6 masquée
- Parcours Régie: TJM masqué, section 6 infos client
- Logique intuitive: Champs adaptés au contexte
- Terminologie claire: Plus de confusion estimation/devis

🧠 IA ADAPTÉE AU CONTEXTE
- Prompts Forfait: Focus coût interne + TJM personnel
- Prompts Régie: Focus prix marché + benchmarks sectoriels
- Données pertinentes: Seulement les infos utiles selon mode
- Estimations précises: Adaptées au mode de travail

📊 DOCUMENTATION COMPLÈTE
- ETAT_ACTUEL.md: Nouvelle section logique Forfait/Régie
- ROADMAP.md: Fonctionnalités réalisées mises à jour
- README.md: Différenciation métier freelance
- LOGIQUE_FORFAIT_REGIE.md: Documentation technique complète

🎯 IMPACT MÉTIER
- Clarté conceptuelle: Séparation nette Forfait vs Régie
- Interface adaptée: Conditionnalité selon besoin
- Estimations précises: Coût interne vs Prix marché
- Évolutivité: Architecture extensible et maintenable

Version: v1.4.0 - Logique Forfait vs Régie implémentée"

git push origin main
```


