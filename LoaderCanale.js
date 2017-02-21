/* global $ Utils XMLHttpRequest Canale */

/**
 * Classe che si occupa di recuperare il contenuto dal sito della RAI e di compattarlo
 * in un oggetto Canale in maniera asincrona.
 * @typedef LoaderCanale
 * @property {string} idCanale - Identifica il canale. Deve essere una delle chiavi
 * di Canale.canaliValidi().
 * @property {number} timestamp - Il timestamp della mezzanotte del giorno di programmazione
 * considerato.
 */
class LoaderCanale {
  /**
   * Inizializza il loader.
   * @param {string} idCanale - Identifica il canale. Deve essere una delle chiavi
   * di Canale.canaliValidi().
   * @param {number} timestamp - Il timestamp della mezzanotte del giorno di programmazione
   */
  constructor (idCanale, timestamp) {
    this.idCanale = idCanale;
    this.timestamp = timestamp;
  }

  /**
   * Ottieni le informazioni relative al canale dal sito della RAI.
   */
  load () {
    var baseUrl = 'http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/';
    var fetchUrl = baseUrl + this.idCanale + '_' + this.dataFormattata + '.html';

    // Ogni canale è caricato in maniera asincrona: vengono creati degli
    // oggetti Deferred che quando vengono risolti restituiscono l'oggetto
    // Canale.
    var def = $.Deferred();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fetchUrl);

    xhr.onload = () => {
      if (xhr.status === 200) {
        let canale = new Canale($(xhr.response), this.idCanale, this.timestamp);
        def.resolve(canale);
      }
    };

    xhr.onerror = () => {
      def.reject('Errore sconosciuto!');
    };

    xhr.send();

    // Restituisci l'oggetto Deferred.
    return def;
  }

  /**
   * Ottieni la data relativa al timestamp formattata come HH:MM.
   */
  get dataFormattata () {
    return Utils.formatDate(new Date(this.timestamp));
  }
}
