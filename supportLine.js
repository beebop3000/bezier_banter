class SupportLine{

    constructor(points, label,color){
        this.points = points;
        this.color = color;
        this.pos,
        this.label = label;
    }

    getPos(t){
        this.pos = {
            x:lerp(this.points[0].x, this.points[1].x, t),
            y:lerp(this.points[0].y, this.points[1].y, t)
        }
    }

    draw(size,lineWidth){
        drawLine(this.points[0],this.points[1], this.color[0])       
        drawDot(this.pos, this.label, this.color, size, lineWidth)
    }



}