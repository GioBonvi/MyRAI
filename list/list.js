// Adattamento della grafica allo schermo.
$("#list").css("height", window.innerHeight - $("#date").height() - 50);

// Qui  vengono salvate le info di tutti i programmi.
var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: "", Premium: "", RaiGulp: ""};

channelNames = {
    RaiUno: "Rai Uno",
    RaiDue: "Rai Due",
    RaiTre: "Rai Tre",
    Rai4: "Rai Quattro",
    Extra: "Rai Cinque",
    Premium: "Rai Premium",
    RaiGulp: "Rai Gulp",
    RaiMovie: "Rai Movie",
    Yoyo: "Rai YoYo",
    RaiEDU2: "Rai Storia",
    RaiEducational: "Rai Scuola",
    RaiNews: "Rai News 24",
    RaiSport1: "Rai Sport 1",
    RaiSport2: "Rai Sport 2"
};

$("#frmRicerca").submit(function(e)
{
    e.preventDefault();
    var myFiltroTitolo = $("#filtroTitolo").val();
    var myFiltroDescrOK = $("#filtroDescrOK").val();
    var myFiltroDescrNO = $("#filtroDescrNO").val();
    
    var channels = "";
    $('input[name="filtroCanali"]:checked').each(function()
    {
        channels = channels + $(this).attr("data") + ",";
    });
    
    var myFiltroGen = "";
    $('input[name="filtroGen"]:checked').each(function()
    {
        myFiltroGen = myFiltroGen + $(this).attr("data") + ",";
    });
    
    var myFiltroMacGen = "";
    $('input[name="filtroMacrogen"]:checked').each(function()
    {
        myFiltroMacGen = myFiltroMacGen + $(this).attr("data") + ",";
    });
    
    var myFiltroData = $('select#filtroData').val();
    var myFiltroOra = $('select#filtroOra').val();
    
    var dataURL = "?" +
                    "channels=" + channels +
                    "&data=" + myFiltroData +
                    "&titolo=" + myFiltroTitolo +
                    "&macrogenere=" + myFiltroMacGen +
                    "&genere=" + myFiltroGen +
                    "&descrOK=" + myFiltroDescrOK +
                    "&descrNO=" + myFiltroDescrNO +
                    "&ora=" + myFiltroOra;
                    
    window.location = dataURL;
});

$(".data").click(function() {
    var myFiltroTitolo = $("#filtroTitolo").val();
    var myFiltroDescrOK = $("#filtroDescrOK").val();
    var myFiltroDescrNO = $("#filtroDescrNO").val();
    
    var channels = "";
    $('input[name="filtroCanali"]:checked').each(function()
    {
        channels = channels + $(this).attr("data") + ",";
    });
    
    var myFiltroGen = "";
    $('input[name="filtroGen"]:checked').each(function()
    {
        myFiltroGen = myFiltroGen + $(this).attr("data") + ",";
    });
    
    var myFiltroMacGen = "";
    $('input[name="filtroMacrogen"]:checked').each(function()
    {
        myFiltroMacGen = myFiltroMacGen + $(this).attr("data") + ",";
    });
    
    var myFiltroOra = $('select#filtroOra').val();
    
    var dataURL = "?" +
                    "channels=" + channels +
                    "&data=" + $(this).children().first().attr("data-timestamp") +
                    "&titolo=" + myFiltroTitolo +
                    "&macrogenere=" + myFiltroMacGen +
                    "&genere=" + myFiltroGen +
                    "&descrOK=" + myFiltroDescrOK +
                    "&descrNO=" + myFiltroDescrNO +
                    "&ora=" + myFiltroOra;
    console.log(dataURL);
    window.location = dataURL;
});

var channelsPromises = [];

myChannels.forEach(function(ch)
{
    channelsPromises.push(getChannelData(ch, data, filtri));
    
});

// Questo permette di riordinare correttamente i canali (la funzione getChannelData() è asincorna)
$.when.apply(null, channelsPromises)
    .fail(error => {
        console.log(error);
        $("#preloader").remove();
        $("#noPrograms").html("<h5>Sembra ci sia qualcosa che non va...<br>Maggior dettagli nel log</h5>");
        $("#noPrograms").show();
    })
    .done(function()
{
    $("#preloader").remove();
    $("#noPrograms").show();
    channelsPromises.forEach(function (promise)
    {
        promise.done(function(data) {
            var ch = data.chName;
            var chData = data.chProgs;
            // A causa dei filtri alcuni canali possono risultare vuoti (senza programmi)
            if (chData.length > 0)
            {
                // Se esiste almeno un programma elimina l'avviso "nessun programma"
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
                                           
                    // Minuti passati dalla mezzanotte.
                    var d = new Date(), e = new Date(d);
                    var now = Math.floor((e - d.setHours(0,0,0,0)) / 60000);
                    var nowData = d.getFullYear() + "_" + ((d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1) ) + "_" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate() );
                    // Per essere in onda deve essere giusta sia l'ora che la data.
                    var inOnda = (nowData == window.data) && (prg.inizio <= now && prg.fine > now);
                    chBody.append('<div data-n="' + i + '" class="prg' + (inOnda ? ' inonda' : '') + '">' + prgPrev + '</div>');
                }
                channel.append(chHeader).append(chBody);
                $("#inner-container").append(channel);
                
                // I dettagli vengono aggiunti alla pagina solo quando sono richiesti: prima sono presenti solo come JSON.
                $(".prg").unbind().click(function()
                {
                    if ($(this).find(".prg-more").length != 0)
                    {
                        // Nascondi i dettagli se sono già visibili.
                        $(this).find(".prg-more").hide("medium", function()
                        {
                            $(this).remove()
                        });
                    }
                    else
                    {
                        // Mostra i dettagli di un programma al click sul programma stesso.
                        var prg = allChannelsData[$(this).parent().attr("data-ch")][$(this).attr("data-n")];
                        var img = '<img align="left" src="' + prg.immagine + '" alt="' + prg.titolo + '">';
                        var link = (prg.link != "" ? '<a href="' + prg.link + '">Pagina dedicata</a>' : "");
                        var linkRAITV = (prg.linkRAITV != "" ? '<a href="' + prg.linkRAITV + '">Episodi registrati</a>' : "");
                        var descr = '<div class="descrizione">' + prg.descrizione + '<br>' +  link + '&nbsp;&nbsp;&nbsp;' + linkRAITV + ' </div>';
                        var prgMore = '<div class="prg-more" style="display: none">' + img + descr + '</div>';
                        $(this).find(".prg-preview").each(function() {
                            $(this).after(prgMore);
                        });
                        $(this).find(".prg-more").each(function() {
                            $(this).show("medium");
                        });
                    }
                });

                // Cliccando su un canale nella lista in alto si viene portati automaticamente...
                $("#list #channels img.ch-logo").unbind().click(function() {
                    if ($("#inner-container").find('.ch[data-ch="' + $(this).attr("data-ch") + '"] .prg.inonda').length > 0)
                    {
                        // Al programma attualmente in onda su quel canale (se disponibile).
                        $("#inner-container").scrollTo('.ch[data-ch="' + $(this).attr("data-ch") + '"] .prg.inonda');
                    }
                    else
                    {
                        // All'intestazione di quel canale in caso non ci sia nessun programma in onda attualmente.
                        $("#inner-container").scrollTo('.ch-header[data-ch="' + $(this).attr("data-ch") + '"]');
                    }
                });
            }
        });
    });
    
});


            
            
