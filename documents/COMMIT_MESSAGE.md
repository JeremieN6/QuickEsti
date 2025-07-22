# COMMIT

```bash
git add .
git commit -m "feat(blog+profile): Section blog + profil utilisateur complet

📝 SECTION BLOG AJOUTÉE
- Navigation mise à jour : Remplacement FAQ par Blog dans header
- Route blog configurée : Lien vers app_blog dans navigation desktop/mobile
- UX améliorée : Préparation pour section contenu et articles
- Design cohérent : Intégration harmonieuse avec navigation existante

👤 PROFIL UTILISATEUR COMPLET
- Section profil dashboard : Affichage de toutes les informations utilisateur
- Modal d'édition responsive : Interface Flowbite moderne avec validation
- 8 champs éditables : Email, nom, prénom, entreprise, téléphone, adresse, ville, TVA
- Persistance automatique : Sauvegarde en base avec messages de confirmation
- Design cohérent : Intégration parfaite avec le thème existant

🔧 AMÉLIORATIONS TECHNIQUES
- Formulaire Symfony : UserProfileFormType avec validation et styling Tailwind
- Contrôleur sécurisé : Vérification d'authentification et gestion des erreurs
- Base de données étendue : Nouveaux champs adresse, ville, tvaNumber, addressCompagny
- Template optimisé : Modal intégrée dans dashboard sans conflits

🐛 CORRECTIONS FORMULAIRE
- Structure corrigée : Suppression des balises form dupliquées
- Boutons fonctionnels : Correction du mapping profileForm.save
- Validation complète : Gestion correcte des erreurs et messages flash
- Responsive design : Compatible desktop/mobile avec dark mode

📁 FICHIERS MODIFIÉS
- templates/header.html.twig : Navigation mise à jour avec lien blog
- src/Form/UserProfileFormType.php : Nouveau formulaire de profil
- src/Controller/HomeController.php : Gestion du profil utilisateur
- templates/main/dashboard.html.twig : Section profil et modal d'édition
- src/Entity/Users.php : Nouveaux champs utilisateur
- documents/ : Documentation mise à jour

Version: v2.2.2 - Blog + profil utilisateur complet"

git push origin main
```
