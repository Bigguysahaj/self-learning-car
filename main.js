const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50);


animate();

function animate(){
    car.update();

    canvas.height = window.innerHeight;//this is to make the canvas resize with the window (very important)
    //without this method, the car will just draw a big black trail behind it.
    road.draw(ctx); //draw the road, here the road comes first, before the car
    car.draw(ctx);
    requestAnimationFrame(animate);
}