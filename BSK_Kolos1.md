## Podstawowe definicje
Bezpieczeństwo - porządany stan atrybutów systemu: łącza i danych
Reguła najniższych uprawnień - daje się tyle ile dana osoba potrzebuje

* **Autentyczność** - czy dany dokument jest tym czym miał być, czy jest to ta osoba, czy miał do nas trafić
* **Autoryzacja** - nadanie uprawnień do wykonania czynności w systemie informatycznym
* **Poufność** - dane dostępne tylko dla osób upoważnionych
* **Prywatność** - zapewnienie, że dane które są i mają być tajne takie pozostaną oraz prywatność lokalizacji i akcji
* **Integralność** - czy dane nie zostały zmodyfikowane podczas podczas transmisji
* **Kontrola dostępu** - wykonanie operacji dozwolonych i blokada tych niedozwolonych zależnie od uprawnień użytkownia
* **Dostępność** - dostępność czasowa do serwera
* **Niezaprzeczalność** - niemożność wyparcia się czegoś co wystąpiło, logi, rejestrowanie działań

### Warstwy bezpieczeństwa
* **Podstawowe moduły**: algorytmy, modele operacyjne
* **Mechanizmy bezpieczeństwa**: podpisy cyfrowe, autoryzacja dokumentów
* **Serwisy bezpieczeństwa**: Poufność, Integralność, Niezaprzeczalność
* **Agenci bezpieczństwa, Protokoły bezpieczeństwa**: uwierzytelnianie, zarządzanie kluczami
* **Zarządzanie bespieczeństwem**: app, DB, e-mail

## Uwierzytelnianie

### Co uwierzytelniamy?
- zawartość dokumentu
- nadawcę/autora dokumentu
- adresata czegoś
- czas utworzenia/wysłania/edycji dokumentu w systemie

### Identyfiakcja - ustalenie tożsamości osoby
co ktoś wie (PIN), co ktoś posiada (Karta), cechy biometryczne, jak się zachowuje (tempo pisania), gdzie ktoś się znajduje (terminal, numer telefonu)

W praktyce łączy się metody szyfrowania potwierdzania tożsamości

* TTP - trusted third party może ocenić ważność dokumentu
* chroni dokument przed podrobieniem

### Uwierzytelnienie Symetryczne (Jako przykład)
wiarygodność pochodzenia informacji jako obliczenie sktótu informacji i kryptograficzą ochronę tego skrótu
poprzez ustajnienie: algorytmu skrótu, wartości skrótu

wysyła się zaszyfrowany skrót wiadomości i wiadomość, odbiorca wykonuje operację skrótu wiadomości u siebie odszyfrowuje skrót otrzymany od odbiorcy i je porónuje 

Istnieją dwie techniki obliczania skrótu wiadomości:
* MDC (Message Digest Cipher) - funkcje sktóru bezkluczowe, dobrej jakości, skrót jest szyfrowany za pomocą klucza tajnego dal algorytmu syemtrycznego
* MAC (Message Authentication Code) - sktórt z tajnym kluczem K, **nie wolno stosować tego samego klucza MAC do szyfrowania danych!!!!**

Jako funkcji skrótu moża użyć dowolnego szyfru blokowego w CBC
problemy - ograniczone zastosowania, duża liczba kluczy

### **Kerberos** Działanie (v5, oparte na kluczu symetrycznym)
* Wsyłamy do serwera wiadomość ze swoją nazwą i nazwą osoby do której chcemy wysłać wiadomość.
* Serwer generuje znacznik czasu, okres ważności, losowy klucz sesyjny i nazwę nadawcy następnia szyfruje ją kluczem odbiorcy i podobnie do nadawcy, potem śle te dwie wiadomości do nadawcy. 
* Nadawca generuje wiadmomość (zawiera nazwę nadawcy, znacznik czasu i szyfruje przy pomocy otrzymanego klucza sesyjnego).
* Wysyła wygenerowaną wiadomość i wiadomość z nazwą odbiorcy otrzymaną od serwera do odbiorcy.
* Odbiorca robi wiadomość w której jest znacznik (czasu + 1) i wysyła do nadawcy.

Protokuł musi się zsynchronizować z zegarem serwera aby działał poprawnie!!!!
Jawna tożsamość w większości systemów nie jest naruszeniem bezpieczeństwa

### **SESAME** (app heterogoniczne) organiacja ECMA Europejski
ECMA bada rozwiązania i daje pewne zalecenia i standardy
Ważne jest testowanie roziwązań na największej próbie

* Uwierzytelnianie i autoryzacja
* Tajność i integranlość mimo ataków podsłuchu, modyfikacji i powtórzenia
* Jednorazowy proces logowania się w systemie
* Określone prawa zarówno dla usera jaki aplikacji
* Praca w rozproszonym środowisku heterogenicznym (różny sprzęt, protokoły i abstrakcje dostępu)
* bazuje na protokołach KERBOS, uprawnienia zgodnie z ECMA, pozwala użyć kryptografi z kluczem publicznym
* Mocodawca może się uwierzytelnić kluczem prywatnym w przez Authentication Server, otrzymuje bilet dla serwera Privilage Attribute Server i otrzymać Privilage Attribute Certificate. Gdy user chce się połączyć dostaje info o kluczach w formie (2 klucze):
	*  klucz zabespieczający wymianę z PAC
	*  klucz zapewniający spójność i integralność danych
* informacja o tym czy klucz symetryczny/asymetryczny zależy od inicjatora lub udziału Key Distribution Service
* wysyła się PAC i info o kluczach do app docelowej. App docelowa prowadzi własną politykę bezpieczeństwa zależną od uprawnień inicjatora. Jeden PAC może być wykożystywany w wielu aplikacjach i jest podpisywany przez PAS za pomocą kryptografii z kluczem publicznym
* Infrastruktura zależy do: AS, PAS, KDS oraz serwerów zapewniających usługi PKI -> LRA, CAA oraz off-line CA

### Uwierzytelnienie Asymatryczne 
RSA, ElGamal, DSA, przyszłość klucze krzywe eliptyczne Galios GF(p)
podpisy cyfrowe, nie podpisuje się całych wiadomości (czas realizacji, ataki na podpisy wiadomości krótkich)

szyfrowanie kluczem prywatnym sktóru
problemy: zarządzanie kluczami, słabość niektórych algorytmów

### Identyfikacja (leciał praktycznie nazwami)
* Hasła - możliwość podsłuchu, ataki słownikowe -> dobry wybór hasła, salting
* Karty Magnetyczne - indyfiaktor usera i certyfikat banku (podpis id -> RSA), identyfikacja dod PIN, spr wymaga tylko informacji jawnych (podsłuch, kopiowanie, wymaga dod identyfikacji karty)
* Hasła Pseudo Dynamiczne - rekurencyjne wyliczanie kolejnego skrótu, i-ta identyfiakcja w i-tej sesji, może się rozsynchronizować!!!
* Karty Inteligentne - spr certyfikatu nadawcy, wysłanie random liczby aby podpisał i sprawdzenie otrzymanego podpisu na tej liczbie, wskazanie znania swojego klucza prywatnego poprzez wielokrotne sprawdzenia, nie wyjawnienie tajemnicy nadawcy (klucza)
* RSA założenia - odbiorca wybiera bit i wysyła do nadawcy wielkorotnie aby go sprawdzić obliczając odpowiedz, wielokrotne powtarzenie nie pozowli na podszycie się kogoś pod właściwego nadawcę (prawdopodobieństwo bliskie zeru)

## Podstawy Kryptografii
kodowanie czynność niepowiązanych z kryptografią (źródłowe i kanałowe), szyfrowanie pamięci daje spadek przepływu bo trzeba rozszyfrować
Szyfrowanie i roszyfrowywanie (operacje odwrotne)
Bezpieczeństwo leży w kluczu

* **Kryptografia symetryczna (klasyczna) taki sam klucz do szyfrowania i odszyfrowywania oraz jest to najszybsza metoda szyfrowania i rozszyfrowywania** AES 
* **asymetryczna wada czas rozszyfrowania (do 1000 razy wolniejsze)** RSA
* **szyfrowanie jednokierunkowe -> funkcje skrótu czy generatory pseudolosowe** SHA

Cykl życia:
- co mógłby robić algorytm, projekt
- publikacja, symulacje i ocena pod przyjętymi założeniami
- standaryzacja, implementacja i wdrożenie
- czas użycia algorytmu (ile będzie działał do czasu ulepszenia algorytmu, po czasie jest wycofywany)

