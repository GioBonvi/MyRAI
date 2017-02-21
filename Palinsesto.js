/* global LoaderCanale Canale */

/**
 * Classe che contiene l'intera programmazione RAI di una giornata.
 * @typedef Palinsesto
 * @property {Array} channels - Elenco dei canali.
 * @property {Array} channellPromises - Elenco delle promesse relative agli
 * oggetti deferred dei vari canali.
 */
class Palinsesto {
  /**
   * Crea un nuovo palinsesto.
   * @param {number} timestamp - Timestamp della mezzanotte del giorno di
   * programmazione considerato.
   */
  constructor (timestamp) {
    this.channels = [];
    this.channelPromises = [];
    for (let idCanale of Object.keys(Canale.canaliValidi())) {
      let lc = new LoaderCanale(idCanale, timestamp);
      let promise = lc.load();
      var self = this;
      promise.done(function (canale) {
        self.channels[idCanale] = canale;
      });
      this.channelPromises.push(promise);
    }
  }
}
