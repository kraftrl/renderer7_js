import { Cube } from "./Cube.js";
import { GRSModels } from "./GRSModels.js";
import { Models } from "./Models.js";
import { Triangle } from "./Triangle.js";

setListeners(new Cube());

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
        setListeners(new Cube());
    } else if (element.innerText == "Triangle") {
        setListeners(new Triangle());
    } else if (element.innerText == "Models") {
        setListeners(new Models());
    } else if (element.innerText == "GRS Models") {
        setListeners(new GRSModels());
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