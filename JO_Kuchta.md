## Jakość Oprogramowania

## Wykład 1 - 22.02.2021

Jakość może być rozumiana na dwa sposoby:
- stopień w jakim system, komponent lub proces spełnia wyspecyfikowane wymagania
- stopień w jakim system, komponent lub proces spełnia oczekiwania klienta lub użytkownika

![image](../img/JO_01.png)

| Wymagania         | Atrybuty Jakości |
| ----------------- | ---------------- |
| funkcjonalne      | funkcjonalność   |
| czasowe           | wydajność        |
| niezawodnościowe  | wiarygodność     |
| ograniczenia      | elstycznosć      |

## Wykład 2 - 01.03.2021 (brak)

## Wykład 3 - 08.03.2021

**Jakość w procesie wytwarzania oprogramowania**

- koszt wprowadzania zmian rośnie w zależności od fazy realizacji projektu
- definiowanie 1$ - opracowywanie 10$ - utrzymywanie 100$
- model wzmocnienia błędów
  - do skrzynki wchodzą błędy z poprzedniego etapu
  - część starych błędów jest przepuszczane, a część wzmacniania
  - do starych błędów oczywiście dochodzą te nowopowstałe
  - błędy, które nie zostały wykryte przechodzą do następnego etapu
  - błędy powstają podczas analizy, projektowania i implementacji, a wykrywa sie je podczas testowania
  - jeśli błędy będą wykrywane w pierwszych etapach, to skutkuje to zdecydowaną mniejszą błędów pod koniec procesu
  - biorąc pod uwagę koszt detekcji błędów dbanie o jakość w trakcie całego procesu jest o wiele tańsze
- ewolucja polityki jakościowej
  - kontrola jakości QC - kontrola jedynie jakości produktu końcowego
  - sterowanie jakością QC - kontrolowanie jakości produktów pośrednich
  - zapewnienie jakości SQA - opracowanie procedur zapewniających jakość na każdym etapie
  - zarządzanie jakością TQM - przeniesienie ciężaru zapewnienia jakości z inżynierów na całą organizację

**Software Quality Assurance**
- jest to planowy i usystematyzowany zbiór akcji wymaganych dla zapewnienia jakości w oprogramowaniu
- powołuje się grupę SQA tj. inżynierowie, kierownicy, klienci i inni
- przyglądają się oni oprogramowaniu z punktu widzenia klienta
- aktywności SQA
  - stosowanie metod technicznych 
  - formalne przeglądy techniczne
  - testowanie oprogramowania
  - wymuszanie standardów i kontrolowanie zmian
  - wykonywanie pomiarów i raportów
- cele formalnych raportów technicznych (FTR)
  - wykrycie błędów w funkcjach, logice lub implementacji
  - sprawdzenie czy przeglądane oprogramowanie jest zgodne z wymaganiami
  - upewnienie się że reprezentacja oprogramowania jest zgodna z wcześniej zdefiniowanymi standardami
  - uzyskanie oprogramowania opracowanego w jednolity sposób
  - sprawienie by projekty byly łatwiejsze w utrzymaniu 
- FTR może być realizowany na dwa sposoby
  - przegląd, czyli przejrzenie treści zgodnie z jego uporządkowaniem tj. linia po linii
  - inspekcje, czyli przejrzenie dokumentu zgodnie z listą kontrolną
  - takie listy kontrolne mają konkretne zagadnienia, dla każdego etapu procesu wytwarzania oprogramowania

**Total Quality Management**

- zbór działań sprawiających, że każdy członek organizacji rozuie, jakie są oczekiwania klientów tej organizacji i dąży do spełnienia tych oczekiwań
- rozumienie i spełnianie oczekiwań klientów jest wyzwaniem dla organizacji i wymaga odpowiednich procesów
- naczelne zasady TQM
  - jakość może i musi byc zarządzana
  - każdy ma swojego klienta i swojego dostawcę
  - procesy, a nie ludzie stanowią problem
  - każdy pracownik jest odpowiedzialny za jakość

## Wykład 4 - 15.03.2021

**Model jakości McCalla**

