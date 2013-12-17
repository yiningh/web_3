<?php
	/*$text = isset($_POST['query']);*/
	$imgBlob = $_POST['imgBlob'];
	echo $imgBlob;
	$connection = mysqli_connect('127.0.0.1','root','','gif');
	$entry  = "INSERT INTO giftb2(imgsrc, username) VALUES ( '{$_POST['imgBlob']}', '{$_POST['username']}' )";
	mysqli_query($connection, $entry);
	$id = mysqli_insert_id($connection);
	header("Location: holiday.php?id=".$id);
    die();
?>