w systemach wbudowanych używa się prostych algorytmów szyfrowania

nie wszystkie algorytmy wymagają klucza, pseudoeandomowe generatory

### Złamanie szyfru
- **łamanie z szyfrogramami** - odtworzenie tesktu jawnego na podstawie tekstu zaszyfrowanego
- **łamanie ze znanym tekstem jawnym, łamanie z wybranym tekstem jawnym** - wydobycie samego klucza i parametru pracy na podstawie podstawienia znanych fragmentach tekstu jawnego, jak zmienia się szyfrogram w zależności od tekstu jawnego
- **łamanie z adaptacyjnym wyborem tekstu jawnego** - wybieramy kluczowe fragmęty i próbujemy szyfrować dane fragmęty i poddajemy analizie jak kryptogram ulega zmianie
- **łamanie z wybranym szyfrogramem** - wybieramy szyfrogram i tekst jawny
- **łamanie z wybranym kluczem** - jaka jest zależność między postacią klucza, a jego szyfrogramem

Czyli ogólnie dopasowanie tekstu jawnego i szyfrogramu

### Tryby Pracy

#### ECB - elektryczna książka kodowa
Tekst dzielimy na bloki i bloki samego szyfrogramu, nie ma powiązania między wiadomościami
- Narażony na atak ze znanym wybranym tekstem jawnym (znane nagłówki i stopki).
- Napastnik może zmodyfikować dany blok bez rozszyfrowywania (losowo wybrany bit).
- Zastosowania: tam gdzie jest krótka wiadomość 1-2 bloki.
- Propagacja błędu tylko w obrębie bloku, bloki nie są ze sobą powiązane!!!!

#### CBC - łączenie bloków szyfrogramu (najpopularniejszy)
Wyniki szyfrowania bloku poprzedniego są podawane na wejście szyfrowania bloku następnego.
- **IV** - wektor początkowy (losowe dane szyfrowanie jako blok 1, przesyłane jawnie do odbiorcy; aby uniknąć problemu typowych początków) ukrywa powiązanie wiadomości z kluczem
- Błąd 1 bitu w szyfrogramie wpływa na ten blok (cały blok do śmieci) i 1 następny(1 bit błędny na blok), kolejne bloki nie propagują błędu (self-recovering), ponieważ kolejny blok jest zależny od bloku poprzedniego
- Naruszenie zaszyfrowanego bloku może posypać deszyfrację poprzednich boków
- Potrzebne są kompletne dane aby zachować spójność z generowanym tekstem jawnym

#### CFB - sprzężenie zwrotne szyfrogramu
Jak CBC, tylko działa na zasadzie rejestrów o długości mniejszej niż długość bloku.
- IV - wektor początkowy (losowe dane szyfrowanie jako blok 1, przesyłane jawnie do odbiorcy; aby uniknąć problemu typowych początków)
- Inna propagacja błędu: 1 bit błędu w szyfrogramie (1 bit błędu w tekście jawnym): 1 bit błędu w tym bloku i n błędów w blokach następnych - w 8(n)-bitowym trybie CFB - 1 bit błędu zniekształca 9 (n + 1) bitów szyfrogramu.
- dłużej trwa szyfrowanie, pracuje jako szyfrator przy odszyfrowywaniu i szyfrowaniu

#### OFB - sprzężenia zwrotnego wyjściowego (do powtórzenia)
Podobny do CFB, różnica że część poprzedniego bloku jest kierowana na skrajnie prawe pozycje rejestru, a odszyfrowywanie jest odwrotością.
- IV - wektor początkowy (losowe dane szyfrowanie jako blok 1, przesyłane jawnie do odbiorcy; aby uniknąć problemu typowych początków), dla każdej wiadomości powinny być stosowane odmienne IV przez cały okres ważności klucza.
- brak powiązania kolejnych bloków tekstu jawnego
- brak problemu propagacji błędu
- bardzo ważna jest synchronizacja
- gdy rozmiar sprzężenia zwrotnego jest taki sam co rozmiar bloku czyli np 64 bit alg z 64 bit OFB

#### Tryb licznikowy i inne
Podobny do OFB, używa sekwencji numerycznych. Używany jest licznik w przypadku wykonywania kolejnej operacji, trzeba mieć licznik.

Oprócz tego inne:
* BC wiązania blokowego
* PCBC propagującego wiązania bloków zaszyfrowanych

### Szyfry Strumieniowe
W skrócie generuje się dodatkowy ciąg - klucz, który podczas szyfrowania i deszyfrowania sumuje się modulo 2 ze strumieniem tekstu jawnego. Im lepszy generator liczb pseudolosowych tym bezpieczniejszy szyfr.

#### Synchroniczne szyfry strumieniowe
strumień klucza jest generowany niezależnie od strumienia tekstu jawnego.
- Wada: Wszystko w dupe jeśli się rozsynchronizują (trzeba synchronizować od nowa)
- Zalety: brak propagacji błędów (transmisji), atak poprzez wstawkę albo wycięcie rozsynchronizowuje szyfr, przez co wada wyżej staje się zaletą.

#### Samo-synchronizujące szyfry strumieniowe: 
Każdy bit strumienia jest jakąś funkcją zależną od bitów poprzednich szyfrogramu. Powszechnie pracują w tybie CFB.
- Nie chroni przed propagacją błędów, jest wrażliwy na celowe powtórzenia

## Zarządzanie Kluczami
uzgdanianie offline (inny kanał), online (z użyciem innych kluczy podczas transmisji)

#### Bezpieczeństwo związane ze stosowaniem kluczy sesyjnych
- ograniczenie do jednego szyfrogramu
- utrudnienie ataków,
- ograniczona strata w przypadku ujawnienia,
- nie ma potrzeby długotrwałego przechowywania,
- niezależność w stosunku do sesji połączeniowych i aplikacji

#### Uzgadnianie kluczy sesyjnych:
- protokół wymiany wiadomości z kluczem (symetrycznym i PK)
- Kerberos (z wykorzystaniem TTP - Trusted Third Party)
- protokół SEAME
- protokoły uwierzytelniania z wymianą kluczy
- stemple czasowe i “na raty” (przeciw Man-in-the-middle)
- Diffiego-Hellmana - negocjowanie klucza pomiędzy podmiotami

Escrowing - składowanie kluczy w instytucjach prawnych (rządowych)

#### Certyfikat klucza publicznego - to podpisana przez poświadczającego (Certification Authority) struktura danych zawierająca:
- klucz publiczny,
- identyfikator właściciela klucza,
- okres ważności,
- numer seryjny,
- dane wystawcy certyfikatu,
- informacje o algorytmie podpisu,
- podpis cyfrowy poświadczającego,
- i inne informacje

spr poprawności klucza wymaga znajomości klucza publicznego CA oraz zaufania do niego (potwierdzony, wygenerowany przez zaufaną platformę)
CA sama sprawdza zgodność danych właścicela klucza publicznego podczas rejestracji
2 metody generacji:
* CA generuje klucz, jak dostarczyć bezpiecznie klucz
* urzytkownik sam generuje klucz i dostarcza do CA

Ten klucz może być używany przez kilka osób spr jest czy ta osoba jest uprawniona do używania klucza

### Modele PKI

#### X.509
sieć serwerów tworzących drzewo (z 1 lub wieloma korzeniami):
- CA - Certification Authority (wydaje certyfikaty, potwierdza tożsamość, zarządza unieważnionymi certyfikatami)
- RA - Registering Authority (rejestruje użytkowników)
- listy CLR - lista kluczy odwołanych, jak często to publikować i aktualizować
- 
Nie definiuje zarządzania uprawnieniami / rolami, globalna hierarchia z jednym lub więcej korzeniami.
Sprawdzanie certyfikatu polega na sprawdzeniu wszystkich certyfikatów w górę drzewa do korzenia.

Certyfikaty:
- normalne
- pośrednie (skrośne)
- wsteczne
- chwilowe (czas ważności = 0)
#### PGP
brak CA (każdy użytkownik to CA) - ufamy tym, których znamy i częściowo kluczom osób od zaufanych użytkowników. (Stopień zaufania certyfikatowi). Problem z odwołaniem klucza, gdy upłynie termin jego ważności lub gdy klucz prywatny zostanie skompromitowany.

#### SPKI/SDSI
rozwiązuje problem braku zarządzania uprawnieniami i rolami, który był w PGP i X.509, nie ma centralnego repozytorium kluczy.
2 typy certyfikatów:
- Name Certificate (definiuje lokalną nazwę w przestrzeni nazw wydawcy)
- Authorization Certificate (definiuje uprawnienia użytkownika)

