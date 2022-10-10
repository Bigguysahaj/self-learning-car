const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50);


animate();

function animate(){
    car.update(road.borders);

    canvas.height = window.innerHeight;//this is to make the canvas resize with the window (very important)
    //without this method, the car will just draw a big black trail behind it.
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.6);
    road.draw(ctx); //draw the road, here the road comes first, before the car
    car.draw(ctx);

    // camera following car thing, is so easy, just needed the above
    // ctx.translate(0,-car.y+canvas.height*0.6); and ctx.save()
    // and ctx.restore() at the end of the function
    ctx.restore();
    requestAnimationFrame(animate);
}
