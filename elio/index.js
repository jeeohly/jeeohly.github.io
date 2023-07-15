const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDay = new Date(2022, 11, 06);
const today = new Date();
const easternTimeZoneOffset = today.getTimezoneOffset() / 60 + 5;
const eastern_timezone_today = new Date(today.getTime() + easternTimeZoneOffset * 60 * 60 * 1000);
const days = Math.round(Math.abs((today - firstDay) / oneDay));
console.log("First day: " + firstDay);
console.log("Today: " + today);
console.log("Total days: " + days);

function getRandomPixelImage() {
    const pixel_dir_path = "imgs/pixel/"
    fileNames = ["captain.gif", "elva.gif", "elva_2.0.gif", "gio.gif", "gio_2.0.gif", "luffy_tofu.gif", "tofu.gif"]
    const randomIndex = Math.floor(Math.random() * fileNames.length);
    return pixel_dir_path + fileNames[randomIndex];
}
const random_pixel = getRandomPixelImage();
console.log("Pixel Image: " + random_pixel)

window.onload = function() {
    document.getElementById("total_days").innerHTML = "ELVA AND GIO<br>" + days + " DAYS";
    document.getElementById("pixel_image").innerHTML = "<img id='pixel-img' src=" + random_pixel + ">";
}
