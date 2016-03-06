/*
 * Recupera tutte le informazioni su tutti i programmi in onda un certo giorno su un certo canale.
 * All'indirizzo http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/CANALE_DATA.html
 * si trova una grezza lista di programmi con ore di trasmissione e dettagli:
 * la lista (in HTML) viene elaborata e restituita sottoforma di oggetto Javascript.
 * L'oggetto contiene:
 *      chName (il nome del canale)
 *      chProgs (un array contenente i dettagli dei programmi)
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
 *          RaiUno RaiDue RaiTre Rai4 Extra RaiMovie Premium RaiGulp Yoyo RaiEDU2 RaiEducational RaiNews RaiSport1 RaiSport2
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
 *              fasciaOraria: ["notte" | "mattina" | "pomeriggio" | "sera"]
 *          }
 *     
 */
function getChannelData(ch, data, filtri)
{
    var baseUrl = "http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/";
    var fetchUrl = baseUrl + ch + "_" + data + ".html";
    // Qui vengono salvate le informazioni da restituire.
    var channelData = [];

    var def = $.Deferred();    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fetchUrl);
    
    xhr.onload = () => {
        if (xhr.status === 200)
        {
            var extHTML = $(xhr.response);
            
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
                    prg.descrizione = "Questo programma non presenta nessuna descrizione :(";
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
                switch (filtri.fasciaOraria) {
                    case "notte":
                        prg.testOra = (prg.inizio >= 0 && prg.inizio < 360);
                        break;
                    case "mattina":
                        prg.testOra = (prg.inizio >= 360 && prg.inizio < 720);
                        break;
                    case "pomeriggio":
                        prg.testOra = (prg.inizio >= 720 && prg.inizio < 1080);
                        break;
                    case "sera":
                        prg.testOra = (prg.inizio >= 1080 && prg.inizio < 1440);
                        break;
                    default:
                        prg.testOra = true;
                }
                
                // Indica se il programma corrisponde a tutti i filtri.
                prg.isOK = prg.testGen && prg.testMacGen && prg.testTit && prg.testDescOK && prg.testDescNO && prg.testOra;
                
                // Alcune volte il programma è segnato alle 6:00, ma è alla fine della giornata e non all'inizio.
                // in questo caso viene ignorato (fa parte del giorno successivo)
                if (! (prg.inizio == 360 && lastPrg.inizio < 360))
                {
                    // Aggiungi il nuovo programma.
                    channelData.push(prg);
                }
            });
            var res = {chName: ch, chProgs: []};
            channelData.forEach(function(prog) {
                if(prog.isOK)
                {
                    res.chProgs.push(prog);
                }
            });
            def.resolve(res);
        }
        else
        {
            def.reject("Impossibile caricare la pagina. Ch=" + ch);
        }
    }

    xhr.onerror = () => {
        def.reject("Errore sconosciuto!");
    };

    xhr.send();
    
    return def;
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