1 rola - 1 certyfikat AC, dostępne są także grupy, właściciel grupy decyduje kto będzie pełnił jaką rolę przypisany do tej grupy

korzysta z lokalnych przestrzeni nazw, możliwych do łączenia w grupy

SDSI: nazwa -> klucz
SPKI (cel, kontrola uprawnień): 
podstawowa: autoryzacja -> klucz
pomocnicze: autoryzacja -> nazwa -> klucz, nazwa -> klucz, klucz -> nazwa

SPKI jedna autoryzacja na jeden certyfikat, występują także listy ACL:
* przydzielanie uprawnień do nazw
* przechowywanie lokalne w postaci jawnej

W SPKI występują także listy CRL musi być podpisana i podawać lokalizację CRL, musi także zawierać daty ważności, przedziały ważności CRL nie mogą się krzyżować, nie można wydać nowej przed końcem starej

W SDSI występuje ponowne podpisanie z nową datą ważności zamiast CRL

Certyfikaty chwilowe na czas sprawdzenia autentyczności

Są czwórki SDSI (Wydawca, Nazwa, Podmiot, Data Ważności)
Oraz piątki SPKI (Wydawca, Podmiot, Delegacja - właściciel grupy, Autoryzacja, Data Ważności)

Wydawca i podmioty to zwykle klucze publiczne

## Kryptografia

### AES
bloki 128 bitowe, klucze 128, 192, 256 bitowe (dowolna do 256 bit) ma 16 rund (korzysta z sieci Feistela)
Nbloku = długość bloku danych/32
Nkolunmy = długość klucza/32
od tych dwóch zmiennych zależy ilość rund (ilość wywołań algorytmu)
State - aktualna postać szyfrowanego bloku (stan pośredni i szyfrogram)

**szyfrowanie** 
rozszerzenie klucza (tryb) i dodanie klucza do rundy aż do rundy finałowej

**deszyfrowanie**
identycznie jak w szyfrowaniu ale operacje od tyłu (odwrotność)

#### **Implementacja**
są implementacje 8 bitowe (układy programowalne) do 32 bitowych
dla urządzeń z małym ramem roszerzenie klucza gnerowane poprzez bufor cykliczny 4*max(Nb,Nk) i szyfrowanie można zaimplementować na 256 elem tablicach 4-bajtowych dzięki czemu program nie jest skomplikowany (4kB na tablice), są także procesory kryptograficzne

**Równoległość** (także przerwania) w przpadku tablic, KeyExpansion jest z natury sekwencyjny ale da się zrównoleglić resztę operacji podczas jego wykonywania
Odszyfrowywanie działa inaczej i nie da się wykożystać powyższej metody rozszeżenia klucza są zmiany w InvMixColumn, a KeyExtension jest rozszerzeniem metody InvMixColumn dla każdego z otrzymanych kluczy

* Działa stosunkowo szybko
* Może zostać zaimplementowany na kartach inteligentnych
* Zaprojektowany w sposób równoległy
* Nie używa operacji arytmetycznych więc nie zależny od Big/Little endian
* Samowystarczalny nie używa żadnych elementów zewnętrznych kryptografii
* Nie ma tylnich drzwi, bezpieczeństwo nie jest oparte na tajemincy działania
* Zmienna długość bloku
* obecnie bezpieczne 192 oraz 256, możliwe rozszerzenie co do klucza co 32 bity od 128 do 256
* można zmienić ostatecznie liczbę rund

### TwoFish
* Długość bloku 128 bit
* Długość klucza dowolna do 256 bit
* Alogrytm ma 16 rund
Blok tekstu jawnego jest dzielony na 4 bloki 32 bit, w każdej rundzie dwa z tych bloków są wejściem do sieci Feistela, po uzyskaniu wyników dodawane są ciągi podkluczy. Po zakończeniu rundy bloki 32 bitowe są zamieniane miejscami tak aby dwa pozostałe także zostały poddane działaniu sieci Feistela. Ostatnia runda to przekształcenie ostatecznego wyniku (po scaleniu) bloku szyfrogramu.

### DES
* Długość bloku 64 bit
* Długość klucza 56 bit
* Alogrytm ma 16 rund

Używanie funkcji sieci Feistela, stosowane też są S-Boxy

Aby zwiększyć jego bezpieczeństwo powstał 3DES w wersjach:
* trzy klucze 3x szyfrowanie
* trzy klucze szyfrowanie deszyfracja szyfrowanie
* dwa klucze szyfrowanie deszyfracja szyfrowanie

### BLOWFISH
* Długość bloku 64 bit
* Długość klucza dowolna do 32 bit do 448 bit oraz S-boxy (charakterystyczne dla szyfrów Feistela)
* Alogrytm ma 16 rund
* Tablice podkluczy 4168 bajtów
* W każdej rundzie wykonywana jest zależna od klucza premutacja i podstawienie danych
* Operacje wykonywane są na 32 bitowych słowach

### Jednokierunkowe Funkcje Skrótu
Przekształcenia z tekstu o długości L do postaci 128, 160, 192 czy 256 bitów
Bardzo łatwo obliczyć sktót, ale bardzo trudno znaleść tekst jawny odpowiadający danemu skrótowi
Porządane cechy to doporność na
* Atak Urodzin (w grupie 32 osobowej jest 50% że dwie osoby mają urodziny tego samego dnia, wysyła się inny plik który ma taki sam skrót jak wiadomość pożądana)
* Zmiana jednego bitu w tekście zmienia połowę bitów wartości skrótu
* Funkcje skrótu muszą być odporne na kolizje (2 te same wiadomości dają ten sam klucz)
* Ważne także aby z funkcji skrótu ciężko było odtworzyć naszą informację

Przykłady
SHA1 = rozwinięcie MD4, MD5 = rozwinięcie MD4

Można użyć klucza symetrycznego do budowy funkcji jednokierunkowych, dobre znane algorymty ale którkie klucze
Można użyć algorytmów asymetrycznych poprzez przekształcenia matematyczne uzyskać skrót

MAC message authentication code Jednokierunkowe Funkcje Skrótu zależna od klucza, szyfrowanie wiadomości za pomocą szyfru blokowego w trybie CBC (np. AES)

**Nowe Konstrukcje na badzie SHA-1:**
* **SHA-256** dla trybu 32 bit 64 rundy max wiadomość: 2^63
* **SHA-512** dla trybu 64 bit 80 rund max wiadomość: 2^128

Brak kolizji opracował NSA, opublikował NIST
Skuteczne na atak brute force

**SHA-3**
* Architektura gąbkowa - stopniowe przekazywanie danych wejściowych do kolejnych etapów mieszania, stan w pozycjach 2 wymiarowych
* Parametryzowanie pracy algorytmu
* Skróty praktycznie dowolnej długości
* Wykonywany w 24 rundach
* Wyższa wydajność niż SHA-2

### Asymetryczny algorytm Diffiego-Helmana

osoba 1 i 2 wyliczają jakąś wartość i wysyłają do siebie i potem robią tą samą operację z k i kPrim (farbki z ZBS)
algorytm służy do negocjacji klucza w kanale niezabezpieczonym, podsłuchujący nie będą w stanie wyznaczyć wartości wynegocjowanego klucza sesyjengo

### Algorytm RSA
Faktoryzacja dużych liczb, klucze publiczne i prywatne związnane z cyframi pierwszymi, operacje stosunkowo proste ale czasochłonne
Szyfrowanie c = m^e mod n
Odszyfrowanie m = c^d mod n
Bezpieczeństow RSA zależy do problemu faktoryzacji dużych liczb
* Znajomość jednej pary wykładników dla danego modułu umożliwia atakującemu faktoryzację modułu (skrócenie czasu obliczeń), a także obliczenie innych par wykładników bez konieczności faktoryzacji n

Wybrane wykładniki w protokole powinny być odpowiednio duże
Złamano już klucz 768 bitowy

### Algorytm ElGamala
logarytmy dyskretne, liczba pierwsza, podpis jest dwókrotnie dłuższy od skrótu tej wiadomości
y klucz publiczny
g klucz prywatny

