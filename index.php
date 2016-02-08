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
    <script src="getPrograms.js"></script>
</head>
<body>

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

$("#wall-container").height(window.innerHeight - $("#wall-date").height());

// Imposta la data attuale in base al parametro "data" nell'URL.
var data = "<?php
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
echo date("Y_m_d", $_GET['data']);
?>";

// Data sottoforma di timestamp UNIX;
var timestamp = <?= $_GET['data'];?>;

// Canali da mostrare.
var myChannels = [<?php
if (! isset ($_GET['channels']))
{
    $_GET['channels'] = "RaiUno,RaiDue,RaiTre,Rai4,Extra";
}
$channels = split(",", $_GET['channels']);
$chOK = ["RaiUno", "RaiDue", "RaiTre", "Rai4", "Extra"];
foreach ($channels as $ch)
{
    if (in_array($ch, $chOK))
    {
        echo '"' . $ch . '",';
    }
}
?>];

// Filtro per genere.
var filtroGenere = "<?php
if (! isset ($_GET['genere']))
{
    $_GET['genere'] = "";
}
else if (! preg_match("/^[0-9a-zA-Zàèéìòù.,-]*$/", $_GET['genere']))
{
    $_GET['genere'] = "";
}
echo $_GET['genere'];
?>";

// Filtro per macrogenere.
var filtroMacrogenere = "<?php
if (! isset ($_GET['macrogenere']))
{
    $_GET['macrogenere'] = "";
}
else if (! preg_match("/^[0-9a-zA-Zàèéìòù.,-]*$/", $_GET['macrogenere']))
{
    $_GET['macrogenere'] = "";
}
echo $_GET['macrogenere'];
?>";

// Filtro per titolo.
var filtroTitolo = "<?php
if (! isset ($_GET['titolo']))
{
    $_GET['titolo'] = "";
}
else if (! preg_match("/^[0-9a-zA-Zàèéìòù.,-]*$/", $_GET['titolo']))
{
    $_GET['titolo'] = "";
}
echo $_GET['titolo'];
?>";

// Filtro per descrizione (testo che DEVE essere presente).
var filtroDescrizioneOK = "<?php
if (! isset ($_GET['descrOK']))
{
    $_GET['descrOK'] = "";
}
else if (! preg_match("/^[0-9a-zA-Zàèéìòù.,-]*$/", $_GET['descrOK']))
{
    $_GET['descrOK'] = "";
}
echo $_GET['descrOK'];
?>";

// Filtro per descrizione (testo che NON deve essere presente).
var filtroDescrizioneNO = "<?php
if (! isset ($_GET['descrNO']))
{
    $_GET['descrNO'] = "";
}
else if (! preg_match("/^[0-9a-zA-Zàèéìòù.,-]*$/", $_GET['descrNO']))
{
    $_GET['descrNO'] = "";
}
echo $_GET['descrNO'];
?>";

var filtri = [
filtroGenere,
filtroMacrogenere,
filtroTitolo,
filtroDescrizioneOK,
filtroDescrizioneNO
];

var allChannelsData = {RaiUno: "", RaiDue: "", RaiTre: "", Rai4: "", Extra: ""};

var em_min = 0.7; // Ogni minuto di trasmissione corrisponde a 0.7 em di altezza.
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
</script>

</body>
</html>
