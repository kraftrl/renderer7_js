import { Hw4_Part_1 } from "./Hw4_Part_1.js";
import { Hw4_Part_2 } from "./Hw4_Part_2.js";
import { Hw4_Part_3 } from "./Hw4_Part_3.js";
import { FrameBuffer } from "../../framebuffer/FrameBuffer.js";

var client = new Hw4_Part_1();
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

    clearInterval(client.timer);
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
    console.log(client);
    //client.setTransformations();
    document.addEventListener("keypress", function(e) {
        client.keyPressed(e);
    });
    const resizer = new ResizeObserver(function () {
        const w = client.resizer.offsetWidth;
        const h = client.resizer.offsetHeight;
        client.ctx.canvas.width = w;
        client.ctx.canvas.height = h;
        client.fb = new FrameBuffer(undefined, w, h);
        client.setupViewing();
    });
    resizer.observe(client.resizer);
}