### DSA NIST
Znowu liczby pierwsze
klucz prywatny 160 bit, używa funkcji sktóru SHA-1
podpisywanie wiadomości
* generowany na podstawie funkcji SHA
* osoba która chce się uwierzytelnić wysyła dwie wcześniej wyliczone liczby (r i s), odbiorca weryfikuje czy jedna liczba po przekształceniach przy użyciu drugiej liczby daje tą drugą liczbę
* można także przyspieszyć DSA poprzez wprowadzenie wstępnych obliczeń, ponieważ wartość r nie zależy od wiadomości

### Schematy Podpisu Elektronicznego
* Załącznik do wiadomości podpisanej (RSA, ElGamal, DSA)
* Z odtwarzaniem wiadomości - (Nyberg-Ruppel)
* Jednorazowe - dokładnie raz, wymaga obu stron (Rabin, Merkle)
* Ślepe - w protokołach do pieniędzy cyfrowych
* Niezaprzeczalne - można udowodnić, że podpis był wykonany kluczem prywatnym użytkownika (dowód z wiedzą zerową)
* Grupowe - przez użytkownika należącego do grupy, ale nie można ustalić dokładnie kto (AES + RSA)
* Odporne na podrobienie - pozwalają udowodnić, że fałszerstwo rzeczywiście jest fałszerstwem
* Podpisy postępujące - gdy ważności okresów klucza nie są ustalone z góry

#### Istota ważności podpisu
* Niepodrabialny - świadomy podpis
* Autentyczny - pewność podpisania przez nadawcę
* Nie nadaje się do powtórnego użycia - nie da się go przenieść na inny dokument
* Podpisany dokument jest niemodyfikowalny - nie może zostać zmieniony
* Nie można wyprześ się podpisu - nie da się zaprzeczyć podpisania

Nie zawsze te stwierdzenia są prawidłowe, może być niedopełnienie pewnego elementu

Tworzenie podpisu cyfrowego:
wiadomość -> skrót wiadomości -> skrót szyfrowany kluczem prywatnym nadawcy
Wysyła się wiadomość i zaszyfrowany skrót

#### Ślepy podpis
* Zamaskowanie wiadomości (zaciemnienie)
* Podpis wiadomości
* Odbiorca usuwa zaciemnienie -> postać jawna
* matematycznie się wnioskuje czy zachodzi zgodność

#### Podpis Kwalifikowany
* Podstawy prawne, rozporządzenia, ustawy
* Normy techniczne PN, ISO, FIPS
* Polityka dla certyfikatów (bezpieczeństwa) - prawa i obowiązki wydawców i odbiorców certyfikatów, podmioty muszą publikować polityki, ochrona danych poufnych

##### Podstawowe Definicje
* Podpis Elektroniczny - dane + dane dołączone, logicznie powiązane służą do identyfikacji osoby (łączą podpisane dane i podpisującego)
* Bezpieczny podpis elektroniczny
	* Przyporządkowany do osoby składającej podpis
	* Wykonany poprzez urządzenie do składania podpisów przez uprawniony podmiot
	* Powiązany z danymi do których został dołaczony
* Osoba składająca podpis elektroniczny - osoba posiadająca urządzenie do składania podpisów, składająca podpis w imieniu własnym lub innej organizacji, osoby prawnej, fizycznej
* Dane służącze do składania podpisu elektronicznego - klucz prywatnym, podpisujący dane
* Klucz - ciąg bitów do podpisu
* Dane służące do weryfikacji podpisu elektronicznego
* Para Kluczy publiczny + prywatny - odwrotne przekształcenia albo podpis i weryfikacja
* Urządzenie służące do składania podpisu elektronicznego
* Urządzenie służące do weryfikacji podpisu elektronicznego
* Certyfikat - zaświadczennie, umożliwia identyfikację podpisującego dane (przyporządkowanie)
* Podmiot świadczący usługi certyfikacyjne - organizacja która świadczy usługi certyfikacyjne
* Usługi certyfikacyjne - wydawanie, znakowanie czasem certyfiaktów (i inne)
* Kwalifikowany Certyfikat - certyfikat spełniający warunki z ustawy, wydany przez kwalifikowany podmiot certyfikacyjny

##### Techniczne Realzacje
* ochrona klucza prywatnego
* Wiarygodny certyfikat klucza publicznego
* Wiarygodność punktu rejestracji użytkowników 
* Odporność stosowanych algorytmów i funkcji sktóru na kryptoanalizę i próby podszycia się pod podpisującego
* Ochrona klucza poprzez algorytm blokowy (np AES), gdzie klucz to sktót hasła, przechowywany na nośniku
* Procedury niszczenia przeterminowanych kluczy

##### EAL (1...7) pozimy standardu ISO/IEC 15408
1. testy funkcjonalne
2. testy strukturalne
3. testy metodyczne i sprawdziany
4. metodycznie projektowany, testowany i przeglądany
5. półformalnie projektowany i testowany
6. produkt z projektem półformalnie weryfikowany i testowany
7. -||- wykorzystywany w środowisku o dużych kosztach bezpieczeństwa. Wymaga sformalizowanego modelu polityki bezpieczeństwa polityki obszarów TOE (Target of Evaluation) oraz bardziej wszechstronnych analiz

## Polityki Bezpieczeństwa (PB)
Plan działania (dokument), mówi co, jak, kiedy i dalczego chronić w instytucji, firmie, systemie komputerowym. **Określa zbiór reguł określających zarządzanie informacją** 
* **System ochony otwarty** - to co nie jest zabronione jest dozwolone
* **System ochrony zamknięty** - to co nie dozwolone jest zabronione

Chronimy prawie wszystko w organizacji co warte:
srzęt, dane i infomracje, personel, kominikację, finanse, budyniki, opinię firmy

##### Etapy realizacji PB
* Planowanie analiza ryzyka
* Analiza kosztów względem kożyści
* Tworzenie PB na miarę zapotrzebowania
* Wprowadzanie PB w życie

#### Ryzyko
Kombinacja prawdopodobieństwa szkody i jej częstości, negatywne (zagrożenia) lub pozytywne (kożyści, szansa), definowanejako kombinacja prawdopodobieństwa wystąpienia zagrożenia i jego zakresu

Ocenie podlega ważona ocena różnicy strat i kosztów. Nie zawsze opłaca się inwestować i bezpieczeństwo, bo zadarza się że koszty przekraczają straty wywołane lukami

Konsekwencje uderzają w dostępność, utratę i wykożystanie danych, ataki personale, bezpieczeństwo transakcji i naruszenie warunków umów

Bezpieczeństwo powinno być budowane mając na uwadze:
* PB i jej wdrażanie (szkolenia, budowanie pozytywnych więzi międzyludzkich)
* odpowiednie zarządzanie strukturami organizacyjnymi
* przestrzeganie prawa i etyki zawodowej
* stosowanie technik bezpieczeństwa systemów informatycznych

Zarządzanie bezpieczeństwem informacji:
* utworzenie PB dla systemu i grup informacji
* wyznaczenie: admini grup i kierujący admin bezpieczeństwa grupy informacji
* opracowanie procedur postępowania kryzysowego i osób odpowiedzalnych za bezpieczeństwo
* okreslenie środków zaradczych na podstawie analizy ryzyka

### Działania w kierunkach zabezpieczeń
porcedur, techniczne
* Zagrożenia fizyczne - często niedoceniane
	* Formy: zniszczenia sprzętu i łączy komunikacyjnych
	* Zabezpieczenia: kontrola dostępu fizycznego, obserwacje, przeglądy, bariery
		* Budowa systemu kontroli dostępu fizycznego - centralka, koncentratory, układy wykrywania inercji i do kontroli osób
		* Logiczna struktura systemu i polityki bezpieczeństwa bazująca na
			* strefach obszarowych - kto może wejść
			* strefach czasowych - kiedy można przebywać
		* Możliwość zawiadomienia policji radiowo itp.
* Bezpieczeństwo związane z presonelem
	* Formy: defraudacje, wykradanie tajemnic, dokumentów poufnych
	* Zabezpieczenia: polityki zatrudnienia
		* zatrudnienie: odpowiednia umowa, badanie pochodzenia środowiskowego
		* podczas pracy: szkolenia, budowanie świadomości, etyka
		* po zwolnieniu: niepodejmowanie pracy u konkurencji przez pewien czas

##### Środki realizacji polityki bezpieczeństwa
* regulacje ustawowe i rozporządzenia
* normy, zalecenia UE, RFC
* zarządzenia branżowe
* polityki wewnętrzne firm, regulaminy

