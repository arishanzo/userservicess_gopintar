@echo off
echo Resetting booking tables...

php artisan migrate:rollback --step=3
php artisan migrate

echo Done!
pause