- cechy produktu rozpatrywane przez klienta można podzielić na kategorie
- czynniki jakości produktu
  - poprawność - stopień zgodności programu ze specyfikacją i zaspokojenia celów przedsięwzięcia
  - wiarygodność - stopień w jakim program wykonuje zamierzone funkcje z wymaganą precyzją
  - wydajność - ilość przetwarzanych zasobów i kodu, które program potrzebuje do wykonanywania swoich funkcji
  - integralność - stopień odporności programu lub danych na nieuprawnione użycie lub modyfikację
  - użyteczność - wysiłek, który musi byc włożony w nauczenie się programu, w jego użycie, przygotowanie danych wejściowych i interpretację danych wyjściowych
  - łatwość pielęgnacji - wysiłek, który musi być włożony w lokalizacje błędów  i ich naprawę
  - elastyczność - wysiłek wymagany dla modyfikacji działającego programu
  - testowalność - wysiłek, który jest potrzebny dla upewnienia się, że program funkcjonuje poprawnie
  - przenośność - wysiłek, który może być wymagany dla przeniesienia oprogramowania z jednego system sprzętowego na drugi 
  - możliwość powtórengo wykorzystania - stopień, w jakim całość lub część oprogramowania może zostać powórnie wykorzystana w innej aplikacji
  - łatwość współdziałania - wysiłek, który musi być włożony dla podłączenia jednego systemu do drugiego
- takie czynniki sa określane przez metryki, przy czym metryka może oceniać kilka czynników, a jedn czynnik może być oceniany przez kilka metryk
- McCall stworzył 21 metryk i miar, które oceniały wszystkie czynniki jakości produktu
- z punktu widzeni a współczesnego użytkownika - trzeba zadawać szereg pytań *tak czy nie* i potem wyniki uśrednić
- kompletność
  - czy funkcje, które deklarują twórcy sa w pełni zaimplementowane
  - czy oprogramowanie ma wszystkie funkcjonalności oferowane przez inne programy w swojej kategorii
  - czy nie brakuje funkcji, które są dla mnie szczególnie potrzebne
  - czy mam możliwość dodania szczególnych funkcji których mi brakuje
- rozszerzalność
  - czy użytkownik może rejestrować sekwencje własnych działń do wielokrotnego użycia
  - czy isteniej możliwość pisania własnych funkcji i dodawania wywołań własnych funkcji do interfejsu użytkownika
  - czy są dostępne dodatki do programu pisane przez innych 
  - czy program ma specjalne mechanizmy wspierające pracę z dużymi dokumentami, które nie mieszczą się w pamięci operacyjnej
  - czy istnieje możliwość włączenie do dokumentu obiektów zarządzanych przez inne aplikacje np. `COM`
- spójność
  - czy interfejs systemu w różnych jego komponentach ma taką samą formę
  - czy w całym systemie używa się tej samej formy wprowadzania danych
  - czy możliwe jest przejście od jednego komponentu do drugiego bez wychodzenia z systemu
  - czy interfejs systemu jest podobny do interfejsu innych systemów tej samej klasy
- prostota
  - czy funkcje programu są proste i zrozumiałe
  - czy struktura interfejsu i dodatkowe opisy są proste i zrozumiałe
  - czy ikony na przyciskach i napisy na elementach są proste i zrozumiałe
  - ludzie są w stanie zapamiętać około 7 elementów
- odporność na błędy programisty i użytkownika
  - kopie zasapasowe danych
  - parsowanie danych wejściowych
  - możliwość cofania operacji zmiany danych
  - zbieranie informacji o błędach
- samoopisowość
  - czy elemenety menu, przyciski są zrozumiałe dla użytkownika
  - czy pola danych na dialogach mają etykiety zrozumiałe dla użytkownika
  - czy ewentualne objaśnienia dla pól danych sa przydatne dla użytkownika
- instrumentacja
  - podawaniu aktualnego stanu programu
  - podawanie postępu i nazwy dokumentu
  - czy komunikaty o błędach są zrozumiałe i pomocne w jego naprawie
- 

## Wykład 5 - 22.03.2021

**Pomiar jakości**

- jakoś musi być mierzona
- celem pomiarów jest ocena jakości 
  - produktu 
  - procesów (produktywność ludzi)
   - korzyści - nowe techniki i narzędzia, rachunek zysków
- pomiary dzielą się na 
  - bezpośrednie
  - pośrednie

**Metryki w inżynierii oprogramowania**

- techniczne - złożoność, modularność
- jakości - spełnienie wymagań użytkownika
- produktywności - wydajność procesu wytwarzania

**Metryki w IO zorientowane na rozmiar**

  - metryki bezpośrednie
    - rozmiar kodu lub dokumentacji
    - pracochłonność
    - koszt
    - liczba defektów
  - metryki pośrednie
    - produktywność = kod / pracochłonność
    - awaryjność = liczba defektów / rozmiar kodu
    - kosztowność = koszt / rozmiar kodu
    - udokumentowanie = rozmiar dokumentacji / rozmiar kodu
  - zalety to możliwość łatwego obliczenia,dobrze udokumentowany wpływ rozmiaru kodu na różne cechy projektu
  - wadą jest fakt, że różne języki programowania mają różne rozmiary kodu oraz to, że krótkie i zwięzłe programy mają zaniżone wskaźniki, wymagają oszacowania rozmiaru przez jego napisaniem

