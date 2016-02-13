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
        $("#list-container #list-channels").append('<img class="list-ch-logo card" src="img/' + ch + '_100.jpg">');
        
        var channel = $('<div class="list-ch" data-ch="' + ch + '"></div>');
        
        var chHeader = '<div class="list-ch-header" data-ch="' + ch + '"><img class="list-ch-header-logo" src="img/' + ch + '_100.jpg"><h5 class="list-ch-header-text">Rai Uno</h5></div>';
        var chBody = $('<div class="list-ch-body" data-ch="' + ch + '"></div>');
        
        chBody.append('<div class="list-ch-prev"><span class="list-ch-titolo">' + ch.titolo + '</span></div>');
        
        channel.append(chHeader).append(chBody);
        $("#list-inner-container").append(channel);
        
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
    
    
    $("#preloader").remove();
    $("main").show();
});
