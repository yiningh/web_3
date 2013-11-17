<?php

	if ( isset($_POST['submit']) ) {
		$text = $_POST['query'];
		$connection = mysql_connect('localhost','root','');
		mysql_select_db('web3001');
		
		$entry  = "INSERT INTO testsql VALUES ('{$text}')";
		mysql_query( $entry);
		header("Location: index.php");
        die();
	}

?>