# User Services Backend

Backend API untuk aplikasi GoPintar yang mengelola layanan pengguna menggunakan Laravel framework.

## Fitur

- Autentikasi pengguna (login/register)
- Manajemen profil pengguna
- API RESTful untuk operasi CRUD
- Validasi data dan error handling
- Database migrations dan seeders

## Persyaratan Sistem

- PHP >= 8.1
- Composer
- MySQL/PostgreSQL
- Node.js & NPM (untuk asset compilation)

## Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd userbackend
```

2. Install dependencies
```bash
composer install
npm install
```

3. Setup environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Konfigurasi database di file `.env`
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gopintar_users
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Jalankan migrations
```bash
php artisan migrate
php artisan db:seed
```

6. Jalankan server
```bash
php artisan serve
```

## API Endpoints

### Authentication
- `POST /api/register` - Registrasi pengguna baru
- `POST /api/login` - Login pengguna
- `POST /api/logout` - Logout pengguna

### User Management
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `DELETE /api/user` - Delete user account

## Testing

```bash
php artisan test
```

## License

MIT License
