// Adattamento della grafica allo schermo.
$("#list").css("height", window.innerHeight - $("#date").height() - 50);

myChannels.forEach(function(ch) {
    
    var chData = getChannelData(ch, data, filtri);
    // A causa dei filtri alcuni canali possono risultare vuoti (senza programmi)
    if (chData.length > 0)
    {
         // Se c'è almeno un programma...
        $("#noPrograms").remove();
        
        allChannelsData[ch] = chData;
        $("#list #channels").append('<img class="ch-logo card" data-ch="' + ch + '" src="img/' + ch + '_100.jpg" alt="' + ch + ' logo">');
        
        var channel = $('<div class="ch" data-ch="' + ch + '"></div>');
        
        var chHeader = '<div class="ch-header" data-ch="' + ch + '"><img class="ch-logo" src="img/' + ch + '_100.jpg"><h5 class="ch-header-text">' + channelNames[ch] + '</h5></div>';
        var chBody = $('<div class="ch-body" data-ch="' + ch + '"></div>');
        
        for (var i = 0; i < chData.length; i = i + 1)
        {
            prg = chData[i];
            var titolo = '<span class="titolo">' + prg.titolo + '</span>';
            var durata = '<span class="durata">' + minutiToOra(prg.inizio) + '/' + minutiToOra(prg.fine) + '</span>';
            var genere = '<span class="genere">' + prg.prettygenere + '</span>';
            
            var prgPrev = '<div class="prg-preview">' + durata + ' ' + titolo + ' - ' + genere + '</div>';
            
            var img = '<img align="left" src="' + prg.immagine + '" alt="' + prg.titolo + '">';
            var link = (prg.link != "" ? '<a href="' + prg.link + '">Pagina dedicata</a>' : "");
            var linkRAITV = (prg.linkRAITV != "" ? '<a href="' + prg.linkRAITV + '">Episodi registrati</a>' : "");
            var descr = '<div class="descrizione">' + prg.descrizione + '<br>' +  link + '&nbsp;&nbsp;&nbsp;' + linkRAITV + ' </div>';
            var prgMore = '<div class="prg-more" style="display: none">' + img + descr + '</div>';
            
            // Minuti passati dalla mezzanotte.
            var d = new Date(), e = new Date(d);
            var now = Math.floor((e - d.setHours(0,0,0,0)) / 60000);
            var nowData = d.getFullYear() + "_" + ((d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1) ) + "_" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate() );
            // Per essere in onda deve essere giusta sia l'ora che la data.
            var inOnda = (nowData == data) && (prg.inizio <= now && prg.fine > now);
            chBody.append('<div class="prg' + (inOnda ? ' inonda' : '') + '">' + prgPrev + prgMore + '</div>');
        }
        channel.append(chHeader).append(chBody);
        $("#inner-container").append(channel);
    }
    
    $(".prg").unbind().click(function() {
        $(this).find(".prg-more").toggle("medium");
    });
    
    $("#list #channels img.ch-logo").unbind().click(function() {
        if ($("#inner-container").find('.ch[data-ch="' + $(this).attr("data-ch") + '"] .prg.inonda').length > 0)
        {
            $("#inner-container").scrollTo('.ch[data-ch="' + $(this).attr("data-ch") + '"] .prg.inonda');
        }
        else
        {
            $("#inner-container").scrollTo('.ch-header[data-ch="' + $(this).attr("data-ch") + '"]');
        }
    });
});
