<?php include('header.php'); ?>

	<?php include('gallery.php'); ?>

	<?php 
		$id = $_GET['id']; 
		mysql_connect('127.0.0.1','root','');
		mysql_select_db('gif');
		$sql = "SELECT * FROM giftb2 WHERE id=$id";
		$blob = mysql_query($sql) or die(mysql_error());;

		while($data = mysql_fetch_array($blob)){
			$text = $data['imgsrc'];
		}
	?>

	<style>
		body, html {
			background-image: url('<?php echo $text ?>');
			background-repeat: repeat;
			background-position: top left;
		}
	</style>
	<a href="index.php" class="holidayBtnWrapper"><div class="btn">Draw another one</div></a>
	<script type="text/javascript" src="js/click.js"></script>

<?php include('footer.php'); ?>