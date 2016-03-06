# MyRAI #

Questa semplice applicazione in HTML/Javascript/PHP permette di navigare la programmazione dei canali RAI in maniera più semplice e piacevole rispetto al sito ufficiale; è anche disponibile una funzione di ricerca e filtro contenuti.

## Grafica ##

La grafica è in stile _Material Design_ e la struttura della pagina è principalmente basta sulle flexbox: per questo motivo vecchi broswer potrebbero non renderizzare la pagina in modo corretto.

## Layout ##

Il sito offre una "finestra" in cui è disponibile la lista dei canali e per ogni canale la lista dei programmi. Di ogni programma viene mostrato solo titolo, durata e categoria. Cliccando sul programma è possibile conoscere altri dettagli, quali una descrizione, un'immagine e dei link di approfondimento.

In basso a destra si trova un pulsante per la ricerca.

## Funzioni ##

Cliccando sull'apposito pulsante (o trascinando da sinistra a destra su dispositivi touch) si apre un menu laterale di ricerca che premtte di specificare dei filtri; in particolare è possibile restringere la ricerca per:

* il giorno in cui il programma deve andare in onda (oggi e domani sono "dinamici", ovvero indicando il giorno attuale e quello successivo; sono disponibili anche 7 date "fisse" corrsipondenti ai 7 giorni dopo il giorno attuale)

* la fascia oraria in cui il programma deve andare in onda (00-06, 06-12, 12-18, 18-24)

* il canale (o i canali) su cui deve andare in onda il programma;

* un testo contenuto nel titolo;

* un testo (non) contenuto nel titolo;

* il macrogenere del programma (è possibile scegliere un numero indefinito di macrogeneri: basta che uno di essi corrisponda)

* il genere del programma (è possibile scegliere un numero indefinito di generi: basta che uno di essi corrisponda)

Se uno dei campi è lasciato vuoto quel parametro viene ignorato (per es: se il campo "Titolo" è vuoto tutti i titoli andranno bene).

## Licenza e riuso ##

Il progetto è sotto licenza GPL v3, pertanto può essere modificato, migliorato e ridistribuito da chiunque in ogni sua parte.

Nel caso qualcuno volesse apportare qualche modifica vorrei evidenziare il fatto che in realtà tutta l'applicazione non è altro che un'impalcatura grafica costruita attorno al vero nucleo del progetto: la funzione getChannelData() (file [functions.js](https://github.com/GioBonvi/MyRAI/blob/master/functions.js "File functions.js")).

Questa funzione accetta in input il canale, la data e i filtri di ricerca e restituisce un Object() Javascript contenente il nome del canale e tutti i dettagli di tutti i programmi risultanti dalla ricerca. Se qualcuno volesse quindi implementare questa idea con un interfaccia grafica diversa (o magari per un'altra piattaforma) basta prendere la funzione e gestirne in maniera differente l'input e l'output.

Ovviamente tutto si basa sul sito ufficiale della RAI: se cambiassero gli indirizzi o il modello dei contenuti l'estrazione delle informazioni potrebbe fallire.