**Metryki zorientowane na funkcje**

- odnoszą się do liczby funkcji
- punkty funkcyjne (function points)
  - liczone na podstawie tabeli, gdzie ocenia się z wykorzystaniem wag liczbę wejść i wyjść od użytkownika oraz liczbę zapytań, plików i interfejsów zewnętrznych
  - przeprowadzenie ankiety z pytaniami, które określają szereg cech, na których podstawie można wyliczyć metrykę punktów funkcyjnych
  - uzyskane punkty mogą być zastąpione w metrykach pośrednich zorientowanych na rozmiar jako rozmiar kodu
- punkty funkcjonalne (feature points) są bardzo zbliżone do punktów funkcyjnych
- zalety obu rozwiązańe to niezależność od języka oraz fakt, że mogą być stosowane we wczesnych fazach planowania
- wady metryk zorientowanych na funkcje to subiektywny charakter obliczeń (formularze), duża trudność zebrania danych oraz fakt że nie mają bezpośredniego znaczenia fizycznego

**Metryki złożoności**
- metryka Halsteada - mamy program wyrażony w postaci kodu źródłowgo i wyliczamy jego złożoność na podstawie ilości różnych operatorów i operandów w nim zawartych
- metryka McCabe'a - mamy program/algorytm w postaci grafu, wyliczamy obszary zamknięte, jednak trzeba wziąć pod uwagę rodzaj spójności grafu  

## Wykład 6 - 29.03.2021 (brak)

## Wykład 7 - 12.04.2021

**Organizacja ISO**

- wraz z wstąpieniem do UE weszły do Polski nowe certyfikaty 
- norma 9000 odpowiada za jakość produkcji i procesu, ale nie produktu
- ISO to międzynarodowa organizacja opracowująca standarady
- ISO wydaje certyfikaty dla komercyjnych firm - sprzedaje wówczas prawa autorskie do swoich norm (nie są opublikowane)
- istnieją czytelnie norm, gdzie można sobie notować, ale nie robić zdjęcia, czy kserować

**Norma ISO 9000**

- rodzina standardów, któa opisuje system zarządzania jakością, który może zostać wdrożony w przedsiebiorstwie, która wytwarza produkty lub usługi
- zasady ISO 9000
  - orientacja na klienta - organizacje zależą od swoich klientów i dlatego powinny rozumieć bieżące i przyszłe potrzeby klientów, spełniac ich wymagania i starać się przekraczać ich oczekiwania
  - przywództwo - przywódcy ustanawiają jedność przeznaczenia i kierunkó organizacji, tworzą i utrzymują wewnętrzne środowisko
  - zaangażowanie ludzi - ludzie na wszystkich poziomach są esencją organizacji a ich pełne zaangażowanie pozwala wykorzystać ich zdolności na korzyść organizacji
  - podejście procesowe - pożądane rezultaty są bardziej efektywnie uzyskiwane, gdy aktywności i związane z nimi zasoby są zarządzane jako proces
  - systemowe podejście do zarządzania - identyfikowanie, rozumienie i zarządzanie wzajemnie powiązanymi procesami wpływa na efektywność organizacji i wydajność w osiąganiu jej celów
  - ciągle doskonalenie - ciągłe doskonalenie działalności organizcji powinno być stałym celem organizacji
  - podejmowanie decyzji w oparciu o fakty
  - obustronne korzystne relacje z dostawcami - organizacja i ich dostawcy są wzajemnie zależni a obustronne korzystne relacje z nimi zwiększają możliwość tworzenia wartości obu stron 
- rodzaje standardów ISO 9000
  - `9000-1` - przewodnik standardów rejestracji, wybór i wykorzystanie ISO 9000
  - `9001` - model dla projektowania, produkcji, instalacji i serwisu
  - `9002` - model dla produkcji, instalacji i serwisu
  - `9003` - model dla testów i ostatecznej kontroli jakości
  - `9004-2` - wytyczne dla zarządzania jakością i elementów systemów jakości

**Elementy normy ISO 9001:1994**

