
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const A={x:100, y:450};
const B={x:250, y:100};
const C={x:450, y:600};

moveAblePoints = [A,B,C];


let SELECTED_POINT = null;

let t = 0.2;

let incraseing = true;
let incraseing2 = true;


function lerp(A,B,t){
    return A+(B-A)*t;
}


const ctx = myCanvas.getContext("2d")



function mouseDown(e){
    SELECTED_POINT = getSelectedPoint(e)
}

function getSelectedPoint(e){
    x = e.clientX;
    y = e.clientY;

    for(let i = 0; i < allPoints.length; i++){
        if( Math.abs(x-allPoints[i].x) < 10 && Math.abs(y-allPoints[i].y) < 10){
            
            console.log('hit', allPoints[i])
            return allPoints[i]
            
        }
    }
}


function mouseMove(e){

    if(SELECTED_POINT != null){
        console.log('were in')
        SELECTED_POINT.x = e.x - SELECTED_POINT.x;
        SELECTED_POINT.y = e.y - SELECTED_POINT.y;
    }
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}

myCanvas.addEventListener('mousedown',mouseDown)
myCanvas.addEventListener('mousemove',mouseMove)
myCanvas.addEventListener('mouseup',mouseUp)



















function animate(){

    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);

    
    
    drawLine(A,B);
    drawLine(B,C);
    
    drawDot(A, "A")
    drawDot(B, "B")
    drawDot(C, "C")
    
    const M = {
        x:lerp(A.x, B.x, t),
        y:lerp(A.y, B.y, t)
    }


    const M2 = {
        x:lerp(B.x, C.x, t),
        y:lerp(B.y, C.y, t)
    }

    const BC = {
        x:lerp(M.x, M2.x, t),
        y:lerp(M.y, M2.y, t)
    }

    drawLine(M,M2);
    drawDot(BC, 'BC')


    allPoints = [A,B,C];

    if(incraseing){
        t += 0.005
    }else{
        t -= 0.005
    }
    
    if( (t < 0) || (t>1) ){
        incraseing = !incraseing;
    }

    
    
    drawDot(M, "M")
    drawDot(M2, "M1")

    requestAnimationFrame(animate)

}


animate()






