const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDay = new Date(2022, 11, 06);
const today = new Date();
console.log(firstDay);
console.log(today);
const days = Math.round(Math.abs((today - firstDay) / oneDay));
window.onload = function() {
    document.getElementById("total_days").innerHTML += "<center>Elva and Gio<br>" + days + " days</center>";
}
