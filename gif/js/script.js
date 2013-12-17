
/*============================================================*/
/*--- CREATED FOR JAMIE KOSOY'S WEB 3 CLASS ------------------*/
/*--- AT PARSONS THE NEW SCHOOL FOR DESIGN -------------------*/
/*--- PROJECT BY YI NING HUANG -------------------------------*/
/*--- HSNU20054@GMAIL.COM ------------------------------------*/
/*--- 2013 ---------------------------------------------------*/
/*============================================================*/

/*=============================================================*/
/*--- PAINT WITH PIXELS VERY CLEAN AND NICe TUROTIAL HERE -----*/
/*--- http://creativejs.com/tutorials/painting-with-pixels/ ---*/
/*--- BY JAMIE KOSOY ------------------------------------------*/
/*=============================================================*/	

var canvasDraw = document.getElementById('drawingPad');
var contextDraw = canvasDraw.getContext('2d');
var bgColor = "#ffe681";
var isMouseDown = false;
var mouseX = 0, mouseY = 0;
var palette = document.getElementById("palette");
var swatches = palette.children;
var currentSwatch; // we'll keep track of what swatch is active in this.
var drawing;
var dropImg = document.createElement('img');
var dropImgWidth, dropImgHeight, dropImgPosX, dropImgPosY;
var up = document.getElementById('up');
var down = document.getElementById('down');
var left = document.getElementById('left');
var right = document.getElementById('right');
var big = document.getElementById('big');
var small = document.getElementById('small');

// background instruction
var bgCanvas = document.getElementById('bgCanvas');
var bgCanvasContext = bgCanvas.getContext('2d');

// three js
var container = document.getElementById('container');
var width = 360, height = 540;
var camera, scene, renderer;
var plane, sphere;
var canvas, context;
var texture, textureHead, material, materialHead, geometry, vertices;

// gif js
var time1, time2, time3;
var pose1, pose2, pose3, pose4, pose5, pose6, pose7, pose8;


/*================== DRAG AND DROP IMAGE TO THE CANVAS ===========*/
//prepare for the image to be drop. Make it rounded like a head
dropImg.addEventListener("load", function () {
	dropImgWidth = dropImg.width;
	dropImgHeight = dropImg.height;
	dropImgPosX = 180-dropImgWidth/2;
	dropImgPosY = 90-dropImgHeight/2;
	drawDropImg();
}, false);

canvasDraw.addEventListener("dragover", function (evt) {
	evt.preventDefault();
}, false);

canvasDraw.addEventListener("drop", function (evt) {
	var files = evt.dataTransfer.files;
	if (files.length > 0) {
		var file = files[0];
		if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
			var reader = new FileReader();
			// Note: addEventListener doesn't work in Google Chrome for this event
			reader.onload = function (evt) {
				dropImg.src = evt.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
	evt.preventDefault();
}, false);  

/*================== ADJUSTMENT BUTTONS FOR DROPPED IMAGE ================*/
up.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgPosY -= 10;
	drawDropImg();
}, false);
down.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgPosY += 10;
	drawDropImg();
}, false);
left.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgPosX -= 10;
	drawDropImg();
}, false);
right.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgPosX += 10;
	drawDropImg();
}, false);
big.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgWidth *= 1.1;
	dropImgHeight *= 1.1;
	drawDropImg();
}, false);
small.addEventListener('click', function(evt){
	evt.preventDefault();
	dropImgWidth *= 0.9;
	dropImgHeight *= 0.9;
	drawDropImg();
}, false);

function drawDropImg(){
	contextDraw.beginPath();
	contextDraw.arc(180, 90, 75, 0, 2 * Math.PI, false);
	contextDraw.fillStyle = bgColor;
	contextDraw.fill();
	contextDraw.save();
    contextDraw.beginPath();
    contextDraw.arc(180, 90, 75, 0, Math.PI * 2, true);
    contextDraw.closePath();
    contextDraw.clip();
    contextDraw.drawImage(dropImg, dropImgPosX, dropImgPosY, dropImgWidth, dropImgHeight);
    contextDraw.restore();
} 

