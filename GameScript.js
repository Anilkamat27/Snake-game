function init(){
    // the datastructures we use to store the cells of the snakeis an array actually array of pairs 0:(4,0),1:(3,0),2(2,0)  
   
    var canvas = document.getElementById('canvas');
    W=canvas.width = 487;
    H=canvas.height = 487;
    pen = canvas.getContext('2d');
    cs = 26;
    gameover = false;
    score = 5;
//    document.getElementById("ScorePrinter").innerHTML = score;
// create image object for food
     foodimage = new Image();
     foodimage.src = "images.png"; 
     trophy = new Image();
     trophy.src = "image2.png"


    food = getrandomfood();
    pen.fillstyle = "red";
    snake = {
        init_len : 5,
        color : "MediumBlue",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_len;i>0;i--)
            {
                this.cells.push({x:i,y:0}); 
                // inside push there is another object to make object, here cell now become object
            }
        },
       
        drawSnake:function(){
            //hummpe x coordinate pade hai cells me jo the , usse humme rectangles banake snake ka roop dena hai 
            
            for(var i=0;i<this.cells.length;i++)
            {pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1);
                ;

            }
        },
        updatesnake:function(){
            // s to change direction we have to update the logic 
            
            //here we remove cells from the last
            //now to add cell in front, we should have cordinate of old head
            
            
            // CHECK IF NAKE  HAS EATEN THE FOOD INCREASE THE LENGTH OF THE SNAKE AND GENERATE NEW FOOD OBJECT
            // WE HAVE TO CHECK THE COLLISIONS HAPPEN OR NOT
            var headx =this.cells[0].x;
            var heady =this.cells[0].y;
           if(headx==food.x&&heady==food.y)
           {
               console.log("FOOD EATEN");
               food = getrandomfood();
               score++;document.getElementById("ScorePrinter").innerHTML = score +"    ";
           }
           else {
            //    we will not poping the cell if food is not eaten
            this.cells.pop();
           }
            
            var nextx; var nexty;
           if(this.direction=="right"){
                nextx = headx+1;
                nexty = heady;
           }
           else if(this.direction=="Left"){
            nextx= headx - 1;
            nexty= heady;
            }
            else if(this.direction=="down"){
                nextx= headx;
                nexty= heady+1;
           }
            else if(this.direction=="up"){
                nextx= headx;
                nexty= heady-1;
           }
            this.cells.unshift({x: nextx , y: nexty});
        // PUT SOME CHECKS IN SNAKE UPDATE FUNCYTION , SO THAT GAME OVER WHEN THIS SNAKE GOES OUT OF THE WINDOW
           var lastx = Math.round(W/cs);
           var lasty = Math.round(H/cs)
           if(this.cells[0].y<0|| this.cells[0].x<0||this.cells[0].y>lasty|| this.cells[0].x>lastx)
           {
             gameover= true;  
           }
        },
    };
    snake.createSnake();
    // add a event listener on the document object
   function keypressed(e){
      if (e.key =="ArrowRight")
      {
        // we have tho thing we have just updated the direction but we have not return the logic in the update function
        // of the  snake so that snake now move in changed direction 
          snake.direction = "right";
      }
      else if (e.key =="ArrowLeft")
      {
          snake.direction = "Left";
      }
      else if (e.key=="ArrowDown")
      {
          snake.direction = "down";
      }
      else if (e.key=="ArrowUp")
      {
          snake.direction = "up";
      }
    //   console.log(snake.direction);
   }
    document.addEventListener('keydown',keypressed);
  }
  
  function draw()
  {  
    //   in our draw function we should erase the old screen
       pen.clearRect(0,0,W,H);
       snake.drawSnake();
    //    in draw function you have to draw fruit but we first have call  getrandomfood to get coordibntes of food
    //  in draw function we have to call the food object
    pen.fillStyle = food.color;
    pen.drawImage(foodimage,food.x*cs,food.y*cs,cs+2,cs+2);
    pen.drawImage(trophy,22,32,80,40);

    pen.fillStyle= "dark red";
    pen.font = "20px roboto"
    pen.fillText(score,50,50);

}
  function update(){
        //animate the snake for movement 
       
            snake.updatesnake();}
        // make random fruit
        function getrandomfood(){
            var foodx = Math.round(Math.random()*(W-cs)/cs);
            var foody = Math.round(Math.random()*(H-cs)/cs);
            var food = {
                x:foodx,
                y:foody,
                color:"red",
            }
            return food;
        }
        
 
  function gameloop()
  {   if(gameover==true){
      clearInterval(f);
      alert("GAME OVER");
      document.getElementById("ScorePrinter").innerHTML = score;
      return;
  }
      draw();
      update();
  
  }
  init();
var f = setInterval(gameloop,100);
function f4(){
   
        location.reload();
    }	