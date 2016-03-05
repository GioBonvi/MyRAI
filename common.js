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

$(document).ready(function()
{
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
                        "&mode=" + ($("#chkModeList").prop("checked") ? "list" : "wall") +
                        "&data=" + myFiltroData +
                        "&titolo=" + myFiltroTitolo +
                        "&macrogenere=" + myFiltroMacGen +
                        "&genere=" + myFiltroGen +
                        "&descrOK=" + myFiltroDescrOK +
                        "&descrNO=" + myFiltroDescrNO +
                        "&ora=" + myFiltroOra;
                        
        window.location = dataURL;
    });
});