- odpowiedzialność kierownictwa - zapewnienie, aby wyższe kierownictwo odnosiło się z uwagą do tego, jak należy działać, ciągle troszcząc się o jakość
- system jakości - zapewnienie, aby wyrób był zgodny z określonymi wymaganiami na powtarzalnym poziomie jakości
- przegląd umowy - jednoznaczne i jasne zrozumienie potrzeb nabywcy przez wszystkich w organizacji
- sterowanie projektowaniem - zapewnienie takiej jakości projektowej wyrobu, aby ryzyko podjęcia jego produkcji było minimalne
- nadzór nad dokumentacją i danymi - utrzymywanie w stanie aktualnym i zapewnienie dostępności wszystkich dokumentów i danych odnoszących się do postanowień normy
- zakupy - zapewnienie, aby nabywane od podwykonawców wyroby spełniały określone wymagania
- wyrób dostarczany przez nabywcę - zapewnienie jakości wyrobu dostarczanego przez nabywcę 
- oznaczanie i identyfikowanie wyrobu - stworzenie systemu zapobiegającego pomyłkom na wszystkich etapach produkcji, dostarczania i instalowania
- sterowanie procesem - ustalenie i zaplanowanie procesów produkcyjnych, instalowania i serwisu mających bezpośredni wpływ na jakość
- kontrola i badania - pokazania zgodności wyrobów z wymaganiami przy pomocy sformalizowanych dowodów
- nadzorowanie wyposażenia do kontroli i badań - uzyskanie zaufania do danych otrzymanych z kontroli, pomiarów i badań
- status kontroli i badań - pełna jasność w trakcie całego cyklu produkcyjnego co do tego, jaki jest stan wyrobu względem programu kontroli i badań, któe go dotyczą
- nadzorowanie wyrobu niezgodnego z wymaganiami - zapewnienie, że wyroby niezgodne nie zostaną wykorzystane lub zainstalowane przez przeoczenie raze z tymi, które są zgodne
- działania korygujące i zapobiegawcze - rozpoznanie i usunięcie przyczyn niezgodności, aby wyeliminować ich powtórne występienie oraz zapobieganie sytuacjom szkodliwym
- transport, przechowywanie, pakowanie - zapobieganie obniżenia jakości wyrobu do czasu, zanim zostanie użyty lub dostarczony do miejsca przeznaczenia
- zapisy dotyczące jakości - zaprezentowanie osiągnięcia wymaganej jakości oraz skuteczności działania systemu jakości
- wewnętrzne audyty jakości - zbadanie, czy działania związane z jakością są zgodne z tym co zaplanowano i skuteczne w realizacji celów jakości
- szkolenie - ciągłe doskonalenie kwalifikacji całego personelu, zaangażowanego w działania związane z jakością
- serwis - zapewnienie prawidłowej funkcjonalności wyrobu u klienta, jeżeli sobie tego życzy
- metody statystyczne - podejmowanie decyzji co do stosowanych procesów i wytwarzanych wyrobów w oparciu o realne liczby i fakty

**Przykład systemu jakości**
- wprowadzenie księgi jakości, aktualizowanie jej i struktury dokumentacji systemu jakości
- udokumentowanie systemu jakości za pomocą procedur, instrukcji i zapisów
- udokumentowanie zaangażowania kierownictwa w sprawy jakości
- planowanie jakości w obszarze zapewnienia jakości, zarządzania przedsiębiorstwem
- ewidencjonowanie i raportowanie wykonania planów jakości
- weryfikowanie rocznych planów jakości i biznes planów 

**Model KANO**
- dzieli wymagania na pięć kategorii, z czego 3 są kluczowe
- wymagania dotyczące wyrobu wyspecyfikowane przez klienta, w tym wymagania dotyczące dostępności, dostawy i utrzymania wyrobu
- wymagania dotyczące wyrobu nie wyspecyfikowane przez klienta, ale niezbędne ze względu na ich zamierzone lub określone stosowanie
- wymagania obowiązkowe dotyczące wyrobu wynikające z regulacji prawnych
- dane osobowe musza być zapominane na życzenie klienta

**ISO 90 003**

- ISO 9000 dla programowania
- udokumentowywane informacje dotyczące oprogramowania 
  - wyniki testów
  - raporty problemowe
  - żądania zmian 
  - raporty z audytów i przeglądów
- zachowywanie zapisów
  - możliwy czas używania nośników
  - dostępność urządzeń i oprogramowania potrzebnego do odtwarzania zapisów
  - ochrona przed nieupoważnionym dostępem i szkodliwym oprogramowaniem
- procesy związane z klientem
- istotą dokumentó ISO 9001
  - dokumentuj to co robisz
  - rób to co dokumentujesz
  - upewnij się, że wciąż to robisz

## Wykład 8 - 19.04.2021 (brak nagrania)