/*================== DRAW THE BACKGROUND INSTRUCTION==============*/
//draw the drop area
bgCanvasContext.fillStyle = bgColor;
bgCanvasContext.fillRect(0,0,width,height);
bgCanvasContext.beginPath();
bgCanvasContext.arc(180, 90, 70, 0, 2 * Math.PI, false);
bgCanvasContext.fillStyle = '#ffffff';
bgCanvasContext.fill();
bgCanvasContext.setLineDash([7, 13]);
bgCanvasContext.lineWidth = 7;
bgCanvasContext.strokeStyle = '#666666';
bgCanvasContext.stroke();
bgCanvasContext.fillStyle = "#666666";
bgCanvasContext.font = "bold 1.2em sans-serif";
bgCanvasContext.fillText("1. Drag a", 135, 80);
bgCanvasContext.fillText("face image", 133, 108);
bgCanvasContext.fillStyle = "#cebb67";
bgCanvasContext.fillText("2. Draw the body here", 85, 335);

/*================== PAITN WITH PIXELS ON canvas ================*/
contextDraw.lineWidth = 12;
contextDraw.lineCap = 'round';
contextDraw.strokeStyle = "#000000";

canvasDraw.addEventListener("mousedown",function (evt) {
    isMouseDown = true;

    mouseX = evt.offsetX;
    mouseY = evt.offsetY;

    contextDraw.beginPath();
    contextDraw.moveTo(mouseX, mouseY);
});

window.addEventListener("mouseup",function (evt) {
    isMouseDown = false;
    isMouseDownHead = false;
});

canvasDraw.addEventListener("mousemove",function (evt) {
    if (isMouseDown) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;

        contextDraw.lineTo(mouseX, mouseY);
        contextDraw.stroke();
    }
});

for (var i = 0; i < swatches.length; i++) {
    var swatch = swatches[i];
    if (i == 0) {
        currentSwatch = swatch;
    }
    // when we click on a swatch...
    swatch.addEventListener("click",function (evt) {
        this.className = "active"; // give the swatch a class of "active", which will trigger the CSS border.
        currentSwatch.className = ""; // remove the "active" class from the previously selected swatch
        currentSwatch = this; // set this to the current swatch so next time we'll take "active" off of this.
        contextDraw.strokeStyle = this.style.backgroundColor; // set the background color for the canvas.
    });
}

var doneBtn = document.getElementById('done');
doneBtn.addEventListener('click', function(evt){
	drawing = canvasDraw.toDataURL("image/png");
	time1 = Date.now();
	init();
	animate();
});

/*============================ THREE JS ===========================*/
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

function init() {
	camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
	camera.position.z = 650;

	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0xefefef ) );

	//texture = new THREE.ImageUtils.loadTexture("01.png");
	texture = new THREE.ImageUtils.loadTexture(drawing);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.anisotropy = 16;

	material = new THREE.MeshLambertMaterial( { map: texture, transparent: true, Color: bgColor, side: THREE.DoubleSide, wireframe: false } );
	
	geometry =  new THREE.PlaneGeometry( width, height, 4, 6 );
	geometry.dynamic = true;
	geometry.computeFaceNormals();
	plane = new THREE.Mesh( geometry, material );
	plane.position.set( 0, 0, 0 );
	scene.add( plane );

	var bgplane = new THREE.Mesh( new THREE.PlaneGeometry( width+2, height+2, 1, 1 ), new THREE.MeshBasicMaterial({ color: bgColor }) );
	plane.position.set( 0, 0, 1 );
	scene.add( bgplane );

	renderer = new THREE.WebGLRenderer({
        antialias: true,
        clearColor: 0x54cfc2,
        clearAlpha: 0,
        alpha: true,
        preserveDrawingBuffer: true,
    });
	renderer.clearColor = 0x54cfc2;
	renderer.setSize( width, height );
	//container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
}

