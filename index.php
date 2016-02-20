<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Programmazione RAI</title>
    <meta name="author" content="Giorgio Bonvicini">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link type="text/css" rel="stylesheet" href="common.css">
    <link type="text/css" rel="stylesheet" href="wall/wall.css">
    <link type="text/css" rel="stylesheet" href="list/list.css">

    <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="common.js"></script>
    <script src="functions.js"></script>
</head>
<body>

<?php
$mode = ($_GET['mode'] == "wall" ? "wall" : "list");
?>

<div id="preloader-container">
    <div id="preloader" class="preloader-wrapper big active">
        <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
                <div class="circle"></div>
            </div>
            <div class="gap-patch">
                <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
                <div class="circle"></div>
            </div>
        </div>
    </div>
</div>

<?php
include_once("searchSidebar.php");
?>

<main style="display: none">

<div class="container">

<h3>My RAI</h3>
<h5 id="dataAttuale">Programmazione per la giornata del </h5>
<button class="btn waves-effect waves-light" id="btnMostra">Ricerca</button>
<p>NB:<br>
 - Non inserire caratteri che non siano alfanumerici, punti, virgole o -<br>
 - Lascia vuoto un campo per ignorare il filtro corrispondente</p>

<div>
Se vuoi puoi tornare ad aprire questo filtro di ricerca specifico salvando nei preferiti questo link:<br><br>
<a id="permaLink"></a>
<script>
$("#permaLink").attr("href", location.href).text(location.href);
</script>
</div>

</div>


<div id="date">
<?php
    // Genera 7 pulsanti: uno per ogni giorno da oggi a settimana prossima.
    for ($i = 0; $i < 7; $i = $i + 1)
    {
        $timestamp = time() + $i * 24 * 3600;
        echo '<div class="data card green"><a data-timestamp="' . $timestamp . '" href="?mode=' . $mode . '&data=' . $timestamp . '">' . date("d-m-Y", $timestamp) . '</a></div>' . "\n";
    }
?>
</div>

<?php

if ($mode == "wall")
{
// Modalità WALL
?>

<div id="wall">
    <div id="channels">
        
    </div>
    <div class="hour-divider" data-ora="06:00"></div>
    <div class="hour" data-start="360"></div>
    <div class="hour-divider" data-ora="07:00"></div>
    <div class="hour" data-start="420"></div>
    <div class="hour-divider" data-ora="08:00"></div>
    <div class="hour" data-start="480"></div>
    <div class="hour-divider" data-ora="09:00"></div>
    <div class="hour" data-start="540"></div>
    <div class="hour-divider" data-ora="10:00"></div>
    <div class="hour" data-start="600"></div>
    <div class="hour-divider" data-ora="11:00"></div>
    <div class="hour" data-start="660"></div>
    <div class="hour-divider" data-ora="12:00"></div>
    <div class="hour" data-start="720"></div>
    <div class="hour-divider" data-ora="13:00"></div>
    <div class="hour" data-start="780"></div>
    <div class="hour-divider" data-ora="14:00"></div>
    <div class="hour" data-start="840"></div>
    <div class="hour-divider" data-ora="15:00"></div>
    <div class="hour" data-start="900"></div>
    <div class="hour-divider" data-ora="16:00"></div>
    <div class="hour" data-start="960"></div>
    <div class="hour-divider" data-ora="17:00"></div>
    <div class="hour" data-start="1020"></div>
    <div class="hour-divider" data-ora="18:00"></div>
    <div class="hour" data-start="1080"></div>
    <div class="hour-divider" data-ora="19:00"></div>
    <div class="hour" data-start="1140"></div>
    <div class="hour-divider" data-ora="20:00"></div>
    <div class="hour" data-start="1200"></div>
    <div class="hour-divider" data-ora="21:00"></div>
    <div class="hour" data-start="1260"></div>
    <div class="hour-divider" data-ora="22:00"></div>
    <div class="hour" data-start="1320"></div>
    <div class="hour-divider" data-ora="23:00"></div>
    <div class="hour" data-start="1380"></div>
    <div class="hour-divider" data-ora="00:00"></div>
    <div class="hour" data-start="0"></div>
    <div class="hour-divider" data-ora="01:00"></div>
    <div class="hour" data-start="60"></div>
    <div class="hour-divider" data-ora="02:00"></div>
    <div class="hour" data-start="120"></div>
    <div class="hour-divider" data-ora="03:00"></div>
    <div class="hour" data-start="180"></div>
    <div class="hour-divider" data-ora="04:00"></div>
    <div class="hour" data-start="240"></div>
    <div class="hour-divider" data-ora="05:00"></div>
    <div class="hour" data-start="300"></div>
    <div id="noPrograms">
        <h5>Sembra che non ci siano programmi corrispondenti a questa ricerca...</h5>
    </div>
</div>
<?php
}
// Fine modalità WALL
else
{
// Modalità LIST
?>


<div id="list">
    <div id="channels">
    </div>
    <div id="inner-container">
    <div id="noPrograms">
        <h5>Sembra che non ci siano programmi corrispondenti a questa ricerca...</h5>
    </div>
    </div>
</div>



<?php
}
// Fine modalità LIST
?>
</main>