##### Środki do zabezpieczania systemów
* techniczne: kopie, odtwarzanie, konfiguracja systemu i DB, akutalizacje hardware
* kryptograficzne: poufność, integralność i niezaprzeczalność
* kryptograficzne i systemowe: autoryzacja, audyty, uwierzytelnianie
* kryptografia, protokoły i serwisy: śluzy ogniowe, tunelowanie, zabezpieczenia TCP/IP https, ssh
* uwierzytelnienie i identyfokacja w sieciach: karty inteligentne, KERBOS, DCE, SESAME i inne

##### Środki organizacyjno techniczne
* kontrola i nadzór pracowników
* szkolenia oraz dzienniki pracy
* budowa wzajemnego zaufania, solidaryzmu zawodowego i etyki zawodowej

##### Środki informatyczne (wiele z tego nie)
* analiza ruchu sieciowego
* analiza kodu aplikacji
* analiza logów systemowych i DB
* widoki w bazach danych
* szyfrowanie archiwów
* ochrona przed emisją ujawniającą
* celowe zniekształcanie prezentacji i szyfrowanie części DB, modele JajodhiSadhu
* nieuprawniony dostęp do danych
* nieuprawnione wnioskowanie
* wyciekanie danych
* podszywanie się (maskarada - udawanie użytkowników)
* powtarzanie fragmentu inforamcji w celu wywołania niepurawnionych efektów
* modyfikacje treści wiadomości
* wtrącenie do komunikacji
* odmowa lub utrudnianie realizacji usług uprawnionemu użytkownikowi
* modyfikacja opraogramowania (trojany) w celu uzyskania nieupranionych funkcji
* zapadanie lub potrzaski, bomby logiczne
* analiza ruchu
* błędy i uszkodzenia przypadkowe
* wirusy
* przeszukiwanie śmieci w celu poszukiwania cennych notatek
* przeglądanie i wślizgiwanie się
* kradzież sprzętu, dokumentów, nośników danych
* przeglądanie, skanowanie dysków
* wprowadzanie fałszywych danych
* używanie programów do uzyskania nieuprawnionego dostępu
* ataki typu salami, obcinanie zaokrągleń
* piractwo - nieuprawnione kopiowanie oprogramowania


Duże powiązanie z celami biznesowymi

### Wstępna ocena polityki bezpieczeństwa
Zadania:
* Powołanie zespołu do rozwoju PB (PDG Policy Development Group)
* Nadanie zespołowi uprawnień w zakresie dostępu do zasobów informacyjnych w celu określenia aktualnego stanu bezpieczeństwa
* Dokonywanie wstępnej oceny przy niskich kosztach na podstawie wywiadów, Jeśli nie przez PDG to przez konsultanta firmy audutowej

Wynik - zespół opracowuje raport, zalecenia, znalezione problemy

##### Zakres wstępnego raportu
- wprowadzenie
- stan aktualnej polityki
- klasyfikacja danych
- wrażliwe systemy
- systemy o krytycznym znaczeniu (dostępność i poprawność)
- wiarygodność (naruszenia, podpisy cyfrowe)
- podatność (konsekwencje, oszacowanie strat)
- zasoby ludzkie, poziom zarządzania, świadomość w zakresie bezpieczeństwa (szkolenia, dostępność informacji o bezpieczeństwie w firmie, itp.)
- zabezpieczenia fizyczne
- bezpieczeństwo narzędzi programistycznych i projektowych
- bezpieczeństwo komputerów
- kontrola dostępu do danych
- bezpieczeństwo sieci
- środki antywirusowe, itp.
- ochrona danych, kopie zapasowe, itp.
- planowanie ciągłości działania i odtwarzanie po atakach (najtrudniejsze w realizacji)

#### Uświadomienie kierownictwa w potrzebach PB
- Aprobata kierownictwa na audyt i sformułowania PB
- Uświadomienie o niebezpieczeństwie wynikającym z naruszenia poufności
- Wskazanie źródeł wiedzy w zakresie zagrożeń i ich unikania

#### Analiza potrzeb
- Szukanie wymagań bezpieczeństwa w każdym wydziale
- Wyznaczenie elementów krtycznych
- Jeśli organizacja jest duża to pracę należy podzielić na podzespoły

#### Konstrukcja i budowa PB
Podczas tworzenia bierze się pod uwagę:
* ISO/IEC 27002 (wcześniej ISO 17799)
* COBIT (Control Objectives for Information and related Technology)
* CERT-CC (Computer Emergency Response Team Coordination Center)
* RFC 2196

Dokumenty dzieli się na części obejmujące wszystkie zagadnienia objęte standardami, ważny jest udział przedstawicieli struktur organizacyjnych

#### Wdrożenie
Należy użyć technik socjologicznych do osiągnięcia pożądanych zmian w zachowaniu pracowników.

Konieczne będzie przeprowadzenie szkoleń dla grup pracowników z różnych szczebli struktury organizacyjnej:
* Wyższy poziom zarządzania: przegląd przypadków naruszenia bezpieczeństwa, szpiegostwa przemysłowego, wandalizmu i szkód na poziomie biznesowym i ich skutków, zagrożeń sieciowych, przegląd technik kontroli dostępu, szyfrowania, odtwarzania danych, tworzenia kopii zapasowych, umów w zakresie bezpieczeństwa, ich roli w zakresie przekonania niższego personelu;
* Wsparcie techniczne: jw. + zabezpieczenia systemów operacyjnych i oprogramowania, zmiany w działaniach związane z nową PB
* Niższy poziom zarządzania: wskazanie potrzeby troszczenia się o bezpieczeństwo informacji, obowiązki pracowników w tym zakresie, ochrona PC i stanowisk pracy, kopie zapasowe danych, zarządzanie własnymi hasłami, działanie w przypadku stwierdzenia naruszenia bezpieczeństwa

### Analiza ryzyka pod kątem kosztów 
Model CORA używa danych o zagrożeniach, funkcjach i zasobach celu wykrycia skutków

**Ryzyko** (jedna z wielu definicji) to nieprzewidywalne zdarzenie powodujące zniszczenie, uszkodzenie lub utratę zasobu lub funkcjonalności.

**Ryzyko operacyjne** odnosi się do zdarzeń, nieprzewidywalnych do chwili wystąpienia, i skutkujących stratami spowodowanymi utratą zdolności działania przez instytucję czy firmę.

**Cel analizy ryzyka**:
Optymalizacja wydatków i działań skierowanych na przeciwdziałanie zagrożeniom w celu minimalizacji ryzyka (zagrożeń) przy ograniczonych środkach.

Wykres koszt do wystąpienia krzywa ALE - Analized Loss Expectancy

### Analiza ryzyka pod kątem kosztów (ALE - Annualized Loss Expectancy)
Spodziewana strata (ALE) (zł/r) = częstość występowania zagrożeń (*/rok) x strata działania (zł/zdarzenie) x współczynnik podatności (0.0 do 1.0).
* Krok 1 - Określenie zagrożeń, ich częstości i wielkości strat. Można dodać linię ALE - Annualized Loss Expectancy lub spodziewanej straty (Expected Loss) dla zdarzenia. Jeśli np. częstość zdarzeń wynosi 1/5 (raz na pięć lat), a skutki wynoszą $50,000, to ALE dla tego zagrożenia wynosi $10,000/r.
* Krok 2 – Wybór optymalnej strategii. Następnie musimy określić maksymalnie tolerowane konsekwencje zagrożeń w postaci największej dopuszczalnej straty (np. groźby bankructwa). Jeśli pojawi się jakieś zagrożenie po prawej stronie tej linii, to musimy je bezwzględnie wyeliminować, ponosząc odpowiednie koszty, ale uwzględniając przy tym ewentualne kwoty odszkodowania w przypadku posiadania stosownej polisy ubezpieczeniowej. Jednak takie przypadki nie są łatwe do identyfikacji, bowiem zdarzają się niezwykle rzadko.

**Można też podzielić wykres na obszary granicy zainteresowania i dopuszczalne konsekwencje, wszystko co przekroczy granicę komsekwencji jest zdarzeniem krytycznym**

| Prawdopodobieństwo wystąpienia | zdarzenia krytyczne| 
|--|--|
| zdarzenia ignorowane | Konsekwencje |

Zajmujemy się tylko tymi zagrożeniami, których usunięcie lub minimalizacja spowoduje istotne podniesienie jakości działania instytucji. Na przykład będziemy poszukiwać takich działań, które przy kosztach rzędu 100zł zredukują ALE o 1000 zł.

