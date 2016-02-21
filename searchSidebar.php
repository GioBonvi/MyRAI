<ul id="ricerca-container" class="side-nav">
<form id="frmRicerca">
    <div class="switch">
        <p>Modalit&agrave; di visualizzazione:</p>
        <label>
            Wall
            <input type="checkbox" id="chkModeList">
            <span class="lever"></span>
            List
        </label>
    </div>
    <h5>Ricerca</h5>
    <p>Non puoi cercare caratteri che non siano alfanumerici, punti, virgole o -</p>
    <p>Lascia vuoto un campo per ignorare il filtro corrispondente</p>
    <p><b>Canali:</b></p>
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
    <p><b>Data di trasmissione:</b></p>
    <div class="input-field">
        <select id="filtroData">
            <option value="Oggi" selected>Oggi</option>
            <option value="Domani">Domani</option>
            <?php
            for ($i = 1; $i < 7; $i = $i + 1)
            {
                $timestamp = time() + $i * 24 * 3600;
                $timestamp = $timestamp - ($timestamp % (24*60 * 60));
                echo '<option value="' . $timestamp . '">' . date("d-m-Y", $timestamp) . '</option>' . "\n";
            }
            ?>
        </select>
        <label>Scegli una data</label>
    </div>
    <p><b>Titolo che contenga:</b></p>
    <div class="input-field">
        <input id="filtroTitolo" type="text" class="validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -">
        <label for="filtroTitolo">Titolo</label>
    </div>
    <p><b>Descrizione che contenga:</b></p>
    <div class="input-field">
        <textarea id="filtroDescrOK" class="materialize-textarea validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -"></textarea>
        <label for="filtroDescrOK">Descrizione</label>
    </div>
    <p><b>Descrizione che non contenga:</b></p>
    <div class="input-field">
        <textarea id="filtroDescrNO" class="materialize-textarea validate" pattern="^[0-9a-zA-Zàèéìòù.,-]*$" title="Solo caratteri alfanumerici, punti, virgole o -"></textarea>
        <label for="filtroDescrNO">Descrizione</label>
    </div>
    <p><b>Macrogeneri:</b></p>
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
    <p><b>Generi:</b></p>
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
    <br>
    <button class="btn waves-effect waves-light" id="btnSearch">Ricerca</button>
    <a href="?">Reset ricerca</a>
</form>
<br>
<br>
<br>
</ul>

<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
    <a id="showSidebar" data-activates="ricerca-container" class="btn-floating btn-large red"  style="display: none" >
        <i class="large material-icons">search</i>
    </a>
</div>
<script>
$("#showSidebar").sideNav(
{
    menuWidth: 300
});
</script>
