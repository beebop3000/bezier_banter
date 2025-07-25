// To Add and this in correctly I'll need to move and rescale the canvas
// and I'll also need to have a way to interact with the pints after the shift


// Set Up Window
myCanvas.width = 1600 //window.innerWidth;
myCanvas.height = 800 // window.innerHeight;

const ctx = myCanvas.getContext("2d")


var myCanvasPosition = myCanvas.getBoundingClientRect();
var xShift =  myCanvasPosition.left;
var yShift =  myCanvasPosition.top;

// Start at thr mid point
let t = 0.5;
let incraseing = true;
let SELECTED_POINT = null;



const P0={x:800+myCanvasPosition.left, y:550+myCanvasPosition.top};
const P1={x:250+myCanvasPosition.left, y:100+myCanvasPosition.top};
const P2={x:450+myCanvasPosition.left, y:450+myCanvasPosition.top};
const P3={x:600+myCanvasPosition.left, y:600+myCanvasPosition.top};
const P4={x:100+myCanvasPosition.left, y:150+myCanvasPosition.top};
const P5={x:88+myCanvasPosition.left, y:625+myCanvasPosition.top};


const A0={x:1000+myCanvasPosition.left, y:550+myCanvasPosition.top};
const A1={x:1250+myCanvasPosition.left, y:100+myCanvasPosition.top};
const A2={x:1350+myCanvasPosition.left, y:450+myCanvasPosition.top};

moveAblePoints = [P0, P1, P2, P3, P4, P5, A0, A1, A2];

bcPoints = [P0, P1, P2, P3, P4, P5]
abcPoints = [A0, A1, A2]

const BC = new BezierCurve(bcPoints,t);
const ABC = new BezierCurve(abcPoints,t);

myCanvas.addEventListener('mousedown',mouseDown)
myCanvas.addEventListener('mousemove',mouseMove)
myCanvas.addEventListener('mouseup',mouseUp)


function animate(){

    // Clear Canvas and Draw Points
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
    
    BC.connectBasePoints();
    BC.drawBasePoints();
    BC.drawSupportNetwork();

    BC.drawTrail()

    BC.t =t

    ABC.connectBasePoints();
    ABC.drawBasePoints();
    ABC.drawSupportNetwork();

    ABC.t =t
    
    // BC_Trail = BC.trail.slice(-300)
    // plotTrail(BC_Trail)

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







function drawSupportPoints(points){
    for(let i =0; i < points.length; i++){
        drawSupportDot(points[i])
    }
}



function connectSupportPoints(points){

    let a = 0
    let b = 1

    while(b < points.length){
        drawLine(points[a],points[b], color = 'grey', lineWidth = 0.5)
        a++;
        b++;
    }

}


function calculateSupportPoints(points,t){
    let a = 0
    let b = 1
    
    let supportPoints = []
    
    while(b < points.length){
        
        sp = {
            x:lerp(points[a].x, points[b].x, t),
            y:lerp(points[a].y, points[b].y, t)
        }
        
        supportPoints.push(sp)
        a++;
        b++;
    }

    return supportPoints
}

