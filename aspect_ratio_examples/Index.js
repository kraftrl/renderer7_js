import { Distort } from "./Distort.js";
import { Letterbox } from "./Letterbox.js";
import { Crop } from "./Crop.js";
import { WindowToTheWorld } from "./WindowToTheWorld.js";
import { PanAndScan } from "./PanAndScan.js";
import { FrameBuffer } from "../framebuffer/FrameBuffer.js";

var client = new Distort();
const resizer = new ResizeObserver(function () {
    const w = client.resizer.offsetWidth;
    const h = client.resizer.offsetHeight;
    client.ctx.canvas.width = w;
    client.ctx.canvas.height = h;
    client.fb = new FrameBuffer(undefined, w, h);
    client.setupViewing();
});

setListeners();

const slidecontainers = document.getElementsByClassName("slidecontainer");
const buttons = document.getElementsByClassName('client');
for (let button of buttons) {
    button.onclick = function() { goToClient(button); }
}

function goToClient(element) {
    for (let button of buttons) {
        button.style.display = "inline-block";
    }
    element.style.display = "none";
    for (let slider of slidecontainers) {
        slider.style.display = "none";
    }
    document.getElementById("title").innerText = element.title;
    client.resizer.style.overflow = "hidden";

    // make sure to remove listeners before setting new ones
    removeListeners();
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
        for (let slider of slidecontainers) {
            slider.style.display = "block";
        }
    }
    setListeners();
}

function setListeners() {
    initTimer();
    resizer.observe(client.resizer);
    document.addEventListener("keypress", keyListener);
}

function removeListeners() {
    resizer.unobserve(client.resizer);
    clearInterval(client.timer);
    document.removeEventListener("keypress", keyListener);
}

function keyListener(event) {
    client.keyPressed(event);
}

function initTimer() {
    client.timer = setInterval(function() {
        client.rotateModel(client.modelToRotate, 10); // 10 degrees
        client.setupViewing();
    }, 1000/client.fps);
}