$(document).ready(function() {

// Adattamento della grafica allo schermo.
$("#wall-container").height(window.innerHeight - $("#wall-date").height());

// Qui  vengono salvate le info di tutti i programmi.
var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: ""};

var em_min = 0.7; // Ogni minuto di trasmissione corrisponde a 0.7 em di altezza per il programma.
/*
 * Per ogni canale viene aggiunto:
 *  il logo
 *  le ore nelle divisioni fra ore
 *  i programmi nelle ore corrispondenti
 */
for (ch of myChannels)
{
    $(".wall-hour-divider").each(function() {
        $(this).append('<span>' + $(this).attr("data-ora") + '</span>');
    });
    $("#wall-container #channels").append('<img class="wall-ch-logo card" src="img/' + ch + '_100.jpg">');
    $(".wall-hour").append('<div class="wall-ch" data-ch="' + ch + '"></div>');
    var chData = getChannelData(ch, data, filtri);
    allChannelsData[ch] = chData;
    for (var i = 0; i < chData.length; i = i + 1)
    {
        var prg = chData[i];
        
        // Se il programma dura troppo poco l'immagine viene nascosta per fare spaizo al testo.
        var divImg = divImg = $('<div class="wall-prg-img"></div>').append('<img src="' + prg.immagine + '" ' + ((prg.durata * em_min) < 10 ? "hidden" : "") + '>');
        
        // Se il link non esiste la variabile è 'undefined'.
        var link = (typeof prg.link === 'undefined') ? "" :prg.link.replace("http://", "");
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
}

$(".wall-hour").each(function() {
    // Rimuovi tutte le ore che non contengono programmazione.
    $allChildren = $(this).children();
    $allEmptyChildren = $allChildren.filter(':empty');
    if ($allChildren.length == $allEmptyChildren.length)
    {
        $(this).prev().remove();
        $(this).remove();
    }
});

$(".wall-prg").click(function() {
    channelNames = {
        RaiUno: "Rai Uno",
        RaiDue: "Rai Due",
        RaiTre: "Rai Tre",
        Rai4: "Rai Quattro",
        Extra: "Rai Cinque"
    };
    
    var channel = $(this).parent().attr("data-ch");
    var n = $(this).attr("data-n");
    var prog = allChannelsData[channel][n];
    $("#modal-ch").html(channelNames[channel]);
    $("#modal-titolo").html(prog.titolo);    
    $("#modal-genere").html(prog.prettygenere);
    $("#modal-inizio").html(minutiToOra(prog.inizio));
    $("#modal-descrizione").html(prog.descrizione);
    $("#modal-img").attr("src", prog.immagine);
    $("#modalDetails").openModal();
});

$("#preloader").removeClass("active");
$("#wall-container").show();

});
