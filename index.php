<?php
date_default_timezone_set('Europe/Rome');
if (isset($_GET['time'])) {
  if ($_GET['time'] === 'oggi') {
    $timestamp = strtotime(date("Y-m-d") . "0:0:0");
  } elseif ($_GET['time'] === 'domani') {
    $timestamp = strtotime(date("Y-m-d", strtotime('tomorrow')) . "0:0:0");
  } elseif (is_numeric($_GET['time'] ) && (int) $_GET['time'] == $_GET['time']) {
    $timestamp = $_GET['time'];
  } else {
    $timestamp = strtotime(date("Y-m-d") . "0:0:0");
  }
} else {
  $timestamp = strtotime(date("Y-m-d") . "0:0:0");
}
$timestamp *= 1000;
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Programmazione RAI</title>
    <meta name="author" content="Giorgio Bonvicini">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="http://fonts.googleapis.com/icon?family=Material+Icons">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link type="text/css" rel="stylesheet" href="stackGUI.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <script src="Utils.js"></script>
    <script src="Filtro.js"></script>
    <script src="Programma.js"></script>
    <script src="Canale.js"></script>
    <script src="LoaderCanale.js"></script>
    <script src="Palinsesto.js"></script>
    <script src="GUI.js"></script>
    <script src="main.js"></script>
  </head>
  <body>
    <script>var timestamp = <?php echo $timestamp; ?>;</script>
    <ul id="ricerca-container" class="side-nav">
    <div id="frmFiltro">
      <h5>Ricerca</h5>
      <p>Non puoi cercare caratteri che non siano alfanumerici, punti, virgole o -</p>
      <p>Lascia vuoto un campo per ignorare il filtro corrispondente</p>
      <p><b>Canali:</b></p>
      <div class="filtro-container">
        <p><input type="checkbox" name="filtroCanali" data="RaiUno" id="filtro-ch-RaiUno" checked>
        <label for="filtro-ch-RaiUno">Rai 1</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiDue" id="filtro-ch-RaiDue" checked>
        <label for="filtro-ch-RaiDue">Rai 2</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiTre" id="filtro-ch-RaiTre" checked>
        <label for="filtro-ch-RaiTre">Rai 3</label></p>
        <p><input type="checkbox" name="filtroCanali" data="Rai4" id="filtro-ch-Rai4" checked>
        <label for="filtro-ch-Rai4">Rai 4</label></p>
        <p><input type="checkbox" name="filtroCanali" data="Extra" id="filtro-ch-Extra" checked>
        <label for="filtro-ch-Extra">Rai 5</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiMovie" id="filtro-ch-RaiMovie" checked>
        <label for="filtro-ch-RaiMovie">Rai Movie</label></p>
        <p><input type="checkbox" name="filtroCanali" data="Premium" id="filtro-ch-Premium" checked>
        <label for="filtro-ch-Premium">Rai Premium</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiGulp" id="filtro-ch-RaiGulp" checked>
        <label for="filtro-ch-RaiGulp">Rai Gulp</label></p>
        <p><input type="checkbox" name="filtroCanali" data="Yoyo" id="filtro-ch-Yoyo" checked>
        <label for="filtro-ch-Yoyo">Rai YoYo</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiEDU2" id="filtro-ch-RaiEDU2" checked>
        <label for="filtro-ch-RaiEDU2">Rai Storia</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiEducational" id="filtro-ch-RaiEducational" checked>
        <label for="filtro-ch-RaiEducational">Rai Scuola</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiNews" id="filtro-ch-RaiNews" checked>
        <label for="filtro-ch-RaiNews">Rai News 24</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiSport1" id="filtro-ch-RaiSport1" checked>
        <label for="filtro-ch-RaiSport1">Rai Sport 1</label></p>
        <p><input type="checkbox" name="filtroCanali" data="RaiSport2" id="filtro-ch-RaiSport2" checked>
        <label for="filtro-ch-RaiSport2">Rai Sport 2</label></p>
      </div>
      <p><b>Fascia oraria:</b></p>
      <div class="input-field">
        <select id="filtroFascia">
          <option value="tutto" selected>Qualisasi</option>
          <option value="notte">Notte (00-06)</option>
          <option value="mattina">Mattina (06-12)</option>
          <option value="pomeriggio">Pomeriggio (12-18)</option>
          <option value="sera">Sera (18-24)</option>
        </select>
        <label>Scegli una fascia oraria</label>
      </div>
      <p><b>Titolo che contenga:</b></p>
      <div class="input-field">
        <input id="filtroTitolo" type="text" class="validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -">
        <label for="filtroTitolo">Titolo</label>
      </div>
      <p><b>Descrizione che contenga:</b></p>
      <div class="input-field">
        <textarea id="filtroDescr" class="materialize-textarea validate" title="Solo caratteri alfanumerici, punti, virgole o -"></textarea>
        <label for="filtroDescr">Descrizione</label>
      </div>
      <p><b>Macrogeneri:</b></p>
      <div class="filtro-container">
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen0" data="" >
        <label for="filtro-macGen0">Nessun macrogenere</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen1" data="informazione" >
        <label for="filtro-macGen1">Informazione</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen2" data="intrattenimento" >
        <label for="filtro-macGen2">Intrattenimento</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen3" data="societa e diritti" >
        <label for="filtro-macGen3">Societ&agrave; e diritti</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen4" data="musica" >
        <label for="filtro-macGen4">Musica</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen5" data="cultura" >
        <label for="filtro-macGen5">Cultura</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen6" data="bambini" >
        <label for="filtro-macGen6">Bambini</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen7" data="fiction" >
        <label for="filtro-macGen7">Fiction</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen8" data="istituzioni" >
        <label for="filtro-macGen8">Istituzioni</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen9" data="sport" >
        <label for="filtro-macGen9">Sport</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen10" data="scienza e natura" >
        <label for="filtro-macGen10">Scienza e natura</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen11" data="rubrichetg3" >
        <label for="filtro-macGen11">Rubriche TG 3</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen12" data="junior" >
        <label for="filtro-macGen12">Junior</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen13" data="film" >
        <label for="filtro-macGen13">Film</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen14" data="documentari" >
        <label for="filtro-macGen14">Documentari</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen15" data="news" >
        <label for="filtro-macGen15">News</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen16" data="programmi tv" >
        <label for="filtro-macGen16">Programmi TV</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen17" data="serie" >
        <label for="filtro-macGen17">Serie</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen18" data="cinema" >
        <label for="filtro-macGen18">Cinema</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen19" data="religione" >
        <label for="filtro-macGen19">Religione</label></p>
        <p><input type="checkbox" name="filtroMacrogen" id="filtro-macGen20" data="viaggi e avventura" >
        <label for="filtro-macGen20">Viaggi e avventura</label></p>
      </div>
      <p><b>Generi:</b></p>
      <div class="filtro-container">
        <p><input type="checkbox" name="filtroGen" id="filtro-gen0" data="" >
        <label for="filtro-gen0">Nessun genere</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen1" data="informazione" >
        <label for="filtro-gen1">Informazione</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen2" data="meteo" >
        <label for="filtro-gen2">Meteo</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen3" data="societa e diritti" >
        <label for="filtro-gen3">Societ&agrave; e diritti</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen4" data="quiz" >
        <label for="filtro-gen4">Quiz</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen5" data="intrattenimento" >
        <label for="filtro-gen5">Intrattenimento</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen6" data="musica" >
        <label for="filtro-gen6">Musica</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen7" data="talk show" >
        <label for="filtro-gen7">Talk-show</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen8" data="documentari" >
        <label for="filtro-gen8">Documentario</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen9" data="varieta" >
        <label for="filtro-gen9">Variet&agrave;</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen10" data="bambini" >
        <label for="filtro-gen10">Bambini</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen11" data="telefilm" >
        <label for="filtro-gen11">Telefilm</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen12" data="tg" >
        <label for="filtro-gen12">Telegiornale</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen13" data="istituzioni" >
        <label for="filtro-gen13">Istituzioni</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen14" data="rubrica" >
        <label for="filtro-gen14">Rubrica</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen15" data="fiction" >
        <label for="filtro-gen15">Fiction</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen16" data="film" >
        <label for="filtro-gen16">Film</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen17" data="rubrica tg" >
        <label for="filtro-gen17">Rubrica TG</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen18" data="scienza e natura" >
        <label for="filtro-gen18">Scienza e natura</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen19" data="azione" >
        <label for="filtro-gen19">Azione</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen20" data="classica" >
        <label for="filtro-gen20">Classica</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen21" data="cartoni" >
        <label for="filtro-gen21">Cartoni</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen22" data="junior" >
        <label for="filtro-gen22">Junior</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen23" data="thriller" >
        <label for="filtro-gen23">Thriller</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen24" data="western" >
        <label for="filtro-gen24">Western</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen25" data="drammatico" >
        <label for="filtro-gen25">Drammatico</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen26" data="commedia" >
        <label for="filtro-gen26">Commedia</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen27" data="arte" >
        <label for="filtro-gen27">Arte</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen28" data="news" >
        <label for="filtro-gen28">News</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen29" data="lirica" >
        <label for="filtro-gen29">Lirica</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen30" data="avventura" >
        <label for="filtro-gen30">Avventura</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen31" data="natura" >
        <label for="filtro-gen31">Natura</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen32" data="approfondimento" >
        <label for="filtro-gen32">Approfondimento</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen33" data="rubrichetg3" >
        <label for="filtro-gen33">Rubriche TG3</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen34" data="poliziesco" >
        <label for="filtro-gen34">Poliziesco</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen35" data="crime" >
        <label for="filtro-gen35">Crime</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen36" data="serie" >
        <label for="filtro-gen36">Serie</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen37" data="cinema" >
        <label for="filtro-gen37">Cinema</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen38" data="religione" >
        <label for="filtro-gen38">Religione</label></p>
        <p><input type="checkbox" name="filtroGen" id="filtro-gen39" data="viaggi e avventura" >
        <label for="filtro-gen39">Viaggi e avventura</label></p>
      </div>
      <br>
      <button class="btn waves-effect waves-light" id="btnSearch">Ricerca</button>
      <a id="resetRicerca">Reset ricerca</a>
    </div>
    <br>
    <br>
    <br>
    </ul>

    <div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
      <a id="showSidebar" data-activates="ricerca-container" class="btn-floating btn-large red">
        <i class="large material-icons">search</i>
      </a>
    </div>

    <main>
      <div class="container">
        <h3>My RAI</h3>
        <h5 id="dataAttuale">Programmazione per la giornata del <?php echo date("Y-m-d", $timestamp/1000);?></h5>
      </div>
      <div id="date">
      <?php
          // Genera 7 pulsanti: uno per ogni giorno da oggi a settimana prossima.
          for ($i = 0; $i < 7; $i = $i + 1)
          {
              $timestamp = time() + $i * 24 * 3600;
              echo '<a href="?time=' . strtotime(date("Y-m-d", $timestamp) . "0:0:0") . '"><div class="data card green"><div>' . date("d-m-Y", $timestamp) . '</div></div></a>' . "\n";
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
  </body>
</html>
