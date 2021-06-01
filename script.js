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

var isInitiate = false;

//function when recieve a message
microgear.on('message', function(topic,msg) {
    console.log("Recieved!" + " " +  msg);
    isInitiate = true;
    //ในที่นี้เราจะเอาข้อความไปแทนข้อความของ HTML element ชื่อ data
    //document.getElementById("data").innerHTML = msg;
    // msg ส่งมาเป็น 255,255,255
    //ลองปรับเป็นด้านล่างแทน
    var msg_split = msg.split(',');
    document.getElementsByClassName("square").style.backgroundColor =
    "rgb(" + msg_split[0] + "," + msg_split[1] + "," + msg_split[2] + ")";

    document.getElementsByClassName("rgb-main").innerHTML =
    "rgb(" + msg_split[0] + "," + msg_split[1] + "," + msg_split[2] + ")";
});

// function when connected to NETPIE
microgear.on('connected', function() {
    microgear.setAlias(ALIAS); // Set device's name
    /*
    // แสดงข้อความให้ทราบว่าเชื่อมต่อสำเร็จ
    document.getElementById("data").innerHTML = "Now I am connected with netpie...";
    // ตั้งค่า timer ให้ท างานทุก 1 วินาที (ตัวเลข 1000 มีหน่วยเป็น ms หมายถึง 1000 ms)
    setInterval(function() {
        // ส่งข้อความไปยังอุปกรณ์ที่มีชื่อตามตัวแปร ALIAS ซึ่งก็คือตัวเอง
        microgear.chat(BOARD,"Hello from WEB at "+Date.now());
    },1000);
    */
});

microgear.connect(APPID); // Connect to NETPIE

client = new Paho.MQTT.Client("mqtt.netpie.io", 443, "Client_ID");
client.onMessageArrived = onMessageArrived;

var options = {
  useSSL: true,
  userName : "Token",
  password : "Secret",  
  onSuccess: onConnect,
  onFailure:doFail,
}

client.connect(options);

function onConnect() {
  client.subscribe("@msg/temp");
}

function doFail(e){
    console.log(e);
  }

/*function onMessageArrived(msg) {
    isInitiate = true;
    var msg_split = msg.split(',');
    document.getElementsByClassName("square").style.backgroundColor =
    "rgb(" + msg_split[0] + "," + msg_split[1] + "," + msg_split[2] + ")";

    document.getElementsByClassName("rgb-main").innerHTML =
    "rgb(" + msg_split[0] + "," + msg_split[1] + "," + msg_split[2] + ")";
}*/




