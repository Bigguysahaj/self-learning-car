class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 7;
        this.rayLength=200;
        // math.pi used to make the angle of the sensor
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[];
    }

    update(roadBorders){
        this.#castRays();

        // creating sensors
        this.readings=[];
        for(let i=0; i<this.rays.length; i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            );
        }
    }

    #getReading(ray,roadBorders){

        // we need to check where the ray is hitting the borders
        // so one ray can only hit one border
        // if there are multiple intersections, the car is off the map for now,
        // but later on we might add traffic so multiple intersection is possible
        // we need to find the closest border

        let touches=[];

        for(let i=0; i<roadBorders.length; i++){
            const touch= getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }
        if (touches.length==0){
            return null;
        }else{
                // we get three returns, x,y and offset
                // hence we use mordern javascript method
                const offsets = touches.map(e=>e.offset);
                // the array map method, goes through all the elements in the array and for each element it takes the offsets
                // and then it returns the offsets
                // now we need to find the minimum offset or the nearest offset
                const minOffset= Math.min(...offsets);
                // this dot dot dot (...) is called the spread operator, and it spreads the 
                // array into individual elements (basically speaking)

                return touches.find(e=>e.offset==minOffset);
                // the code is short because we are using mordern javascript methods
                // get used to these syntaxes, as you wil see them alot in react and other frameworks
        }
    }

    #castRays(){
        this.rays=[];
        // this stores, each individual rays one by one
        for(let i=0; i<this.rayCount;i++){
            // this for loop populated the array above
            // we use lerp now
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;
            
            const start={
                x:this.car.x, y:this.car.y
            };
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }
    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
                // end becomes a point with an x and y attributes
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="plum";
            // move to sticks the ray to start or car
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }
}