Ale nie jest to takie proste, bowiem:
* potrzebujemy liczbowych ocen wartości ryzyka, występują procesy nieliniowe i proste obliczenia nie są możliwe,
* ze względu na nieliniowości procesów biznesowych potrzebujemy oszacowań wielkości przerw w biznesie spowodowanym zagrożeniami,
* aby zamodelować poprawnie zależności, musimy znać podatności na zagrożenia. Wielkość straty jest zależna od rozkładów czasowych wznawiania działalności po awariach i zagrożeniach,
* występują wielowymiarowe zależności pomiędzy zagrożeniami, a środkami je zmniejszającymi.
* Wynika z tego, że należy dokonać wielu oszacowań podczas analizy ryzyka względem kosztów. Czy będą one dokładne?
* Natura ryzyka jest skomplikowana, więc trudno zbudować jakiekolwiek narzędzie, które automatycznie z tym sobie poradzi. Ponadto wiele nieprzewidzianych zdarzeń świadczy o tym, że nie można mieć zbyt dużej pewności co do jakichkolwiek oszacowań.

#### Wyskoa dostępność **MFTB - (Mean Time Between Failures)**
Jeśli nie mamy żadnych danych, posługujemy się informacjami producentów dot. MTBF - dla podzespołu o MTBF równym 1,5 mln. godzin otrzymujemy prawdopodobieństwo awarii równe 1,14 % (jedna awaria na 114 lat). Odzwierciedlane w skalowalności.

#### Analiza kosztów względem zysków
Korzystamy z wyliczeń **ROI (Return on Investment)** dla różnych środków zaradczych redukujących zagrożenia. ROI może przyjmować wartości dodatnie i ujemne. Analiza ryzyka wykorzystuje dwa współczynniki:
* Pierwszy to wpływ środka zaradczego na częstość zdarzeń i podatność.
* Drugi to koszt implementacji i utrzymania środka zaradczego. 

#### Wznawianie działalności systemu po awariach
Ma to związek z wznawianiem działalności biznesowej **BRP (Business Resumption Planning)**, zw. także **BCP (Business Continuity Plans)**, lub **DRP (Disaster Recovery Plans)**. BRP składa się ze środków zaradczych podejmowanych w celu przyśpieszenia odtworzenia działalności obsługi, najczęściej klientów.

BRP charakteryzujemy maksymalną wielkością przerwy **MOD (Maximum Outage Duration)** lub **RTO (Recovery Time Objective)** oraz koszty związane z uzyskaniem tej wartości. Celem BRP jest zredukowanie kosztów oraz przerw w działaniu.

Podczas analizy mamy dwa czynniki:
* koszt utrzymania BRP,
* spodziewana wartość ALE z zastosowaniem BRP.

Zauważmy, że im krótszy MOD, tym większe koszty, ale niższa również wartość ALE. Celem analizy BRP jest znalezienie optymalnej wartości MOD, która osiągnie najniższą wartość przy uwzględnieniu obu tych czynników: kosztów 
i ALE.

### Metody zabezpieczania systemów i środowisk komupterowych
* działania organizacyjne
* bezpieczeństwo fizyczne
* bezpieczeństwo lokalne
* bezpieczeństwo sieciowe

#### Administratorzy
* Oprócz wiedzy o OS i serwisach, powinni także mieć dużą widzę o bezpieczeństwie i zarządzaniu miarami bezpieczeństwa 
* Mieć oddzielny wydział bezpieczeństwa, odbywać kursy na temat obrony przed zagrożeniami bezpieczeństwa.
* Powinni mieć także wiedzę o bezpieczeństwie urządzeń używanych w organizacji.

#### Pracownicy
* Powinni wiedzieć o kluczowym znaczeniu serwerów oraz być poinstrułowani jak bezpiecznie używać ich zasobów. 
* Aby przy opuszczaniu stanowiska nie zostawiać otwartych sesji. 
* Powinni przejść krótki kurs i dostać dokumentcję odnośnie użycia serwera. 
* Zapoznanie się z wymaganiami powinno być uwiecznione podpisem.

#### Użytkownicy
* Powinni być poinformowani jak bezpiecznie używać serwera

#### Sprzęt
* Serwer powinien być niewrażliwy na zapsucie poszczególnych komponentów. Błędy procesora lub pamięci powinny być szybko załatwione restartem.
* Serwer powinien pochodzić do renomowanego dostawcy który oferuje wysoką dostępność.
* Jeśli serwer nie pracuje jako klaster, to powinien mieć redundantne zasilanie i chłodzenie, swap dyski, co najmniej dwa procesory i karty pamięci
* Autodaignoza, serwer powinien wskazywać uszkodzoną część
* Powinien mieć też dużo zabezpieczeń fizycznych

#### Serwerownia
* Dostępny tylko dla uprawnionego personelu
* Powinny być spełnione wszystkie wymagania sprzętowe dotyczące serwerowni (temperatura i wilgotność), ponieważ przekładają się na długość życia komponentów serwera

#### Identyfikacja i Autoryzacja
* Dostęp do konsoli powinien być zabespieczony hybrydowo (hasło + token), w mniej wymagających przypadkach wystarczy hasło jednorazowe lub hasło statyczne

#### UPS (Uninterruptible Power Supply)
* Zasilacze awaryjne powinny zaopatrywać całą infrastrukturę serwera w zasilanie na dłużej niż typowa przerwa w dostawie energii elektrycznej
* Serwery stale działające wymagają generatora energii

#### Backupy
* Pełen backup raz w tygodniu, backup przyrostowy raz na dzień
* Kopie przyrostowe powinny być przechowywane w innym pomieszczeniu, a pełne kopie w innej bezpiecznej lokacji
* Dane wrażliwe powinny być zaszyfrowane na przypadek trafienia w niepowołane ręce

Do zdjęć:
Zasilacze awaryjne: wskażnik obciążenia bierzącego, stopień naładowania, alarmy: za niskie napięcie in/out, gniazdka prąd przemienny, przeciążenie ładowania akumulatora oraz samych akumulatorów, temperatura, prąd stały i sinusoidalny.

Transformator do napięcia wyjściowego, przebieg aproksymowany sinusoidą na wyjściu. Akumulatory kwasowo ołowiowe aby zmniejszyć ryzyko wydzielania wodoru.

W siłowni teleinformatycznej kluczowe są baterie akumulatorów, typowe napięcie 48W

Węzeł energetyczny utrzymuje system 3-4 h, a w serwerowni to zależy krótki (do 15 min) do mocno wydłużonego.

Gdy są podpinane te wielosztuki, to system powinien działać na ich części (łatwa wymiana, 2 zasilacze ale może działać na jednym w trakcie wymiany). 
Ważne są też dwa różne zewnętrzne źródła energii (elektrownie)

Kontrolki, diody wskazujące czy podzespoły działają bądź nie, oraz oznaczenie które to jest urządzenie

Zasilacz, napięcia out 12 V albo 3.3VSB. Ważny jest też ekspresowy montaż, trzyma się na zatrzask

Są zasoby działające w rezerwie ciągłej (2 proc), RAM czasami działa częściowo backupowo

Macierze do buforowego zapisu danych
Nadmiarowe połączenia elektryczne nie wszędzie

Diody pomagające w diagnozie sprzętu, stwierdzić jaki element nie działa
Instrukcja obsługi jest umieszczana na pokrywie serwera

## Klasyfikacja bezpieczeństwa systemów
Red Boook: Poziomy zaufania

Green Book: Zarządzanie Hasłami

Yellow Book: Wymagania bezpieczeństwa

Orange Book: Kryteria Oceny Systemów
(tendencja pyrzyrostowa, poziom kolejny zawiera też poprzedni):
* C1 - indywidualna kontrola dostępu, np. dostęp do plików w systemach UNIX
* C2 - kontrolowana kontrola dostępu, logi do zdarzeń
* B1 - ochrona przez etykietowanie, role które mają dostępy do danych zasobów/serwisów
* B2 - ochona strukturalna, komponenty odpowiedzialne tylko za bezpieczeństwo
* A1 - domeny bezpieczeństwa, zasady bezpieczeństwa, trzymanie logów zadarzeń dla użytkowników, listy ACL
* A2 - weryfikacja formalna, jak system implementuje założone mechanizmy bezpieczeństwa

### NIST (National Institute of Standatds and Technology)
kategoryzuje bezpieczeństwo pod względem:
* Poufności danych - informacje dostępne tylko dla osób uprawnionych
* Spójność - zostaje orginalnie zapakowana i w ten sam sposób prezentowana użytkownikowi, nie dostępuje modyfikacja poza wiedzą użytkownika
* Dostępność - informacje dostępne gdy użytkownik tego potrzebuje, nie ma sytuacji, że informacje są niedostępne

