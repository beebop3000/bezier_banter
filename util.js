
function drawDot(point, label){

    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(point.x, point.y, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.font = "bold 14px Arial";
    ctx.fillText(label,point.x, point.y)

}



function leaveMark(point){
    ctx.beginPath();
    ctx.fillStyle="blue";
    ctx.arc(point.x, point.y, 2, 0, Math.PI*2);
    ctx.fill();

}


function drawLine(A,B){
    ctx.lineWidth = 0.5;

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
