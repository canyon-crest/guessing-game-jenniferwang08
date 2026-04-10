// add javascript here
let player= prompt("Enter your name");
player = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();

let guess = 0;
let range = 0;
let answer = 0;
let guessCount = 0;
//let totalWins = 0;
const scores = [];
let startTime = 0;
let fastest = null;
let totalTime = 0;
let rounds = 0;

function suffix(day){
    if(day >= 11 && day <= 13)
        return "th";
    if(day % 10 === 1)
        return "st";
    if (day % 10 === 2)
        return "nd";
    if (day % 10 === 3)
        return "rd";
    return "th";
}

function time(){
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    let h = d.getHours();
    let m = String(d.getMinutes()).padStart(2, "0");
    let s = String(d.getSeconds()).padStart(2, "0");
    return  month + " " + day + suffix(day) + " " + year + ", " + h + ":" + m + ":" + s;
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);


function play(){
    //let range = 0;
    let levels = document.getElementsByName("level");
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    document.getElementById("msg").textContent = player + ", Guess a number 1-" + range;
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
        msg.textContent = player + ", Correct! It took " + guessCount + " tries.";
            
    let feedback = "";

    if (guessCount === 1) {
        feedback = " Phenomenal!";
    } 
    else if (guessCount <= 3) {
        feedback = " Amazing job!";
    } 
    else if (guessCount <= 5) {
        feedback = " Great work!";
    } 
    else {
        feedback = " Keep going!";
    }
    msg.textContent += feedback;

         updateScore(guessCount);
         updateTimers(new Date().getTime());
         resetGame();
    }
    else if(guess < answer){
        msg.textContent = player + ", Too low " + temp + ", try again";
    }

    else{
        msg.textContent = player + ", Too high " + temp + ", try again";
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

document.getElementById("date").textContent = time();

    
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

    function giveUp(){
        document.getElementById("msg").textContent = player + " gave up";

        updateScore(range);
        updateTimers(new Date().getTime());
        resetGame();
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

    document.getElementById("darkBtn").addEventListener("click", function(){
    document.body.classList.toggle("dark");
});

document.getElementById("guess").addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        makeGuess();
    }
});