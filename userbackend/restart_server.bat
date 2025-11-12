@echo off
echo Clearing Laravel cache...
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo Optimizing Laravel...
php artisan config:cache
php artisan route:cache

echo Restarting Laravel server...
echo Server will start on http://localhost:8001
php artisan serve --host=127.0.0.1 --port=8001