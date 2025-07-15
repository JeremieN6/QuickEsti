# Message de commit pour la nouvelle fonctionnalité

```bash
git add .
git commit -m "feat: Ajout mode 'Devis Client' pour différencier coût interne vs prix de vente

🎯 NOUVELLE FONCTIONNALITÉ - Mode Devis Client

✨ RÉSOLUTION CAS D'USAGE RÉGIE
- Toggle 'Estimation interne' vs 'Devis client'
- Champs client (type, budget, concurrence)
- Benchmarks TJM marché par secteur
- Marge commerciale automatique (30-50%)
- Ajustements concurrentiels (-10% à +25%)

🧠 PROMPTS IA SPÉCIALISÉS
- Mode interne: Coût personnel du freelance
- Mode devis: Prix de vente recommandé marché
- Benchmarks intégrés (Startup 400-600€, Entreprise 600-800€)
- Positionnement concurrentiel intelligent

🛠️ IMPLÉMENTATION TECHNIQUE
- FreelanceConstraints.vue: Toggle + champs conditionnels
- OpenAIService.php: Prompts spécialisés par mode
- Méthodes helper pour labels client/budget/concurrence
- Rétrocompatible: Mode interne par défaut

🎯 IMPACT UTILISATEUR
- Résout le cas d'usage régie vs forfait
- Prix de vente cohérents avec le marché
- Arguments commerciaux pour justifier les prix
- Différenciation claire coût/vente

📊 EXEMPLE CONCRET
- Projet WordPress e-commerce (20j)
- Mode interne: 20j × 400€ = 8 000€ (coût)
- Mode devis: 20j × 600€ + marge = 16 800€ (vente)

🎯 CAS D'USAGE RÉSOLU
- Freelance forfait: Estimation coûts ✅ (existant)
- Freelance régie: Prix de vente ✅ (nouveau)

Version: v1.1.0 - Fonctionnalité Devis Client"

git push origin main
```


