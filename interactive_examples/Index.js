import { FrameBuffer } from "../framebuffer/FrameBuffer.js";
import { Cube } from "./Cube.js";
import { GRSModels } from "./GRSModels.js";
import { Models } from "./Models.js";
import { Triangle } from "./Triangle.js";

var client = new Cube();
const resizer = new ResizeObserver(function () {
    const w = client.resizer.offsetWidth;
    const h = client.resizer.offsetHeight;
    client.ctx.canvas.width = w;
    client.ctx.canvas.height = h;
    client.fb = new FrameBuffer(undefined, w, h);
    client.setupViewing();
});

setListeners();

const buttons = document.getElementsByClassName('client');
for (let button of buttons) {
    button.onclick = function() { goToClient(button); }
}

function goToClient(element) {  
    for (let button of buttons) {
        button.style.display = "inline-block";
    }
    element.style.display = "none";
    document.getElementById("title").innerText = "Interactive " + element.innerText;

    // make sure to remove listeners before setting new ones
    removeListeners();
    if (element.innerText == "Cube") {
        client = new Cube();
    } else if (element.innerText == "Triangle") {
        client = new Triangle();
    } else if (element.innerText == "Models") {
        client = new Models();
    } else if (element.innerText == "GRS Models") {
        client = new GRSModels();
    }
    setListeners();
}

function setListeners() {
    resizer.observe(client.resizer);
    document.addEventListener("keypress", keyListener);
}

function removeListeners() {
    resizer.unobserve(client.resizer);
    document.removeEventListener("keypress", keyListener);
}

function keyListener(event) {
    client.keyPressed(event);
}