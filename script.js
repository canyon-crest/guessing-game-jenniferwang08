// add javascript here
let player= prompt("Enter your name");
player = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();

let guess = 0;
let answer = 0;
let guessCount = 0;
//let totalWins = 0;
const scores = [];
let startTime = 0;
let fastest = null;
let totalTime = 0;
let rounds = 0;

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);


function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    document.getElementById("msg").textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range)+1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;

    startTime = new Date().getTime();

}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    let diff = Math.abs(guess - answer);
    let temp = "";
    if(diff <= 2){
        temp = "hot";
    }
    else if(diff <=5){
        temp = "warm";
    }
    else{
        temp = "cold";
    }

    if(guess == answer){
        msg.textContent = "Correct! It took " + guessCount + " tries.";
         updateScore(guessCount);
         updateTimers(new Date().getTime());
         resetGame();
    }
    else if(guess < answer){
        msg.textContent = "Too low " + temp + ", try again";
    }

    else{
        msg.textContent = "Too high " + temp + ", try again";
    }
    }


    function updateScore(score){
        scores.push(score);
        wins.textContent = "Total wins: " + scores.length;
        let sum = 0;
        for(let i=0; i < scores.length; i++){
            sum += scores[i]; // sum = sum + scores[i]
        }
        avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

        scores.sort(function(a,b){return a-b;});

        let lb = document.getElementsByName("leaderboard");
        for(let i = 0; i < lb.length; i++){
            if(i < scores.length){
                lb[i].textContent = scores[i];
            }
        }
    }


    
    setInterval(function() {
        document.getElementById("date").textContent = time();
    }, 1000);

    function updateTimers(end){
        let t = (end - startTime)/1000;
        rounds++;
        totalTime += t;
        if(fastest === null || t < fastest){
            fastest = t;

        }
    document.getElementById("fastest").textContent = "Fastest Game: " + fastest.toFixed(2);
    document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / rounds).toFixed(2);
        

    }

    function resetGame(){
        guess.value = "";
        guessBtn.disabled = true;
        giveUpBtn.disabled = true;
        playBtn.disabled = false; 
        e.disabled = false;
        h.disabled = false;
        m.disabled = false;
    }






