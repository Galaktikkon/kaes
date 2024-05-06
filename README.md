# TO DO LIST

## DATABASE

* [X] ~~*tech: **DJANGO** (samo generuje tabele w bazie danych), wsparcie dla PostgreSQL*~~ [2024-03-12]

## FRONTEND

tech: **Next.js** (ma wbudowany router i łatwy jest do ogarniecia), **Chakra-UI**

* [X] ~~*panel do logowania/rejestracji*~~ [2024-03-27]
* [ ] panel do konfiguracji zadan (wybor cwiczenia, intstrumentu, dlugosci itp.)
  * [X] ~~*konfiguracja puli zadan*~~ [2024-05-06]
  * [X] ~~*kofiguracja dlugosci nut*~~ [2024-05-06]
  * [ ] wybor instrumentu (sample + sampler Tone.js)
    * [ ] zakres dzwiekow w oparciu o instrument
* [X] ~~*glowny pasek do nawigacji (wylogowanie, link do profilu uzytkownika)*~~ [2024-04-08]
* [ ] panel statystyk uzytkownika
* [X] ~~*interfejs gry (wybor odpowiedzi, biezace statystyki sesji)*~~ [2024-05-06]
  * [X] ~~*interfejs dla interwalow*~~ [2024-04-08]
  * [X] ~~*interfejs dla trojdzwiekow*~~ [2024-04-08]
  * [X] ~~*interfejs dla czterodzwiekow*~~ [2024-04-08]
  * [X] ~~*przycisk start/stop/skip*~~ [2024-05-06]

## BACKEND

tech: **DJANGO**

* [X] ~~*generowanie przykladow*~~ [2024-05-06]
  * [X] ~~*endpoint zwracajacy zadanie w zalezniosci od interwalu*~~ [2024-05-06]
    * [X] ~~*jeden typ (np. pryma)*~~ [2024-04-07]
    * [X] ~~*moze przyjac wiele typow*~~ [2024-04-07]
  * [X] ~~*endpoint zwracajacy zadanie w zalezniosci od trojdzwieku*~~ [2024-05-06]
    * [X] ~~*jeden typ (np. molowy)*~~ [2024-04-07]
    * [X] ~~*moze przyjac wiele typow*~~ [2024-04-08]
  * [X] ~~*endpoint zwracajacy zadanie w zalezniosci od trojdzwieku czterodzwieku*~~ [2024-05-06]
    * [X] ~~*jeden typ (np. D7)*~~ [2024-04-07]
    * [X] ~~*moze przyjac wiele typow*~~ [2024-04-08]
* [X] ~~*sprawdzanie odpowiedzi*~~ [2024-05-06]
  * [X] ~~*endpoint sprawdzajacy odpowiedz uzytkownika*~~ [2024-05-06]
* [ ] zapisywanie statystyk uzytkownika do bazy
  * [ ] endpoint do zapisywania odpowiedzi interwalow
  * [ ] endpoint do zapisywania odpowiedzi trojdzwiekow
  * [ ] endpoint do zapisywania odpowiedzi czterodzwiekow
  * [ ] DODATEK NA SAM KONIEC: zapis dla niezalogowanych poprzez UUID COOKIES
* [X] ~~*rejestracja uzytkownika (email bez potwierdzenia, haslo)*~~ [2024-03-25]
* [X] ~~*logowanie uzytkownika (zwracajace token JWT)*~~ [2024-03-25]
* [ ] endpoint zwracajacy statystyki uzytkownika (GET, za pomoca headera Authorisation)
