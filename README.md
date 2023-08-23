<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## How to run locally

Assuming you have Node, composer, php installed:
1. In root run:
```
npm install
composer install
php artisan serve
```
2. Rename the '.env.example' file to '.env'. Add your own AnyAPI key by editing ANYAPI_KEY variable if necessary
3. Open a new terminal and in root run:
```
cd react
npm install
npm run dev
```
4. In 'react' folder rename the '.env.example' file to '.env'. Change the port number to laravel port if necessary.
5. In any browser open localhost:3000
