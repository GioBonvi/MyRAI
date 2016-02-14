# MyRAI #

Questa semplice applicazione in HTML/Javascript/PHP permette di navigare la programmazione dei canali RAI in maniera più semplice e piacevole rispetto al sito ufficiale; è anche disponibile una funzione di ricerca e filtro contenuti.

## Grafica ##

La grafica è in stile _Material Design_ e la struttura della pagina è principalmente basta sulle flexbox: per questo motivo vecchi broswer potrebbero non renderizzare la pagina in modo corretto.

## Layout ##

Sono presenti due tipi di visualizzazioni:

* **List** (default): un semplice elenco dei programmi senza immagini e fronzoli: vengono mostrati solo durata, titolo e categoria.

Cliccando su un programma sono mostrati alcuni dettagli in più.

* **Wall**: modalità più _"grafica"_: i programmi vengono elencati in colonna per ogni canale. Ogni programma occupa un'area proporzionale alla sua durata e mostra titolo, ora di inizio e categoria.

Cliccando su un programma si apre un popup con ulteriori dettagli.

## Funzioni ##

In cima alla pagina è presente un form che permette di scegliere il layout da usare ed effettuare delle ricerche. I parametri che è possibile specificare sono:

* il giorno in cui il programma deve andare in onda (fino a 7 giorni dopo il giorno attuale)

* il canale (o i canali) su cui va in onda il programma;

* un testo contenuto nel titolo;

* un testo (non) contenuto nel titolo;

* il macrogenere del programma (è possibile scegliere un numero indefinito di macrogeneri: basta che uno di essi corrisponda)

* il genere del programma (è possibile scegliere un numero indefinito di generi: basta che uno di essi corrisponda)

Se uno dei campi è lasciato vuoto quel parametro viene ignorato (per es: se il campo "Titolo" è vuoto tutti i titoli andranno bene).

## Licenza e riuso ##

Il progetto è sotto licenza GPL v3, pertanto può essere modificato, migliorato e ridistribuito da chiunque in ogni sua parte.

Nel caso qualcuno volesse apportare qualche modifica vorrei evidenziare il fatto che in realtà tutta l'applicazione non è altro che un'impalcatura grafica costruita attorno al vero nucleo del progetto: la funzione getChannelData() (file [functions.js](https://github.com/GioBonvi/MyRAI/blob/master/functions.js "File functions.js")).

Questa funzione accetta in input il canale, la data e i filtri di ricerca e restituisce un Array Javascript contenente tutti i dettagli di tutti i programmi risultanti dalla ricerca. Se qualcuno volesse quindi implementare questa idea con un interfaccia grafica diversa (o magari per un'altra piattaforma) basta prendere la funzione e gestirne in maniera differente l'input e l'output.

Ovviamente tutto si basa sul sito ufficiale della RAI: se questo cambiasse l'estrazione delle informazioni potrebbe fallire.
