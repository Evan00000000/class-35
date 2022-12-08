var hypnoticBall;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);

    hypnoticBall = createSprite(100,100,10,10);
    hypnoticBall.shapeColor = "red";

    var hypnoticBallPosition = database.ref("ball/position");
    hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position !== undefined) {
        if(keyDown(LEFT_ARROW)){
            writePosition(-4,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(4,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-4);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+4);
        }
        drawSprites();
    }
}

function writePosition(x,y){
    database.ref("ball/position").set({
        "x" : position.x + x,
        "y" : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError(){
    console.log("data not received from database");
}