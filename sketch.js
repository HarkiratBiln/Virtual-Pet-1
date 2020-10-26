//Creating the Variables
var dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
  //Loading the Images
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(700, 500);
  database = firebase.database();

  //Creating the Dog Sprite
  dog = createSprite(250,300);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  //Foodstock
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  

  background(46,139,87);

  //add styles here

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  fill(255);
  stroke("black");
  text("Food Remaining"+ foodS,100,100);
  textSize(25);
  

  text("Note: Press the UP arrow key to feed Ollie the Dog!",70,200);
  textSize(26);
}

function readStock(data) {

  foodS = data.val();  
}


function writeStock(number) {
  if(number <= 0){
    number =0;
  }
  else{
    number = number-1;
  }

  database.ref("/").update({
    Food:number 
  })
}
