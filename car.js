// construcitng car
class Car{
    constructor(x,y,width,height){//atributes stored in the object
        this.x = x;
        this.y = y;
        this.width = width;                                             
        this.height = height;//car rememeber its own height and width

        //speed attribute
        this.speed =0;
        this.acceleration = 0.3;
        // controls
        this.controls = new Controls();
    }

    update(){
        if(this.controls.forward){
            this.speed += this.acceleration;//move up, y moves downward on computer
        }
        if (this.controls.reverse){
            this.speed -= this.acceleration;
        }
        this.y -= this.speed;
    }
    draw(ctx){//draw is a method
        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2,
            this.y-this.height/2,
            this.width,
            this.height,
        );
        ctx.fill();
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}