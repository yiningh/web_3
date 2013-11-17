<!DOCYTPE html>
<html>
<head>
	<title>test DB</title>
</head>
<body>
	<form action="add.php" method="post">
		<input type="text" name="query" placeholder="type something" />
		<input type="submit" name="submit" value="SEND">
	</form>

	<?php
		mysql_connect('localhost','root','');
		mysql_select_db('web3001');
		$sql = "SELECT * FROM testsql";
		$entry = mysql_query($sql);

		while($data = mysql_fetch_array($entry)){
			$text = $data['entry'];
			$myString = '<p>'.$text.'</p>';

			echo $myString; 
		}
	?>
</body

</html>