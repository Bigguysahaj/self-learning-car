class Road{
    constructor(x,width,laneCount=3){

        // drawing road
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity = 1000000;
        this.top=-infinity;
        this.bottom= infinity;


        const topLeft = {x:this.left,y:this.top};
        const topRight = {x:this.right,y:this.top};
        const bottomLeft = {x:this.left,y:this.bottom};
        const bottomRight = {x:this.right,y:this.bottom};
        this.borders=[
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    // a method to get the lane center
    // this lane in the parameter is zero indexed
    getLaneCenter(lane){
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 +
            Math.min(lane,this.laneCount-1)*laneWidth;
    }
    
    draw(ctx){

        // drawing road lines
        ctx.lineWidth=5;
        ctx.strokeStyle='yellow';

        // for lane strokes and lines
        for(let i =1; i<=this.laneCount-1; i++){
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
        
        // separately drawing the borders
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        })
    }
}
