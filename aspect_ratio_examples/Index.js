import { Distort } from "./Distort.js";
import { Letterbox } from "./Letterbox.js";
import { Crop } from "./Crop.js";
import { WindowToTheWorld } from "./WindowToTheWorld.js";
import { PanAndScan } from "./PanAndScan.js";


export class AspectRatioExamples { }

setListeners(new Distort());

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

    if (element.innerText == "Distort") {
        setListeners(new Distort());
    } else if (element.innerText == "Letterbox") {
        setListeners(new Letterbox());
    } else if (element.innerText == "Crop") {
        setListeners(new Crop());
    } else if (element.innerText == "WttW") {
        setListeners(new WindowToTheWorld());
    } else if (element.innerText == "P&S") {
        setListeners(new PanAndScan());
    }
}

function setListeners(client) {
    console.log(client);
    //client.setTransformations();
    document.addEventListener("keypress", function(e) {
        client.keyPressed(e);
    });
    const resizer = new ResizeObserver(function () {
        client.setupViewing();
    });
    resizer.observe(document.getElementById("resizer"));
}