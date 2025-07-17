// To Add and this in correctly I'll need to move and rescale the canvas
// and I'll also need to have a way to interact with the pints after the shift


// Set Up Window
myCanvas.width = 1600 //window.innerWidth;
myCanvas.height = 800 // window.innerHeight;

const ctx = myCanvas.getContext("2d")


var myCanvasPosition = myCanvas.getBoundingClientRect();
var xShift =  myCanvasPosition.left;
var yShift =  myCanvasPosition.top;

console.log(xShift, yShift);


// Start at thr mid point
let t = 0.5;
let incraseing = true;
let SELECTED_POINT = null;


let BC_Trail = []

// Declaring points
// 


const P0={x:800+myCanvasPosition.left, y:550+myCanvasPosition.top};
const P1={x:250+myCanvasPosition.left, y:100+myCanvasPosition.top};
const P2={x:450+myCanvasPosition.left, y:450+myCanvasPosition.top};
const P3={x:600+myCanvasPosition.left, y:600+myCanvasPosition.top};
const P4={x:100+myCanvasPosition.left, y:150+myCanvasPosition.top};
const P5={x:88+myCanvasPosition.left, y:625+myCanvasPosition.top};

console.log(P0)

moveAblePoints = [P0, P1, P2, P3, P4, P5];



const A0 = new SupportLine([P0,P1], 'A0', ["blue","white"]);
const A1 = new SupportLine([P1,P2], 'A1', ["blue","white"]);
const A2 = new SupportLine([P2,P3], 'A2', ["blue","white"]);
const A3 = new SupportLine([P3,P4], 'A3', ["blue","white"]);
const A4 = new SupportLine([P4,P5], 'A4', ["blue","white"]);

const level1 = [A0, A1, A2, A3, A4 ]


for(let i =0; i < level1.length; i++){
    level1[i].getPos(t);
}

const B0 = new SupportLine([A0.pos,A1.pos], 'B0', ["red","white"]);
const B1 = new SupportLine([A1.pos,A2.pos], 'B1', ["red","white"]);
const B2 = new SupportLine([A2.pos,A3.pos], 'B2', ["red","white"]);
const B3 = new SupportLine([A3.pos,A4.pos], 'B3', ["red","white"]);

const level2 = [B0, B1, B2, B3]



for(let i =0; i < level2.length; i++){
    level2[i].getPos(t);
}

const C0 = new SupportLine([B0.pos,B1.pos], 'C0', ["green","white"]);
const C1 = new SupportLine([B1.pos,B2.pos], 'C1', ["green","white"]);
const C2 = new SupportLine([B2.pos,B3.pos], 'C2', ["green","white"]);
const level3 = [C0, C1, C2]


for(let i =0; i < level3.length; i++){
    level3[i].getPos(t);
}

const D0 = new SupportLine([C0.pos,C1.pos], 'D0', ["orange","white"]);
const D1 = new SupportLine([C1.pos,C2.pos], 'D1', ["orange","white"]);

const level4 = [D0, D1]

for(let i =0; i < level4.length; i++){
    level4[i].getPos(t);
}



const X = new SupportLine([D0.pos,D1.pos], 'X', ["white","black"]);


myCanvas.addEventListener('mousedown',mouseDown)
myCanvas.addEventListener('mousemove',mouseMove)
myCanvas.addEventListener('mouseup',mouseUp)


function animate(){

    // Clear Canvas and Draw Points
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);

    for(let i =0; i < moveAblePoints.length; i++){
        drawDot(moveAblePoints[i], i)
    }


    for(let i =0; i < level1.length; i++){
        level1[i].getPos(t);
        level1[i].draw();
    }

    for(let i =0; i < level2.length; i++){
        level2[i].points = [ level1[i].pos, level1[i+1].pos ]
        level2[i].getPos(t);
        level2[i].draw();
    } 
    
    for(let i =0; i < level3.length; i++){
        level3[i].points = [ level2[i].pos, level2[i+1].pos ]
        level3[i].getPos(t);
        level3[i].draw();
    }

    for(let i =0; i < level4.length; i++){
        level4[i].points = [ level3[i].pos, level3[i+1].pos ]
        level4[i].getPos(t);
        level4[i].draw();
    }

    // Finaly the bezier curce
    X.points = [ level4[0].pos, level4[1].pos ]
    X.getPos(t);
    X.draw(10, 3)

    BC_Trail.push(X.pos)

    BC_Trail = BC_Trail.slice(-5000)
    plotTrail(BC_Trail)


    if(incraseing){
        t += 0.005
    }else{
        t -= 0.005
    }
    
    if( (t < 0) || (t>1) ){
        incraseing = !incraseing;
    }


    requestAnimationFrame(animate);
}


animate();