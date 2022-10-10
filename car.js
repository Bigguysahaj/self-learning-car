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
        this.maxSpeed = 5;
        this.friction = 0.05;
        this.angle = 0;
        // controls
        this.sensor= new Sensor(this);
        this.controls= new Controls();
    }

    update(roadBoarders){
        this.#move();
        // for updating the sensor as we move
        this.sensor.update(roadBoarders);
    }

    #move(){ 
        if(this.controls.forward){
            this.speed+= this.acceleration;//move up, y moves downward on computer
        }
        if (this.controls.reverse){
            this.speed -= this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        } //caping max speed, when going up
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        } //slowing down slowly

        if(this.speed>0){
            this.speed-= this.friction;
        }

        if(this.speed<0){
            this.speed+= this.friction;
        }

        if(Math.abs(this.speed)<this.friction){
            this.speed =0;
        }

        if (this.speed!=0){
            const flip= this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.05*flip;
            }
            if(this.controls.right){
                this.angle-= 0.05*flip;
            }
        }

        // if(this.controls.right){
        //     this.angle-=0.03;
        //     // this.x += 2; change to rotation, to make it more realistic and have the same speed condition defined previously
        // }
        // if (this.controls.left){
        //     this.angle+=0.03;
        //     // this.x -= 2;, change to rotation
        // }
        
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw(ctx){//draw is a method
        // making rotation
        ctx.save(); //save the current state of the canvas(context)
        ctx.translate(this.x,this.y);//move the canvas to the center of the car
        ctx.rotate(-this.angle);//because we want to rotate it counter clockwise

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height,
        );
        ctx.fill();
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.restore();//restore the canvas to the state before the rotation
    
            // draw the sensor, car has responsibilty to draw it's own sensor
        this.sensor.draw(ctx);
    }
}