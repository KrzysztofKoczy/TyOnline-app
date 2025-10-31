# News App

Projekt stworzony przy użyciu [Angular CLI](https://github.com/angular/angular-cli) w wersji 20.1.3.

Aplikacja do wyświetlania newsów z zabezpieczonym logowaniem, nagłówkiem z powitaniem oraz automatyczną obsługą tokena (Bearer) przez interceptor.

## 🚀 Live Demo

Sprawdź aplikację live: [TYOnline News App Demo](https://krzysztofkoczy.github.io/TyOnline-app/)

## Funkcje

- Zarządzanie sesją użytkownika (logowanie, wylogowanie, utrzymanie stanu)
- Lista newsów pobierana z API i sortowana od najnowszych
- Nagłówek z powitaniem „Witaj, {username}” i przyciskiem Wyloguj
- Interceptor dodający Bearer Token oraz obsługa 401 (automatyczne przenoszenie na login)
- Walidacja formularza logowania (email/hasło)
- Automatyczne dodanie pola „device” (nazwa przeglądarki) do POST /login
- Responsywny interfejs z Angular Material

## 🛠️ Technologie

- Angular CLI 20.1.3
- TypeScript 5.8.2
- SCSS, Angular Material
- Signals, Standalone Components
- OnPush Change Detection
- Reactive Forms, RxJS
- Testy jednostkowe: Karma + Jasmine
- Biblioteka: detect-browser 5.3.0

## 🔧 Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom aplikację:
```bash
ng serve
```

3. Otwórz aplikację w przeglądarce:
```
http://localhost:4200
```

Uruchom testy:
```bash
ng test
```

---

## 🎯 Wymagania i założenia – jak zostały zrealizowane

### 1) Strona główna (lista newsów)
- Po wejściu na `/news` newsy są pobierane z API (`GET https://test.tyonline.pl/news`).
- Strona główna `NewsPage` (`src/app/features/news/news-page/news-page.ts`), logika biznesowa `NewsService` (`src/app/features/news/services/news.service.ts`).
- Sortowanie po polu daty (`.sort(...)`).
- Zabezpieczenie widoku przez `authGuard` (`src/app/core/guards/auth.guard.ts`).

### 2) Nagłówek (górna belka)
- Komponent `AppHeader` (`src/app/core/layout/header/app-header.ts`) wyświetla powitanie „Witaj, {username}”.
- Dane użytkownika są pobierane z API `GET https://test.tyonline.pl/login`.
- Przycisk do wylogowania „Wyloguj” - `GET https://test.tyonline.pl/logout` plus przekierowania do strony logowania.

### 3) Logowanie
- Formularz logowania (`LoginPage`) z użyciem `ReactiveForms` i walidacją.
- Do żądania `POST https://test.tyonline.pl/login` automatycznie dodawane jest pole `device` (nazwa przeglądarki) pozyskane przez `detectBrowserName()` (`src/app/utils/browser.utils.ts`).
- Po poprawnym logowaniu aplikacja zapisuje token i używa go w kolejnych zapytaniach jako Bearer Token (patrz Interceptor).

### 4) Stan zalogowania i odświeżenia strony
- Token przechowywany w `localStorage` pod kluczem `auth.token` i trzymany w sygnale `AuthService.tokenSignal` (`src/app/core/services/auth.service.ts`).
- Kontrola endpointów poprzez `authGuard`.
- Newsy pobierane na nowo przy każdym wejściu na Stronę główną.

### Interceptor i obsługa 401
- `authTokenInterceptor` (`src/app/core/interceptors/token.interceptor.ts`) dodaje nagłówek `Authorization: Bearer {token}` do każdego wyjściowego żądania.
- W przypadku błędu 401 interceptor czyści sesję i bezpiecznie przenosi użytkownika na `/login`.

### Architektura i unikanie powtarzania kodu
- Wspólny klient API: `RestService` (logowanie, bieżący użytkownik, newsy, logout).
- Warstwa autoryzacji: `AuthService` (token, sesja, sygnały), `authGuard`/`redirectLoggedInGuard` (nawigacja warunkowa).
- Przechwytywanie żądań: `authTokenInterceptor` (Bearer, obsługa 401).
- Ekrany funkcjonalne trzymane modułowo w `features/login` i `features/news`.

### Wykrywanie nazwy przeglądarki (pole `device`)
- Pierwotnie zastosowano podejście oparte o regex na `userAgent`, ale nie było ono optymalne i ciężko było złapać wszystkie przypadki.
- Po researchu zdecydowałem się na użycie lekkiej biblioteki `detect-browser` jako fallback oraz UA‑CH (`navigator.userAgentData`).
- Implementacja: `src/app/utils/browser.utils.ts` (`detectBrowserName()`), używana w `LoginPage` przy wysyłce formularza logowania.

---

## 📂 Struktura (wybrane elementy)
- `src/app/core/api/rest.service.ts` — komunikacja z API (login, logout, user, news)
- `src/app/core/services/auth.service.ts` — sesja, token, logowanie/wylogowanie
- `src/app/core/interceptors/token.interceptor.ts` — Bearer + obsługa 401
- `src/app/core/guards/auth.guard.ts` — ochrona tras i przekierowania
- `src/app/core/layout/header/app-header.*` — nagłówek z powitaniem i wylogowaniem
- `src/app/features/login/login-page/*` — ekran logowania + walidacja
- `src/app/features/news/news-page/*` — lista newsów, sortowanie
- `src/app/utils/browser.utils.ts` — detekcja przeglądarki (UA‑CH + detect-browser)