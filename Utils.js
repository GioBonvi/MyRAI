/**
 * Raccolta di funzioni uditili.
 */
class Utils {
  /**
   * Fomratta un numero aggiungendo un carattere in testa fino araggiungere una
   * certa lunghezza.
   * @param {number} n - Numero da formattare.
   * @param {number} width - Numero di cifre che deve avere il lumero finale.
   * @param {character} z - Carattere da aggiungere.
   * @return {string} Il numero formattato.
   */
  static pad (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /**
   * Formatta una data secondo il formato YYYY_MM_DD.
   * @param {Date} d - La data da formattare.
   * @return {string} La data formattata.
   */
  static formatDate (d) {
    return d.getFullYear() + '_' + Utils.pad(d.getMonth() + 1, 2, 0) + '_' + Utils.pad(d.getDate(), 2, 0);
  }

  /**
   * Trasforma i caratteri speciali (RegExp) di una stringa nei loro equivalenti.
   * @param {string} str - La stringa da trasformare.
   * @return {string} La stringa trasformata.
   */
  static escapeRegEx (str) {
    return str.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
  }

  /**
   * Converte un timestamp in millisecondi in una stringa HH:MM.
   * @param {number} timestamp - Il timestamp da convertire.
   * @return {string} L'ora risultante.
   */
  static timestampToOra (timestamp) {
    var data = new Date(timestamp);
    var minuti = Utils.pad(data.getMinutes(), 2, 0);
    var ore = Utils.pad(data.getHours(), 2, 0);
    return (ore + ':' + minuti);
  }

  /**
   * Converti una stringa HH:MM in millisecondi passati dalla mezzanotte.
   * @param {string} ora - L'ora da convertire.
   * @return {number} L'ora convertita in millisecondi.
   */
  static oraToMillisecondi (ora) {
    return (parseInt(ora[0]) * 600 + parseInt(ora[1]) * 60 + parseInt(ora[3]) * 10 + parseInt(ora[4])) * 60 * 1000;
  }
}
