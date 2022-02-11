var elem = document.documentElement;

// adding an image via url box
function addImage(e) {
	var imgUrl = $("#imgUrl").val();
	if (imgUrl.length) {
		$("#imageContainer img").attr("src", imgUrl);
		closeNav();
	}
	e.preventDefault();
}

var loadFile = function (event) {
	console.log('hi');
	var output = document.getElementById('img');
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function () {
		URL.revokeObjectURL(output.src) // free memory
	}
};

function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
}

/* Open */
function openNav(id) {
	document.getElementById(id).style.display = "block";
}

/* Close */
function closeNav(id) {
	document.getElementById(id).style.display = "none";
}

window.onload = function () {
	var fileupload = document.getElementById("FileUpload1");
	var filePath = document.getElementById("spnFilePath");
	var button = document.getElementById("btnFileUpload");
	button.onclick = function () {
		fileupload.click();
	};
	fileupload.onchange = function () {
		var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
		loadFile(event);
	};
};

function OpenFiltersPanel() {
	document.getElementById("container").style.display = "block";
}

function CloseFiltersPanel() {
	document.getElementById("container").style.display = "none";
}

// editing image via css properties
function editImage() {

	var gs = $("#gs").val();      // grayscale
	var blur = $("#blur").val();    // blur
	var br = $("#br").val();      // brightness
	var ct = $("#ct").val();      // contrast
	var huer = $("#huer").val();    //hue-rotate
	var opacity = $("#opacity").val(); //opacity
	var invert = $("#invert").val();  //invert
	var saturate = $("#saturate").val();//saturate
	var sepia = $("#sepia").val();   //sepia

	var filter = 'grayscale(' + gs +
		'%) blur(' + blur +
		'px) brightness(' + br +
		'%) contrast(' + ct +
		'%) hue-rotate(' + huer +
		'deg) opacity(' + opacity +
		'%) invert(' + invert +
		'%) saturate(' + saturate +
		'%) sepia(' + sepia + '%)';

	$("#imageContainer img").css("filter", filter);
	$("#imageContainer img").css("-webkit-filter", filter);

}

//When sliders change image will be updated via editImage() function
$("input[type=range]").change(editImage).mousemove(editImage);

// Reset sliders back to their original values on press of 'reset'
$('#imageEditor').on('reset', function () {
	setTimeout(function () {
		editImage();
	}, 0);
});

var angle = 0;
$('#rotatebutton').on('click', function () {
	angle += 90;
	$('#imageContainer img').css('transform', 'rotate(' + angle + 'deg)');
});

var isFlippedX = false;

$('#flipXButton').on('click', function () {
	if (isFlippedX) {
		$('#imageContainer img').css('transform', 'scaleX(1)');
		isFlippedX = false;
	}
	else {
		$('#imageContainer img').css('transform', 'scaleX(-1)');
		isFlippedX = true;
	}
});

var isFlippedY = false;

$('#flipYButton').on('click', function () {
	if (isFlippedY) {
		$('#imageContainer img').css('transform', 'scaleY(1)');
		isFlippedY = false;
	}
	else {
		$('#imageContainer img').css('transform', 'scaleY(-1)');
		isFlippedY = true;
	}
});
