<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Programmazione RAI</title>
    <meta name="author" content="Giorgio Bonvicini">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link type="text/css" rel="stylesheet" href="main.css">
    <link type="text/css" rel="stylesheet" href="wall.css">

    <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="getPrograms.js"></script>
</head>
<body>

<main>

<!-- Modalità Wall -->
<div id="date">
<?php
    for ($i = 0; $i < 7; $i = $i + 1)
    {
        $timestamp = time() + $i * 24 * 3600;
        echo '<div class="data card green"><a data-timestamp="' . $timestamp . '" href="?data=' . $timestamp . '">' . date("Y-m-d", $timestamp) . '</a></div>' . "\n";
    }
?>
</div>

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
<div id="wall-container" style="display: none">
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

/*
 * Filtri
 *
 * Specificando opportuni parametri GET è possibie filtrare i programmi visualizzati in base a:
 *  titolo (il testo deve essere contenuto nel titolo)
 *  genere/macrogenere (corrispondenza esatta)
 *  descrizione(OK/NO) (il testo (non) deve essere contenuto nella descrizione)
 */

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
</script>

<script src="wall.js"></script>

</body>
</html>
