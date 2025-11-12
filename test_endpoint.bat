@echo off
echo Testing Midtrans endpoints...

echo.
echo 1. Testing health check...
curl -X GET "http://localhost:8001/api/hello" -H "Accept: application/json"

echo.
echo.
echo 2. Testing CSRF token...
curl -X GET "http://localhost:8001/sanctum/csrf-cookie" -H "Accept: application/json"

echo.
echo.
echo 3. Testing check session...
curl -X GET "http://localhost:8001/api/check-session" -H "Accept: application/json"

echo.
echo.
echo Press any key to continue...
pause > nul