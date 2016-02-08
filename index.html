<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Programmazione RAI</title>
    <meta name="author" content="Giorgio Bonvicini">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link type="text/css" rel="stylesheet" href="wallList.css">

    <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
</head>
<body>

<script>
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
function getChannelData(ch, data)
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
                    
                    // Aggiungi il nuovo programma.
                    channelData.push(prg);
                });
            },
        async: false
    });
    return channelData;
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
</script>

<main>

<!-- Modalità Wall -->
<div id="wall-date">
<?php
    for ($i = 0; $i < 7; $i = $i + 1)
    {
        $timestamp = time() + $i * 24 * 3600;
        echo '<div class="wall-data card green"><a data-timestamp="' . $timestamp . '" href="?data=' . $timestamp . '">' . date("Y-m-d", $timestamp) . '</a></div>' . "\n";
    }
?>
</div>
<div id="wall-container">
    <div id="channels">
        
    </div>
    <div class="wall-hour-divider" data-ora="06:00"></div>
    <div class="wall-hour" data-start="360"></div>
    <div class="wall-hour-divider" data-ora="07:00"></div>
    <div class="wall-hour" data-start="420"></div>
    <div class="wall-hour-divider" data-ora="08:00"></div>
    <div class="wall-hour" data-start="480"></div>
    <div class="wall-hour-divider" data-ora="09:00"></div>
    <div class="wall-hour" data-start="540"></div>
    <div class="wall-hour-divider" data-ora="10:00"></div>
    <div class="wall-hour" data-start="600"></div>
    <div class="wall-hour-divider" data-ora="11:00"></div>
    <div class="wall-hour" data-start="660"></div>
    <div class="wall-hour-divider" data-ora="12:00"></div>
    <div class="wall-hour" data-start="720"></div>
    <div class="wall-hour-divider" data-ora="13:00"></div>
    <div class="wall-hour" data-start="780"></div>
    <div class="wall-hour-divider" data-ora="14:00"></div>
    <div class="wall-hour" data-start="840"></div>
    <div class="wall-hour-divider" data-ora="15:00"></div>
    <div class="wall-hour" data-start="900"></div>
    <div class="wall-hour-divider" data-ora="16:00"></div>
    <div class="wall-hour" data-start="960"></div>
    <div class="wall-hour-divider" data-ora="17:00"></div>
    <div class="wall-hour" data-start="1020"></div>
    <div class="wall-hour-divider" data-ora="18:00"></div>
    <div class="wall-hour" data-start="1080"></div>
    <div class="wall-hour-divider" data-ora="19:00"></div>
    <div class="wall-hour" data-start="1140"></div>
    <div class="wall-hour-divider" data-ora="20:00"></div>
    <div class="wall-hour" data-start="1200"></div>
    <div class="wall-hour-divider" data-ora="21:00"></div>
    <div class="wall-hour" data-start="1260"></div>
    <div class="wall-hour-divider" data-ora="22:00"></div>
    <div class="wall-hour" data-start="1320"></div>
    <div class="wall-hour-divider" data-ora="23:00"></div>
    <div class="wall-hour" data-start="1380"></div>
    <div class="wall-hour-divider" data-ora="00:00"></div>
    <div class="wall-hour" data-start="0"></div>
    <div class="wall-hour-divider" data-ora="01:00"></div>
    <div class="wall-hour" data-start="60"></div>
    <div class="wall-hour-divider" data-ora="02:00"></div>
    <div class="wall-hour" data-start="120"></div>
    <div class="wall-hour-divider" data-ora="03:00"></div>
    <div class="wall-hour" data-start="180"></div>
    <div class="wall-hour-divider" data-ora="04:00"></div>
    <div class="wall-hour" data-start="240"></div>
    <div class="wall-hour-divider" data-ora="05:00"></div>
    <div class="wall-hour" data-start="300"></div>
</div>

</main>

<!-- Popup di approfondimento con i dettagli di un programma. -->
<div id="modalDetails" class="modal modal-fixed-footer">
    <div class="modal-content">
        <h4><span id="modal-ch"></span> - <span id="modal-titolo"></span></h4>
        <span id="modal-genere"></span>
        <span id="modal-inizio"></span>
        <br><br>
        <img id="modal-img"><p id="modal-descrizione"></p>
    </div>
    <div class="modal-footer">
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Chiudi</a>
    </div>
</div>

<script>

$("#wall-container").height(window.innerHeight);

var data = "<?php
// Imposta la data attuale in base al parametro "data" nell'URL.
if (! isset($_GET['data']))
{
    $_GET['data'] = time();
}
else if (! is_numeric($_GET['data']))
{
    $_GET['data'] = time();
}
else if ($_GET['data'] < time())
{
    $_GET['data'] = time();
}

$data = date("Y_m_d", $_GET['data']);

echo $data;
?>";
// Data sottoforma di timestamp UNIX;
var timestamp = <?= $_GET['data'];?>;

var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: ""};

var em_min = 0.7; // Ogni minuto di trasmissione corrisponde a 0.7 em di altezza.
var channels = ["RaiUno", "RaiDue", "RaiTre", "Rai4", "Extra"];
/*
 * Per ogni canale viene aggiunto:
 *  il logo
 *  le ore nelle divisioni fra ore
 *  i programmi nelle ore corrispondenti
 */
for (ch of channels)
{
    $(".wall-hour-divider").each(function() {
        $(this).append('<span>' + $(this).attr("data-ora") + '</span>');
    });
    $("#wall-container #channels").append('<img class="wall-ch-logo card" src="img/' + ch + '_100.jpg">');
    $(".wall-hour").append('<div class="wall-ch" data-ch="' + ch + '"></div>');
    var chData = getChannelData(ch, data);
    allChannelsData[ch] = chData;
    for (var i = 1; i < chData.length; i = i + 1)
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
</script>

</body>
</html>
