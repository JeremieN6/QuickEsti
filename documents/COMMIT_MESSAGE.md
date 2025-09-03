# COMMIT

```bash
git add .
git commit -m "feat(quotes): Système de devis complet avec intégration estimation

💼 SYSTÈME DE DEVIS COMPLET IMPLÉMENTÉ

🏗️ ARCHITECTURE COMPLÈTE
- Entités Doctrine : Client, Quote, QuoteItem avec relations
- Service QuoteGeneratorService : Génération automatique depuis estimations
- Repositories : ClientRepository, QuoteRepository avec méthodes métier
- Numérotation automatique : Format DE-YYYY-NNNN avec unicité garantie

🎨 INTERFACE UTILISATEUR
- Templates Twig : Création, visualisation, liste des devis
- Gestion des statuts : Draft → Sent → Accepted/Refused/Expired
- Modal de création client : Formulaire intégré avec validation
- Design responsive : Tailwind CSS avec dark mode

🔗 INTÉGRATION ESTIMATION
- Bouton "Créer un devis" dans EstimationResults.vue
- Transfert automatique des données d'estimation
- Pré-remplissage du titre et des données JSON
- Génération automatique des postes de facturation

🛠️ API ENDPOINTS
- POST /api/quote/generate : Génération devis depuis estimation
- GET /api/clients/search : Recherche clients avec autocomplétion
- POST /api/clients : Création nouveau client
- PATCH /quotes/{id}/status : Mise à jour statut devis

👨‍💼 ADMINISTRATION
- CRUD EasyAdmin : ClientCrudController, QuoteCrudController
- Section "Devis & Clients" dans dashboard admin
- Gestion complète des entités avec champs configurés

🧭 NAVIGATION
- Lien "Mes Devis" dans header pour utilisateurs connectés
- Protection ROLE_USER pour toutes les routes /quotes
- Redirection intelligente après création de devis

🎯 FONCTIONNALITÉS MÉTIER
- Calculs automatiques : HT, TVA, TTC avec précision décimale
- Conditions de paiement par défaut configurables
- Gestion des dates : création, expiration, début estimé
- Workflow complet : brouillon → envoi → acceptation/refus

📁 FICHIERS CRÉÉS/MODIFIÉS
- src/Entity/ : Client.php, Quote.php, QuoteItem.php
- src/Repository/ : ClientRepository.php, QuoteRepository.php, QuoteItemRepository.php
- src/Service/QuoteGeneratorService.php : Service de génération
- src/Controller/QuoteController.php : Contrôleur principal
- src/Controller/Admin/ : ClientCrudController.php, QuoteCrudController.php
- templates/quote/ : index.html.twig, new.html.twig, show.html.twig
- assets/vue/components/common/EstimationResults.vue : Bouton création devis
- templates/header.html.twig : Navigation "Mes Devis"
- migrations/ : Nouvelle migration pour les tables
- README.md, documents/ : Documentation mise à jour

Version: v2.4.0 - Système de devis complet avec intégration estimation"

git push origin main
```
