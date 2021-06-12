//Create variables here
var dog,dogImg,dogImg1;
 
var database;
var foodObj,lastFed;
var milk,milkimg;
 var foodS,foodStock;
var feed,addFood
var gameState,readState;
var washroom,garden,bedroom;
 function preload(){
  dogImg=loadImage("images/Dog.png");
  dogImg1=loadImage("images/Happy.png");
  milkimg=loadImage("images/milk.png")
  garden=loadImage("images/Garden.png");
washroom=loadImage("images/Wash Room.png");
bedroom=loadImage("images/Bed Room.png");
 }

//Function to set initial environment
function setup() {
 database=firebase.database();
 createCanvas(700,500);
 
 dog=createSprite(250,300,150,150);
 dog.addImage(dogImg);
 dog.scale=0.15;

 foodStock=database.ref('Food');
 foodStock.on("value",readStock);

 feed=createButton("Feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood=createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);
 
//read game state from database
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
});
fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 foodObj=new Food();

}

// function to display UI
function draw() {
currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
   update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }

 if(gameState!="Hungry"){
   feed.hide();
   addFood.hide();
   dog.remove();
   milk.remove();
 }else{
   feed.show();
   addFood.show();
   //dog.addImage(dogImg);
 }
 
 drawSprites();
}

//Function to read values from DB
function readStock(data){
 foodS=data.val();
 foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);
  milk=createSprite(180,320,10,10);
  milk.addImage(milkimg);
  milk.scale=0.1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
//function to update gamestates in database
function update(state){
  database.ref('/').update({
    gameState:state
 
 
  })
}

