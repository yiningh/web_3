
<?php
	$cities = array(819827,524901, 1271881,1283240,703448,463355, 560756, 509820, 498817, 547560, 1496747, 709717,555746, 712969,569591, 532477, 471457, 711660,564912,571557 );
	$data = array();

	foreach( $cities as $inc){
		$json = file_get_contents('http://api.openweathermap.org/data/2.5/weather?id='.$inc, true);
		$data[$i] = json_decode($json, true);
		$name = $data[$i][name];
		$sunset = $data[$i][sys][sunset];
		$sunrise = $data[$i][sys][sunrise];
		$clouds = $data[$i][weather][0][description];
		echo '<h1>'.$name.'</h1>';
		// echo '<p>'.$sunrise.'</p>';
		// echo '<p>'.$sunset.'</p>';
		echo '<p>'.$clouds.'</p>';
	}

?>