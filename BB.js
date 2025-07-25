class BezierCurve{

    constructor(basePoints, t){
        this.basePoints = basePoints;
        this.t = t;
        this.trail = []
    }


    drawBasePoints(){
        for(let i =0; i < this.basePoints.length; i++){
            drawDot(this.basePoints[i], i)
        }
    }
    
    
    connectBasePoints(){
        let a = 0
        let b = 1
        
        while(b < this.basePoints.length){
            drawLine(this.basePoints[a],this.basePoints[b])
            a++;
            b++;
        }
    }


    drawSupportNetwork(){
        let p = calculateSupportPoints(this.basePoints,this.t);
        
        while(p.length >= 1){

            if(p.length == 1 ){

                drawSupportDot(p[0], 'red')
                this.trail.push(p[0])

                p = calculateSupportPoints(p,this.t);
                


            }else{
                drawSupportPoints(p)
                connectSupportPoints(p)
                p = calculateSupportPoints(p,this.t);
            }

        }
    }

    drawTrail(){
        this.trail = this.trail.slice(-300)
        plotTrail(this.trail)
    }

    // is there a way of calling all these functions here so we only need to call a one liner 



}