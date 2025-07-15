# 🚀 Guide de déploiement QuickEsti

## 📋 Prérequis production

### Serveur
- **PHP** : 8.2+ avec extensions (curl, json, mbstring, xml, zip, intl)
- **Node.js** : 18+ pour build des assets
- **Serveur web** : Apache 2.4+ ou Nginx 1.18+
- **HTTPS** : Certificat SSL obligatoire
- **Mémoire** : 512MB minimum, 1GB recommandé

### Services externes
- **OpenAI API** : Clé API valide (optionnel)
- **Monitoring** : Logs et métriques

## 🔧 Configuration production

### 1. Variables d'environnement (.env.local)
```bash
###> Production Configuration ###
APP_ENV=prod
APP_DEBUG=false
APP_SECRET=your-super-secure-secret-key-here
###< Production Configuration ###

###> OpenAI Configuration ###
OPENAI_API_KEY=sk-your-production-openai-key
###< OpenAI Configuration ###

###> Security ###
# Générer avec: php bin/console secrets:generate-keys
###< Security ###
```

### 2. Build des assets
```bash
# Installation des dépendances
composer install --no-dev --optimize-autoloader
npm ci --production

# Build optimisé
npm run build

# Permissions
chmod -R 755 var/
chmod -R 755 public/build/
```

### 3. Cache Symfony
```bash
# Vider et réchauffer le cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Optimisations
composer dump-autoload --optimize --no-dev
```

## 🌐 Configuration serveur web

### Apache (.htaccess déjà configuré)
```apache
<VirtualHost *:443>
    ServerName quickesti.yourdomain.com
    DocumentRoot /var/www/quickesti/public
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Security Headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # Compression
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
    </Location>
    
    ErrorLog ${APACHE_LOG_DIR}/quickesti_error.log
    CustomLog ${APACHE_LOG_DIR}/quickesti_access.log combined
</VirtualHost>
```

### Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name quickesti.yourdomain.com;
    root /var/www/quickesti/public;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Gzip Compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    location / {
        try_files $uri /index.php$is_args$args;
    }
    
    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }
    
    location ~ \.php$ {
        return 404;
    }
    
    error_log /var/log/nginx/quickesti_error.log;
    access_log /var/log/nginx/quickesti_access.log;
}
```

## 🐳 Déploiement Docker

### Dockerfile
```dockerfile
FROM php:8.2-apache

# Extensions PHP
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl \
    && docker-php-ext-install zip

# Node.js pour build
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration Apache
RUN a2enmod rewrite ssl headers deflate
COPY docker/apache-prod.conf /etc/apache2/sites-available/000-default.conf

# Code source
WORKDIR /var/www/html
COPY . .

# Build production
RUN composer install --no-dev --optimize-autoloader
RUN npm ci --production && npm run build

# Permissions
RUN chown -R www-data:www-data var/ public/build/
RUN chmod -R 755 var/ public/build/

EXPOSE 80 443
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  quickesti:
    build: .
    ports:
      - "80:80"
      - "443:443"
    environment:
      - APP_ENV=prod
      - APP_DEBUG=false
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./var:/var/www/html/var
      - ./ssl:/etc/ssl/certs
    restart: unless-stopped
    
  # Optionnel: Redis pour cache
  redis:
    image: redis:7-alpine
    restart: unless-stopped
```

## 📊 Monitoring et logs

### Logs Symfony
```bash
# Logs d'application
tail -f var/log/prod.log

# Logs serveur web
tail -f /var/log/apache2/quickesti_error.log
tail -f /var/log/nginx/quickesti_error.log
```

### Métriques API
```bash
# Test de santé
curl https://quickesti.yourdomain.com/api/estimation/health

# Monitoring automatique
*/5 * * * * curl -f https://quickesti.yourdomain.com/api/estimation/health || echo "API DOWN"
```

### Alertes recommandées
- **Erreurs 5xx** > 1% du trafic
- **Temps de réponse** > 2 secondes
- **Coûts OpenAI** > budget mensuel
- **Espace disque** < 10% libre

## 🔒 Sécurité production

### Checklist sécurité
- [ ] ✅ **HTTPS obligatoire** avec certificat valide
- [ ] ✅ **Headers de sécurité** configurés
- [ ] ✅ **APP_DEBUG=false** en production
- [ ] ✅ **Clés secrètes** générées et sécurisées
- [ ] ✅ **Permissions fichiers** restrictives
- [ ] ✅ **Logs** sans données sensibles
- [ ] ✅ **Rate limiting** sur API
- [ ] ✅ **Firewall** configuré

### Variables sensibles
```bash
# Ne JAMAIS commiter ces valeurs
APP_SECRET=generate-unique-secret
OPENAI_API_KEY=sk-production-key
```

## 🚀 Processus de déploiement

### Déploiement manuel
```bash
# 1. Backup
tar -czf backup-$(date +%Y%m%d).tar.gz var/ public/build/

# 2. Pull du code
git pull origin main

# 3. Installation
composer install --no-dev --optimize-autoloader
npm ci --production

# 4. Build
npm run build

# 5. Cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# 6. Permissions
chmod -R 755 var/ public/build/

# 7. Test
curl -f https://yourdomain.com/api/estimation/health
```

### CI/CD avec GitHub Actions
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.2
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: |
          composer install --no-dev --optimize-autoloader
          npm ci --production
          
      - name: Build assets
        run: npm run build
        
      - name: Deploy to server
        run: |
          # Votre script de déploiement
          rsync -avz --delete . user@server:/var/www/quickesti/
```

## 🔧 Maintenance

### Tâches régulières
```bash
# Nettoyage logs (hebdomadaire)
find var/log/ -name "*.log" -mtime +30 -delete

# Mise à jour dépendances (mensuel)
composer update --no-dev
npm update

# Monitoring espace disque
df -h /var/www/quickesti/
```

### Sauvegarde
```bash
# Script de sauvegarde quotidien
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backup/quickesti-$DATE.tar.gz \
  /var/www/quickesti/var/ \
  /var/www/quickesti/.env.local

# Garder 30 jours de sauvegarde
find /backup/ -name "quickesti-*.tar.gz" -mtime +30 -delete
```

## 📞 Support

### En cas de problème
1. **Vérifier les logs** : `var/log/prod.log`
2. **Tester l'API** : `/api/estimation/health`
3. **Vérifier les permissions** : `var/` et `public/build/`
4. **Reconstruire le cache** : `cache:clear --env=prod`

### Contacts
- **Technique** : Logs et monitoring
- **OpenAI** : Status page et documentation API
- **Serveur** : Provider d'hébergement
