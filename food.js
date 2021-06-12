class Food{
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/milk.png'); 
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }
    
       getFeedTime(lastFed){
         this.lastFed=lastFed;
       }
    
       deductFood(){
         if(this.foodStock>0){
          this.foodStock-=1;
         }
        }
    
        getFoodStock(){
          return this.foodStock;
        }
    
    display(){
      background(46,150,127);
 
 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,90);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,90);
   }
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);
       
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
      }
bedroom(){
  background(bedroom,550,500);
}

garden(){
  background(garden,550,500);
}      

washroom(){
  background(washroom,550,500,500);
}




}