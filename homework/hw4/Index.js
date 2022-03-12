import { Hw4_Part_1 } from "./Hw4_Part_1.js";
import { Hw4_Part_2 } from "./Hw4_Part_2.js";
import { Hw4_Part_3 } from "./Hw4_Part_3.js";
import { FrameBuffer } from "../../framebuffer/FrameBuffer.js";

var client = new Hw4_Part_1();
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
    if (element.innerText == "Hw4_Part_1") {
        client = new Hw4_Part_1();
    } else if (element.innerText == "Hw4_Part_2") {
        client = new Hw4_Part_2();
    } else if (element.innerText == "Hw4_Part_3") {
        client = new Hw4_Part_3();
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