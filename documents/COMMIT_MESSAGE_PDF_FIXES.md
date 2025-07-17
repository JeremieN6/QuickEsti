# Message de commit pour les corrections PDF

```bash
git add .
git commit -m "fix: Corrections et améliorations export PDF entreprise

🎯 CORRECTIONS PDF ENTREPRISE

✅ BUGS CORRIGÉS
- userType 'entreprise' vs 'enterprise' : Normalisation automatique
- Template entreprise : Gestion cas sans breakdown détaillé
- Timeline PDF : Barre verticale limitée à la section planning
- Tableau PDF : Proposition commerciale sur toute la largeur

✨ AMÉLIORATIONS VISUELLES
- Titres : 'Récapitulatif d'Estimation' au lieu de 'Devis Commercial'
- Sous-titres : 'Export d'estimation pour entreprise/agence - Projet : [type]'
- Noms fichiers : Format 'estimation-[type]-quickesti-[date].pdf'
- Phases traduites : analysis → Analyse, development → Développement

🔧 TECHNIQUE
- Méthode translatePhases() pour traduction automatique
- CSS timeline avec height: calc(100% - 10px)
- CSS tableau avec width: calc(100% + 30px)
- Normalisation userType dans EstimationController

📊 RÉSULTAT
- Export PDF entreprise 100% fonctionnel
- Mise en page professionnelle et cohérente
- Branding QuickEsti optimisé
- Gestion d'erreurs robuste

Closes #PDF-FIXES"
```

## Fichiers modifiés

### Backend
- `src/Controller/EstimationController.php` : Normalisation userType
- `src/Service/DomPDFService.php` : Traduction phases + amélioration données
- `templates/pdf/base.html.twig` : CSS timeline et tableau
- `templates/pdf/entreprise_devis.html.twig` : Titres et sous-titres

### Documentation
- `documents/CHANGELOG.md` : Version 1.4.1 avec détails
- `documents/ETAT_ACTUEL.md` : Section PDF mise à jour

## Tests
- Export PDF entreprise : ✅ Fonctionnel (68 KB)
- Noms de fichiers : ✅ Format standardisé
- Timeline : ✅ Barre limitée à la section 6
- Tableau : ✅ Pleine largeur
- Phases : ✅ Traduites en français
