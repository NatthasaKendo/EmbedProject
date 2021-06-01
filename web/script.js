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

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//function when recieve a message
microgear.on('message', function(topic,msg) {
    console.log("Received!" + " " +  msg);
    // msg ส่งมาเป็น 255,255,255

    var msg_split = msg.split(',');

    var hex = rgbToHex(parseInt(msg_split[0]),parseInt(msg_split[1]),parseInt(msg_split[2]));

    updateTable($(".rgb-main").text(), $(".hex-main").text());

    $(".square").css("background-color", "rgb(" + msg + ")")
    $(".hex-main").html(hex);
    $(".rgb-main").html("rgb(" + msg_split.join(", ") + ")");
    console.log("Changed");
});

function updateTable(rgb, hex){
  $(".list-group > li:first").before('<li class="list-group-item"><span class="square-small rounded-circle"style="background-color: ' + rgb + '">&nbsp&nbsp&nbsp&nbsp&nbsp</span> hex: <span class="hex-small">' + hex + '</span>, rgb: <span class="rgb-small">' + rgb + '</span></li>');
}

// function when connected to NETPIE
microgear.on('connected', function() {
    microgear.setAlias(ALIAS); // Set device's name
});

microgear.connect(APPID); // Connect to NETPIE




