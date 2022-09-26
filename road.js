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
    }

    
    draw(ctx){

        // drawing road lines
        ctx.lineWidth=5;
        ctx.strokeStyle='yellow';

        ctx.beginPath();
        ctx.moveTo(this.left,this.top);
        ctx.lineTo(this.left,this.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.right,this.top);
        ctx.lineTo(this.right,this.bottom);
        ctx.stroke();
    }
}