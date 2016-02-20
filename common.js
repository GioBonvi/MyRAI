$(document).ready(function()
{
    $("body").width(window.width);    
    
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
        
        var dataURL = "?" +
                        "channels=" + channels +
                        "&mode=" + ($("#chkModeList").prop("checked") ? "list" : "wall") +
                        "&data=" + myFiltroData +
                        "&titolo=" + myFiltroTitolo +
                        "&macrogenere=" + myFiltroMacGen +
                        "&genere=" + myFiltroGen +
                        "&descrOK=" + myFiltroDescrOK +
                        "&descrNO=" + myFiltroDescrNO;
                        
        window.location = dataURL;
    });
    
    $("#btnMostra").click(function()
    {
        $('#ricerca-container').toggle('medium');
        $(this).text(($(this).text() == "Ricerca" ? "Nascondi" : "Ricerca"));
    });
    
    $("#preloader").remove();
    $("main, footer").show();
});
