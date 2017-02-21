/* global Palinsesto $ StackGUI Filtro timestamp localStorage */
var p;
$(document).ready(function () {
  /**
   * Scorri fino ad un elemento con una certa velocità.
   * @param {string} elem - L'elemento fino a cui scorrere.
   * @param {string} speed - La velocità con cui scorrere.
   */
  $.fn.scrollTo = function (elem, speed) {
    $(this).animate({
      scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    }, speed === undefined ? 1000 : speed);
    return this;
  };

  // I dati dell'ultimo filtro applicato alla ricerca sono salvati in localStorage
  // per essere disponibili anche se l'utente chiude e riapre il browser.
  if (typeof (Storage) !== 'undefined') {
    // All'apertura della pagina modifica i dati della personalizzazione del filtro
    // usando i dati salvati.
    if (typeof localStorage.filtroCanaliNo !== 'undefined') {
      for (let canale of JSON.parse(localStorage.filtroCanaliNo)) {
        $('#filtro-ch-' + canale).prop('checked', false);
      }
    }
    $('#filtroFascia').val(typeof localStorage.filtroFascia !== 'undefined' ? localStorage.filtroFascia : '');
    $('#filtroTitolo').val(typeof localStorage.filtroTitolo !== 'undefined' ? localStorage.filtroTitolo : '');
    $('#filtroDescr').val(typeof localStorage.filtroDescr !== 'undefined' ? localStorage.filtroDescr : '');
    if (typeof localStorage.filtroMacrogenere !== 'undefined') {
      for (let macrogen of JSON.parse(localStorage.filtroMacrogenere)) {
        $('input[name="filtroMacrogen"][data="' + macrogen + '"]').prop('checked', true);
      }
    }
    if (typeof localStorage.filtroGenere !== 'undefined') {
      for (let gen of JSON.parse(localStorage.filtroGenere)) {
        $('input[name="filtroGen"][data="' + gen + '"]').prop('checked', true);
      }
    }
  }

  $('#showSidebar').sideNav({ menuWidth: 300 });
  $('select').material_select();

  $('#btnSearch').click(function () {
    reloadPage();
    $('#showSidebar').sideNav('hide');
  });

  $('#resetRicerca').click(function () {
    localStorage.clear();
    window.location.href = '';
  });

  p = new Palinsesto(timestamp);

  $.when.apply(null, p.channelPromises)
  .fail(error => {
    console.log(error);
  })
  .done(function () {
    console.log('done!');
    reloadPage();
  });

  // Applica un nuovo filtro al palinsesto.
  function reloadPage () {
    // Riporta la schermata con la lista dei programmi allo stato iniziale.
    var defaultContent = '<div id="preloader-container"><div id="preloader" class="preloader-wrapper big active"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div><div id="channels"></div><div id="inner-container"><div id="noPrograms" hidden><h5>Sembra che non ci siano programmi corrispondenti a questa ricerca...</h5></div></div>';
    $('#list').html(defaultContent);
    // Crea il nuovo filtro dalle opzioni nella barra laterale.
    var filtroCanali = [];
    for (let check of $('#frmFiltro input[name="filtroCanali"]:checked')) {
      filtroCanali.push($(check).attr('data'));
    }
    var filtroFascia = $('#filtroFascia').val();
    var filtroTitolo = $('#filtroTitolo').val();
    var filtroDescr = $('#filtroDescr').val();
    var filtroMacrogenere = [];
    for (let check of $('#frmFiltro input[name="filtroMacrogen"]:checked')) {
      filtroMacrogenere.push($(check).attr('data'));
    }
    var filtroGenere = [];
    for (let check of $('#frmFiltro input[name="filtroGen"]:checked')) {
      filtroGenere.push($(check).attr('data'));
    }
    var filtro = new Filtro(filtroCanali, timestamp, filtroTitolo, filtroFascia, filtroGenere, filtroMacrogenere, filtroDescr);
    // Disegna i nuovi programmi.
    StackGUI.draw(p.channels, filtro);

    // Salva il nuovo filtro nel localStorage.
    if (typeof (Storage) !== 'undefined') {
      let filtroCanaliNo = [];
      for (let check of $('#frmFiltro input[name="filtroCanali"]:not(:checked)')) {
        filtroCanaliNo.push($(check).attr('data'));
      }
      localStorage.filtroCanaliNo = JSON.stringify(filtroCanaliNo);

      localStorage.filtroFascia = filtroFascia;
      localStorage.filtroTitolo = filtroTitolo;
      localStorage.filtroDescr = filtroDescr;

      localStorage.filtroMacrogenere = JSON.stringify(filtroMacrogenere);
      localStorage.filtroGenere = JSON.stringify(filtroGenere);
    }
  }
});
