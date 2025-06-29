
// Set Up Window
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const ctx = myCanvas.getContext("2d")

// Declaring points
const P0={x:800, y:650};
const P1={x:250, y:100};
const P2={x:450, y:600};
const P3={x:600, y:750};


let BC_Trail = []

moveAblePoints = [P0, P1, P2, P3];

// for the click and drop
let SELECTED_POINT = null;

// Start at thr mid point
let t = 0.5;
let incraseing = true;

function lerp(A,B,t){
    return A+(B-A)*t;
}





// DRAG DROP FUNCTIONS
function mouseDown(e){
    SELECTED_POINT = getSelectedPoint(e);
}

function mouseMove(e){

    if(SELECTED_POINT != null){
        SELECTED_POINT.x = e.x;
        SELECTED_POINT.y = e.y;
    }
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove);
    SELECTED_POINT = null;
    BC_Trail = []
}

myCanvas.addEventListener('mousedown',mouseDown)
myCanvas.addEventListener('mousemove',mouseMove)
myCanvas.addEventListener('mouseup',mouseUp)




// main animation function
function animate(){

    // Clear Canvas and Draw Points
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
    
    drawLine(P0,P1);
    drawLine(P1,P2);
    drawLine(P2,P3);
    
    drawDot(P0, "P0")
    drawDot(P1, "P1")
    drawDot(P2, "P2")
    drawDot(P3, "P3")
    

    // Draw line connections and plot X
    const L1 = {
        x:lerp(P0.x, P1.x, t),
        y:lerp(P0.y, P1.y, t)
    }

    const L2 = {
        x:lerp(P1.x, P2.x, t),
        y:lerp(P1.y, P2.y, t)
    }

    const L3 = {
        x:lerp(P2.x, P3.x, t),
        y:lerp(P2.y, P3.y, t)
    }



    const B1 = {
        x:lerp(L1.x, L2.x, t),
        y:lerp(L1.y, L2.y, t)
    }

    const B2 = {
        x:lerp(L2.x, L3.x, t),
        y:lerp(L2.y, L3.y, t)
    }


    const X = {
        x:lerp(B1.x, B2.x, t),
        y:lerp(B1.y, B2.y, t)
    }

    drawLine(L1,L2);
    drawLine(L2,L3);

    drawLine(B1,B2);






    // leave trail behind

    BC_Trail.push(X)

    BC_Trail = BC_Trail.slice(-5000)



    drawDot(X, 'X')
    plotTrail(BC_Trail)

    

    if(incraseing){
        t += 0.005
    }else{
        t -= 0.005
    }
    
    if( (t < 0) || (t>1) ){
        incraseing = !incraseing;
    }

    
    
    drawDot(L1, "L1");
    drawDot(L2, "L2");
    drawDot(L3, "L3");

    
    drawDot(B1, "B1");
    drawDot(B2, "B2");



    requestAnimationFrame(animate);
}



animate();


function plotTrail(arr){

    for(let i=0; i < arr.length; i++){
        leaveMark(arr[i])
    }


}