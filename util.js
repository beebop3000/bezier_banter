

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

function drawSupportDot(point, color = 'grey'){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(point.x, point.y, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();

}







function leaveMark(point){
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI*2);
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = "red";
    ctx.stroke();

}


function drawLine(A,B, color = 'black', lineWidth = 0.75){
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle  = color

    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
}


function getSelectedPoint(e){
    x = e.clientX - xShift;
    y = e.clientY - yShift;

    for(let i = 0; i < moveAblePoints.length; i++){
        if( Math.abs(x-moveAblePoints[i].x) < 10 && Math.abs(y-moveAblePoints[i].y) < 10){

            return moveAblePoints[i]
            
        }
    }
}



// MOUSE FUNCTIONS

// DRAG DROP FUNCTIONS

// is there a way to move these into a the Bezier Curve class and I want to clear the train when I click a classes node
function mouseDown(e){
    SELECTED_POINT = getSelectedPoint(e);
    BC_Trail = []
}

function mouseMove(e){

    if(SELECTED_POINT != null){
        SELECTED_POINT.x = e.x - xShift;
        SELECTED_POINT.y = e.y - yShift;
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