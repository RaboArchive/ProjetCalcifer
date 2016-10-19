
<?php
// Le fichier test.xml contient un document XML avec un élément racine
// et au moins un élément /[racine]/title.


    $xml = simplexml_load_file('http://www.fnac.com/Rss/Rss.aspx?NID=538426');

    print_r($xml);

?>
