/*
 * Recupera tutte le informazioni su tutti i programmi in onda un certo giorno su un certo canale.
 * All'indirizzo http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/CANALE_DATA.html
 * si trova una grezza lista di programmi con ore di trasmissione e dettagli:
 * la lista (in HTML) viene elaborata e restituita sottoforma di array Javascript.
 * L'array contiene i vari programmi sottoforma di Object() con:
 *  titolo
 *  id
 *  inizio (in minuti trascorsi dalla mezzanotte)
 *  fine (in minuti trascorsi dalla mezzanotte)
 *  durata (in minuti)
 *  link (non sempre specificato - una pagina dedicata della RAI sul programma)
 *  linkRAITV (non sempre specificato - una pagina che raccoglie registrazioni di edizioni passate del programma)
 *  descrizione (non sempre specificata)
 *  macrogenere (non sempre specificato)
 *  genere (non sempre sepcificato)
 *  prettygenere (una combinazione ottimizzata per la lettura tipo "macrogenere - genere")
 *  immagine (non sempre specificata - un'icona del programma)
 *  isOk (boolean - indica se il programma corrisponde ai filtri di ricerca)
 *
 * Per quanto riguarda i parametri:
 *  ch
 *      Indica il nome del canale di cui si vuole la programmazione.
 *      Deve essere uno dei seguenti valori:
 *          RaiUno RaiDue RaiTre Rai4 Extra
 *  data
 *      Indica il giorno di cui si vuole la programmazione-
 *      Il formato deve essere rigorosamente YYYY_MM_DD
 *  filtri
 *      Un'array contenete eventuali filtri di ricerca.
 *      Deve seguire questo formato:
 *          {
 *              genere: filtroGenere,                   // Stringa tipo "genere1,genere2,genere3,"
 *                                                      // Vengono selezionati i programmi che corrispondono ad alemno uno dei generi.
 *              macrogenere: filtroMacrogenere,         // Stringa tipo "macgen1,macgen2,macgen3,"
 *                                                      // Vengono selezionati i programmi che corrispondono ad alemno uno dei macrogenerei.
 *              titolo: filtroTitolo,                   // Una stringa. Vengono selezionati i programmi che la contengono nel titolo.
 *              descrizioneOK: filtroDescrizioneOK,     // Una stringa. Vengono selezionati i programmi che la contengono nella descrizione.
 *              descrizioneNO: filtroDescrizioneNO      // Una stringa. Vengono selezionati i programmi che NON la contengono nella descrizione.
 *          }
 *     
 */
