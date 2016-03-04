// Qui  vengono salvate le info di tutti i programmi.
var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: ""};

$(document).ready(function() {

// Adattamento della grafica allo schermo.
$("#wall").height(window.innerHeight - $("#date").height());

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
        // Se c'è almeno un programma...
        $("#wall #noPrograms").remove();
        
        $("#wall .hour-divider").each(function() {
            $(this).append('<span>' + $(this).attr("data-ora") + '</span>');
        });
        $("#wall #channels").append('<img class="ch-logo card" src="img/' + ch + '_100.jpg"> alt="' + ch + ' logo"');
        $("#wall .hour").append('<div class="ch" data-ch="' + ch + '"></div>');
        
        allChannelsData[ch] = chData;
        for (var i = 0; i < chData.length; i = i + 1)
        {
            var prg = chData[i];
            
            // Se il programma dura troppo poco l'immagine viene nascosta per fare spazio al testo.
            var divImg = divImg = $('<div class="prg-img"></div>').append('<img alt="' + prg.titolo + '" src="' + prg.immagine + '" ' + ((prg.durata * em_min) < 10 ? "hidden" : "") + '>');
            
            var titolo = '<span class="titolo">' + prg.titolo + '</span>';
            
            var genere = "";
            if(prg.prettygenere != "")
            {
                genere = '<span class="genere">' + prg.prettygenere + '</span>';
            }
            
            var inizio = '<span class="inizio">' + minutiToOra(prg.inizio) + '</span>';
            var divContent = $('<div class="prg-content"></div>').append(titolo).append("<br>").append(genere).append("<br>").append(inizio);
            var prgDiv = $('<div data-n="' + i + '" class="prg card z-depth-3" style="min-height:' + prg.durata * em_min + 'em"></div>').append(divImg).append(divContent);
            $('.hour[data-start="' + Math.floor(prg.inizio / 60) * 60 + '"] .ch[data-ch="' + ch + '"]').append(prgDiv);
            
        }
    }
});

$(".hour").each(function() {
    // Rimuovi tutte le ore che non contengono programmazione.
    $allChildren = $(this).children();
    $allEmptyChildren = $allChildren.filter(':empty');
    if ($allChildren.length == $allEmptyChildren.length)
    {
        $(this).prev().remove();
        $(this).remove();
    }
});

$(".prg").click(function() {
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
    if (prog.link != "")
    {
        $("#modal-link").show();
        $("#modal-link").attr("href", prog.link);
    }
    else
    {
        $("#modal-link").hide();
        $("#modal-link").attr("href", "");
    }
    
    if (prog.linkRAITV != "")
    {
        $("#modal-linkRAITV").show();
        $("#modal-linkRAITV").attr("href", prog.linkRAITV);
    }
    else
    {
        $("#modal-linkRAITV").hide();
        $("#modal-linkRAITV").attr("href", "");
    }
    $("#modalDetails").openModal();
});

$("#preloader").remove();
$("main").show();
});
