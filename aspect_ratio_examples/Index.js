import { Distort } from "./Distort.js";
import { Letterbox } from "./Letterbox.js";
import { Crop } from "./Crop.js";
import { WindowToTheWorld } from "./WindowToTheWorld.js";
import { PanAndScan } from "./PanAndScan.js";
import { FrameBuffer } from "../framebuffer/FrameBuffer.js";

var client = new Distort();
setListeners();

const buttons = document.getElementsByTagName('button');
for (let button of buttons) {
    button.onclick = function() { goToClient(button); }
}

function goToClient(element) {
    for (let button of buttons) {
        button.style.display = "inline-block";
    }
    element.style.display = "none";
    document.getElementById("title").innerText = element.innerText;

    clearInterval(client.timer);
    if (element.innerText == "Distort") {
        client = new Distort();
    } else if (element.innerText == "Letterbox") {
        client = new Letterbox();
    } else if (element.innerText == "Crop") {
        client = new Crop();
    } else if (element.innerText == "WttW") {
        client = new WindowToTheWorld();
    } else if (element.innerText == "P&S") {
        client = new PanAndScan();
    }
    setListeners();
}

function setListeners() {
    console.log(client);
    //client.setTransformations();
    document.addEventListener("keypress", function(e) {
        client.keyPressed(e);
    });
    const resizer = new ResizeObserver(function () {   
        const resizer = document.getElementById("resizer");
        const w = resizer.offsetWidth;
        const h = resizer.offsetHeight;
        client.ctx.canvas.width = w;
        client.ctx.canvas.height = h;
        client.fb = new FrameBuffer(undefined, w, h);
        client.setupViewing();
    });
    resizer.observe(document.getElementById("resizer"));
}