**SC (Security Category)** 3 zbiory:
tworzy się pary: kategoria i podatność na ich utraty

#### Elementy Administracyjne
* Ocena ryzyka (audytorzy wewnętrzni i zernętrzni, leży po stronie kierownictwa)
* Planowanie Bezpieczeństwa (czynniki wpływające na błędy, bezpieczeństwo samej pracy)
* Akwizacja (pomiary czynników fizycznych) systemu
* Ocena polityki bezpieczeństwa
* Autoryzacja procesu (akcje reakcyjne - naprawa tymczasowa, akcje korekcyjne - wymiana/naprawa stała)

#### Elementy Techniczne
* Identyfikacja i autoryzacja plików
* Logiczna kontrola dostępu do zasobów
* Akredytacja audytów (audytorzy wewnętrzni i zernętrzni)
* Ochrona systemu i komunikacji

#### Elementy Operacyjne
* Ochrona personelu i jego teningi
* Ochrona fizyczna i środowiskowa
* Planowanie ciągłości działań biznesowych/reakcji kryzysowych
* Ochrona dysków i operacji wejścia/wyjścia
* Rozwój i utrzymanie systemu
* Integralność systemu
* Dokumentowanie i zarządzanie zmianami oraz wdrożeniami

Standardy definiują 3 poziomy szkody: mała, średnia, duża. Dla każdej organizacji definicja może być inna (sobie definiują) w dokumentacjach

Podstawaow NIST składa się z 3 dokumentów i ma wiele rozszerzeń, mnustwo protokołów bezpieczeństwa dotyczące pewnych zagadnień.

### ISO/IEC 27001
Standard Brytyjski ISMS (Information Security Management System). Polski PN-ISO/IEC 17799.

11 grup zagadnień wpływów na organizację
Polityki bezpieczeństwa
* Organizacja bezpieczeństwa informacji
* Zarządzanie aktywami
* Bezpieczeństwo zasobów ludzkich
* Bezpieczeństwo fizyczne i środowiskowe
* Zarządzanie systemem i siecią
	* procedury kontroli zmian
	* ochrona przeciwko niechcianym oprogramowaniem
	* ochrona sieci
* Kontrola dostępu
* Zarządzanie ciągłością biznesową
* Rozwijanie i utrzymanie systemów IT
* Zarządzanie bezpieczeństwem informacji

### PN-ISO/IEC 27001 (Plan, Perform, Check, Act) inaczej ISMS
* Planuj - Zaplanuj jakiś lepszy sposób
* Wykonaj - Wykonaj swój plan testując rozwiązanie, implementacja
* Sprawdz - Sprawdź jakie są jego rezultaty, weryfikacja
* Działaj - Wdróż jeżeli lepsze, korekacja obecnego rozwiązania

Reszta podobna, jest ich wiele, różnią się szczegółami, różnice wynikają z przeznaczenia

Ocena musi być zgodna ze standardem, wymaganiami bezpieczeństwa lub profilem ochrony (VPN protection profile), moża je czasami przypisać do danego EAL

### ISO/IEC 15408 EAL (1...7) pozimy standardu 
co poziom jest rozszerzenie o coś nowego
1. testy funkcjonalne - test samego systemu
2. testy strukturalne - podstawowa analiza niebezpieczństw
3. testy metodyczne i sprawdziany - test metodyczny
4. metodycznie projektowany, testowany i przeglądany - dobre praktyki
5. półformalnie projektowany i testowany - odporny na silne ataki
6. produkt z projektem półformalnie weryfikowany i testowany - 
7. produkt z projektem półformalnie weryfikowany i testowany wykorzystywany w środowisku o dużych kosztach bezpieczeństwa. Wymaga sformalizowanego modelu polityki bezpieczeństwa polityki obszarów TOE (Target of Evaluation) oraz bardziej wszechstronnych analiz

### Czynniki
* topologia sieci
* sprzęt do zarządzania węzłami sieci
* użytkownicy
* metody dostępu do sieci
* specyficzne zadania
* poziom zasobów serwera

W przypadku braku jednoznacznego wskazania reguły bradziej kluczowe jest to co musi być robione a nie w jaki sposób
Ewalułacji nie podlega ceły sytem tylko jego części i procedury

### Typowe ataki
- odmowa usług użytkownikom
- przechwycenie informacji
- podsłuchanie bezpośrednio
- spoofing - podszywanie się pod kogoś, generacja własnych informacji

### System powinien
* Zidentyfikować użytkownika
* Autoryzować użytkownika do informacji i serwisu
* Prywatność i niemodyfikowalność danych wrażliwych
* Eliminacja intruzów w sieci
* Zapewnić bezpieczą komunikację
* Identyfikować zmiany w mechanizmiach bezpieczeństwa (pliki, funkcje, nieudane autoryzacje)
* Pokryć wszystkie aspekty bezpieczeństwa
* Łatwa konfiguracja
* Współdziałanie ze standardowymi narzędziami

Technologie:
* IPv6
* silna autoryzacja, identyfiakcja użytkowników
* role i atrybuty oparte o kontrolę dostępu (RBAC)
* lista kontroli dostępu dla plików (ACL)


### Wskazania bezpiecznych systemów, algorytmów, protokołów
#### Intuicyjne
* nie ma słabości -> czas łamania jest za duży
* wygląda bezpiecznie
* używa narzędzi z dobrą opinią
* ma zaufanie użytkowników 
#### Techniczne
* długość klucza
* testowane i analizowane algorytmy
* znane i opublikowane algorytmy
* pozytywne wyniki testów
* matematycznie weryfikowany poziom zabezpieczeń
* są dozwolone prawnie
#### Aspekty prawne
* zgodne z prawem i regulacjami
* zgodne ze standardami
* rekomendowane przez światowe instytucje legalności i techniczności xD
#### punkt widzenia hakera
* nie może zostać złamany, w jakim przypadku
* nie może spenetrować barier bezpieczeństwa, jakie informacje można wyciągnąć
* nie ma słabości pozwlających na wejście do systemu

### Audyty
* Aspekt finansowy
* Aspekt operacyjny
* Informatyczny
	* Kontrola IT
	* Bezpieczeństwo
* Inne

Audyt powinien być pożądany, prowadzi do poprawek rozwiązania

#### Etapy audytu
* Planowanie Audytu - PLANOWANIE
* Ocena mechanizmów bezpieczeństwa - AUDYT
* Ocenienie skomplikowania projektu ze stanem rzeczywistym - ULEPSZENIA
* Raport i czynności poaudytowe - MONITOROWANIE

#### Techniki Audytów
* Listy kontrolne
* CCAT - Computed Assisted Audit Techniques
* Wspomaganie sprzętowe audytów
* Kontrola wycieków
* Testy penetracyjne
* Inspekcaj logów

#### ROLE NIST
##### Lider Audytu
Sekcja kierownicza, nadzoruje i przeprowadza audyt całego systemu, musi być świadoma jak system działa i być świadoma jakie procedury są przeprowadzane. Przekazuje wyniki, a nie wnika jak coś jest implementowane.

##### Właściciel Systemu
Odpowiedzialny zna tworzenie polityk bezpieczeństwa i wdrożenie ich w systemie. Decyduje kto ma dostęp do systemu i na jakim poziomie, jakie zasoby są przekazywane osobie audytującej w procesie całego audytu

##### Osoba odpowiedzialna za bezpieczeństwo
Koordynuje działanie organu audytującego z samym systemem tak aby wpłynąć na zmiany w samym systemie w przypadku gdy jest taka potrzeba

##### Osoba 3
Niezależna lub kilka osób, odpowiedzialne za weryfikację i weryfikację dokumentów czynności i narzędzi używanych do bezpieczeństwa (to co jest z tym co jest zapisane w standardach bezpieczeństwa i zaleceniach). Wynikiem ich działań jest rekomendacja, wskazanie czynności zaradczych aby niescisłości wyeliminować. Sprawdza też jak obciążająca jest dana procedura dla użytkowników.

##### Reprezentant Użytkownika
Pomaga gdy potrzebni są użytkownicy przy ewalułacji. Gdy wymagane są nowe opisy do dokumentacji zwiększające bezpieczeństwo. Gdy są niezgodne z wolą użytkownika potrzebne są kompromisy. Orientacja systemu i jego użytwkoników.

