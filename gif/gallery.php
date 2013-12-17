

<div id="gallery" class="collapsed">
	<div id="horizontalScroll">

		<?php
			mysql_connect('127.0.0.1','root','');
			mysql_select_db('gif');
			$sql = "SELECT * FROM giftb2 ORDER BY id DESC LIMIT 0, 10";
			$blob = mysql_query($sql) or die(mysql_error());;

			while($data = mysql_fetch_array($blob)){
				$id = $data['id'];
				$username = $data['username'];
				$text = $data['imgsrc'];
				$myString = '<div class="entry floatLeft"><a href="holiday.php?id='.$id.'"><img class="galleryImg" src="'.$text.'" /></a>';
				$usernameStr = '<p class="artistName">by '.$username.'</p></div>';

				echo $myString;
				echo $usernameStr;
			}
		?>
	</div>
</div>

<div id="leftPanel">
	<div class="logoWrapper">
		<a href="index.php"><img id="logo" src="image/logo.png" /></a>
		<div id="check" class="btn" >&#8592; recent gallery</div>
	</div>
</div>
	
<div id="loadingArea" class="hide">
	<img id="loadingImg" src="image/loader.gif">
	<p>Good things are worth waiting...</p>
</div>