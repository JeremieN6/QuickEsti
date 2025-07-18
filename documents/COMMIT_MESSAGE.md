# COMMIT

```bash
git add .
git commit -m "feat(auth): Implémentation complète système authentification et Stripe

🔐 AUTHENTIFICATION & SÉCURITÉ
- Création entité Users avec tous les champs (role, isVerified, resetToken, stripeId)
- Système d'inscription/connexion avec UsersAuthenticator
- Vérification email avec JWT tokens (SendMailService, JWTService)
- Réinitialisation mot de passe avec tokens sécurisés
- Templates email et formulaires de réinitialisation

💳 INTÉGRATION STRIPE
- Installation et configuration Stripe PHP SDK v17.4
- Création entités Plan, Subscription, Invoice avec relations
- Configuration clés API Stripe dans .env.local
- Structure prête pour webhooks et paiements

🗄️ BASE DE DONNÉES
- Migrations créées et exécutées pour toutes les entités
- Relations ManyToOne entre Users/Subscription/Plan
- Champs nullable pour évolutions futures
- Repository avec méthodes utiles (findOneByEmail, findOneByResetToken)

📧 SYSTÈME DE MAILS
- Configuration MailHog pour développement
- Templates Twig pour emails de vérification et reset password
- Envoi synchrone configuré dans messenger.yaml
- SendMailService avec TemplatedEmail

🛠️ CONFIGURATION
- Services.yaml avec paramètres JWT et Stripe
- Formulaires avec classes Tailwind CSS intégrées
- Routes sécurisées et redirections appropriées
- Correction PHPUnit pour compatibilité PHP 8.2

Version: v2.0.0 - Système d'authentification complet"

git push origin main
```
