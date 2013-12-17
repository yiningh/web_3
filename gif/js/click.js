// recent gallery
var check = document.getElementById('check');
var gallery = document.getElementById('gallery');

/*================== FRONT PAGE UI ===========*/
check.addEventListener('click', function(){
	gallery.classList.toggle('collapsed');
	if( gallery.classList.contains('collapsed') ){
		check.innerHTML = '&#8592; recent gallery';
	}else{
		check.innerHTML = 'Hide gallery';
	}
});