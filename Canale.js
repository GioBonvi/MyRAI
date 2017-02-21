/* global $ Programma */

/**
 * Classe che rappresenta un canale RAI.
 * @typedef {Object} Canale
 * @property {string} idCanale - Identifica il canale. Deve essere una delle chiavi
 * dell'oggetto canaliValidi definito in 'Palinsesto.js'.
 * @property {number} timestamp - Il timestamp della mezzanotte del giorno di programmazione.
 * @property {Array} programmi - Elenco dei programmi in onda sul canale.
 */
class Canale {
  /**
   * Crea un canale partendo dal testo HTML che lo descrive, dal suo idCanale e
   * dal timestamp del giorno di riferimento.
   * @param {string} htmlText - Il testo html che descrive il canale, estratto
   * dal sito della RAI.
   * @param {string} idCanale - Identifica il canale. Deve essere una delle chiavi
   * di Canale.canaliValidi().
   * @param {number} timestamp - Il timestamp della mezzanotte del giorno di programmazione
   * considerato.
   */
  constructor (htmlText, idCanale, timestamp) {
    this.idCanale = idCanale;
    this.timestamp = timestamp;
    this.programmi = [];

    // Estrai dal testo HTML le informazioni sui vari programmi.
    for (let htmlSubText of $('.intG', htmlText)) {
      let programma = new Programma(htmlSubText, this.idCanale, this.timestamp);
      let len = this.programmi.length;
      if (len > 0) {
        let lastProg = this.programmi[len - 1];
        // Durata in minuti.
        lastProg.durata = (programma.inizio - lastProg.inizio) / (60 * 1000);
      }
      this.programmi.push(programma);
    }
    // Per misurare la durata dell'ultimo programma controlla la fineGiornata.
    let len = this.programmi.length;
    let lastProg = this.programmi[len - 1];
    // Si assume che l'ultimo programma duri fino alla fine della giornata.
    lastProg.durata = lastProg.fineGiornata - lastProg.inizio;
    // A volte alcuni palinsesti della RAI viene inserito come ultimo programma
    // di una giornata il primo della giornata successiva.
    // Questo genera problemi, quindi è più semplice togliere questi prgrammi.
    if (lastProg.inizio === lastProg.inizioGiornata) {
      this.programmi.pop();
    }
  }

  /**
   * Ricava il nome del canale da 'idCanale'.
   * @return {string} Il nome leggibile del canale.
   */
  get nome () {
    return Canale.isValidChannel(this.idCanale) ? Canale.canaliValidi()[this.idCanale].nome : '';
  }

  /**
   * Ricava l'indice del canale da 'idCanale'. Viene usato per determinare la posizione
   * del canale nell'elenco di tutti i canali del palinsesto.
   * @return {number} L'indice del canale.
   */
  get index () {
    return Canale.isValidChannel(this.idCanale) ? Canale.canaliValidi()[this.idCanale].index : 0;
  }

  /**
   * Conta il numero di canali selezionati dal filtro usato.
   * @return {number} Il numero di canali selezionati dal filtro.
   */
  contaSelezionati () {
    var count = 0;
    for (let prog of this.programmi) {
      if (prog.selezionato) {
        count++;
      }
    }
    return count;
  }

  /**
   * Applica il filtro specificato al canale.
   * @param {Filtro} filtro - Il filtro da applicare.
   */
  applicaFiltro (filtro) {
    var exclude = filtro.canali.indexOf(this.idCanale) === -1;
    for (let prog of this.programmi) {
      if (exclude) {
        prog.selezionato = false;
      } else {
        prog.applicaFiltro(filtro);
      }
    }
  }

  /**
   * Verifica che un idCanale sia valido.
   * @param {string} idCanale - L'id da verificare.
   * @return {boolean} True se lìid è valido, false altrimenti.
   */
  static isValidChannel (idCanale) {
    return Object.keys(Canale.canaliValidi()).indexOf(idCanale) !== -1;
  }

  /**
   * Elenco dei canali validi in base all'idCanale.
   * @return {Array} Elenco di oggetti
   * {
   *  idCanale {string}: {
   *    nomeCanale {string},
   *    index {number}
   *   }
   * }
   */
  static canaliValidi () {
    return {
      RaiUno: {
        nome: 'Rai Uno',
        index: 1
      },
      RaiDue: {
        nome: 'Rai Due',
        index: 2
      },
      RaiTre: {
        nome: 'Rai Tre',
        index: 3
      },
      Rai4: {
        nome: 'Rai Quattro',
        index: 4
      },
      Extra: {
        nome: 'Rai Cinque',
        index: 5
      },
      Premium: {
        nome: 'Rai Premium',
        index: 6
      },
      RaiGulp: {
        nome: 'Rai Gulp',
        index: 7
      },
      RaiMovie: {
        nome: 'Rai Movie',
        index: 8
      },
      Yoyo: {
        nome: 'Rai YoYo',
        index: 9
      },
      RaiEDU2: {
        nome: 'Rai Storia',
        index: 10
      },
      RaiEducational: {
        nome: 'Rai Scuola',
        index: 11
      },
      RaiNews: {
        nome: 'Rai News 24',
        index: 12
      },
      RaiSport1: {
        nome: 'Rai Sport 1',
        index: 13
      },
      RaiSport2: {
        nome: 'Rai Sport 2',
        index: 14
      }
    };
  }

}
