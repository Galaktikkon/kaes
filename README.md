# TO DO LIST

## DATABASE

* [X] ~~*tech: **DJANGO** (samo generuje tabele w bazie danych), wsparcie dla PostgreSQL*~~ [2024-03-12]

## FRONTEND

tech: **Next.js** (ma wbudowany router i łatwy jest do ogarniecia), **Chakra-UI**

* [X] ~~*panel do logowania/rejestracji*~~ [2024-03-27]
* [ ] panel do konfiguracji zadan (wybor cwiczenia, intstrumentu, dlugosci itp.)
* [X] ~~*glowny pasek do nawigacji (wylogowanie, link do profilu uzytkownika)*~~ [2024-04-08]
* [ ] panel statystyk uzytkownika
* [ ] interfejs gry (wybor odpowiedzi, biezace statystyki sesji)
  * [X] ~~*interfejs dla interwalow*~~ [2024-04-08]
  * [X] ~~*interfejs dla trojdzwiekow*~~ [2024-04-08]
  * [X] ~~*interfejs dla czterodzwiekow*~~ [2024-04-08]
  * [ ] przycisk start/stop/skip

## BACKEND

tech: **DJANGO**

* [ ] generowanie przykladow
  * [ ]  endpoint zwracajacy zadanie w zalezniosci od interwalu
    * [X] ~~*jeden typ (np. pryma)*~~ [2024-04-07]
    * [X] ~~*moze przyjac wiele typow*~~ [2024-04-07]
    * [ ] opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla interwalow
  * [ ] endpoint zwracajacy zadanie w zalezniosci od trojdzwieku
    * [X] ~~*jeden typ (np. molowy)*~~ [2024-04-07]
    * [ ] moze przyjac wiele typow
    * [ ] opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla trojdzwiekow
  * [ ] endpoint zwracajacy zadanie w zalezniosci od trojdzwieku czterodzwieku
    * [X] ~~*jeden typ (np. D7)*~~ [2024-04-07]
    * [ ]  moze przyjac wiele typow
    * [ ]  opcje generowania przykladow (harmonicznie, melodycznie, w gore w dol, kombo) dla czterodzwiekow
* [ ] zapisywanie statystyk uzytkownika do bazy
  * [ ] endpoint do zapisywania odpowiedzi interwalow
  * [ ] endpoint do zapisywania odpowiedzi trojdzwiekow
  * [ ] endpoint do zapisywania odpowiedzi czterodzwiekow
  * [ ] DODATEK NA SAM KONIEC: zapis dla niezalogowanych poprzez UUID COOKIES
* [X] ~~*rejestracja uzytkownika (email bez potwierdzenia, haslo)*~~ [2024-03-25]
* [X] ~~*logowanie uzytkownika (zwracajace token JWT)*~~ [2024-03-25]
* [ ] endpoint zwracajacy statystyki uzytkownika (GET, za pomoca headera Authorisation)
