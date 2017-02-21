/* global $ Utils p */

/**
 * Una classe che disegna la GUI dall'elenco dei canali.
 */
class StackGUI {
  /**
   * Inserisci i canali specificati nella GUI del sito.
   * @param {Array} canali - Lista dei canali da rappresentare.
   * @param {Filtro} filtro - Filtro da applicare ai canali.
   */
  static draw (canali, filtro) {
    $('#preloader-container').remove();
    $('#noPrograms').show();
    for (let chID of Object.keys(p.channels)) {
      let ch = canali[chID];
      // Applica il filtro.
      ch.applicaFiltro(filtro);
      // Controlla se il canale è stato eliminato dal filtro o no.
      if (ch.contaSelezionati() > 0) {
        $('#noPrograms').hide();
        // Rimuovi il loader.
        // Aggiungi l'icona del programma alla lista dei canali.
        // style="order:n" permette di mantenere l'ordine corretto anche se
        // gli elementi sono aggiungi nell'ordine sbagliato (perché vengono
        // aggiunti al termine di ogni chiamata asincrona).
        $('#list #channels').append('<img style="order:' + ch.index + '" class="ch-logo card" data-ch="' + ch.idCanale + '" src="img/' + ch.idCanale + '_100.jpg" alt="' + ch.idCanale + ' logo">');
        // Crea l'elemento della lista dei programmi.
        // Anche qui style="order:n" permette di mantenere l'ordine corretto.
        var channel = $('<div class="ch" style="order:' + ch.index + '" data-ch="' + ch.idCanale + '"></div>');
        var chHeader = '<div class="ch-header" data-ch="' + ch.idCanale + '"><img class="ch-logo" src="img/' + ch.idCanale + '_100.jpg"><h5 class="ch-header-text">' + ch.nome + '</h5></div>';
        var chBody = $('<div class="ch-body" data-ch="' + ch.idCanale + '"></div>');
        // Crea la lista dei programmi.
        for (let i = 0; i < ch.programmi.length; i = i + 1) {
          let prg = ch.programmi[i];
          // Controlla che il programma sia stato selezionato dal filtro.
          if (prg.selezionato) {
            // Dati principali.
            let titolo = '<span class="titolo">' + prg.titolo + '</span>';
            let durata = '<span class="durata">' + Utils.timestampToOra(prg.inizio) + '/' + Utils.timestampToOra(prg.fine) + '</span>';
            let genere = '<span class="genere">' + prg.prettygenere + '</span>';
            let prgPrev = '<div class="prg-preview">' + durata + ' ' + titolo + ' - ' + genere + '</div>';
            // Dettagli.
            var img = '<img align="left" src="' + prg.immagine + '" alt="' + prg.titolo + '">';
            var link = (prg.link !== '' ? '<a href="' + prg.link + '">Pagina dedicata</a>' : '');
            var linkRAITV = (prg.linkRAITV !== 'http://' ? '<a href="' + prg.linkRAITV + '">Episodi registrati</a>' : '');
            var descr = '<div class="descrizione">' + prg.descrizione + '<br>' + link + '&nbsp;&nbsp;&nbsp;' + linkRAITV + ' </div>';
            var prgMore = '<div class="prg-more" style="display: none">' + img + descr + '</div>';
            // Controlla se il programma è in onda adesso.
            let currentTimestamp = Date.now();
            let inOnda = prg.inizio <= currentTimestamp && prg.fine > currentTimestamp;
            chBody.append('<div data-n="' + i + '" class="prg' + (inOnda ? ' inonda' : '') + '">' + prgPrev + prgMore + '</div>');
          }
        }
        channel.append(chHeader).append(chBody);
        // Aggiungi il canale alla lista.
        $('#inner-container').append(channel);
      }

      // Al click su un programma vengono mostrati (o nascosti) ulteriori dettagli.
      // Viene usato unbind per impedire che l'evento del click passi
      // attraverso più elementi.
      $('.prg').unbind().click(function () {
        $(this).find('.prg-more').toggle('medium');
      });

      // Cliccando su un canale nella lista in alto si viene portati automaticamente...
      $('#list #channels img.ch-logo').unbind().click(function () {
        if ($('#inner-container').find('.ch[data-ch="' + $(this).attr('data-ch') + '"] .prg.inonda').length > 0) {
          // Al programma attualmente in onda su quel canale (se disponibile).
          $('#inner-container').scrollTo('.ch[data-ch="' + $(this).attr('data-ch') + '"] .prg.inonda');
        } else {
          // All'intestazione di quel canale in caso non ci sia nessun programma in onda attualmente.
          $('#inner-container').scrollTo('.ch-header[data-ch="' + $(this).attr('data-ch') + '"]');
        }
      });
    }
  }
}
