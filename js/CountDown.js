/** Returns this year, month, day with the specified hours and minutes. */
function time(hours, minutes) {
	return new Date().setHours(hours, minutes, 0, 0)
}

/** An array of arrays of dates, representing the start and end of each break */
const breaks = [
	time(08, 45),
	time(09, 40),
	time(10, 35),
	time(11, 35),
	time(12, 30),
	time(13, 20),
	time(14, 10),
	time(15, 05),
	time(16, 00),
	time(16, 55),
	time(17, 45)
]

function niceDate(date) {
	let d = new Date(date)
	return d.getDate() + "." + d.getMonth() + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
}

/** gets you the next break.
 * @author https://stackoverflow.com/users/1048572/bergi
*/
function getNextBreak(breaks) {
	breaks.sort(function (a, b) {
		let distancea = Math.abs(new Date() - a);
		let distanceb = Math.abs(new Date() - b);
		return distancea - distanceb; // sort a before b when the distance is smaller
	});
	let nextDates = breaks.filter(function (d) { return d - new Date() > 0 })
	return nextDates[0]
}

//stolen from w3schools
x = setInterval(function () {
	let countDownDate = getNextBreak(breaks)
	let now = new Date().getTime()
	let distance = new Date(countDownDate - now)

	let countDown = distance.getMinutes() + ":" + distance.getSeconds() + ":" + distance.getMilliseconds()
	document.getElementById("jsOut").innerHTML = "Nächste Pause in: " + countDown

}, 20)