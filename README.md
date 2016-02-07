# MyRAI #

Questa semplice applicazione in HTML/Javascript/PHP permette di navigare la programmazione dei canali RAI in maniera più semplice e piacevole rispetto al sito ufficiale.

## Grafica ##

La grafica è in stile _Material Design_ e la struttura della pagina è principalmente basta sulle flexbox: per questo motivo vecchi broswer potrebbero non renderizzare la pagina in modo corretto.

## Funzioni ##

NB: le seguenti funzioni devono ancora essere implementate.

Sono presenti due tipi di visualizzazioni:

* Wall: ogni programma occupa un'area proporzionale alla sua durata; ogni canale è disposto in colonna.
* List: un semplice elenco dei programmi senza immagini e fronzoli; meno dispendioso dal putn odi vista delle risorse.

Cliccando su un programma si apre un popup con tutti i dettagli disponibili.

Oltre a visualizzare tutti i programmi è anche possibile filtrare solo quelli i cui titoli (non) contengono un testo o quelli di un certo genere.

Questi filtri possono essere salvati come link: aprendo il link di un filtro verranno automaticamente visualizzati solo i programmi relativi al filtro specificato.
