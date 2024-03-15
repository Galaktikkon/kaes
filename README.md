# przygotowanie modelu bazy danych

tech: DJANGO (samo generuje tabele w bazie danych), postgres gitowa

# polaczenie bazy z backendem

tech: DJANGO

# przygotowanie interfejsu uzytkownika

tech: Next.js (ma wbudowany router i latwy jest do ogarniecia), chakra-ui

- panel do logowania/rejestracji
- panel do konfiguracji zadan (wybor cwiczenia, intstrumentu, dlugosci itp.)
- glowny pasek do nawigacji (wylogowanie, link do profilu uzytkownika)
- panel statystyk uzytkownika
- interfejs gry (wybor odpowiedzi, biezace statystyki sesji)
  - interfejs dla interwalow
  - interfejs dla trojdzwiekow
  - interfejs dla czterodzwiekow
  - przycisk start/stop/skip

# przygotowanie backendu

tech: DJANGO

- generowanie przykladow
  - endpoint zwracajacy zadanie w zalezniosci od interwalu
  - jeden typ (np. pryma)
  - moze przyjac wiele typow
  - opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla interwalow
  - endpoint zwracajacy zadanie w zalezniosci od trojdzwieku
  - jeden typ (np. molowy)
  - moze przyjac wiele typow
  - opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla trojdzwiekow
  - endpoint zwracajacy zadanie w zalezniosci od trojdzwieku czterodzwieku
  - jeden typ (np. D7)
  - moze przyjac wiele typow
  - opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla czterodzwiekow
- zapisywanie statystyk uzytkownika do bazy
  - endpoint do zapisywania odpowiedzi interwalow
  - endpoint do zapisywania odpowiedzi trojdzwiekow
  - endpoint do zapisywania odpowiedzi czterodzwiekow
  - DODATEK NA SAM KONIEC: zapis dla niezalogowanych poprzez UUID COOKIES
- rejestracja uzytkownika (email bez potwierdzenia, haslo)
- logowanie uzytkownika (zwracajace token JWT)
- endpoint zwracajacy statystyki uzytkownika (GET, za pomoca headera Authorisation)
