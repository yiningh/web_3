var birdBtn = document.getElementById('birdBtn');
var bird = document.getElementById('bird');
birdBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	bird.classList.toggle('move-in');
}, false);
var cloudBtn = document.getElementById('cloudBtn');
var cloud = document.getElementById('cloud');
var cloud2 =document.getElementById('cloud2');
cloudBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	cloud.classList.toggle('move-in');
	cloud2.classList.toggle('move-in');
}, false);
var sunBtn = document.getElementById('sunBtn');
var Sun = document.getElementById('sun');
sunBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	Sun.classList.toggle('move-in');
}, false);
var skyBtn = document.getElementById('skyBtn');
var sky = document.getElementById('sky');
skyBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	sky.classList.toggle('move-in');
}, false);
var rainbowBtn = document.getElementById('rainbowBtn');
var rainbow = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', function(evt){
	evt.preventDefault();
	evt.stopPropagation();
	rainbow.classList.toggle('move-in');
}, false);

var info = document.getElementById('info');
var div = document.getElementsByTagName('div');
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	alert('test');
 	info.style.display='block';
 	div.display='none';
}
