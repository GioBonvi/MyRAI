/* global Utils RegExp */

/**
 * Classe che rappresenta un filtro applicabile dall'utente ad un palinsesto
 * in modo da vedere solo i programmi che gli interessano.
 * @typedef Filtro
 * @property {Array} canali - Elenco degli ID dei canali permessi dal filtro.
 * @property {number} inizio - L'inizio dell'intervallo di tempo in cui un
 * programma può iniziare.
 * @property {number} fine - La fine dell'intervallo di tempo in cui un
 * programma può finire.
 * @property {RegExp} filtroTitolo - Il filtro da applicare al titolo per
 * determinare se va incluso o no.
 * @property {RegExp} filtroDescrizione - Il filtro da applicare alla descrizione
 * per determinare se va incluso o no.
 * @property {RegExp} filtroGenere - Un elenco di generi permessi.
 * @property {RegExp} filtroMacrogenere - Un elenco di macrogeneri permessi.
 */
class Filtro {

  constructor (canali, timestamp, titolo, fascia, genere, macrogenere, descrizione) {
    this.canali = canali;

    switch (fascia) {
      case 'mattina':
        // 06:00 - 12:00.
        this.inizio = timestamp + 6 * 3600 * 1000;
        this.fine = timestamp + 12 * 3600 * 1000;
        break;
      case 'pomeriggio':
        // 12:00 - 21:00.
        this.inizio = timestamp + 12 * 3600 * 1000;
        this.fine = timestamp + 21 * 3600 * 1000;
        break;
      case 'sera':
        // 21:00 - 24:00.
        this.inizio = timestamp + 21 * 3600 * 1000;
        this.fine = timestamp + 24 * 3600 * 1000;
        break;
      case 'notte':
        // 24:00 - 06:00 del giorno dopo.
        this.inizio = timestamp + 24 * 3600 * 1000;
        this.fine = timestamp + 30 * 3600 * 1000;
        break;
      case 'tutto':
        // falls through
      default:
        // 06:00 - 06:00 del giorno dopo.
        this.inizio = timestamp + 6 * 3600 * 1000;
        this.fine = timestamp + 30 * 3600 * 1000;
    }

    this.filtroTitolo = new RegExp(Utils.escapeRegEx(titolo), 'i');
    this.filtroDescrizione = new RegExp(Utils.escapeRegEx(descrizione), 'i');
    this.filtroGenere = genere;
    this.filtroMacrogenere = macrogenere;
  }
}