function animate() {
	requestAnimationFrame( animate );
	var time = Date.now() * 0.001;
	time2 = Date.now();
	var loading = document.getElementById('loadingArea');
	loading.classList.remove('hide');

	/* ============= USE VERTEICES TO ANIMATE THE FIRGURE BASED ON FRAMES ===========*/
	// FARME 1 STRAIGHT POSE
	if( time2-time1 > 101 && time2-time1 < 200 ){
		pose1 = document.createElement('img');
		pose1.setAttribute('id','pose1');
		renderer.render( scene, camera );
		pose1.src = renderer.domElement.toDataURL();
		console.log(geometry.vertices[23].y );
		for(var i = 6; i < 16; i++){
			console.log(geometry.vertices[i].y);
		}
	}
	// FRAME 2 NOD + OPEN LEGS
	else if( time2-time1 > 201 && time2-time1 < 300 ){ 
		// legs
		geometry.vertices[26].x -= 50;
		geometry.vertices[28].x += 50;
		geometry.vertices[21].y += 50;
		geometry.vertices[23].y += 50;
		// head
		for(var i = 6; i < 16; i++){
			geometry.vertices[i].y -= 30;
		}
		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose2 = document.createElement('img');
		pose2.setAttribute('id','pose2');
		pose2.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[26].x += 50;
		geometry.vertices[28].x -= 50;
		geometry.vertices[21].y -= 50;
		geometry.vertices[23].y -= 50;
		for(var i = 6; i < 16; i++){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 3 LEFT LEG UP
	else if( time2-time1 > 301 && time2-time1 < 400 ){
		// legs
		geometry.vertices[26].x -= 50;
		geometry.vertices[21].y += 20;
		geometry.vertices[31].y += 30;
		//move the right leg down a bit
		geometry.vertices[33].y -= 30;
		// jar
		geometry.vertices[12].y -= 60;
		geometry.vertices[8].y += 30;
		geometry.vertices[6].y -= 30;
		// head down
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}
		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose3 = document.createElement('img');
		pose3.setAttribute('id','pose3');
		pose3.src = renderer.domElement.toDataURL();

		// put the pose back
		geometry.vertices[26].x += 50;
		geometry.vertices[21].y -= 20;
		geometry.vertices[31].y -= 30;
		geometry.vertices[33].y += 30;
		geometry.vertices[12].y += 60;
		geometry.vertices[8].y -= 30;
		geometry.vertices[6].y += 30;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 4 RIGHT LEG UP
	else if( time2-time1 > 401 && time2-time1 < 500 ){
		// legs
		geometry.vertices[23].y += 20;
		geometry.vertices[28].x += 50;
		geometry.vertices[33].y += 30;
		//move the left leg down a bit
		geometry.vertices[31].y -= 30;
		// jar
		geometry.vertices[12].y -= 60;
		geometry.vertices[8].y += 30;
		geometry.vertices[6].y -= 30;

		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}

		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose4 = document.createElement('img');
		pose4.setAttribute('id','pose4');
		pose4.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[28].x -= 50;
		geometry.vertices[23].y -= 20;
		geometry.vertices[33].y -= 30;
		geometry.vertices[31].y += 30;
		geometry.vertices[12].y += 60;
		geometry.vertices[8].y -= 30;
		geometry.vertices[6].y += 30;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 5 LEFT HAND UP
	else if( time2-time1 > 501 && time2-time1 < 600 ){
		// left head
		geometry.vertices[15].y += 50;
		geometry.vertices[16].y += 50;
		geometry.vertices[20].y += 50;
		// move the right head down a bit
		geometry.vertices[18].y -= 50;
		geometry.vertices[19].y -= 50;
		geometry.vertices[24].y -= 50;
		// legs inward
		geometry.vertices[21].x += 20;
		geometry.vertices[26].x += 50;
		geometry.vertices[23].x -= 20;
		geometry.vertices[28].x -= 50;
		// head down a bit
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}

		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose5 = document.createElement('img');
		pose5.setAttribute('id','pose5');
		pose5.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[15].y -= 50;
		geometry.vertices[16].y -= 50;
		geometry.vertices[20].y -= 50;
		geometry.vertices[18].y += 50;
		geometry.vertices[19].y += 50;
		geometry.vertices[24].y += 50;
		geometry.vertices[21].x -= 20;
		geometry.vertices[26].x -= 50;
		geometry.vertices[23].x += 20;
		geometry.vertices[28].x += 50;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 6 RIGHT HAND UP
	else if( time2-time1 > 601 && time2-time1 < 700 ){
		// left head down a bit
		geometry.vertices[15].y -= 50;
		geometry.vertices[16].y -= 50;
		geometry.vertices[20].y -= 50;
		// move the right head up
		geometry.vertices[18].y += 50;
		geometry.vertices[19].y += 50;
		geometry.vertices[24].y += 50;
		// legs inward
		geometry.vertices[21].x += 20;
		geometry.vertices[26].x += 50;
		geometry.vertices[23].x -= 20;
		geometry.vertices[28].x -= 50;
		//head down a bit
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}

		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose6 = document.createElement('img');
		pose6.setAttribute('id','pose6');
		pose6.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[15].y += 50;
		geometry.vertices[16].y += 50;
		geometry.vertices[20].y += 50;
		geometry.vertices[18].y -= 50;
		geometry.vertices[19].y -= 50;
		geometry.vertices[24].y -= 50;
		geometry.vertices[21].x -= 20;
		geometry.vertices[26].x -= 50;
		geometry.vertices[23].x += 20;
		geometry.vertices[28].x += 50;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 7 BUTT LEFT
	else if( time2-time1 > 701 && time2-time1 < 800 ){
		geometry.vertices[21].x -= 40;
		geometry.vertices[22].x -= 40;
		//head left a bit
		geometry.vertices[0].x -= 50;
		geometry.vertices[1].x -= 50;
		geometry.vertices[2].x -= 40;
		geometry.vertices[5].x -= 40;
		geometry.vertices[6].x -= 40;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}

		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose7 = document.createElement('img');
		pose7.setAttribute('id','pose7');
		pose7.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[21].x += 40;
		geometry.vertices[22].x += 40;
		geometry.vertices[0].x += 50;
		geometry.vertices[1].x += 50;
		geometry.vertices[2].x += 40;
		geometry.vertices[5].x += 40;
		geometry.vertices[6].x += 40;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;
	}

	// FRAME 8 BUTT RIGHT
	else if( time2-time1 > 801 && time2-time1 < 900 ){
		geometry.vertices[22].x += 40;
		geometry.vertices[23].x += 40;
		//head left a bit
		geometry.vertices[2].x += 50;
		geometry.vertices[3].x += 50;
		geometry.vertices[4].x += 40;
		geometry.vertices[8].x += 40;
		geometry.vertices[9].x += 40;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y -= 30;
		}

		plane.geometry.verticesNeedUpdate = true;
		renderer.render( scene, camera );
		pose8 = document.createElement('img');
		pose8.setAttribute('id','pose8');
		pose8.src = renderer.domElement.toDataURL();;

		// put the pose back
		geometry.vertices[22].x -= 40;
		geometry.vertices[23].x -= 40;
		geometry.vertices[2].x -= 50;
		geometry.vertices[3].x -= 50;
		geometry.vertices[4].x -= 40;
		geometry.vertices[8].x -= 40;
		geometry.vertices[9].x -= 40;
		for( var i = 6; i < 16; i++ ){
			geometry.vertices[i].y += 30;
		}
		plane.geometry.verticesNeedUpdate = true;

		/* ========= FIANLLY GENERATE GIFS =======*/
		canvas = document.querySelector('#container canvas');
		var gif = new GIF({
		  workers: 2,
		  quality: 10,
		  repeate: 0,
		  width: 360,
		  height: 540,
		});

		// open close legs
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose2, {delay: 500});
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose2, {delay: 500});
		// walking
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose3, {delay: 500});
		gif.addFrame(pose1, {delay: 300});
		gif.addFrame(pose4, {delay: 500});
		gif.addFrame(pose1, {delay: 300});
		gif.addFrame(pose3, {delay: 500});
		// dance with hands
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose5, {delay: 500});
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose6, {delay: 500});
		// dance with heads again
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose5, {delay: 500});
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose6, {delay: 500});
		// BUTT DANCE
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose7, {delay: 500});
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose8, {delay: 500});
		// BUTT DANCE AGAIN
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose7, {delay: 500});
		gif.addFrame(pose1, {delay: 500});
		gif.addFrame(pose8, {delay: 500});

		gif.on('finished', function(blob) {;
		  	var reader = new FileReader();
		  	reader.onload = function(event){
		  	  var reader = event.target;
		  	  var dataURL = reader.result;
		  	  imgBlob.value = dataURL;
		  	  loading.classList.add('hide');
		  	  document.forms["send"].submit();
		  	};
		  	reader.readAsDataURL(blob);
		});
		gif.render();
	}

	camera.lookAt( scene.position );
	renderer.setClearColor( 0xffffff, 1 );
}
