
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

function drawLine(A,B){
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
}