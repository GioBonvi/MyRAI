$(document).ready(function() {
    $("#cercaFiltri").click(function() {
        var myFiltroTitolo = $("#filtroTitolo").val();
        var myFiltroDescrOK = $("#filtroDescrOK").val();
        var myFiltroDescrNO = $("#filtroDescrNO").val();
        
        var channels = "";
        $('input[name="filtroCanali"]:checked').each(function() {
            channels = channels + $(this).attr("data") + ",";
        });
        
        var myFiltroGen = "";
        $('input[name="filtroGen"]:checked').each(function() {
            myFiltroGen = myFiltroGen + $(this).attr("data") + ",";
        });
        
        var myFiltroMacGen = "";
        $('input[name="filtroMacrogen"]:checked').each(function() {
            myFiltroMacGen = myFiltroMacGen + $(this).attr("data") + ",";
        });
        
        
        var dataURL = "?" +
                        "channels=" + channels +
                        "&titolo=" + myFiltroTitolo +
                        "&macrogenere=" + myFiltroMacGen +
                        "&genere=" + myFiltroGen +
                        "&descrOK=" + myFiltroDescrOK +
                        "&descrNO=" + myFiltroDescrNO;
        window.location = dataURL;
    });
});
