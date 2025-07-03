

function lerp(A,B,t){
    return A+(B-A)*t;
}


function drawDot(point, label, color= ['black','white'], size = 7, lineWidth= 0){
    ctx.beginPath();
    ctx.fillStyle=color[0];
    ctx.arc(point.x, point.y, size, 0, Math.PI*2);
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle=color[1];
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.font = "bold 9px Arial";
    ctx.fillText(label,point.x, point.y)

}



function leaveMark(point){
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI*2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();

}


function drawLine(A,B, color = 'red', lineWidth = 0.2){
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle  = color

    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
}


function getSelectedPoint(e){
    x = e.clientX;
    y = e.clientY;

    for(let i = 0; i < moveAblePoints.length; i++){
        if( Math.abs(x-moveAblePoints[i].x) < 10 && Math.abs(y-moveAblePoints[i].y) < 10){

            return moveAblePoints[i]
            
        }
    }
}



// MOUSE FUNCTIONS

// DRAG DROP FUNCTIONS
function mouseDown(e){
    SELECTED_POINT = getSelectedPoint(e);
    BC_Trail = []
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

function plotTrail(arr){

    for(let i=0; i < arr.length; i++){
        leaveMark(arr[i])
    }


}