function getChannelData(ch, data, filtri)
{
    var baseUrl = "http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/";
    var fetchUrl = baseUrl + ch + "_" + data + ".html";
    // Qui vengono salvate le informazioni riguardo alla programmazione.
    var channelData = [];

    jQuery.ajax({
        url: fetchUrl,
        success: function(html)
            {
                var extHTML = $(html);
                
                // Viene inserito un primo programma "Fake" necesario per determinare
                // correttamente la durata del primo programma effettivo.
                prg = new Object();
                prg.inizio = "360";
                prg.titolo = "Start";
                channelData.push(prg);
                // Estrazione delle informazioni.
                $.each($(".intG", extHTML), function(n, val)
                {
                    val = $(val);
                    prg = new Object();
                    
                    prg.titolo = $(".info a", val).html();
                    prg.id = $(".info a", val).attr("idprogramma");
                    
                    var inizio = $(".ora", val).html();
                    prg.inizio = (parseInt(inizio[0]) * 10 + parseInt(inizio[1])) * 60 + parseInt(inizio[3]) * 10 + parseInt(inizio[4]);
                    
                    prg.link = $(".info a", val).attr("href");
                    // Se il link non esiste la variabile è 'undefined'.
                    prg.link = (typeof prg.link === 'undefined') ? "" : "http://" + prg.link.replace("http://", "");
                    
                    prg.linkRAITV = $("div.eventDescription", val).attr("data-linkraitv");
                    // Se il link non esiste la variabile è vuota.
                    prg.linkRAITV = (prg.linkRAITV == "") ? "" : "http://" + prg.linkRAITV.replace("http://", "");
                    
                    prg.descrizione = $("div.eventDescription", val).html();
                    prg.descrizione = prg.descrizione.replace(new RegExp("<span.*span>\n", "g"), "");
                    if (prg.descrizione == "\n")
                    {
                        prg.descrizione = "Nessuna descrizione";
                    }
                    
                    prg.genere = $("div.eventDescription", val).attr("data-genere").toLowerCase();
                    prg.macrogenere = $("div.eventDescription", val).attr("data-macrogenere").toLowerCase();
                    // Combinazione ottimizzata di genere e macrogenere.
                    var prettygenere = "";
                    if (prg.macrogenere != "" && prg.genere != "")
                    {
                        if (prg.macrogenere != prg.genere)
                        {
                            prettygenere = prg.macrogenere + " - " + prg.genere;
                        }
                        else 
                        {
                            prettygenere = prg.genere;
                        }
                    }
                    else if (prg.macrogenere != "")
                    {
                        prettygenere = prg.macrogenere;
                    }
                    else if (prg.genere != "")
                    {
                        prettygenere = prg.genere;
                    }
                    prg.prettygenere = prettygenere;
                    
                    prg.immagine = $("div.eventDescription", val).attr("data-immagine");
                    prg.immagine = prg.immagine == "" ? "img/" + ch + "_100.jpg" : prg.immagine;
                    
                    var lastPrg = channelData[channelData.length - 1];
                    lastPrg.durata = getDiff(lastPrg.inizio, prg.inizio);
                    lastPrg.fine = prg.inizio;

                    // Possono comparire programmi dupicati per errore.
                    if (lastPrg.inizio == prg.inizio && lastPrg.id == prg.id)
                    {
                        // Rimuovi il vecchio.
                        channelData.pop();
                    }
                    
                    // Ora applichiamo i filtri.
                    
                    // Test genere.
                    if (filtri.genere == "")
                    {
                        // Nessun filtro stabilito -> tutti i programmi vanno bene.
                        prg.testGen = true;                        
                    }
                    else
                    {
                        // Se c'è un filtro stabilito solo i programmi i cui generi compaiono
                        // nell'array vanno bene.
                        var filtroGen = filtri.genere.split(",");
                        prg.testGen = false;
                        // Escludiamo il caso in cui un programma non ha un genere.
                        if (prg.genere != "" && filtroGen.indexOf(prg.genere) != -1)
                        {
                            prg.testGen = true;
                        }
                    }
                    
                    // Test macrogenere.
                    if (filtri.macrogenere == "")
                    {
                        // Nessun filtro stabilito -> tutti i programmi vanno bene.
                        prg.testMacGen = true;                        
                    }
                    else
                    {
                        // Se c'è un filtro stabilito solo i programmi i cui macrogeneri compaiono
                        // nell'array vanno bene.
                        var filtroMacGen = filtri.macrogenere.split(",");
                        prg.testMacGen = false;
                        // Escludiamo il caso in cui un programma non ha un macrogenere.
                        if (prg.macrogenere != "" && filtroMacGen.indexOf(prg.macrogenere) != -1)
                        {
                            prg.testMacGen = true;
                        }
                    }
                    
                    prg.testTit = (new RegExp(filtri.titolo,"i")).test(prg.titolo);
                    prg.testDescOK = (new RegExp(filtri.descrizioneOK,"i")).test(prg.descrizione);
                    prg.testDescNO = filtri.descrizioneNO == "" ? true : ! (new RegExp(filtri.descrizioneNO,"i")).test(prg.descrizione);
                    
                    // Indica se il programma corrisponde a tutti i filtri.
                    prg.isOK = prg.testGen && prg.testMacGen && prg.testTit && prg.testDescOK && prg.testDescNO;
                    
                    // Alcune volte il programma è segnato alle 6:00, ma è alla fine della giornata e non all'inizio.
                    // in questo caso viene ignorato (fa parte del giorno successivo)
                    if (! (prg.inizio == 360 && lastPrg.inizio < 360))
                    {
                        // Aggiungi il nuovo programma.
                        channelData.push(prg);
                    }
                });
            },
        async: false
    });
    /* Non è stato possibile eliminare prima i programmi non corrispondenti alla ricerca
     * per la questione del calcolo della durata.
     * Ora vengono selezionati solo i programmi corrispondenti.
     */
    var res = [];
    channelData.forEach(function(prog) {
        if(prog.isOK)
        {
            res.push(prog);
        }
    });
    return res;
}

// Ottieni la differenza in minuti fra due ore (anche a cavallo della mezzanotte).
function getDiff(oraPrima, oraDopo)
{
    if (oraDopo >= oraPrima)
    {
        // Ore regolari.
        return oraDopo - oraPrima;
    }
    else
    {
        // A cavallo della mezzanotte.
        return (24*60 - oraPrima + oraDopo);
    }
} 

// Converti un numero di minuti nell'ora corrispondente xx:xx (0 = 00:00, 60 = 01:00)
function minutiToOra(total)
{
    var ore = Math.floor(total/60);
    ore = ore <= 9 ? '0' + ore : ore;
    var minuti = total % 60;
    minuti = minuti <= 9 ? '0' + minuti : minuti;
    return (ore + ":" + minuti);
}

// Fai scorrere un elemento in overflow fino ad un elemento "elem" al suo interno. (usato nel layout LIST)
jQuery.fn.scrollTo = function(elem, speed) { 
    $(this).animate({
        scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
    }, speed == undefined ? 1000 : speed); 
    return this; 
};
