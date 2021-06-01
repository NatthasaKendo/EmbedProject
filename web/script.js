const APPID = "ColorSensor";
const KEY = "ft4AuCBRY3FaBL8";
const SECRET = "8EtOBBV6Z1Be0mjQrny2vwjAe";
const ALIAS = "html"; //Device name (can be anything)
const BOARD = "esp8266";

var darkMode = false;

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
  $(".list-group > li:first").before('<li class="list-group-item"><span class="square-small rounded-circle"style="background-color: ' + rgb + '">&nbsp&nbsp&nbsp&nbsp&nbsp</span> <span class="hex-small">' + hex + '</span>, <span class="rgb-small">' + rgb + '</span></li>');
  uppdateDarkMode();
}

// function when connected to NETPIE
microgear.on('connected', function() {
    microgear.setAlias(ALIAS); // Set device's name
});

microgear.connect(APPID); // Connect to NETPIE

function copyToClipboard(id) {
    var copyText = document.getElementById(id);
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function toggleDarkmode(){
  if(darkMode){
    darkMode = false;
  }else{
    darkMode = true;
  }
  uppdateDarkMode();
}

function uppdateDarkMode(){
  if(darkMode){
    $("body").css("background-color","rgb(38,38,38)");
    $("body").css("color","white");
    $(".card").css("background-color","rgb(70,70,70)");
    $(".list-group-item").css("background-color","rgb(38,38,38)");
    $(".far").css("color","white");
  }else{
    $("body").css("background-color","white");
    $("body").css("color","black");
    $(".card").css("background-color","rgb(247,247,247)");
    $(".list-group-item").css("background-color","white");
    $(".far").css("color","black");
    //$("body").css("background-color","rgb(38,38,38)");
  }
}