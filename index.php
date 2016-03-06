<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Programmazione RAI</title>
    <meta name="author" content="Giorgio Bonvicini">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link type="text/css" rel="stylesheet" href="list/list.css">

    <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="functions.js"></script>
</head>
<body>

<?php
include("searchSidebar.php");
?>

<main>

<div class="container">

<h3>My RAI</h3>
<h5 id="dataAttuale">Programmazione per la giornata del </h5>

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
        echo '<div class="data card green"><div data-timestamp="' . $timestamp . '">' . date("d-m-Y", $timestamp) . '</div></div>' . "\n";
    }
?>
</div>

<div id="list">
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
    <div id="channels">
    </div>
    <div id="inner-container">
        <div id="noPrograms" hidden>
            <h5>Sembra che non ci siano programmi corrispondenti a questa ricerca...</h5>
        </div>
    </div>
</div>

</main>

<footer>
<p>Il codice sorgente di questo progetto &egrave; disponibile sotto licenza GPL v3 in <a href="https://github.com/GioBonvi/MyRAI">questa repository di GitHub</a>.</p>
</footer>

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
    $myData = time();
}
else if (! is_numeric($_GET['data']))
{
    if ($_GET['data'] == "Domani")
    {
        $myData = time() + 24 * 60 * 60;
    }
    else 
    {
        $myData = time();
    }
}
else if ($_GET['data'] < time())
{
    $myData = time();
}
else
{
    $myData = $_GET['data'];
}

echo date("Y_m_d", $myData);
?>";

$("#dataAttuale").text("Programmazione per la giornata del " + data.replace(new RegExp("_", "g"), "-"));

// Data sottoforma di timestamp UNIX;
var timestamp = <?= $myData;?>;
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
    $_GET['channels'] = "RaiUno,RaiDue,RaiTre,Rai4,Extra,RaiMovie,Premium,RaiGulp,Yoyo,RaiEDU2,RaiEducational,RaiNews,RaiSport1,RaiSport2";
}
else if ($_GET['channels'] == "")
{
    $_GET['channels'] = "RaiUno,RaiDue,RaiTre,Rai4,Extra,RaiMovie,Premium,RaiGulp,Yoyo,RaiEDU2,RaiEducational,RaiNews,RaiSport1,RaiSport2";
}
$channels = split(",", $_GET['channels']);
$chOK = array("RaiUno", "RaiDue", "RaiTre", "Rai4", "Extra", "RaiMovie", "Premium", "RaiGulp", "Yoyo", "RaiEDU2", "RaiEducational",
                "RaiNews", "RaiSport1", "RaiSport2");
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

// Filtro della fascia oraria.
var filtroFasciaOraria = "<?php
if (! isset ($_GET['ora']))
{
    $_GET['ora'] = "";
}
else if ($_GET['ora'] != "notte" &&
            $_GET['ora'] != "mattina" &&
            $_GET['ora'] != "pomeriggio" &&
            $_GET['ora'] != "sera")
{
    $_GET['ora'] = "";
}
echo $_GET['ora'];
?>";

var filtri = {
genere: filtroGenere,
macrogenere: filtroMacrogenere,
titolo: filtroTitolo,
descrizioneOK: filtroDescrizioneOK,
descrizioneNO: filtroDescrizioneNO,
fasciaOraria: filtroFasciaOraria
};


// Popola il form di ricerca con i valori dei filtri

// Canali attivi.
myChannels.forEach(function(ch) {
    $("#filtro-ch-" + ch).prop("checked", true);
});

// Data in cui cercare.
<?php
if($_GET['data'] == 'Oggi' || $_GET['data'] == 'Domani')
{
    echo '$("select#filtroData").find(\'option[value="' . $_GET['data'] . '"]\').prop("selected", true);';
}
else
{
    echo '$("select#filtroData").find(\'option[value="\' + timestamp + \'"]\').prop("selected", true);';
}
?>

$("select#filtroData").material_select();

// Ora in cui cercare.
<?php
if($_GET['ora'] == 'notte' || $_GET['ora'] == 'mattina' || $_GET['ora'] == 'pomeriggio' || $_GET['ora'] == 'sera')
{
    echo '$("select#filtroOra").find(\'option[value="' . $_GET['ora'] . '"]\').prop("selected", true);';
}
?>

$("select#filtroOra").material_select();

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

<script src="list/list.js"></script>
</body>
</html>
