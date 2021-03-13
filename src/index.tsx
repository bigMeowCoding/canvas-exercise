import {exercise, helloCanvas} from "./demos/base";
import {drawClock} from "./demos/clock";

setInterval(()=> {
    drawClock()
},1000)