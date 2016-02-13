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
    <link type="text/css" rel="stylesheet" href="list.css">

    <script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="main.js"></script>
    <script src="getPrograms.js"></script>
</head>
<body>

<?php
$mode = ($_GET['mode'] == "list" ? "list" : "wall");
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

<main style="display: none">

<div class="container">

<h3>My RAI</h3>
<p>Puoi effettuare una ricerca di uno specifico canale cliccando qui:</p>
<button class="btn waves-effect waves-light" onclick="$('#ricerca-container').toggle('medium');">Mostra <i class="mdi-action-search small right"></i></button>
<p>NB:<br>
 - Non inserire caratteri che non siano alfanumerici, punti, virgole o -<br>
 - Lascia vuoto un campo per ignorare il filtro corrispondente</p>
<div id="ricerca-container" style="display: none">
    <div class="row">
        <p>Cerca dei programmi che:</p>
        <div class="col s12">
            <p> - siano in onda su questi canali</p>
            <div class="filtro-container">
                <p><input type="checkbox" name="filtroCanali" data="RaiUno" id="filtro-ch-RaiUno">
                <label for="filtro-ch-RaiUno">Rai 1</label></p>
                <p><input type="checkbox" name="filtroCanali" data="RaiDue" id="filtro-ch-RaiDue">
                <label for="filtro-ch-RaiDue">Rai 2</label></p>
                <p><input type="checkbox" name="filtroCanali" data="RaiTre" id="filtro-ch-RaiTre">
                <label for="filtro-ch-RaiTre">Rai 3</label></p>
                <p><input type="checkbox" name="filtroCanali" data="Rai4" id="filtro-ch-Rai4">
                <label for="filtro-ch-Rai4">Rai 4</label></p>
                <p><input type="checkbox" name="filtroCanali" data="Extra" id="filtro-ch-Extra">
                <label for="filtro-ch-Extra">Rai 5</label></p>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - siano in onda in questa data</p>
            <div class="input-field">
                <select id="filtroData">
                    <option value="" selected></option>
                    <?php
                    for ($i = 0; $i < 7; $i = $i + 1)
                    {
                        $timestamp = time() + $i * 24 * 3600;
                        echo '<option value="' . $timestamp . '">' . date("d-m-Y", $timestamp) . '</option>' . "\n";
                    }
                    ?>
                </select>
                <label>Scegli una data</label>
                <script>$('select').material_select();</script>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - contengano questo testo nel titolo</p>
            <div class="input-field">
                <input id="filtroTitolo" type="text" class="validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -">
                <label for="filtroTitolo">Titolo</label>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - contengano questo testo nella descrizione</p>
            <div class="input-field">
                <textarea id="filtroDescrOK" class="materialize-textarea validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -"></textarea>
                <label for="filtroDescrOK">Descrizione</label>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - non contengano questo testo nella descrizione</p>
            <div class="input-field">
                <textarea id="filtroDescrNO" class="materialize-textarea validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -"></textarea>
                <label for="filtroDescrNO">Descrizione</label>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - appartengano a uno di questi macrogeneri</p>
            <div class="filtro-container">
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen1" data="informazione">
                <label for="filtro-macGen1">Informazione</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen2" data="intrattenimento">
                <label for="filtro-macGen2">Intrattenimento</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen3" data="societa e diritti">
                <label for="filtro-macGen3">Societ&agrave; e diritti</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen4" data="musica">
                <label for="filtro-macGen4">Musica</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen5" data="cultura">
                <label for="filtro-macGen5">Cultura</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen6" data="bambini">
                <label for="filtro-macGen6">Bambini</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen7" data="fiction">
                <label for="filtro-macGen7">Fiction</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen8" data="istituzioni">
                <label for="filtro-macGen8">Istituzioni</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen9" data="sport">
                <label for="filtro-macGen9">Sport</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen10" data="scienza e natura">
                <label for="filtro-macGen10">Scienza e natura</label></p>
                <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen11" data="rubrichetg3">
                <label for="filtro-macGen11">Rubriche TG 3</label></p>
            </div>
        </div>
        <div class="col s12 m6">
            <p> - appartengano a uno di questi generi</p>
            <div class="filtro-container">
                <p><input type="checkbox" name="filtroGen" id="filtro-gen1" data="informazione">
                <label for="filtro-gen1">Informazione</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen2" data="meteo">
                <label for="filtro-gen2">Meteo</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen3" data="societa e diritti">
                <label for="filtro-gen3">Societ&agrave; e diritti</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen4" data="quiz">
                <label for="filtro-gen4">Quiz</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen5" data="intrattenimento">
                <label for="filtro-gen5">Intrattenimento</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen6" data="musica">
                <label for="filtro-gen6">Musica</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen7" data="talk show">
                <label for="filtro-gen7">Talk-show</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen8" data="documentari">
                <label for="filtro-gen8">Documentario</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen9" data="varieta">
                <label for="filtro-gen9">Variet&agrave;</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen10" data="bambini">
                <label for="filtro-gen10">Bambini</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen11" data="telefilm">
                <label for="filtro-gen11">Telefilm</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen12" data="tg">
                <label for="filtro-gen12">Telegiornale</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen13" data="istituzioni">
                <label for="filtro-gen13">Istituzioni</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen14" data="rubrica">
                <label for="filtro-gen14">Rubrica</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen15" data="fiction">
                <label for="filtro-gen15">Fiction</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen16" data="film">
                <label for="filtro-gen16">Film</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen17" data="rubrica tg">
                <label for="filtro-gen17">Rubrica TG</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen18" data="scienza e natura">
                <label for="filtro-gen18">Scienza e natura</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen19" data="azione">
                <label for="filtro-gen19">Azione</label></p>
                <p><input type="checkbox" name="filtroGen" id="filtro-gen20" data="classica">
                <label for="filtro-gen20">Classica</label></p>
            </div>
        </div>
    </div>
    <button id="cercaFiltri" class="btn waves-effect waves-light">Cerca <i class="mdi-action-search small right"></i></button>
</div>
</div>

<div id="date">
<?php
    for ($i = 0; $i < 7; $i = $i + 1)
    {
        $timestamp = time() + $i * 24 * 3600;
        echo '<div class="data card green"><a data-timestamp="' . $timestamp . '" href="?data=' . $timestamp . '">' . date("d-m-Y", $timestamp) . '</a></div>' . "\n";
    }
?>
</div>

<?php

if ($mode != "list")
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
// Modalità WALL
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

<!-- Popup di approfondimento con i dettagli di un programma. -->
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

var filtri = [
filtroGenere,
filtroMacrogenere,
filtroTitolo,
filtroDescrizioneOK,
filtroDescrizioneNO
];

</script>

<?php
if ($mode != "list")
{
    echo '<script src="wall.js"></script>';
}
else 
{
    echo '<script src="list.js"></script>';
}
?>
</body>
</html>
