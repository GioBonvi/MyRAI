/* global $ Utils */

/**
 * Classe rappresentante un programma TV RAI.
 * @typedef {Object} Programma
 * @property {boolean} selezionato - Specifica se il programma rientra o meno nel
 * filtro specificato dall'utente.
 * @property {number} inizioGiornata - Timestamp dell'inizio della giornata di programmazione.
 * @property {number} fineGiornata - Timestamp della fine della giornata di programmazione.
 * @property {string} titolo - Titolo del programma.
 * @property {number} id - ID univoco del programma (assegnato dalla RAI).
 * @property {number} inizio - Timestamp dell'ora di inizio della trasmissione del
 * programma.
 * @property {number} durata - Durata del programma in minuti.
 * @property {number} fine - Timestamp dell'ora di fine della trasmissione del programma.
 * @property {string} link - Link ad una pagina di approfondimento sul programma.
 * @property {string} linkRAITV - Link alla pagina RAITV del programma.
 * @property {string} descrizione - Descrizione testuale del programma.
 * @property {string} genere - Genere del programma.
 * @property {string} macrogenere - Macrogenere del programma.
 * @property {string} prettyGenere - Unione di macrogenere e genere.
 * @property {string} immagine - Indirizzo della thumbnail del programma.
 */
class Programma {

  /**
   * Crea il programma a partire dal testo html del programma, dal nome, e dal
   * giorno di riferimento.
   * @param {string} htmlText - Il testo html che descrive il programma, estratto
   * dal sito della RAI.
   * @param {string} idCanale - Identifica il canale. Deve essere una delle chiavi
   * di Canale.canaliValidi().
   * @param {number} timestamp - Il timestamp della mezzanotte del giorno in cui
   * va in onda il programma.
   */
  constructor (htmlText, idCanale, timestamp) {
    this.selezionato = true;
    // Una giornata di programmazione RAI inizia alle 6:00 AM e termina alle
    // 6:00 AM del giorno seguente.
    this.inizioGiornata = timestamp + 6 * 3600 * 1000;
    this.fineGiornata = this.inizioGiornata + 24 * 3600 * 1000;

    this.titolo = $('.info a', htmlText).html();
    this.id = $('.info a', htmlText).attr('idprogramma');

    // L'ora è nel formato HH:MM e va convertita in timestamp (millisecondi).
    var ora = $('.ora', htmlText).html();
    this.inizio = timestamp + Utils.oraToMillisecondi(ora);
    // Alcuni programmi vanno in onda dopo mezzanotte, quindi in realtà vanno
    // in onda il giorno dopo.
    if (this.inizio < this.inizioGiornata) {
      this.inizio += 24 * 3600 * 1000;
    }

    this.link = $('.info a', htmlText).attr('href');
    if (typeof this.link === 'undefined') {
      // Se il link non esiste.
      this.link = '';
    } else if (this.link.search('http') !== 0) {
      // Ad alcuni link manca il prefisso 'http://'.
      this.link = 'http://' + this.link;
    }

    this.linkRAITV = $('div.eventDescription', htmlText).attr('data-linkraitv');
    if (typeof this.linkRAITV === 'undefined') {
      // Se il link non esiste.
      this.linkRAITV = '';
    } else if (this.linkRAITV.search('http') !== 0) {
      // Ad alcuni link manca il prefisso 'http://'.
      this.linkRAITV = 'http://' + this.linkRAITV;
    }

    // La descrizione contiene sempre uno '<span>...</span>' che va rimosso.
    this.descrizione = $('div.eventDescription', htmlText).html().replace(new RegExp('<span.*span>', 'g'), '');
    // Controlla che dopo la rimozione non siano rimasta una stringa vuota (composta da soli '\n').
    if (!/.+/.test(this.descrizione)) {
      this.descrizione = 'Questo programma non presenta nessuna descrizione :(';
    }

    this.genere = $('div.eventDescription', htmlText).attr('data-genere').toLowerCase();
    this.macrogenere = $('div.eventDescription', htmlText).attr('data-macrogenere').toLowerCase();

    // this.prettygenere è una stringa che contiene sia il genere che il macrogenere
    // senza ripetizioni per mostrarli all'utente.
    if (this.macrogenere !== '' && this.genere !== '' && this.macrogenere !== this.genere) {
      // Genere e macrogenere definiti e diversi fra loro.
      this.prettygenere = this.macrogenere + ' - ' + this.genere;
    } else if (this.macrogenere !== '' && this.genere !== '' && this.macrogenere === this.genere) {
      // Genere e macrogenere definiti, ma uguali fra loro.
      this.prettygenere = this.genere;
    } else if (this.macrogenere !== '') {
      // Solo il macrogenere è definito.
      this.prettygenere = this.macrogenere;
    } else if (this.genere !== '') {
      // Solo il genere è definito.
      this.prettygenere = this.genere;
    } else {
      // Né genere né macrogenere sono definiti.
      this.prettygenere = '';
    }

    this.immagine = $('div.eventDescription', htmlText).attr('data-immagine');
    if (this.immagine === '') {
      // Se non c'è un'immagine usa l'icona del canale.
      this.immagine = 'img/' + idCanale + '_100.jpg';
    }
  }

  /**
   * Calcola l'ora a cui il programma finisce.
   * @return {number} Il timestamp che indica l'ora a cui il programma termina.
   */
  get fine () {
    return this.inizio + this.durata * 60 * 1000;
  }

  /**
   * Determina se il programma soddisfa o meno i criteri di un filtro e imposta
   * this.selezionato di conseguenza.
   * @param {Filtro} filtro - Il filtro da applicare al programma.
   */
  applicaFiltro (filtro) {
    this.selezionato = (
      // L'inizio del programma deve essere compreso nell'intervallo del filtro.
      this.inizio >= filtro.inizio &&
      this.inizio < filtro.fine &&
      // Il titolo del programma deve contenere la stringa specificata.
      this.titolo.search(filtro.filtroTitolo) !== -1 &&
      // Il genere deve corrispondere a quello specificato (se è stato specificato).
      (filtro.filtroGenere.length === 0 || filtro.filtroGenere.indexOf(this.genere) !== -1) &&
      // Il macrogenere deve corrispondere a quello specificato (se è stato specificato).
      (filtro.filtroMacrogenere.length === 0 || filtro.filtroMacrogenere.indexOf(this.macrogenere) !== -1) &&
      // La descrizione deve contenere la stringa specificata.
      this.descrizione.search(filtro.filtroDescrizione) !== -1
    );
  }
}
