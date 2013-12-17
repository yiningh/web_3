<?php include('header.php'); ?>

	<?php include('gallery.php'); ?>

	<div id="drawingArea" class="center">
		<canvas id="bgCanvas" width="360" height="540" style="z-index:1; border: 15px solid #efefef "></canvas>
		<canvas id="drawingPad" width="360" height="540" style="z-index: 10;border: 15px solid #efefef"></canvas>

		<div id="controls">
			<p class="instruction">adjust <br/>face image</p>

			<div id="up" class="adjustBtns center">&#8593;</div>

			<div class="center leftRight">
				<div id="left" class="adjustBtns floatLeft">&#8592;</div>
				<div id="right" class="adjustBtns floatRight">&#8594;</div>
			</div>

			<div id="down" class="adjustBtns center">&#8595;</div>

			<div class="center leftRight magnifier">
				<div id="big" class="center floatLeft"></div>
				<div id="small" class="center floatRight"></div>
			</div>

			<p class="instruction">brush color</p>
			<ul id="palette" >
				<div class="floatLeft">
				    <li class="active" style="background:#000000"></li>
				    <li style="background:#b12e00"></li>
				    <li style="background:#2cdb8b"></li>
				    <li style="background:#59b3ff"></li>
				</div>
				<div class="floatLeft">
				    <li style="background:#ffffff"></li>
				    <li style="background:#ff2a5c"></li>
				    <li style="background:#ffe681"></li>
				</div>
			</ul>

			<form id="send" action="post.php" method="post">
				<div id="sign">
					<p class="floatLeft">X</p>
					<input id="username"  class="floatLeft" type="text" name="username" onclick="this.value='';" value=" Great Artist Name" maxlength="30" onfocus="if (this.value == ' Great artist name') {this.value=''; this.style.color='#000';}else{this.style.color='#000'}" onblur="if(this.value == ''){this.value = ' Great Artist Name'; this.style.color='#888';}" />
				</div>
				<input id="imgid" type="text" name="imgid" placeholder="imgid" class="hide" />
				<input id="imgBlob" type="text" name="imgBlob" value="" placeholder="blob" class="hide" /> 
				<input type="text" name="query" placeholder="type something" class="hide" />
			</form>

			<a href="#" id="done" class="btn">3. FINISHED!</a>
		</div>

	</div>
	
	<script type="text/javascript" src="js/Detector.js"></script>
	<script type="text/javascript" src="js/three.min.js"></script>
	<script type="text/javascript" src="gif.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/click.js"></script>

<?php include('footer.php'); ?>