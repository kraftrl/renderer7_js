import { Cube } from "./Cube.js";
import { GRSModels } from "./GRSModels.js";
import { Models } from "./Models.js";
import { Triangle } from "./Triangle.js";

var client = new Cube();
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
    document.getElementById("title").innerText = "Interactive " + element.innerText;

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