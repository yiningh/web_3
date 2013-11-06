<?php
	$red = 1;
	for ($i = 1; $i <= 400; $i++) {
    	$red += 1;
    	//round($i);
    	echo '<div style="width:100px;height:100px;float:left;background: rgb('.round($red).', 200, 200)"></div>';
	}
?>

