//Create variables here
var dog,happyDog,database,foodS,foodStock;
var pet;

function preload()
{
  dog = loadImage("Dog (1).png");
  
  happyDog = loadImage("happydog (1).png");
}

function setup() {
	createCanvas(800,700);
  
  database = firebase.database();

  pet = createSprite(400,450,200,20);
  pet.addImage(dog);
  pet.scale = 0.3;

  foodStock = database.ref("food");
  foodStock.on("value",readStock,showError);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   pet.addImage(happyDog);
}
  drawSprites();

  fill("white");
  textSize(18);
  text("Note: Press UP_ARROW key to feed the dog",200,50);
 
  fill("white");
  textSize(18);
  text("Food Remaining :"+ foodS,310,300);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }

  database.ref("/").set({
    food:x
  })

}

function showError(){
  console.log("Error Occured");
}



