function generateLateralPanel(idLivre) {

  var livre;
  $.post("./ajax/getLivre.php", {id: idLivre}, function(data,status) {
    if (status=="success") {
      result = data;
    }
  });

  livre = JSON.parse(result);

  var html= "<div id =" + livre.ID + ">";
  html += "<h2>" + livre.NOM + "</h2>";
  html += "<p>" + livre.AUTEUR + "</p>";
  html += "</div>";

  $("#lateralPanel").html(html);
}
