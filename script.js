//javascript for maths game
//executed once
var playing = false;
var score;

var timeremaining;

var correctAnswer;
//executed whenever you click start/reset button
document.getElementById("startreset").onclick = function(){
    //code to be executed when start/reset button is clicked
    
    //checking whether we are playing or not
    if(playing == true){
        location.reload(); //refresh or reload the page
    }else{
        playing = true;
        
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        
        hide("gameover");
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        startCountdown();
        
        //changing the text of the button
        document.getElementById("startreset").innerHTML = ("Reset Game");
        
        generateQA();
    }
}
function startCountdown(){
    var action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over
            clearInterval(action);
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + " .</p>"
            show("gameover");
            hide("timeremaining");
            document.getElementById("startreset").innerHTML = ("Start Game");

            playing = false;
        }
    }, 1000);
}
//Handling events for answer boxes
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing = true){
                
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                //generate new QA
                generateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
            }
        }
    }
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + (Math.round(3 * Math.random()));
    
    //below code fills  correct answer into random box
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        
        if(i!=correctPosition){
                    
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); 
            }while(answers.indexOf(wrongAnswer) > -1)
            
            answers.push(wrongAnswer);
            document.getElementById("box" + i).innerHTML = wrongAnswer; 
        }
    }
}
function show(Id){
    document.getElementById(Id).style.display = "block";
}
function hide(Id){
    document.getElementById(Id).style.display = "none";
}