<!-- Popup di approfondimento con i dettagli di un programma (Utilizzato nella modalità WALL. -->
<div id="modalDetails" class="modal modal-fixed-footer">
    <div class="modal-content">
        <h4><span id="modal-ch"></span> - <span id="modal-titolo"></span></h4>
        <span id="modal-genere"></span>
        <span id="modal-inizio"></span>
        <br><br>
        <img id="modal-img"><p id="modal-descrizione"></p>
       <a id="modal-link" href="">Pagina dedicata</a>&nbsp;&nbsp;&nbsp;<a id="modal-linkRAITV" href="">Episodi registrati</a>
    </div>
    <div class="modal-footer">
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Chiudi</a>
    </div>
</div>

<script>
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

$("#dataAttuale").text("Programmazione per la gioranta del " + data.replace(new RegExp("_", "g"), "-"));

// Data sottoforma di timestamp UNIX;
var timestamp = <?= $_GET['data'];?>;
timestamp = timestamp - (timestamp % (24*60*60));

/*
 * Filtri
 *
 * Specificando opportuni parametri GET è possibie filtrare i programmi visualizzati in base a:
 *  canale di trasmissione
 *  titolo (il testo deve essere contenuto nel titolo)
 *  genere/macrogenere (corrispondenza esatta)
 *  descrizione(OK/NO) (il testo (non) deve essere contenuto nella descrizione)
 */

// Canali da mostrare.
var myChannels = [<?php
if (! isset ($_GET['channels']))
{
    $_GET['channels'] = "RaiUno,RaiDue,RaiTre,Rai4,Extra";
}
else if ($_GET['channels'] == "")
{
    $_GET['channels'] = "RaiUno,RaiDue,RaiTre,Rai4,Extra";
}
$channels = split(",", $_GET['channels']);
$chOK = array("RaiUno", "RaiDue", "RaiTre", "Rai4", "Extra");
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

var filtri = {
genere: filtroGenere,
macrogenere: filtroMacrogenere,
titolo: filtroTitolo,
descrizioneOK: filtroDescrizioneOK,
descrizioneNO: filtroDescrizioneNO
};


// Popola il form di ricerca con i valori dei filtri

// Modalità WALL/LIST.
$("#chkModeList").prop("checked", <?php
    if ($mode == "wall")
    {
        echo "false";
    }
    else
    {
        echo "true";
    }
?>);

// Canali attivi.
myChannels.forEach(function(ch) {
    $("#filtro-ch-" + ch).prop("checked", true);
});

// Data in cui cercare.
$("select#filtroData").find('option[value="' + timestamp + '"]').prop("selected", true);
$("select#filtroData").material_select();

$("#filtroTitolo").val(filtroTitolo);
$("#filtroDescrNO").val(filtroDescrizioneNO);
$("#filtroDescrOK").val(filtroDescrizioneOK);

// Macrogeneri selezionati.
filtroMacrogenere.split(",").forEach(function(macGen) {
    $('input[type="checkbox"][name="filtroMacrogen"][data="' + macGen + '"]').prop("checked", true);
});


// Generi selezionati.
filtroGenere.split(",").forEach(function(gen) {
    $('input[type="checkbox"][name="filtroGen"][data="' + gen + '"]').prop("checked", true);
});
</script>

<?php
if ($mode == "wall")
{
    echo '<script src="wall/wall.js"></script>';
}
else 
{
    echo '<script src="list/list.js"></script>';
}
?>
</body>
</html>
