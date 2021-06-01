const APPID = "ColorSensor";
const KEY = "ft4AuCBRY3FaBL8";
const SECRET = "8EtOBBV6Z1Be0mjQrny2vwjAe";
const ALIAS = "html"; //Device name (can be anything)
const BOARD = "esp8266";

var microgear = Microgear.create({
    key: KEY,
    secret: SECRET,
    alias : ALIAS
});

//function when recieve a message
microgear.on('message', function(topic,msg) {
    console.log("Recieved!" + " " +  msg);
    // msg ส่งมาเป็น 255,255,255
    $(".square").css("background-color", "rgb(" + msg + ")")

    $(".rgb-main").html("rgb(" + msg + ")");
    console.log("Changed");

});

// function when connected to NETPIE
microgear.on('connected', function() {
    microgear.setAlias(ALIAS); // Set device's name
});

microgear.connect(APPID); // Connect to NETPIE

document.getElementById("cp_btn").addEventListener("click", copyToClipboard);

function copyToClipboard() {
    var copyText = document.getElementById("hex-code");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}


