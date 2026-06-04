FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    sqlite \
    sqlite-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd xml

# Install MongoDB extension (for future use)
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache database
RUN chmod -R 775 storage bootstrap/cache database

# Copy env file
RUN cp .env.example .env

EXPOSE 8000

CMD ["/bin/sh", "-c", "\
    php artisan key:generate --force && \
    touch database/database.sqlite && \
    php artisan vendor:publish --provider='Laravel\\Sanctum\\SanctumServiceProvider' --force --quiet 2>/dev/null; \
    php artisan migrate --force && \
    php artisan db:seed --force && \
    exec php artisan serve --host=0.0.0.0 --port=8000 \
"]