#### Schemat oparty o NIST
##### Faza inicjalna
* przygotowanie
* powiadomienia i identyfikacja źródeł
* Analiza planów bezpieczeństwa, aktualizacja i akceptacja
##### Certyfikacja bezpieczeństwa
* kontrola poprawności
* certyfikacja dokumentacji
##### Akredytacja bezpieczeństwa
* Decyzji
* Dokumnetacji
##### Cięgłe monitorowanie
* Konfiguracja zarządzania i kontroli
* Zewnętrzna kontrola, weryfikacja
* Raporty i Dokumentacja


### Poziomy ISM - IT Security Maturity Levels
Aby kolejne levele mogły wejść muszą przejść po kolei

#### Level 1 Polityka
Opis teoretyczno techniczny
#### Level 2 Procedury
Dokumenty formalne opisujące polityki
#### Level 3 Implementacja
Procedury są znane przez wszystkich i każdy za nimi podąża
#### Level 4 Testy
Opis testów i samodoskonalenia się procesu, częsta ocena efektywności i realizacji, podejmowanie szybkich akcji w przypadku znalezienia słabego punktu systemu
#### Level 5 Integracja
Monitorowanie kosztów, porzytków i ulepszeń bezpieczeństwa. Bezpieczeństwo to druga natura organizacji. Decyzje podejmowane o analizę ryzyka. Ciągłe zmiany w odpowiedzi na nowe zagrożenia. Alternatywne polityki są identyfikowane gdzy zachodzi potrzeba.

Proces Audytu jest wolny, dużo trwa ocena i wprowadzenie zmian, zakres samych zmian bazuje na działaniach wcześniejszych, licencje na dane standardy są płatne. Świadomość że standardy istnieją, logowanie rozwiązań oraz same praktyki biznesowe które przechodzą przez proces

## Metody Penetracyjne
**NIETECHNICZNE**

### Błędna Interpertacja
Socjotechnika opiera się na fałszu, może skłonić uczciwych pracowników od umożliwienia prenetracji. Penetracja może być dokonana przy użyciu różnych środków technicznych od wejścia na stację roboczą do instalacji trojanów.

### Kłamstwo
Skuteczne ponieważ ludzie interpretują zjawiska w otaczającym ich świecie według swojego prywatnego wyobrażenia, a nie zimną oceną faktów.

### Podszywanie się pod uprawniony personel firmy
- Zwracanie się przez atakującego, udającego np. administratora do pracownika organizacji z żądaniem ujawnienia jego hasła, kodów dostępu, itp.
- Rozwiązanie: noszenie kart identyfikacyjnych i rozmowy w takich kwestiach wyłącznie osobiście.

### Udawanie pracowników firmy trzeciej, kooperującej
Skuteczne, jeśli nie dokona się sprawdzenia dokumentów, upoważnień, akredytacji. Serwisant np.

### Nakłanianie do nieuczciwego postępku – typy działań
- **Przekupstwo** – często w celu uzyskania np. kopii zapasowych tzw. czułych danych, w szpiegostwie przemysłowym, itp.
- **Groźby bezpośrednie z użyciem broni lub groźby kierowane do rodziny pracownika** – wiele systemów kontroli dostępu posiada specjalne funkcje, przyciski, inne środki sygnalizacji informujące o tym, że pracownik udziela dostępu napastnikowi pod przymusem.
- **Szantaż** – polega na groźbie ujawnienia pewnych tajemnic, które mogłyby znacznie pogorszyć sytuacje zawodową lub rodzinną pracownika.
- Nie tylko właśni pracownicy, ale również dostawcy, kooperanci i różnego rodzaju pracownicy firm współpracujących, sprzątających, kominiarskich, sprzedawcy napojów, itp., a także klienci mogą być wykorzystani przez napastników lub być nimi. Każdy może być pomocny atakującym, o ile dostarczy użytecznej informacji.

### Stopniowe gromadzenie informacji
- Poprzez zbieranie i inteligentne wykorzystanie najmniejszych skrawków informacji atakujący może stopniowo uzyskiwać dostęp do coraz bardziej wartościowej wiedzy. Tę technikę nazwano incremental information leveraging. Jest ona bardzo użyteczna dla hackerów i wszelkiej maści atakujących (np. Kevin Mittnick). Cechą charakterystyczną jest niski poziom prawdopodobieństwa wykrycia jej stosowania.
- Ochrona przed takimi metodami to budowanie świadomości o zagrożeniach, rejestracja wszystkich rozmów telefonicznych, itp.

### Pozyskiwanie danych
- Ma związek ze stopniowym gromadzeniem informacji w formie np. przeglądania śmieci, odpadków. Niezwykle użyteczne mogą okazać się notatniki, listy abonentów wewnętrznych numerów telefonicznych.

**TECHNICZNE**


### Wyciek danych – kluczowy problem bezpieczeństwa
- Wyciekiem danych nazywamy niewykrywalny przepływ danych bez odpowiednich uprawnień (nieautoryzowany).
- Ze względu na trudność wykrycia jest poważnym problemem. Nawet jeśli pozbawimy stacje robocze napędów (nawet dyskietek), drukarek, zablokowane zostaną porty USB, itp., to nielojalny pracownik może zapisać poszukiwane przez napastników informacje chociażby na skrawku papieru.
- Stosowanie technik steganograficznych może spowodować wyciek danych w dużej skali.
- Nie jest możliwe całkowite zablokowanie wycieku danych.

### Podsłuch linii komunikacyjnych (wiretapping)
- Łatwe do podsłuchu: łącza asynchroniczne typu RS-232, RS-485, linie telefoniczne, łącza dzierżawione.
- Środki zaradcze: ekranowanie, multipleksowanie danych, szyfrowanie.
- Trochę trudniejsze do podsłuchu: łącza synchroniczne, TCP/IP, sieci z komutacją pakietów (np. X.25).
- Środki zaradcze: podobne j.w.
- Trudne do podsłuchu: transmisje dalekosiężne (radiolinie) 2km, łącza satelitarne – wąska charakterystyka promieniowania zastosowanych anten (wysoka kierunkowość łączy).

### Komunikacja bezprzewodowa – radiowa
* Rozsiewa sygnały we wszystkie strony (z natury rzeczy samej).
* Rozwiązanie: komunikacja szerokopasmowa, szyfrowanie połączeń.

### Przechwytywanie pakietów w sieciach LAN
- Sieci typu Ethernet (802.3) lub Token-Ring (802.5) są podobne do sieci z komutacją pakietów. Ale w każdym węźle sieci LAN można zainstalować oprogramowanie do podsłuchu i analizy wszystkich przepływających pakietów (sniffer). Niektóre z tych programów umożliwiają konfigurację przechwytywania.
- Rozwiązanie: szyfrowanie na poziomie aplikacji, śluzy ogniowe do blokowania części ruchu.

### Łącza światłowodowe
Okazało się, że założenie związane z niemożnością podsłuchu okazało się błędne. Można powielić strumień światła mechanicznie wnikając w przewód optyczny. Na szczęście kable światłowodowe mają nawet setki pojedynczych włókien, tak więc trudno trafić na ten poszukiwany przewód. Ponadto urządzenia do konwersji sygnału świetlnego na elektryczny są nadal dość kosztowne.

Można zauważyć poprzez spadek energii

### Promieniowane elektromagnetyczne
- Można odczytać informacje wewnątrz promieniowania elektromagnetycznego terminali z odległości wielu setek metrów od budynku podsłuchiwanej organizacji.
- Środki zaradcze: okna panelowe, lokalizacja terminali, technologia TEMPEST (Transient ElectroMagnetic Pulse Emission STandard).

### Przechwytywanie informacji podczas logowania - 
Techniki:
* Trojany umieszczone na serwerze,
* Symulatory procedur logowania,
* Rejestracja uderzeń w klawiaturę.
* Rozwiązanie: hasła jednorazowe generowane np. przez karty inteligentne.

### Oszukiwanie systemów kontroli dostępu - Techniki:
* Ataki brutalne (wykorzystanie numeru telefonicznego z połączenia modemowego (dialer), wyczerpujące przeszukiwania w celu odgadnięcia hasła, ataki na przestrzeń kluczy kryptograficznych, powtarzanie błędnego logowania w celu zablokowania uprawnionego użytkownika, przeszukiwanie pamięci operacyjnej);
* Inteligentne odgadywanie (ataki słownikowe).

### Inne sposoby pozyskiwania informacji
* Kradzieże, przeszukiwanie śmieci, zużyte nośniki magnetyczne/FLASH, szpiegostwo.


