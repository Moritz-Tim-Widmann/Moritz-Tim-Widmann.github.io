document.addEventListener("DOMContentLoaded", function () {
	document.styleSheets[0].cssRules[0].style.setProperty(
		'--theme',
		Math.floor(Math.random() * 360)
	);
});