# COMMIT

```bash
git add .
git commit -m "feat(blog): Pagination + structure HTML préservée

🔧 PROBLÈME RÉSOLU : TextEditorField transformait le HTML sémantique en <div>

AVANT:
- IA génère HTML propre (<h2>, <p>, <ul>, <ol>)
- TextEditorField/WYSIWYG transforme tout en <div>
- Structure sémantique détruite lors de l'édition

APRÈS:
- Remplacement TextEditorField → TextareaField dans BlogCrudController
- Prompt IA optimisé avec instructions HTML en premier
- Structure HTML préservée intégralement

✨ AMÉLIORATIONS
- BlogGeneratorService : Prompt simplifié de 200+ à 30 lignes essentielles
- BlogCrudController : TextareaField 20 lignes avec aide contextuelle
- GenerateBlogCommand : Commande test console pour validation
- Pagination blog : 8 articles par page avec Doctrine Paginator

📄 PAGINATION AJOUTÉE
- BlogController : Pagination avec filtrage articles publiés
- Template _pagination.html.twig : Navigation complète avec ellipses
- Ordre chronologique : Tri par ID croissant (ordre de création)
- Navigation responsive : Boutons Précédent/Suivant + numéros

🎯 RÉSULTAT
- HTML sémantique garanti : <h2>, <p>, <ul>, <ol> uniquement
- Meilleur SEO avec structure appropriée
- Contrôle total sur le formatage sans transformation WYSIWYG
- Pagination fonctionnelle avec 8 articles par page
- Ordre respecté selon l'ID de base de données

📁 FICHIERS MODIFIÉS
- src/Service/BlogGeneratorService.php : Prompt optimisé
- src/Controller/Admin/BlogCrudController.php : TextareaField
- src/Controller/BlogController.php : Pagination + tri par ID
- src/Command/GenerateBlogCommand.php : Nouveau fichier
- templates/blog/_pagination.html.twig : Nouveau composant
- templates/blog/show.html.twig : Nouveau template
- README.md : Section génération contenu IA + pagination
- documents/ : Documentation mise à jour

Version: v2.3.1 - Génération de contenu IA + Pagination"

git push origin main
```
