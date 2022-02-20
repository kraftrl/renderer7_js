import { InteractiveCube } from "./InteractiveCube.js";
import { InteractiveGRSModels } from "./InteractiveGRSModels.js";
import { InteractiveModels } from "./InteractiveModels.js";
import { InteractiveTriangle } from "./InteractiveTriangle.js";

export class InteractiveExamples {}

setListeners(new InteractiveCube());

const buttons = document.getElementsByTagName('button');
for (let button of buttons) {
    button.onclick = function() { goToClient(button); }
}

function goToClient(element) {  
    for (let button of buttons) {
        button.style.display = "inline-block";
    }
    element.style.display = "none";
    document.getElementById("title").innerText = "Interactive " + element.innerText;

    if (element.innerText == "Cube") {
        setListeners(new InteractiveCube());
    } else if (element.innerText == "Triangle") {
        setListeners(new InteractiveTriangle());
    } else if (element.innerText == "Models") {
        setListeners(new InteractiveModels());
    } else if (element.innerText == "GRS Models") {
        setListeners(new InteractiveGRSModels());
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