function load_compte()
{
  $("#content").empty();
  $("#content").load("pages/compte.html",on_load());
  on_load_js();
}
function on_load(){
  var temp = "Tête de bite";
  $("#niketamere").val();
  var x = document.getElementById("content");
  $("#niketamere").val(temp);
  $("#newemail").attr('value',temp);
  $("#newville").val("MA GROSSE VILLE");


}
function on_load_js()
{
  document.getElementById("niketamere").value("WALLAH");

}
