/*
Rule:
1. click the button which blink when you press any key
2. after clicking the button one of the button will blink it would be the same or different button
3. then click that button along with previous button which you have to remember in order

*/



//for mobile
if(screen.width < 500){
    $("h1").after("<input type='text'>");
}






var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];// every time some pattern is generated
var userClickedPattern = [];// in every round reseeted when we click on the button it got store here 

//weather the game has started or not
var started = false;

//what is the level of the game
var level = 0;


//our key press function to detect , weather the key is pressed
$(document).keypress(function(){
    if(!started){//if key is pressed and our game is not starte then 

    nextSequence();
    started=true;
    }
});



//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColor = $(this).attr("id");
  
    $("#" + userChosenColor).fadeOut(25).fadeIn(25);
  
    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
      playSound(userChosenColor);
  
      animatePress(userChosenColor);

      checkAnswer(userClickedPattern.length-1);
  
  });



// we will make function to check answer to check weather the right key is pressed or not 

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }


    }else{
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();

        $("body").addClass("game-over");
        setTimeout(function(){//the class is removed after 200 ms for the animation
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }

}



//when the wrong answer is click we need to restart the game 
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
    $("#level-title").text("Press A Key to Start");
}



function nextSequence(){//here i am creating random number

userClickedPattern=[];

$("#level-title").text("Level " + level);
level++;

var randomNumber = Math.floor(Math.random()*4);
   
var randomChosenColor = buttonColor[randomNumber];

gamePattern.push(randomChosenColor);


$("#" + randomChosenColor).fadeOut(25).fadeIn(25);//to animate the button chosen

playSound(randomChosenColor);
animatePress(randomChosenColor);
}





function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// to animate button when it pressed

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// to detect keyboard key
















