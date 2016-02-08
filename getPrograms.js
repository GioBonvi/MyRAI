/*
 * Recupera tutte le informazioni su tutti i programmi in onda un certo giorno su un certo canale.
 * All'indirizzo http://www.rai.it/dl/portale/html/palinsesti/guidatv/static/CANALE_DATA.html
 * si trova una grezza lista di programmi con ore di trasmissione e dettagli:
 * la lista (in HTML) viene elaborata e restituita sottoforma di array Javascript.
 * L'array contiene i vari programmi sottoforma di Object() con:
 *  titolo
 *  id
 *  inizio (in minuti trascorsi dalla mezzanotte)
 *  durata (in minuti)
 *  link (non sempre specificato - una pagina dedicata della RAI sul programma)
 *  descrizione (non sempre specificata)
 *  macrogenere (non sempre specificato)
 *  genere (non sempre sepcificato)
 *  prettygenere (una combinazione ottimizzata per la lettura tipo "macrogenere - genere")
 *  immagine (non sempre specificata - un'icona del programma)
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
                    prg.durata = getDiff(lastPrg.inizio, prg.inizio);

                    // Possono comparire programmi dupicati per errore.
                    if (lastPrg.inizio == prg.inizio && lastPrg.id == prg.id)
                    {
                        // Rimuovi il vecchio.
                        channelData.pop();
                    }
                    
                    // Alcune volte il programma è segnato alle 6:00, ma è alla fine della giornata e non all'inizio.
                    // Per evitarre dubbi viene spostato alle 5:59.
                    if (prg.inizio == 360 && lastPrg.inizio < 360)
                    {
                        prg.inizio = prg.inizio - 1;
                    }
                    
                    prg.testGen = filtri[0] == "" ? true : (new RegExp("^" + filtri[0] + "$","i")).test(prg.genere);
                    prg.testMacGen = filtri[1] == "" ? true : (new RegExp("^" + filtri[1] + "$","i")).test(prg.macrogenere);
                    prg.testTit = (new RegExp(filtri[2],"i")).test(prg.titolo);
                    prg.testDescOK = (new RegExp(filtri[3],"i")).test(prg.descrizione);
                    prg.testDescNO = filtri[4] == "" ? true : ! (new RegExp(filtri[4],"i")).test(prg.descrizione);
                    
                    prg.isOK = prg.testGen && prg.testMacGen && prg.testTit && prg.testDescOK && prg.testDescNO;
                    
                    // Aggiungi il nuovo programma.
                    channelData.push(prg);
                });
            },
        async: false
    });
    var res = [];
    for (prog of channelData)
    {
        if(prog.isOK)
        {
            res.push(prog);
        }
    }
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
    ore = ore < 9 ? '0' + ore : ore;
    var minuti = total % 60;
    minuti = minuti < 9 ? '0' + minuti : minuti;
    return (ore + ":" + minuti);
}
