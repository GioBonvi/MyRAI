// Adattamento della grafica allo schermo.
$("#list-container").height(window.innerHeight - $("#wall-date").height());

// Qui  vengono salvate le info di tutti i programmi.
var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: ""};

var em_min = 0.7; // Ogni minuto di trasmissione corrisponde a 0.7 em di altezza per il programma.
/*
 * Per ogni canale viene aggiunto:
 *  il logo
 *  le ore nelle divisioni fra ore
 *  i programmi nelle ore corrispondenti
 */
myChannels.forEach(function(ch) {
    
    var chData = getChannelData(ch, data, filtri);
    // A causa dei filtri alcuni canali possono risultare vuoti (senza programmi)
    if (chData.length > 0)
    {
        allChannelsData[ch] = chData;
        $("#list #channels").append('<img class="ch-logo card" src="img/' + ch + '_100.jpg">');
        
        var channel = $('<div class="ch" data-ch="' + ch + '"></div>');
        
        var chHeader = '<div class="ch-header" data-ch="' + ch + '"><img class="ch-logo" src="img/' + ch + '_100.jpg"><h5 class="ch-header-text">Rai Uno</h5></div>';
        var chBody = $('<div class="ch-body" data-ch="' + ch + '"></div>');
        
        for (var i = 0; i < chData.length; i = i + 1)
        {
            prg = chData[i];
            var titolo = '<span class="titolo">' + prg.titolo + '</span>';
            var durata = '<span class="durata">' + minutiToOra(prg.inizio) + '/' + minutiToOra(prg.fine) + '</span>';
            var genere = '<span class="genere">' + prg.prettygenere + '</span>';
            
            var prgPrev = '<div class="prg-preview">' + durata + ' ' + titolo + ' - ' + genere + '</div>';
            
            var img = '<img src="' + prg.immagine + '">';
            var link = (prg.link != "" ? '<a href="' + prg.link + '">Pagina dedicata</a>' : "");
            var linkRAITV = (prg.linkRAITV != "" ? '<a href="' + prg.linkRAITV + '">Episodi registrati</a>' : "");
            var descr = '<div class="descrizione">' + prg.descrizione + '<br>' +  link + '&nbsp;&nbsp;&nbsp;' + linkRAITV + ' </div>';
            var prgMore = '<div class="prg-more" style="display: none">' + img + descr + '</div>';
            
            chBody.append('<div class="prg">' + prgPrev + prgMore + '</div>');
        }
        channel.append(chHeader).append(chBody);
        $("#inner-container").append(channel);
        
        /*
        // Se c'è almeno un programma...
        $("#noPrograms").remove();
        
        $(".wall-hour-divider").each(function() {
            $(this).append('<span>' + $(this).attr("data-ora") + '</span>');
        });
        $("#wall-container #wall-channels").append('<img class="wall-ch-logo card" src="img/' + ch + '_100.jpg">');
        $(".wall-hour").append('<div class="wall-ch" data-ch="' + ch + '"></div>');
        
        allChannelsData[ch] = chData;
        for (var i = 0; i < chData.length; i = i + 1)
        {
            var prg = chData[i];
            
            // Se il programma dura troppo poco l'immagine viene nascosta per fare spaizo al testo.
            var divImg = divImg = $('<div class="wall-prg-img"></div>').append('<img src="' + prg.immagine + '" ' + ((prg.durata * em_min) < 10 ? "hidden" : "") + '>');
            
            var titolo = '<span class="titolo"><a ' + (link != "" ? 'href="http://' + link + '" target="_blank"' : "") + '>' + prg.titolo + '</a></span>';
            
            var genere = "";
            if(prg.prettygenere != "")
            {
                genere = '<span class="genere">' + prg.prettygenere + '</span>';
            }
            
            var inizio = '<span class="inizio">' + minutiToOra(prg.inizio) + '</span>';
            var divContent = $('<div class="wall-prg-content"></div>').append(titolo).append("<br>").append(genere).append("<br>").append(inizio);
            var prgDiv = $('<div data-n="' + i + '" class="wall-prg card z-depth-3" style="min-height:' + prg.durata * em_min + 'em"></div>').append(divImg).append(divContent);
            $('.wall-hour[data-start="' + Math.floor(prg.inizio / 60) * 60 + '"] .wall-ch[data-ch="' + ch + '"]').append(prgDiv);
            
        }
        */
    }
    
    $(".prg").unbind().click(function() {
        $(this).find(".prg-more").toggle("medium");
    });
    
    $("#preloader").remove();
    $("main").show();
});
